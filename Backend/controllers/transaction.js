import fs from "fs";
import ejs from "ejs";
import path from "path";
import User from "../models/User.js";
import puppeteer from "puppeteer";
import { StatusCodes } from "http-status-codes";
import Transaction from "../models/Transaction.js";
import Dtb_process from "../models/Dtb_process.js";
import { v4 as uuidv4 } from "uuid";
import OrderHistory from "../models/Dtb_order_history.js";
import Payment from "../models/Dtb_payment.js";
import Message from "../models/Message.js";
import mongoose from "mongoose";
import { sendEmail, uploadChatAttachmentToS3 } from "../aws.js";
import { messageEmail } from "../emailTemplates/messageEmail.js";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import Notification from "../models/Notifications.js";
import Mail_Template from "../models/Mail_Template.js";
import DefaultUsage from "../models/DefaultUsage.js";
import Tax from "../models/Tax.js";
import { cleanSubject } from "../utils/Html.js";

const parseIndianNumber = (numberString) => {
  if (!numberString || typeof numberString !== "string") {
    return numberString;
  }
  const parsedNumber = parseFloat(numberString.replace(/,/g, ""));
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};

function formatIndianNumber(number) {
  if (number === null) {
    return "";
  }
  return number.toLocaleString("ja-JP");
}

export const createTransaction = async (req, res) => {
  try {
    const { id: customer_id } = req.user;
    const { seller_id, process_id } = req.body;
    if (!seller_id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Seller id is required" });
    }
    if (customer_id === seller_id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "You cannot create a transaction with yourself" });
    }

    const process = await Dtb_process.findById(process_id);
    if (!process) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid process id" });
    }
    const process_name = process.name;

    const oldTransaction = await Transaction.findOne({
      customer_id,
      seller_id,
      process_name,
      process_id,
      $or: [
        { transaction_status: 0 },
        { transaction_status: 1 },
        { transaction_status: 2 },
        { transaction_status: 3 },
        { transaction_status: 4 },
        { transaction_status: 5 },
      ],
    }).populate("conversation");

    if (oldTransaction) {
      return res.status(StatusCodes.OK).json({ transaction: oldTransaction });
    }
    const newTransaction = await Transaction.create({
      customer_id,
      seller_id,
      process_name,
      process_id,
      transaction_status: 1,
      read: false,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ transaction: newTransaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const fetchTransactionById = async (req, res) => {
  try {
    const { id: user_id } = req.user;
    const { transaction_id } = req.params;
    const user = await User.findById(user_id);
    const transaction = await Transaction.findById(transaction_id)
      .populate("customer_id")
      .populate({ path: "seller_id", model: "User" })
      .populate("quotation")
      .populate({
        path: "process_id",
        model: "Dtb_process",
      })
      .populate({
        path: "conversation",
        populate: {
          path: "sender_id",
          model: "User",
        },
      });
    return res.status(StatusCodes.OK).json({
      transaction,
      user: {
        id: user._id,
        name: user.name01,
        pic: user.profile_img,
      },
      customer_name: transaction?.customer_id?.name01,
      seller_name: transaction?.seller_id?.name01,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const buyerOrderList = async (req, res) => {
  try {
    const { id: customer_id } = req.user;
    const { page, pageSize = 10, status } = req.query;
    console.log("status", status);
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(pageSize) || 10;
    const skip = (currentPage - 1) * itemsPerPage;
    const objectIdBuyerId = new mongoose.Types.ObjectId(customer_id);
    const matchQuery = { customer_id: objectIdBuyerId };

    if (Array.isArray(status) && status.length > 0) {
      const parsedStatuses = status
        .map((s) => parseInt(s))
        .filter((s) => !isNaN(s) && s !== 0);

      if (parsedStatuses.includes(10)) {
        matchQuery.transaction_status = { $gte: 1, $lte: 9 };
      } else if (parsedStatuses.length > 0) {
        matchQuery.transaction_status = { $in: parsedStatuses };
      } else {
        matchQuery.transaction_status = { $ne: 0 };
      }
    } else {
      matchQuery.transaction_status = { $ne: 0 };
    }

    console.log("Match Query:", matchQuery);

    const transactions = await Transaction.aggregate([
      { $match: matchQuery },
      { $skip: skip },
      { $limit: itemsPerPage },
      {
        $lookup: {
          from: "quotes",
          let: { last_quote_id: { $arrayElemAt: ["$quotation", -1] } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$last_quote_id"] } } },
            { $project: { totalamountExcludingTax: 1 } },
          ],
          as: "latestQuote",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "buyerDetails",
        },
      },
      {
        $addFields: {
          latestQuoteTotalExcludingTax: {
            $arrayElemAt: ["$latestQuote.totalamountExcludingTax", 0],
          },
          buyerDetails: { $arrayElemAt: ["$buyerDetails", 0] },
        },
      },
      { $project: { latestQuote: 0 } },
    ]);

    // console.log("Transactions:", transactions);

    const totalTransactions = await Transaction.countDocuments(matchQuery);
    const totalPages = Math.ceil(totalTransactions / itemsPerPage);

    return res.status(200).json({
      success: true,
      data: transactions,
      pagination: {
        currentPage,
        itemsPerPage,
        totalItems: totalTransactions,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const sellerOrderList = async (req, res) => {
  try {
    const { id: seller_id } = req.user;
    const { page, pageSize = 10, status } = req.query;
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(pageSize) || 10;
    const skip = (currentPage - 1) * itemsPerPage;
    const objectIdSellerId = new mongoose.Types.ObjectId(seller_id);
    const matchQuery = { seller_id: objectIdSellerId };

    if (Array.isArray(status) && status.length > 0) {
      const parsedStatuses = status
        .map((s) => parseInt(s))
        .filter((s) => !isNaN(s) && s !== 0);

      if (parsedStatuses.includes(10)) {
        matchQuery.transaction_status = { $gte: 1, $lte: 9 };
      } else if (parsedStatuses.length > 0) {
        matchQuery.transaction_status = { $in: parsedStatuses };
      } else {
        matchQuery.transaction_status = { $ne: 0 };
      }
    } else {
      matchQuery.transaction_status = { $ne: 0 };
    }

    console.log("Match Query:", matchQuery);

    const transactions = await Transaction.aggregate([
      { $match: matchQuery },
      { $skip: skip },
      { $limit: itemsPerPage },
      {
        $lookup: {
          from: "quotes",
          let: { last_quote_id: { $arrayElemAt: ["$quotation", -1] } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$last_quote_id"] } } },
            { $project: { totalamountExcludingTax: 1 } },
          ],
          as: "latestQuote",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "seller_id",
          foreignField: "_id",
          as: "sellerDetails",
        },
      },
      {
        $addFields: {
          latestQuoteTotalExcludingTax: {
            $arrayElemAt: ["$latestQuote.totalamountExcludingTax", 0],
          },
        },
      },
      { $project: { latestQuote: 0 } },
    ]);

    // console.log("Transactions:", transactions);

    const totalTransactions = await Transaction.countDocuments(matchQuery);
    const totalPages = Math.ceil(totalTransactions / itemsPerPage);

    return res.status(200).json({
      success: true,
      data: transactions,
      pagination: {
        currentPage,
        itemsPerPage,
        totalItems: totalTransactions,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (
  socket,
  { transactionId, message, file, sender_id }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;
      const conversation = transaction.conversation;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return res.status(403).json({ message: "Unauthorized" });
      }

      let file_name = null;
      let file_path = null;

      const bucketName = process.env.AWS_BUCKET_NAME;

      if (file) {
        file_path = await uploadChatAttachmentToS3(bucketName, message, file);
        console.log("File uploaded to S3:", file_path);
        file_name = message;
      } else {
        console.log("File not received");
      }

      const newMessage = new Message({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        file_path,
        file_name,
        image_flg: 0,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        del_flg: 0,
      });

      if (conversation.length === 0) {
        newMessage.first_msg = true;
        newMessage.special_msg = true;
        transaction.transaction_status = 1;
        transaction.tradingStartDate = new Date();
        transaction.quotationRequested = true;
        socket.to(transactionId).emit("newMessage", {
          sender_name,
          sender_pic,
          message,
          first_msg: true,
        });
      }

      await newMessage.save();

      transaction.conversation.push(newMessage._id);
      await transaction.save();

      if (file) {
        socket.to(transactionId).emit("newMessage", {
          sender_name,
          sender_pic,
          message,
          file_path,
          first_msg: false,
        });
      } else {
        socket.to(transactionId).emit("newMessage", {
          sender_name,
          sender_pic,
          message,
          first_msg: false,
        });
      }

      await Notification.create({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      console.log("Notification sent to room: ", receiver_id.toString());

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageQuote = async (
  socket,
  { transactionId, message, sender_id, estimateTable }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      let reQuoteSent = false;

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        seller_quote: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      transaction.quotationSent = true;
      transaction.quotationReceived = true;
      transaction.reQuoteReceived = false;
      transaction.orderer_agree = false;
      if (transaction.reQuoteRequested) {
        reQuoteSent = true;
        transaction.reQuoteSent = true;
      }
      transaction.transaction_status = 1;
      await transaction.save();

      socket.to(transactionId).emit("newMessageQuote", {
        sender_name,
        sender_pic,
        message,
        estimateTable,
        transaction: {
          transaction,
        },
        estimatePdf: transaction.estimation_pdf
          ? transaction.estimation_pdf
          : null,
        seller_quote: true,
        reQuoteSent,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket.to(transactionId).emit("newNotificationSentForQuote", {
        sender_name: sender_id, // Fetch sender name from database if needed
        message: message,
        notificationId: notification._id, // Send notification ID for reference
      });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageReQuote = async (
  socket,
  { transactionId, message, sender_id }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        buyer_reQuote: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      transaction.reQuoteRequested = true;
      transaction.reQuoteReceived = true;
      transaction.reQuoteSent = false;
      transaction.orderer_agree = false;
      transaction.transaction_status = 1;
      await transaction.save();

      socket.to(transactionId).emit("newMessageReQuote", {
        sender_name,
        sender_pic,
        message,
        buyer_reQuote: true,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();
      console.log(ress, ">>>>>>>>>>");

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });
      // Emitting new notification to the room
      socket.to(transactionId).emit("newNotificationSentForReQuote", {
        sender_name: sender_id, // Fetch sender name from database if needed
        message: message,
        notificationId: notification._id, // Send notification ID for reference
      });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageAgreeQuote = async (
  socket,
  { transactionId, message, file, sender_id }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        buyer_Agree: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      transaction.orderer_agree = true;
      transaction.transaction_status = 2;
      await transaction.save();

      socket.to(transactionId).emit("newMessageAgee", {
        sender_name,
        sender_pic,
        message,
        buyer_Agree: true,
      });

      const notification = new Notification({
        user_id: receiver_id, // assuming this is the sender's user ID
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id, // or another relevant user ID
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket.to(transactionId).emit("newNotificationSentForQuoteAgree", {
        sender_name: sender_id, // Fetch sender name from database if needed
        message: message,
        notificationId: notification._id, // Send notification ID for reference
      });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageContractSign = async (
  socket,
  { transactionId, message, file, sender_id }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        specail_msg: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        contract_sign: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      transaction.contractSigned = true;
      transaction.contractSignedDate = new Date();
      await transaction.save();

      socket.to(transactionId).emit("newMessageContractSign", {
        sender_name,
        sender_pic,
        message,
        contract_sign: true,
      });

      console.log("Message sent to room: ", transactionId);

      const notification = new Notification({
        user_id: receiver_id, // assuming this is the sender's user ID
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id, // or another relevant user ID
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket.to(transactionId).emit("newNotificationSentForContractSign", {
        sender_name: sender_id, // Fetch sender name from database if needed
        message: message,
        notificationId: notification._id, // Send notification ID for reference
      });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessagePaymentCompleted = async (
  socket,
  { transactionId, message, sender_id }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        paymentDeposited: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      await transaction.save();

      socket.to(transactionId).emit("newMessagePayment", {
        sender_name,
        sender_pic,
        message,
        transaction: {
          transaction,
        },
        paymentDeposited: true,
        advancePaymentPdf: transaction.advance_payment_invoice
          ? transaction.advance_payment_invoice
          : null,
        orderFormPdf: transaction.order_form ? transaction.order_form : null,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket.to(transactionId).emit("newNotificationSentForPayment", {
        sender_name: sender_id,
        message: message,
        notificationId: notification._id,
      });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageDeliveryCompleted = async (
  socket,
  { transactionId, message, sender_id }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      )
        .populate("quotation")
        .populate("customer_id")
        .populate("seller_id");
      const contractor_id = transaction.seller_id._id;
      const orderer_id = transaction.customer_id._id;
      const tax = await Tax.find({});
      if (tax.length === 0) return res.status(200).json({ tax: { rate: 10 } });
      const singleTax = tax ? tax[0].rate : null;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      let totalAmountExcludingTax = 0;
      let taxAmount = 0;
      let totalAmountIncludingTax = 0;
      const formattedQuotation = transaction.quotation.map((item) => {
        const {
          note = "",
          totalamountExcludingTax,
          taxAmount: itemTaxAmount,
          totalAmountIncludingTax: itemTotalAmountIncludingTax,
          deadline,
        } = item;

        totalAmountExcludingTax = totalamountExcludingTax;
        taxAmount = itemTaxAmount;
        totalAmountIncludingTax = itemTotalAmountIncludingTax;

        return {
          drawing_number: item.drawing_number,
          item_name: item.item_name,
          deadline: new Date(item.deadline),
          quantity: item.quantity,
          unit: item.unit,
          unit_price: item.unit_price,
          price: item.price,
          note,
          totalamountExcludingTax,
          taxAmount,
          totalAmountIncludingTax,
          deadline,
        };
      });

      const deliveryTemplatePath = path.resolve(
        "./invoicesTemplates/deliverySlip.ejs"
      );
      const deliveryHtmlTemplate = fs.readFileSync(
        deliveryTemplatePath,
        "utf8"
      );
      const deliveryRenderedHtml = ejs.render(deliveryHtmlTemplate, {
        sellerInfo: transaction.seller_id,
        buyerInfo: transaction.customer_id,
        quotation: formattedQuotation,
        transaction,
        singleTax,
      });

      const deliveryBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const deliveryPage = await deliveryBrowser.newPage();
      await deliveryPage.setCacheEnabled(false);
      await deliveryPage.setContent(deliveryRenderedHtml);
      const deliveryPdfBuffer = await deliveryPage.pdf({ format: "Letter" });
      await deliveryBrowser.close();

      const deliveryUniqueId = uuidv4();
      const deliveryFileName = `delivery_slip_${deliveryUniqueId}.pdf`;
      const delivery3FilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        deliveryFileName,
        deliveryPdfBuffer
      );
      console.log("Delivery Slip uploaded to S3", delivery3FilePath);
      transaction.delivery_slip = delivery3FilePath;

      const receiptTemplatePath = path.resolve(
        "./invoicesTemplates/receipt.ejs"
      );
      const receiptHtmlTemplate = fs.readFileSync(receiptTemplatePath, "utf8");
      const receiptRenderedHtml = ejs.render(receiptHtmlTemplate, {
        sellerInfo: transaction.seller_id,
        buyerInfo: transaction.customer_id,
        quotation: formattedQuotation,
        transaction,
        singleTax,
      });
      const receiptBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const receiptPage = await receiptBrowser.newPage();
      await receiptPage.setCacheEnabled(false);
      await receiptPage.setContent(receiptRenderedHtml);
      const receiptPdfBuffer = await receiptPage.pdf({ format: "Letter" });
      await receiptBrowser.close();

      const receiptUniqueId = uuidv4();
      const receiptFileName = `receipt_${receiptUniqueId}.pdf`;
      const receipt3FilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        receiptFileName,
        receiptPdfBuffer
      );
      console.log("Receipt uploaded to S3", receipt3FilePath);
      transaction.Receipt = receipt3FilePath;

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        deliveryCompleted: true,
        receiptGenerated: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      transaction.delivery_status = 1;
      transaction.transaction_status = 4;
      await transaction.save();

      socket.to(transactionId).emit("newMessageDeliveryCompleted", {
        sender_name,
        sender_pic,
        message,
        transaction: {
          transaction,
        },
        deliverySlipPdf: transaction.delivery_slip
          ? transaction.delivery_slip
          : null,
        receiptPdf: transaction.Receipt ? transaction.Receipt : null,
        deliveryCompleted: true,
        receiptGenerated: true,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket.to(transactionId).emit("newNotificationSentForDeliveryCompleted", {
        sender_name: sender_id,
        message: message,
        notificationId: notification._id,
      });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageDeliverySentBack = async (
  socket,
  { transactionId, message, sender_id }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        deliverySentBack: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      transaction.delivery_status = 2;
      transaction.transaction_status = 3;
      await transaction.save();

      socket.to(transactionId).emit("newMessageDeliverySentBack", {
        sender_name,
        sender_pic,
        message,
        deliverySentBack: true,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket.to(transactionId).emit("newNotificationSentForDeliverySentBack", {
        sender_name: sender_id,
        message: message,
        notificationId: notification._id,
      });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageDeliveryAccepted = async (
  socket,
  { transactionId, message, sender_id }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      )
        .populate("quotation")
        .populate("customer_id")
        .populate("seller_id");
      const contractor_id = transaction.seller_id._id;
      const orderer_id = transaction.customer_id._id;
      const singleTax = transaction.adminTax !== 0 ? transaction.adminTax : 10;
      const defaultUsage =
        transaction.adminSystemFee !== 0 ? transaction.adminSystemFee : 10;
      const systemFeeExcludingTax = Math.floor(
        (parseIndianNumber(
          transaction &&
            transaction?.quotation[transaction?.quotation?.length - 1]
              ?.totalamountExcludingTax
        ) *
          (defaultUsage ? defaultUsage : 10)) /
          100
      );
      const taxOnSystemFee = Math.floor(
        (systemFeeExcludingTax * singleTax) / 100
      );
      const totalSystemFeeIncludingTax = systemFeeExcludingTax + taxOnSystemFee;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      let totalAmountExcludingTax = 0;
      let taxAmount = 0;
      let totalAmountIncludingTax = 0;
      const formattedQuotation = transaction.quotation.map((item) => {
        const {
          note = "",
          totalamountExcludingTax,
          taxAmount: itemTaxAmount,
          totalAmountIncludingTax: itemTotalAmountIncludingTax,
          deadline,
        } = item;

        totalAmountExcludingTax = totalamountExcludingTax;
        taxAmount = itemTaxAmount;
        totalAmountIncludingTax = itemTotalAmountIncludingTax;

        return {
          drawing_number: item.drawing_number,
          item_name: item.item_name,
          deadline: new Date(item.deadline),
          quantity: item.quantity,
          unit: item.unit,
          unit_price: item.unit_price,
          price: item.price,
          note,
          totalamountExcludingTax,
          taxAmount,
          totalAmountIncludingTax,
          deadline,
        };
      });

      const AcceptanceTemplatePath = path.resolve(
        "./invoicesTemplates/acceptanceLetter.ejs"
      );
      const AcceptanceHtmlTemplate = fs.readFileSync(
        AcceptanceTemplatePath,
        "utf8"
      );
      const AcceptanceRenderedHtml = ejs.render(AcceptanceHtmlTemplate, {
        sellerInfo: transaction.seller_id,
        buyerInfo: transaction.customer_id,
        quotation: formattedQuotation,
        transaction,
        singleTax,
      });

      const AcceptanceBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const AcceptancePage = await AcceptanceBrowser.newPage();
      await AcceptancePage.setCacheEnabled(false);
      await AcceptancePage.setContent(AcceptanceRenderedHtml);
      const AcceptancePdfBuffer = await AcceptancePage.pdf({
        format: "Letter",
      });
      await AcceptanceBrowser.close();

      const AcceptanceUniqueId = uuidv4();
      const AcceptanceFileName = `acceptance_letter_${AcceptanceUniqueId}.pdf`;
      const AcceptanceFilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        AcceptanceFileName,
        AcceptancePdfBuffer
      );
      console.log("Acceptance Letter uploaded to S3", AcceptanceFilePath);
      transaction.acceptance_letter = AcceptanceFilePath;

      const transactionInvoiceTemplatePath = path.resolve(
        "./invoicesTemplates/transactionInvoice.ejs"
      );
      const transactionInvoiceHtmlTemplate = fs.readFileSync(
        transactionInvoiceTemplatePath,
        "utf8"
      );
      const transactionInvoiceRenderedHtml = ejs.render(
        transactionInvoiceHtmlTemplate,
        {
          sellerInfo: transaction.seller_id,
          buyerInfo: transaction.customer_id,
          quotation: formattedQuotation,
          transaction,
          singleTax,
        }
      );

      const transactionInvoiceBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const transactionInvoicePage = await transactionInvoiceBrowser.newPage();
      await transactionInvoicePage.setCacheEnabled(false);
      await transactionInvoicePage.setContent(transactionInvoiceRenderedHtml);
      const transactionInvoicePdfBuffer = await transactionInvoicePage.pdf({
        format: "Letter",
      });
      await transactionInvoiceBrowser.close();

      const transactionInvoiceUniqueId = uuidv4();
      const transactionInvoiceFileName = `transaction_invoice_${transactionInvoiceUniqueId}.pdf`;
      const transactionInvoiceFilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        transactionInvoiceFileName,
        transactionInvoicePdfBuffer
      );
      console.log(
        "Transaction Invoice uploaded to S3",
        transactionInvoiceFilePath
      );
      transaction.transaction_invoice = transactionInvoiceFilePath;

      const systemFeeTemplatePath = path.resolve(
        "./invoicesTemplates/systemFee.ejs"
      );
      const systemFeeHtmlTemplate = fs.readFileSync(
        systemFeeTemplatePath,
        "utf8"
      );
      const systemFeeRenderedHtml = ejs.render(systemFeeHtmlTemplate, {
        sellerInfo: transaction.seller_id,
        buyerInfo: transaction.customer_id,
        quotation: formattedQuotation,
        parseIndianNumber,
        formatIndianNumber,
        transaction,
        singleTax,
        systemFeeExcludingTax,
        taxOnSystemFee,
        totalSystemFeeIncludingTax,
      });

      const systemFeeBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const systemFeePage = await systemFeeBrowser.newPage();
      await systemFeePage.setCacheEnabled(false);
      await systemFeePage.setContent(systemFeeRenderedHtml);
      const systemFeePdfBuffer = await systemFeePage.pdf({ format: "Letter" });
      await systemFeeBrowser.close();

      const systemFeeUniqueId = uuidv4();
      const systemFeeFileName = `system_fee_${systemFeeUniqueId}.pdf`;
      const systemFeeFilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        systemFeeFileName,
        systemFeePdfBuffer
      );
      console.log("System Fee uploaded to S3", systemFeeFilePath);
      transaction.system_fee_invoice = systemFeeFilePath;

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        deliveryAccepted: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      transaction.delivery_status = 3;
      transaction.transaction_status = 8;
      await transaction.save();

      socket.to(transactionId).emit("newMessageDeliveryAccepted", {
        sender_name,
        sender_pic,
        message,
        transaction: {
          transaction,
        },
        acceptanceLetterPdf: transaction.acceptance_letter
          ? transaction.acceptance_letter
          : null,
        transactionInvoicePdf: transaction.transaction_invoice
          ? transaction.transaction_invoice
          : null,
        systemFeePdf: transaction.system_fee_invoice
          ? transaction.system_fee_invoice
          : null,
        deliveryAccepted: true,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket.to(transactionId).emit("newNotificationSentForDeliveryAccepted", {
        sender_name: sender_id,
        message: message,
        notificationId: notification._id,
      });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageCancellationRequest = async (
  socket,
  { transactionId, message, sender_id, userId }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        cancelRequest: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      if (userId.toString() === transaction.customer_id.toString()) {
        transaction.initiateRefund.generatedBy = "buyer";
      } else {
        transaction.initiateRefund.generatedBy = "seller";
      }
      transaction.initiateRefund.IsTrue = true;
      transaction.prev_transaction_status = transaction.transaction_status;
      await transaction.save();

      socket.to(transactionId).emit("newMessageCancelRequest", {
        sender_name,
        sender_pic,
        message,
        cancelRequest: true,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket
        .to(transactionId)
        .emit("newNotificationSentForCancellationRequest", {
          sender_name: sender_id,
          message: message,
          notificationId: notification._id,
        });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};
export const sendMessageRefundCancellation = async (
  socket,
  { transactionId, message, sender_id, userId }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        cancelRefundRequest: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      transaction.initiateRefund.IsTrue = false;
      transaction.initiateRefund.generatedBy = "none";
      transaction.agreedToCancel = false;
      transaction.refundTransferred = false;
      transaction.refundRequested = false;
      transaction.refund_invoice = null;
      transaction.transaction_status = transaction.prev_transaction_status;
      transaction.prev_transaction_status = 0;
      await transaction.save();

      socket.to(transactionId).emit("newMessageRefundCancellation", {
        sender_name,
        sender_pic,
        message,
        cancelRefundRequest: true,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket
        .to(transactionId)
        .emit("newNotificationSentForRefundRequestCancellation", {
          sender_name: sender_id,
          message: message,
          notificationId: notification._id,
        });
      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageCancellationAgree = async (
  socket,
  { transactionId, message, sender_id }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        cancelAgree: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      transaction.agreedToCancel = true;
      transaction.transaction_status = 5;
      await transaction.save();

      socket.to(transactionId).emit("newMessageCancelAgreed", {
        sender_name,
        sender_pic,
        message,
        cancelAgree: true,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket
        .to(transactionId)
        .emit("newNotificationSentForCancellationAgreed", {
          sender_name: sender_id,
          message: message,
          notificationId: notification._id,
        });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageRequestRefund = async (
  socket,
  { transactionId, message, sender_id, refundTable, RefundTaxDetails }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreeed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      );
      const contractor_id = transaction.seller_id;
      const orderer_id = transaction.customer_id;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        requestRefund: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      transaction.refundRequested = true;
      await transaction.save();

      socket.to(transactionId).emit("newMessageRequestRefund", {
        sender_name,
        sender_pic,
        message,
        transaction: {
          transaction,
        },
        requestRefund: true,
        refundTable,
        RefundTaxDetails,
        refundPdfLink: transaction.refund_invoice
          ? transaction.refund_invoice
          : null,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      let ress = await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket.to(transactionId).emit("newNotificationSentForRefundRequest", {
        sender_name: sender_id,
        message: message,
        notificationId: notification._id,
      });
      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);
      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

export const sendMessageRefundTermsAgree = async (
  socket,
  { transactionId, message, sender_id }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Message received: agreed ", message, "from: ", sender_id);
      const sender = await User.findById(sender_id);
      const sender_name = sender.name01;
      const sender_pic = sender.profile_img;
      const transaction = await Transaction.findById(
        new mongoose.Types.ObjectId(transactionId)
      )
        .populate("quotation")
        .populate("seller_id")
        .populate("customer_id");
      const contractor_id = transaction.seller_id._id;
      const orderer_id = transaction.customer_id._id;
      const singleTax =
        transaction?.refund?.taxDetails?.adminRefundTax !== 0
          ? transaction?.refund?.taxDetails?.adminRefundTax
          : 10;
      const defaultRefundUsage =
        transaction?.refund?.taxDetails?.adminRefundSystemFee !== 0
          ? transaction?.refund?.taxDetails?.adminRefundSystemFee
          : 10;
      const systemRefundFeeExcludingTax = Math.floor(
        (parseIndianNumber(
          transaction &&
            transaction?.refund &&
            transaction?.refund?.taxDetails?.totalAmountExcludingTax !== 0
            ? transaction?.refund?.taxDetails?.totalAmountExcludingTax
            : 0
        ) *
          (defaultRefundUsage ? defaultRefundUsage : 10)) /
          100
      );
      const taxOnRefundSystemFee = Math.floor(
        (systemRefundFeeExcludingTax * singleTax) / 100
      );
      const totalRefundSystemFeeIncludingTax =
        systemRefundFeeExcludingTax + taxOnRefundSystemFee;

      let receiver_id;

      if (sender_id.toString() === contractor_id.toString()) {
        receiver_id = orderer_id;
      } else if (sender_id.toString() === orderer_id.toString()) {
        receiver_id = contractor_id;
      } else {
        return;
      }

      let totalAmountExcludingTax = 0;
      let taxAmount = 0;
      let totalAmountIncludingTax = 0;
      let govTaxOnTotalAmount = 0;
      let totalRefundSystemFee = 0;
      const concatenatedQuotation = transaction?.quotation?.concat(
        transaction?.refund?.tableData
      );

      const formattedQuotation = concatenatedQuotation.map((item) => {
        const {
          note = "",
          totalamountExcludingTax,
          taxAmount: itemTaxAmount,
          totalAmountIncludingTax: itemTotalAmountIncludingTax,
          deadline,
        } = item;

        totalAmountExcludingTax = totalamountExcludingTax;
        taxAmount = parseIndianNumber(itemTaxAmount);
        totalAmountIncludingTax = itemTotalAmountIncludingTax;

        return {
          drawing_number: item.drawing_number,
          item_name: item.item_name ? item.item_name : item.content,
          quantity: item.quantity,
          unit: item.unit,
          unit_price: item.unit_price,
          price: item.price
            ? item.price
            : `-${formatIndianNumber(item.amount)}`,
          note,
          totalamountExcludingTax,
          taxAmount,
          totalAmountIncludingTax,
          deadline,
        };
      });

      console.log("refund tax details", transaction?.refund?.taxDetails);

      const newMessage = await Message.create({
        order_id: transactionId,
        contractor_id,
        orderer_id,
        note: message,
        sender_id,
        receiver_id,
        is_contractor_read: 0,
        is_orderer_read: 0,
        create_date: new Date(),
        update_date: null,
        message_status: null,
        refundTermsAgree: true,
        del_flg: 0,
      });

      transaction.conversation.push(newMessage._id);
      const refundTemplatePath = path.resolve(
        "./invoicesTemplates/refundTransactionInvoice.ejs"
      );
      const refundHtmlTemplate = fs.readFileSync(refundTemplatePath, "utf8");
      const refundRenderedHtml = ejs.render(refundHtmlTemplate, {
        sellerInfo: transaction.seller_id,
        buyerInfo: transaction.customer_id,
        quotation: formattedQuotation,
        transaction,
        refundTaxDetails: transaction?.refund?.taxDetails,
        parseIndianNumber,
        formatIndianNumber,
        singleTax,
      });

      const refundBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const refundPage = await refundBrowser.newPage();
      await refundPage.setCacheEnabled(false);
      await refundPage.setContent(refundRenderedHtml);
      const refundPdfBuffer = await refundPage.pdf({ format: "Letter" });
      await refundBrowser.close();

      const refundUniqueId = uuidv4();
      const refundFileName = `refund_invoice_${refundUniqueId}.pdf`;
      const refundFilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        refundFileName,
        refundPdfBuffer
      );
      console.log("Refund Invoice uploaded to S3", refundFilePath);
      transaction.refund_transaction_invoice = refundFilePath;
      transaction.refundTransferred = true;
      transaction.transaction_status = 7;

      const systemFeeTemplatePath = path.resolve(
        "./invoicesTemplates/refundSystemUsageFee.ejs"
      );
      const systemFeeHtmlTemplate = fs.readFileSync(
        systemFeeTemplatePath,
        "utf8"
      );
      const systemFeeRenderedHtml = ejs.render(systemFeeHtmlTemplate, {
        sellerInfo: transaction.seller_id,
        buyerInfo: transaction.customer_id,
        quotation: formattedQuotation,
        transaction,
        singleTax,
        systemRefundFeeExcludingTax,
        taxOnRefundSystemFee,
        totalRefundSystemFeeIncludingTax,
        refundTaxDetails: transaction?.refund?.taxDetails,
        parseIndianNumber,
        formatIndianNumber,
      });
      console.log("govTaxOnTotalAmount", govTaxOnTotalAmount);
      console.log("totalRefundSystemFee", totalRefundSystemFee);

      const systemFeeBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const systemFeePage = await systemFeeBrowser.newPage();
      await systemFeePage.setCacheEnabled(false);
      await systemFeePage.setContent(systemFeeRenderedHtml);
      const systemFeePdfBuffer = await systemFeePage.pdf({ format: "Letter" });
      await systemFeeBrowser.close();

      const systemFeeUniqueId = uuidv4();
      const systemFeeFileName = `refund_system_fee_${systemFeeUniqueId}.pdf`;
      const systemFeeFilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        systemFeeFileName,
        systemFeePdfBuffer
      );
      console.log("System Fee uploaded to S3", systemFeeFilePath);
      transaction.refund_system_fee_invoice = systemFeeFilePath;
      await transaction.save();

      socket.to(transactionId).emit("newMessageRefundTermsAgree", {
        sender_name,
        sender_pic,
        message,
        transaction: {
          transaction,
        },
        refundTransactionInvoicePdf: transaction.refund_transaction_invoice
          ? transaction.refund_transaction_invoice
          : null,
        refundSystemFeePdf: transaction.refund_system_fee_invoice
          ? transaction.refund_system_fee_invoice
          : null,
        refundTermsAgree: true,
      });

      const notification = new Notification({
        user_id: receiver_id,
        notificationImage: sender_pic,
        notificationTitle: sender.name01,
        description: message,
        creator_id: sender_id,
        transaction_id: transactionId,
        labels: ["注文"],
      });

      await notification.save();

      socket.to(receiver_id.toString()).emit("newMessageNotification", {
        receiver_id: receiver_id.toString(),
      });

      // Emitting new notification to the room
      socket.to(transactionId).emit("newNotificationSentForRefundTermsAgree", {
        sender_name: sender_id,
        message: message,
        notificationId: notification._id,
      });

      const email = await User.findById(receiver_id).select("email");
      const receiver_email = email.email;
      const process_name = transaction.process_name;
      const transaction_link = `${process.env.FRONT_END_URL}/transaction/${transactionId}`;
      const messageEmailTemplate = await Mail_Template.findOne({
        template: "message",
      });
      const emailSubject = messageEmailTemplate?.subject;
      const emailDetail = messageEmailTemplate?.detail;
      const emailFooter = messageEmailTemplate?.footer;
      const emailHtml = messageEmail(
        sender_name,
        process_name,
        message,
        transaction_link,
        emailDetail,
        emailFooter
      );
      const emailParams = {
        Destination: {
          ToAddresses: [receiver_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: emailHtml,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: cleanSubject(emailSubject),
          },
        },
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
      };
      await sendEmail(emailParams);

      resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      reject(error);
    }
  });
};

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const downloadPDF = async (req, res) => {
  const { url } = req.query;

  const decodedUrl = decodeURIComponent(url);
  const fileName = decodedUrl.split("/").pop(); // Extract filename from URL

  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `chat_attachments/${fileName}`, // Include the folder path in the key
      })
    );

    // Set response headers for file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    // Pipe the S3 response stream to the response object
    response.Body.pipe(res);
  } catch (error) {
    console.log("Error fetching PDF from S3:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const buyerOrderListForLimitedResult = async (req, res) => {
  try {
    const { id: customer_id } = req.user;

    const transactions = await Transaction.find({
      customer_id: new mongoose.Types.ObjectId(customer_id),
    })
      .populate("seller_id")
      .populate("conversation");

    const sortedTransactionsAccordingToLatestMessageCreatedAt =
      transactions.sort((a, b) => {
        const latestMessageA = a.conversation[a.conversation.length - 1];
        const latestMessageB = b.conversation[b.conversation.length - 1];

        return latestMessageB.create_date - latestMessageA.create_date;
      });

    const transactionsWithMessages = await Promise.all(
      sortedTransactionsAccordingToLatestMessageCreatedAt.map(
        async (transaction) => {
          const messages = await Message.find({ order_id: transaction._id })
            .sort({ create_date: -1 })
            .limit(1);
          return {
            _id: transaction._id,
            seller_id: transaction.seller_id,
            process_name: transaction.process_name,
            sellerName: transaction.seller_id.name01,
            transaction_status: transaction.transaction_status,
            latest_note: messages[0] ? messages[0].note : null,
          };
        }
      )
    );

    const limitedTransactions = transactionsWithMessages.slice(0, 5);

    // console.log("transactions", limitedTransactions);

    return res.status(200).json({
      success: true,
      data: limitedTransactions,
    });
  } catch (error) {
    console.error("Error fetching transactions with messages:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const sellerOrderListForLimitedResult = async (req, res) => {
  try {
    const { id: seller_id } = req.user;

    const transactions = await Transaction.find({
      seller_id: new mongoose.Types.ObjectId(seller_id),
    })
      .populate("customer_id")
      .populate("conversation");

    const sortedTransactionsAccordingToLatestMessageCreatedAt =
      transactions.sort((a, b) => {
        const latestMessageA = a.conversation[a.conversation.length - 1];
        const latestMessageB = b.conversation[b.conversation.length - 1];

        return latestMessageB.create_date - latestMessageA.create_date;
      });

    const transactionsWithMessages = await Promise.all(
      sortedTransactionsAccordingToLatestMessageCreatedAt.map(
        async (transaction) => {
          const messages = await Message.find({ order_id: transaction._id })
            .sort({ create_date: -1 })
            .limit(1);
          return {
            _id: transaction._id,
            customer_id: transaction.customer_id,
            process_name: transaction.process_name,
            customerName: transaction.customer_id.name01,
            transaction_status: transaction.transaction_status,
            latest_note: messages[0] ? messages[0].note : null,
          };
        }
      )
    );

    const limitedTransactions = transactionsWithMessages.slice(0, 5);

    return res.status(200).json({
      success: true,
      data: limitedTransactions,
    });
  } catch (error) {
    console.log("Error fetching transactions with messages:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateTransactionReadStatusForBuyer = async (req, res) => {
  try {
    const { transactionId } = req.params; // Assuming transaction ID is passed as a URL parameter

    // Retrieve the current transaction to check the 'read' status
    const transaction = await Transaction.findById(transactionId);

    // Check if transaction exists
    if (!transaction) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Transaction not found.",
      });
    }

    // Check if the 'read' field is already true
    if (transaction.buyer_read) {
      return res.status(StatusCodes.OK).json({
        message: "Read status already set to true.",
      });
    }

    // Update the 'read' field to true if it is currently false
    transaction.buyer_read = true;
    await transaction.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Transaction read status updated to true.",
    });
  } catch (error) {
    console.error("Error updating transaction read status:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
};

export const updateTransactionReadStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { userRole } = req.body;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    // Determine the field to update based on the user's role
    const readField = userRole === "buyer" ? "buyer_read" : "seller_read";

    // Check if the 'read' status for the specific role is already true
    if (transaction[readField]) {
      return res
        .status(200)
        .json({ message: "Read status already set to true for this user." });
    }

    // Update the 'read' field for the specific role
    transaction[readField] = true;
    await transaction.save();

    return res.status(200).json({
      success: true,
      message: `Transaction read status updated to true for ${userRole}.`,
    });
  } catch (error) {
    console.error("Error updating transaction read status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//buyer agreed to the order
export const OrdererAgreement = async (req, res) => {
  const { transactionId } = req.params;

  try {
    // Create a new ObjectId from transactionId
    const transactionObjectId = new mongoose.Types.ObjectId(transactionId);

    // Find the transaction by ObjectId
    const transaction = await Transaction.findById(transactionObjectId);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Update orderer_agree to true
    transaction.orderer_agree = true;

    // Save the updated transaction
    await transaction.save();

    // Respond with success message
    return res
      .status(200)
      .json({ message: "Orderer agreement updated successfully" });
  } catch (error) {
    console.error("Error updating orderer agreement:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//seller contract signed
export const ContractSigned = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const transactionObjectId = new mongoose.Types.ObjectId(transactionId);

    const transaction = await Transaction.findById(transactionObjectId);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    transaction.contract_agree = true;
    // Save the updated transaction
    await transaction.save();

    return res
      .status(200)
      .json({ message: "Orderer agreement updated successfully" });
  } catch (error) {
    console.error("Error updating orderer agreement:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to create a new payment
export const createPayment = async (req, res) => {
  try {
    const { paymentType, cardNumber, nameOfCard, securityCode } = req.body;
    const { transactionId } = req.params;
    const transactionObjectId = new mongoose.Types.ObjectId(transactionId);
    const transaction = await Transaction.findById(transactionObjectId);
    console.log(transaction, "transaction");
    const tax = await Tax.find({});
    if (tax.length === 0) return res.status(200).json({ tax: { rate: 10 } });
    const singleTax = tax ? tax[0].rate : null;
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const newPayment = new Payment({
      paymentType,
      cardNumber,
      nameOfCard,
      securityCode,
    });

    await newPayment.save();
    transaction.paymentDeposit = true;
    transaction.transaction_status = 3;
    await transaction.save();

    const quotation = await Transaction.findById(transactionObjectId)
      .populate("quotation")
      .populate({
        path: "seller_id",
        select: "name01 name02 zip01 zip02 pref addr01 addr02 business_id",
      })
      .populate("customer_id")
      .populate("process_id");

    console.log(quotation, "populated quotation");

    if (!quotation) {
      return res
        .status(404)
        .json({ message: "Quotation not found for this transaction" });
    }

    // Process quotation data to generate invoice
    let totalAmountExcludingTax = 0;
    let taxAmount = 0;
    let totalAmountIncludingTax = 0;

    const formattedQuotation = quotation.quotation.map((item) => {
      const {
        note = "",
        totalamountExcludingTax,
        taxAmount: itemTaxAmount,
        totalAmountIncludingTax: itemTotalAmountIncludingTax,
        deadline,
      } = item;

      totalAmountExcludingTax = totalamountExcludingTax;
      taxAmount = itemTaxAmount;
      totalAmountIncludingTax = itemTotalAmountIncludingTax;

      return {
        drawing_number: item.drawing_number,
        item_name: item.item_name,
        deadline: new Date(item.deadline),
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        price: item.price,
        note, // Use default value if note is undefined
        totalamountExcludingTax,
        taxAmount,
        totalAmountIncludingTax,
        deadline,
      };
    });

    // Generate PDF for the payment invoice
    const templatePath = path.resolve("./invoicesTemplates/advancePayment.ejs");
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");
    const renderedHtml = ejs.render(htmlTemplate, {
      process: transaction.process_id,
      buyerInfo: transaction.customer_id,
      quotation: formattedQuotation,
      transaction,
      singleTax,
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setContent(renderedHtml);
    const pdfBuffer = await page.pdf({ format: "Letter" });
    await browser.close();

    const uniqueId = uuidv4();
    const fileName = `advance_payment_invoice_${uniqueId}.pdf`;
    const s3FilePath = await uploadChatAttachmentToS3(
      process.env.AWS_BUCKET_NAME,
      fileName,
      pdfBuffer
    );
    console.log("Payment Invoice uploaded to S3", s3FilePath);
    transaction.advance_payment_invoice = s3FilePath;

    //Generate PDF for the Order form
    const orderFormTemplatePath = path.resolve(
      "./invoicesTemplates/orderForm.ejs"
    );
    const orderFormHtmlTemplate = fs.readFileSync(
      orderFormTemplatePath,
      "utf8"
    );
    console.log("sellerInfo", transaction.seller_id);
    const orderFormRenderedHtml = ejs.render(orderFormHtmlTemplate, {
      sellerInfo: quotation.seller_id,
      buyerInfo: quotation.customer_id,
      process: transaction.process_id,
      quotation: formattedQuotation,
      transaction,
      singleTax,
    });

    const orderFormBrowser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const orderFormPage = await orderFormBrowser.newPage();
    await orderFormPage.setCacheEnabled(false);
    await orderFormPage.setContent(orderFormRenderedHtml);
    const orderFormPdfBuffer = await orderFormPage.pdf({ format: "Letter" });
    await orderFormBrowser.close();

    const orderFormFileName = `order_form_${uniqueId}.pdf`;
    const orderFormS3FilePath = await uploadChatAttachmentToS3(
      process.env.AWS_BUCKET_NAME,
      orderFormFileName,
      orderFormPdfBuffer
    );

    console.log("Order Form PDF uploaded to S3:", orderFormS3FilePath);
    transaction.order_form = orderFormS3FilePath;

    await transaction.save();

    return res.status(201).json({
      message: "Advance payment invoice generated successfully",
      invoicePath: s3FilePath,
      orderFormPath: orderFormS3FilePath,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error generating advance payment invoice",
      error: error.message,
    });
  }
};

export const cancelOrder = async (req, res) => {
  const { transactionId } = req.body;
  console.log("************", transactionId);
  if (!transactionId) {
    return res.status(400).json({ message: "Transaction ID is required." });
  }
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    if (!transaction.contract_agree && !transaction.orderer_agree) {
      return res.status(400).json({
        message: "Either contract_agree or orderer_agree must be true.",
      });
    }
    const cancellationStatus = transaction.paymentDeposit ? 5 : 7; // 5: REFUND, 7: TRANSACTION_CANCELLED
    // Define tax value
    let taxValue = transaction.tax || 10; // Use transaction.tax if available, otherwise use 10 as a dummy value
    const notification = new Notification({
      user_id: transaction.seller_id, // Assuming seller_id is the ID of the seller associated with the transaction
      notificationTitle: "Order Cancellation Request",
      description: `Order with ID  has been requested for cancellation.`,
      creator_id: req.user.id, // Assuming req.user._id is the ID of the user initiating the cancellation
      transaction_id: transaction._id,
    });

    await notification.save();

    // Generate a unique order_return_id
    const orderReturnId = new mongoose.Types.ObjectId(
      transaction.contractor_id
    );
    const orderHistoryEntry = new OrderHistory({
      order_number: new mongoose.Types.ObjectId(transaction._id),
      contractor_id: new mongoose.Types.ObjectId(transaction.contractor_id),
      orderer_id: req.user._id,
      order_date: transaction.order_date,
      order_status: cancellationStatus,
      create_date: new Date(),
      del_flg: 0,
      // Add other fields as needed
    });
    if (transaction.paymentDeposit) {
      orderHistoryEntry.order_cancel_flag = true;
    }

    await orderHistoryEntry.save();

    res.status(200).json({
      message: "Order cancellation processed successfully.",
      orderHistoryEntry,
    });
  } catch (error) {
    console.error("Error during order cancellation:", error);
    res.status(500).json({
      message: "Error processing order cancellation",
      error: error.message,
    });
  }
};

export const acceptCancellation = async (req, res) => {
  const { transactionId } = req.body;
  const transactionObjectId = new mongoose.Types.ObjectId(transactionId);
  if (!transactionId) {
    return res.status(400).json({ message: "Transaction ID is required." });
  }
  try {
    const transaction = await Transaction.findById(transactionObjectId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    const cancellationStatus = transaction.paymentDeposit ? 4 : 7; // 4: REFUND, 7: TRANSACTION_CANCELLED
    transaction.cancellationStatus = cancellationStatus; // Update the transaction's cancellation status

    await transaction.save();

    const orderHistoryEntry = await OrderHistory.findOne({
      order_number: transactionObjectId,
    });

    if (transaction.paymentDeposit) {
      // Assuming OrderHistory is an instance that needs updating
      orderHistoryEntry.accept_cancel_flag = true;
      await orderHistoryEntry.save(); // Save the updated OrderHistory
    }

    res.status(200).json({
      message: "Cancellation request accepted successfully.",
      orderHistoryEntry,
    });
  } catch (error) {
    console.error("Error accepting cancellation request:", error);
    res.status(500).json({
      message: "Error accepting cancellation request",
      error: error.message,
    });
  }
};

export const requestRefund = async (req, res) => {
  const { transactionId } = req.body;
  const transactionObjectId = new mongoose.Types.ObjectId(transactionId);
  if (!transactionId) {
    return res.status(400).json({ message: "Transaction ID is required." });
  }

  try {
    const transaction = await Transaction.findById(transactionObjectId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    const cancellationStatus = transaction.paymentDeposit ? 4 : 7; // 4: REFUND, 7: TRANSACTION_CANCELLED
    transaction.cancellationStatus = cancellationStatus; // Update the transaction's cancellation status

    await transaction.save();

    const orderHistoryEntry = await OrderHistory.findOne({
      order_number: transactionObjectId,
    });

    if (transaction.paymentDeposit && orderHistoryEntry.accept_cancel_flag) {
      // Assuming OrderHistory is an instance that needs updating
      orderHistoryEntry.request_refund_flag = true;
      await orderHistoryEntry.save(); // Save the updated OrderHistory
    }

    res.status(200).json({
      message: "Cancellation request accepted successfully.",
      orderHistoryEntry,
    });
  } catch (error) {
    console.error("Error accepting cancellation request:", error);
    res.status(500).json({
      message: "Error accepting cancellation request",
      error: error.message,
    });
  }
};

export const agreeRefundTerms = async (req, res) => {
  const { transactionId } = req.body;
  const transactionObjectId = new mongoose.Types.ObjectId(transactionId);
  if (!transactionId) {
    return res.status(400).json({ message: "Transaction ID is required." });
  }

  try {
    const transaction = await Transaction.findById(transactionObjectId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    const cancellationStatus = transaction.paymentDeposit ? 4 : 7; // 4: REFUND, 7: TRANSACTION_CANCELLED
    transaction.cancellationStatus = cancellationStatus; // Update the transaction's cancellation status

    await transaction.save();

    const orderHistoryEntry = await OrderHistory.findOne({
      order_number: transactionObjectId,
    });

    if (
      transaction.paymentDeposit &&
      orderHistoryEntry.accept_cancel_flag &&
      orderHistoryEntry.request_refund_flag
    ) {
      // Assuming OrderHistory is an instance that needs updating
      orderHistoryEntry.refund_agree_flag = true;
      orderHistoryEntry.refund_completed_flag = true;
      await orderHistoryEntry.save(); // Save the updated OrderHistory
    }

    res.status(200).json({
      message: "Cancellation request accepted successfully.",
      orderHistoryEntry,
    });
  } catch (error) {
    console.error("Error accepting cancellation request:", error);
    res.status(500).json({
      message: "Error accepting cancellation request",
      error: error.message,
    });
  }
};

export const getorderHistory = async (req, res) => {
  try {
    const { transactionId } = req.params;
    console.log("getorderHistory", transactionId);

    const transactionObjectId = new mongoose.Types.ObjectId(transactionId);

    const history = await OrderHistory.findOne({
      order_number: transactionObjectId,
    });
    if (!history) {
      return res.status(404).json({ message: "Order history not found." });
    }
    res.status(200).json({ history });
  } catch (error) {
    console.error("Error retrieving order history:", error);
    res.status(500).json({
      message: "Error retrieving order history",
      error: error.message,
    });
  }
};

export const getTransactionStatusCounts = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { role } = req.body;
    if (role === "buyer") {
      const allTransactions = await Transaction.find({ customer_id: userId });
      const allCount = allTransactions.length;
      const allObj = {
        status: 10,
        count: allCount,
      };
      const transactionsByStatus = await Promise.all(
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (status) => {
          const count = await Transaction.countDocuments({
            customer_id: userId,
            transaction_status: status,
          });
          return { status, count };
        })
      );
      const allStatusCountInfo = [allObj, ...transactionsByStatus];
      return res.status(200).json({ countInfo: allStatusCountInfo });
    }
    if (role === "seller") {
      const allTransactions = await Transaction.find({ seller_id: userId });
      const allCount = allTransactions.length;
      const allObj = {
        status: 10,
        count: allCount,
      };
      const transactionsByStatus = await Promise.all(
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (status) => {
          const count = await Transaction.countDocuments({
            seller_id: userId,
            transaction_status: status,
          });
          return { status, count };
        })
      );
      const allStatusCountInfo = [allObj, ...transactionsByStatus];
      return res.status(200).json({ countInfo: allStatusCountInfo });
    }
  } catch (error) {
    console.error("Error getting transaction status counts:", error);
    return res.status(500).json({
      message: "Error getting transaction status counts",
      error: error.message,
    });
  }
};

export const calculateAverageReview = async (req, res) => {
  try {
    const { review, remarks } = req.body;
    const processId = req.params.processId; // Assuming you are passing processId as a parameter

    // Fetch existing process
    const process = await DtbProcess.findById(processId);

    if (!process) {
      return res
        .status(404)
        .json({ success: false, error: "Process not found" });
    }

    // Calculate the new average review
    let totalReview = process.review || 0;
    let totalReviews = process.review ? 1 : 0;

    if (review) {
      totalReview += review;
      totalReviews++;
    }

    const averageReview = totalReview / totalReviews;

    // Save the new review and remarks
    process.review = averageReview;
    if (remarks) {
      process.remarks_column = remarks;
    }
    await process.save();

    res.status(200).json({
      success: true,
      averageReview,
      remarks: process.remarks_column,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const setDeliveryStatus = async (req, res) => {
  try {
    const { transactionId, deliveryStatus } = req.body;
    const transaction = await Transaction.findById(transactionId)
      .populate("quotation")
      .populate("seller_id")
      .populate("customer_id");
    transaction.delivery_status = deliveryStatus;

    let totalAmountExcludingTax = 0;
    let taxAmount = 0;
    let totalAmountIncludingTax = 0;
    const formattedQuotation = transaction.quotation.map((item) => {
      const {
        note = "",
        totalamountExcludingTax,
        taxAmount: itemTaxAmount,
        totalAmountIncludingTax: itemTotalAmountIncludingTax,
        deadline,
      } = item;

      totalAmountExcludingTax = totalamountExcludingTax;
      taxAmount = itemTaxAmount;
      totalAmountIncludingTax = itemTotalAmountIncludingTax;

      return {
        drawing_number: item.drawing_number,
        item_name: item.item_name,
        deadline: new Date(item.deadline),
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        price: item.price,
        note,
        totalamountExcludingTax,
        taxAmount,
        totalAmountIncludingTax,
        deadline,
      };
    });

    if (deliveryStatus === 1) {
      const deliveryTemplatePath = path.resolve(
        "./invoicesTemplates/deliverySlip.ejs"
      );
      const deliveryHtmlTemplate = fs.readFileSync(
        deliveryTemplatePath,
        "utf8"
      );
      const deliveryRenderedHtml = ejs.render(deliveryHtmlTemplate, {
        sellerInfo: transaction.seller_id,
        buyerInfo: transaction.customer_id,
        quotation: formattedQuotation,
        transaction,
      });

      const deliveryBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const deliveryPage = await deliveryBrowser.newPage();
      await deliveryPage.setCacheEnabled(false);
      await deliveryPage.setContent(deliveryRenderedHtml);
      const deliveryPdfBuffer = await deliveryPage.pdf({ format: "Letter" });
      await deliveryBrowser.close();

      const deliveryUniqueId = uuidv4();
      const deliveryFileName = `delivery_slip_${deliveryUniqueId}.pdf`;
      const delivery3FilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        deliveryFileName,
        deliveryPdfBuffer
      );
      console.log("Delivery Slip uploaded to S3", delivery3FilePath);
      transaction.delivery_slip = delivery3FilePath;

      const receiptTemplatePath = path.resolve(
        "./invoicesTemplates/receipt.ejs"
      );
      const receiptHtmlTemplate = fs.readFileSync(receiptTemplatePath, "utf8");
      const receiptRenderedHtml = ejs.render(receiptHtmlTemplate, {
        sellerInfo: transaction.seller_id,
        buyerInfo: transaction.customer_id,
        quotation: formattedQuotation,
        transaction,
      });
      const receiptBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const receiptPage = await receiptBrowser.newPage();
      await receiptPage.setCacheEnabled(false);
      await receiptPage.setContent(receiptRenderedHtml);
      const receiptPdfBuffer = await receiptPage.pdf({ format: "Letter" });
      await receiptBrowser.close();

      const receiptUniqueId = uuidv4();
      const receiptFileName = `receipt_${receiptUniqueId}.pdf`;
      const receipt3FilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        receiptFileName,
        receiptPdfBuffer
      );
      console.log("Receipt uploaded to S3", receipt3FilePath);
      transaction.Receipt = receipt3FilePath;
      transaction.transaction_status = 4;
      await transaction.save();
      return res.status(200).json({
        message: "Delivery status updated",
        deliverySlipPath: delivery3FilePath,
        receiptPath: receipt3FilePath,
      });
    }
    if (deliveryStatus === 2) {
      transaction.transaction_status = 3;
      await transaction.save();
      return res.status(200).json({ message: "Delivery status updated" });
    }
    if (deliveryStatus === 3) {
      const AcceptanceTemplatePath = path.resolve(
        "./invoicesTemplates/acceptanceLetter.ejs"
      );
      const AcceptanceHtmlTemplate = fs.readFileSync(
        AcceptanceTemplatePath,
        "utf8"
      );
      const AcceptanceRenderedHtml = ejs.render(AcceptanceHtmlTemplate, {
        sellerInfo: transaction.seller_id,
        buyerInfo: transaction.customer_id,
        quotation: formattedQuotation,
        transaction,
      });

      const AcceptanceBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const AcceptancePage = await AcceptanceBrowser.newPage();
      await AcceptancePage.setCacheEnabled(false);
      await AcceptancePage.setContent(AcceptanceRenderedHtml);
      const AcceptancePdfBuffer = await AcceptancePage.pdf({
        format: "Letter",
      });
      await AcceptanceBrowser.close();

      const AcceptanceUniqueId = uuidv4();
      const AcceptanceFileName = `acceptance_letter_${AcceptanceUniqueId}.pdf`;
      const AcceptanceFilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        AcceptanceFileName,
        AcceptancePdfBuffer
      );
      console.log("Acceptance Letter uploaded to S3", AcceptanceFilePath);
      transaction.acceptance_letter = AcceptanceFilePath;

      const transactionInvoiceTemplatePath = path.resolve(
        "./invoicesTemplates/transactionInvoice.ejs"
      );
      const transactionInvoiceHtmlTemplate = fs.readFileSync(
        transactionInvoiceTemplatePath,
        "utf8"
      );
      const transactionInvoiceRenderedHtml = ejs.render(
        transactionInvoiceHtmlTemplate,
        {
          sellerInfo: transaction.seller_id,
          buyerInfo: transaction.customer_id,
          quotation: formattedQuotation,
          transaction,
        }
      );

      const transactionInvoiceBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const transactionInvoicePage = await transactionInvoiceBrowser.newPage();
      await transactionInvoicePage.setCacheEnabled(false);
      await transactionInvoicePage.setContent(transactionInvoiceRenderedHtml);
      const transactionInvoicePdfBuffer = await transactionInvoicePage.pdf({
        format: "Letter",
      });
      await transactionInvoiceBrowser.close();

      const transactionInvoiceUniqueId = uuidv4();
      const transactionInvoiceFileName = `transaction_invoice_${transactionInvoiceUniqueId}.pdf`;
      const transactionInvoiceFilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        transactionInvoiceFileName,
        transactionInvoicePdfBuffer
      );
      console.log(
        "Transaction Invoice uploaded to S3",
        transactionInvoiceFilePath
      );
      transaction.transaction_invoice = transactionInvoiceFilePath;

      const systemFeeTemplatePath = path.resolve(
        "./invoicesTemplates/systemFee.ejs"
      );
      const systemFeeHtmlTemplate = fs.readFileSync(
        systemFeeTemplatePath,
        "utf8"
      );
      const systemFeeRenderedHtml = ejs.render(systemFeeHtmlTemplate, {
        sellerInfo: transaction.seller_id,
        buyerInfo: transaction.customer_id,
        quotation: formattedQuotation,
        transaction,
      });

      const systemFeeBrowser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const systemFeePage = await systemFeeBrowser.newPage();
      await systemFeePage.setCacheEnabled(false);
      await systemFeePage.setContent(systemFeeRenderedHtml);
      const systemFeePdfBuffer = await systemFeePage.pdf({ format: "Letter" });
      await systemFeeBrowser.close();

      const systemFeeUniqueId = uuidv4();
      const systemFeeFileName = `system_fee_${systemFeeUniqueId}.pdf`;
      const systemFeeFilePath = await uploadChatAttachmentToS3(
        process.env.AWS_BUCKET_NAME,
        systemFeeFileName,
        systemFeePdfBuffer
      );
      console.log("System Fee uploaded to S3", systemFeeFilePath);
      transaction.system_fee_invoice = systemFeeFilePath;
      transaction.transaction_status = 8;
      await transaction.save();
      return res.status(200).json({
        message: "Delivery status updated",
        acceptanceLetterPath: AcceptanceFilePath,
        transactionInvoicePath: transactionInvoiceFilePath,
        systemFeePath: systemFeeFilePath,
      });
    }
    return res.status(200).json({ message: "Delivery status updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const setRefundStatus = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    if (req.user.id.toString() === transaction.customer_id.toString()) {
      transaction.initiateRefund.generatedBy = "buyer";
    } else {
      transaction.initiateRefund.generatedBy = "seller";
    }
    transaction.initiateRefund.IsTrue = true;
    await transaction.save();
    return res
      .status(200)
      .json({ message: "Refund status updated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
