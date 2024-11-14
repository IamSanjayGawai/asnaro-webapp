import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import Member from "../models/Member.js";
import User from "../models/User.js";
import LimitAmount from "../models/LimitAmount.js";
import Tax from "../models/Tax.js";
import Dtb_process from "../models/Dtb_process.js";
import mongoose from "mongoose";
import Enquiry from "../models/Enquiry.js";
import csv from "fast-csv";
import News from "../models/News.js";
import { uploadBase64ImageToS3, deleteImageFromS3 } from "../aws.js";
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import DefaultUsage from "../models/DefaultUsage.js";
import Transaction from "../models/Transaction.js";
import Category from "../models/Category.js";
import Quote from "../models/Quote.js";
import { generateUniqueNumericId } from "../utils/numericUuidConverter.js";
import CommercialTRansactionAct from "../models/CommercialTRansactionAct.js";
import MailTemplate from "../models/Mail_Template.js";
import Payment from "../models/Dtb_payment.js";
import DtbAvailability from "../models/Availibility.js";
import path, { parse } from "path";
import fs from "fs";
import ejs from "ejs";
import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";
import { uploadChatAttachmentToS3 } from "../aws.js";
import { statusSwitchToText } from "../utils/statusSwitch.js";
import { formatIndianNumber, parseIndianNumber } from "../utils/formats.js";

const bucketName = process.env.AWS_BUCKET_NAME;

const unescapeHtml = (safe) => {
  return safe
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};

// Get all admins
export const getAllAdmin = async (req, res) => {
  try {
    const admins = await Member.find({ role: "admin" });
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create an admin
export const createAdmin = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Member.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newAdmin = new Member({
      name,
      email,
      password, // This is the plain text password; hashing will happen during save.
      authority: 1,
      role: "admin",
    });

    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req.body admin:", req.body);
    const user = await Member.findOne({ email });
    console.log("User:", user);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Ensure that the user is an admin and del_flag is 0
    if (user.role !== "admin" || user.del_flg !== 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const applyForPartner = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have the user ID from the JWT token
    console.log("***", userId);
    // Find the user by ID
    const user = await Member.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user already has partner_flag set to true
    if (user.partner_flag) {
      return res
        .status(400)
        .json({ error: "User has already applied for partner status" });
    }

    // Set partner_flag to true
    user.partner_flag = true;

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: "Application for partner status submitted successfully",
    });
  } catch (error) {
    console.error("Error applying for partner status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all admins
export const getAllPartners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const startIndex = (page - 1) * limit;

    const totalDocuments = await User.countDocuments({
      partner_flg: false,
    });

    const partners = await User.find({
      partner_flg: false,
    });

    let sortedPartnersAccordingToPartnerRequest = partners.filter(
      (partner) => partner.partner_request_time
    );
    if (sortedPartnersAccordingToPartnerRequest.length > 0) {
      sortedPartnersAccordingToPartnerRequest.sort((a, b) => {
        return (
          new Date(b.partner_request_time) - new Date(a.partner_request_time)
        );
      });
    }

    let sortedPartnersAccordingToCreationTime = partners.filter(
      (partner) => !partner.partner_request_time && partner.createdAt
    );
    if (sortedPartnersAccordingToCreationTime.length > 0) {
      sortedPartnersAccordingToCreationTime.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    const sortedPartners = [
      ...sortedPartnersAccordingToPartnerRequest,
      ...sortedPartnersAccordingToCreationTime,
    ];

    const paginatedPartners = sortedPartners.slice(
      startIndex,
      startIndex + limit
    );

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
    };

    res.status(200).json({ partners: paginatedPartners, pagination });
  } catch (error) {
    console.error("Error fetching partners:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const adminUpdateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       profile_img,
//       img1,
//       img2,
//       img3,
//       no_profile_pic,
//       no_img1,
//       no_img2,
//       no_img3,
//       ...otherUserData
//     } = req.body;
//     console.log("req.body adminUpdateUser:", req.body);
//     const imgUrls = await Promise.all([
//       profile_img &&
//         uploadBase64ImageToS3(
//           profile_img,
//           bucketName,
//           `profile_img-${crypto.randomBytes(8).toString("hex")}.png`
//         ),
//       img1 &&
//         uploadBase64ImageToS3(
//           img1,
//           bucketName,
//           `img1-${crypto.randomBytes(8).toString("hex")}.png`
//         ),
//       img2 &&
//         uploadBase64ImageToS3(
//           img2,
//           bucketName,
//           `img2-${crypto.randomBytes(8).toString("hex")}.png`
//         ),
//       img3 &&
//         uploadBase64ImageToS3(
//           img3,
//           bucketName,
//           `img3-${crypto.randomBytes(8).toString("hex")}.png`
//         ),
//     ]);

//     console.log(imgUrls, "imgUrls");

//     const foundUser = await User.findByIdAndUpdate(
//       id,
//       {
//         ...otherUserData,
//       },
//       {
//         new: true,
//       }
//     );

//     if (!foundUser) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: false,
//         message: "Admin-User not found",
//       });
//     }

//     if (profile_img) {
//       await deleteImageFromS3(foundUser.profile_img);
//       foundUser.profile_img = imgUrls[0];
//     } else if (no_profile_pic === "true") {
//       //delete old image from s3
//       foundUser.profile_img = null;
//     }

//     if (img1) {
//       await deleteImageFromS3(foundUser.img1);
//       //delete old image from s3
//       foundUser.img1 = imgUrls[1];
//     } else if (no_img1 === "true") {
//       //delete old image from s3
//       foundUser.img1 = null;
//     }

//     if (img2) {
//       await deleteImageFromS3(foundUser.img2);
//       //delete old image from s3
//       foundUser.img2 = imgUrls[2];
//     } else if (no_img2 === "true") {
//       //delete old image from s3
//       foundUser.img2 = null;
//     }

//     if (img3) {
//       await deleteImageFromS3(foundUser.img3);
//       //delete old image from s3
//       foundUser.img3 = imgUrls[3];
//     } else if (no_img3 === "true") {
//       //delete old image from s3
//       foundUser.img3 = null;
//     }

//     await foundUser.save();

//     return res.status(StatusCodes.OK).json({
//       success: true,
//       message: "Admin-User updated successfully",
//       user: foundUser,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const adminUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      profile_img,
      img1,
      img2,
      img3,
      no_profile_pic,
      no_img1,
      no_img2,
      no_img3,
      ...otherUserData
    } = req.body;

    console.log("req.body adminUpdateUser:", req.body);

    // Find the user first to get the current image URLs
    const foundUser = await User.findById(id);

    if (!foundUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Admin-User not found",
      });
    }

    // Upload new images if provided
    const imgUrls = await Promise.all([
      profile_img &&
        uploadBase64ImageToS3(
          profile_img,
          bucketName,
          `profile_img-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img1 &&
        uploadBase64ImageToS3(
          img1,
          bucketName,
          `img1-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img2 &&
        uploadBase64ImageToS3(
          img2,
          bucketName,
          `img2-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img3 &&
        uploadBase64ImageToS3(
          img3,
          bucketName,
          `img3-${crypto.randomBytes(8).toString("hex")}.png`
        ),
    ]);

    console.log(imgUrls, "imgUrls");

    // Handle profile_img
    if (profile_img) {
      if (foundUser?.profile_img) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.profile_img);
      }
      console.log("profile image reached");
      foundUser.profile_img = imgUrls[0];
    } else if (no_profile_pic === "true") {
      if (foundUser?.profile_img) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.profile_img);
      }
      console.log("profile image reached 2");
      foundUser.profile_img = null;
    }

    // Handle img1
    if (img1) {
      if (foundUser?.img1) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img1);
      }
      console.log(" image1 reached");

      foundUser.img1 = imgUrls[1];
    } else if (no_img1 === "true") {
      if (foundUser?.img1) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img1);
      }
      console.log(" image1 null reached");

      foundUser.img1 = null;
    }

    // Handle img2
    if (img2) {
      if (foundUser?.img2) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img2);
      }
      foundUser.img2 = imgUrls[2];
    } else if (no_img2 === "true") {
      if (foundUser?.img2) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img2);
      }
      foundUser.img2 = null;
    }

    // Handle img3
    if (img3) {
      if (foundUser.img3) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img3);
      }
      foundUser.img3 = imgUrls[3];
    } else if (no_img3 === "true") {
      if (foundUser.img3) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img3);
      }
      foundUser.img3 = null;
    }

    // Update other user data
    Object.assign(foundUser, otherUserData);

    // Save the updated user
    await foundUser.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Admin-User updated successfully",
      user: foundUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllApprovedPartners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const totalDocuments = await User.countDocuments();
    const users = await User.find();

    let sortedUsersAccordingToPartnerRequest = users.filter(
      (user) => user.partner_request_time
    );
    if (sortedUsersAccordingToPartnerRequest.length > 0) {
      sortedUsersAccordingToPartnerRequest.sort((a, b) => {
        return (
          new Date(b.partner_request_time) - new Date(a.partner_request_time)
        );
      });
    }

    let sortedUsersAccordingToCreationTime = users.filter(
      (user) => !user.partner_request_time && user.createdAt
    );
    if (sortedUsersAccordingToCreationTime.length > 0) {
      sortedUsersAccordingToCreationTime.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    const sortedUsers = [
      ...sortedUsersAccordingToPartnerRequest,
      ...sortedUsersAccordingToCreationTime,
    ];

    console.log(
      "Sorted Users:",
      sortedUsers.map((user) => {
        return {
          name: user.name01,
          partner_flg: user.partner_flg,
          partner_status: user.partner_status,
          partner_request_time: user.partner_request_time,
          createdAt: user.createdAt,
        };
      })
    );

    const paginatedUsers = sortedUsers.slice(startIndex, startIndex + limit);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
    };

    res
      .status(200)
      .json({ users: paginatedUsers, pagination, csvPartners: sortedUsers });
  } catch (error) {
    console.error("Error fetching partners:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllComponies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Parse the page query parameter

    const totalDocuments = await User.countDocuments({});

    const partners = await User.find({});

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / page),
    };

    res.status(200).json({ partners, pagination });
  } catch (error) {
    console.error("Error fetching partners:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const applyRemoveForPartner = async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log("***", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Toggle the partner flag
    user.partner_flg = !user.partner_flg;

    // Update the partner status based on the toggled flag
    if (user.partner_flg) {
      user.partner_status = "パートナー会員";
    } else {
      user.partner_status = "一般会員";
    }

    user.partner_request_time = null;

    await user.save();

    return res.status(200).json({
      message: "Application for partner status toggled successfully",
    });
  } catch (error) {
    console.error("Error applying for partner status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchProcessAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const { process_id, process_name, status, seller_id, seller_name } =
      req.body;

    const matchConditions = {};

    if (process_id) {
      matchConditions["_id"] = new mongoose.Types.ObjectId(process_id);
    }

    if (process_name) {
      matchConditions["name"] = { $regex: new RegExp(process_name, "i") }; // Case-insensitive search
    }

    if (status) {
      matchConditions["status"] = status;
    }

    const userMatchConditions = {};

    if (seller_id) {
      userMatchConditions["user._id"] = new mongoose.Types.ObjectId(seller_id);
    }

    if (seller_name) {
      userMatchConditions["user.name01"] = {
        $regex: new RegExp(seller_name, "i"),
      };
    }

    const aggregateQuery = [
      { $match: matchConditions },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $match: userMatchConditions },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const csvAggregateQuery = aggregateQuery.slice(0, 5);

    const searchResult = await Dtb_process.aggregate(aggregateQuery);
    const csvResult = await Dtb_process.aggregate(csvAggregateQuery);

    // console.log("searchResult", searchResult);
    // console.log("csvResult", csvResult);

    const processesWithCategoriesAndAvailabilities = await Promise.all(
      searchResult[0].data.map(async (process) => {
        const parent_category = await Category.findOne({
          category_id: process.parent_category,
        });
        const child_category = await Category.findOne({
          category_id: process.child_category,
        });
        const availabilities = await DtbAvailability.findOne({
          process_id: process._id,
        }).select("availability");
        return {
          ...process,
          parent_category: parent_category?.category_name,
          child_category: child_category?.category_name,
          availabilities: availabilities?.availability,
        };
      })
    );

    const csvProcessesWithCategoriesAndAvailabilities = await Promise.all(
      csvResult.map(async (process) => {
        const parent_category = await Category.findOne({
          category_id: process.parent_category,
        });
        const child_category = await Category.findOne({
          category_id: process.child_category,
        });
        const availabilities = await DtbAvailability.findOne({
          process_id: process._id,
        }).select("availability");
        return {
          ...process,
          parent_category: parent_category?.category_name,
          child_category: child_category?.category_name,
          availabilities: availabilities?.availability,
        };
      })
    );

    const sortedProcesses = processesWithCategoriesAndAvailabilities.sort(
      (a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt - a.createdAt;
        }
        if (a.createdAt) {
          return -1;
        }
        if (b.createdAt) {
          return 1;
        }
        return 0;
      }
    );

    const sortedCsvProcesses = csvProcessesWithCategoriesAndAvailabilities.sort(
      (a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt - a.createdAt;
        }
        if (a.createdAt) {
          return -1;
        }
        if (b.createdAt) {
          return 1;
        }
        return 0;
      }
    );

    const totalCount = searchResult[0].totalCount[0]
      ? searchResult[0].totalCount[0].count
      : 0;

    if (totalCount === 0) {
      return res.status(200).json({ count: 0, data: [] });
    }

    return res.status(200).json({
      count: totalCount,
      data: sortedProcesses,
      pagination: {
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        totalProcesses: totalCount,
      },
      sortedCsvProcesses,
    });
  } catch (error) {
    console.log("Error searching for process:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTransactionDetailsAdmin = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.findById(transactionId)
      .populate("quotation")
      .populate("process_id")
      .populate("customer_id")
      .populate("seller_id");
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    const paymentType = await Payment.findOne({
      transactionId,
    }).select("paymentType createdAt");
    console.log("Payment Type:", paymentType);
    return res.status(200).json({
      transaction,
      paymentType: paymentType ? paymentType.paymentType : "Payment Not Done",
      createdAt: paymentType && paymentType.createdAt,
    });
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchTransactionForAdminView = async (req, res) => {
  try {
    const { transactionId } = req.params;
    console.log("Transaction ID:", transactionId);
    const transaction = await Transaction.findById(transactionId)
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
        id: transaction?.customer_id?._id,
        name: transaction?.customer_id?.name01,
        pic: transaction?.customer_id?.profile_img,
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

export const orderSearchAdmin = async (req, res) => {
  try {
    const {
      transactionId,
      sellerId,
      sellerName,
      buyerId,
      buyerName,
      status,
      processName,
      startDate,
      endDate,
      pageSize,
    } = req.body;
    const page = parseInt(req.query.page) || 1;

    let dbQuery = {};

    if (transactionId) {
      dbQuery._id = transactionId;
    }
    if (sellerId) {
      dbQuery.seller_id = sellerId;
    }
    if (buyerId) {
      dbQuery.customer_id = buyerId;
    }
    if (status) {
      switch (status) {
        case "商談中":
          dbQuery.transaction_status = 1;
          break;
        case "受発注待ち":
          dbQuery.transaction_status = 2;
          break;
        case "納品待ち":
          dbQuery.transaction_status = 3;
          break;
        case "検収中":
          dbQuery.transaction_status = 4;
          break;
        case "差戻し":
          dbQuery.transaction_status = 5;
          break;
        case "取引完了":
          dbQuery.transaction_status = 6;
          break;
        case "キャンセル":
          dbQuery.transactionStatus = 7;
          break;
        case "決済完了":
          dbQuery.transactionStatus = 8;
          break;
        default:
          dbQuery.transactionStatus = status;
          break;
      }
    }
    if (processName) {
      dbQuery.process_name = { $regex: `${processName}`, $options: "i" };
    }
    if (startDate) {
      dbQuery.createdAt = { $gte: new Date(startDate) };
      if (endDate) {
        dbQuery.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }
    }
    if (endDate) {
      dbQuery.createdAt = { $lte: new Date(endDate) };
      if (startDate) {
        dbQuery.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }
    }

    const nameQueries = [];
    if (sellerName) {
      const sellers = await User.find({
        name01: { $regex: `${sellerName}`, $options: "i" },
      }).select("_id");
      const sellerIds = sellers.map((user) => user._id);
      nameQueries.push({ seller_id: { $in: sellerIds } });
    }
    if (buyerName) {
      const buyers = await User.find({
        name01: { $regex: `${buyerName}`, $options: "i" },
      }).select("_id");
      const buyerIds = buyers.map((user) => user._id);
      nameQueries.push({ customer_id: { $in: buyerIds } });
    }
    if (nameQueries.length > 0) {
      dbQuery.$or = nameQueries;
    }

    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const [transactions, totalResults] = await Promise.all([
      Transaction.find(dbQuery).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Transaction.countDocuments(dbQuery),
    ]);

    const csvTransactions = await Transaction.find(dbQuery).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      count: totalResults,
      data: transactions,
      pagination: {
        totalPages: Math.ceil(totalResults / pageSize),
        currentPage: page,
        totalTransactions: totalResults,
      },
      csvTransactions,
    });
  } catch (error) {
    console.error("Error searching for orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changeTransactionDetailsAdmin = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { transaction_status, prevStatus } = req.body;
    const transaction = await Transaction.findById(transactionId)
      .populate("quotation")
      .populate({
        path: "seller_id",
        select: "name01 name02 zip01 zip02 pref addr01 addr02 business_id",
      })
      .populate("customer_id")
      .populate("process_id");

    console.log("prevStatus", prevStatus);
    console.log("transaction_status", transaction_status);

    if (transaction_status === 3 && prevStatus === 2) {
      const tax = await Tax.find({});
      if (tax.length === 0) return res.status(200).json({ tax: { rate: 10 } });
      const singleTax = tax ? tax[0].rate : null;
      let totalAmountExcludingTax = 0;
      let taxAmount = 0;
      let totalAmountIncludingTax = 0;

      const formattedQuotation = transaction?.quotation?.map((item) => {
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

      // Generate PDF for the payment invoice
      const templatePath = path.resolve(
        "./invoicesTemplates/advancePayment.ejs"
      );
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
        sellerInfo: transaction?.seller_id,
        buyerInfo: transaction?.customer_id,
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
      transaction.paymentDeposit = true;
    }
    if (transaction_status === 3 && prevStatus !== 2) {
      transaction.delivery_status = 2;
    }
    if (transaction_status === 9) {
      transaction.tradingEndDate = new Date();
    }
    transaction.transaction_status = transaction_status;
    await transaction.save();
    return res.status(200).json({
      message: "Transaction details updated successfully",
    });
  } catch (error) {
    console.log("Error updating transaction details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllOrdersAdmin = async (req, res) => {
  try {
    const { pageSize } = req.body;
    const page = parseInt(req.query.page) || 1;

    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const [transactions, totalResults] = await Promise.all([
      Transaction.find().skip(skip).limit(limit),
      Transaction.countDocuments(),
    ]);

    return res.status(200).json({
      count: totalResults,
      data: transactions,
      pagination: {
        totalPages: Math.ceil(totalResults / pageSize),
        currentPage: page,
        totalTransactions: totalResults,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const companyInfoListSearch = async (req, res) => {
  try {
    const {
      company_Id,
      company_name,
      representative_name,
      person_incharge_name,
      email,
      phone,
    } = req.body;
    const page = parseInt(req.query.page) || 1;

    let dbQuery = {};

    if (company_Id) {
      dbQuery._id = company_Id;
    }
    if (email) {
      dbQuery.email = email;
    }
    if (phone) {
      dbQuery.tele01 = phone;
    }

    // if (processName) {
    //   dbQuery.process_name = { $regex: `${processName}`, $options: "i" };
    // }

    if (company_name) {
      dbQuery.name01 = { $regex: `${company_name}`, $options: "i" };
    }

    if (representative_name) {
      dbQuery.delegate_name01 = {
        $regex: `${representative_name}`,
        $options: "i",
      };
    }

    if (person_incharge_name) {
      dbQuery.charge_name01 = {
        $regex: `${person_incharge_name}`,
        $options: "i",
      };
    }

    console.log(dbQuery, ".....");

    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [componyLits, totalResults] = await Promise.all([
      User.find(dbQuery).skip(skip).limit(limit).sort({ createdAt: -1 }),
      User.countDocuments(dbQuery),
    ]);

    const csvUsers = await User.find(dbQuery).sort({ createdAt: -1 });

    return res.status(200).json({
      count: totalResults,
      data: componyLits,
      pagination: {
        totalPages: Math.ceil(totalResults / limit),
        currentPage: page,
        totalTransactions: totalResults,
      },
      csvUsers,
    });
  } catch (error) {
    console.error("Error searching for orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const applyForPartnerAdminSide = async (req, res) => {
  try {
    console.log(req.body, "....");

    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "No user found",
      });
    }
    user.partner_flg = true;
    await user.save();
    return res.status(200).json({
      user,
      message: "Application for partner status submitted successfully",
    });
  } catch (error) {
    console.log("Error applying for partner status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllinquiriesAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    const total = await Enquiry.countDocuments();

    const inquiries = await Enquiry.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: -1 });

    const csvInquiries = await Enquiry.find();

    const pagination = {
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      inquiries,
      csvInquiries,
    };

    if (inquiries.length === 0) {
      return res.status(404).json({ message: "No inquiries found" });
    }

    return res.status(200).json(pagination);
  } catch (error) {
    console.log("Error fetching inquiries:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteEnquiryAdmin = async (req, res) => {
  try {
    const inquiries = await Enquiry.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const downloadCSVofProcessList = async (req, res) => {
  try {
    const {
      process_ids,
      formType,
      partner_Ids,
      notice_ids,
      order_Ids,
      company_infoIds,
    } = req.body;
    console.log(process_ids, partner_Ids, "::::::::::::::::::::::");

    let csvData = [];
    let csvString = "";
    let filename = "";

    if (formType === "process-list") {
      let searchResult;

      if (process_ids && Array.isArray(process_ids)) {
        searchResult = await Dtb_process.find({ _id: { $in: process_ids } });
      } else {
        searchResult = await Dtb_process.find();
      }

      searchResult.forEach((process) => {
        csvData.push({
          工程ID: process._id,
          工程名: process.name,
          出品企業ID: process?.user?._id,
          カテゴリ: process.parent_category,
          タグ: process.tags,
          地域: process.mun,
          ステータス: process.status,
          評価: process.unit_price,
          空き日数: "XXX",
        });
      });

      filename = "process_list.csv";
    } else if (formType === "inquiry") {
      let inquiries;
      console.log(process_ids, "++++++++-+-+-");
      if (process_ids && Array.isArray(process_ids)) {
        inquiries = await Enquiry.find({ _id: { $in: process_ids } });
      } else {
        inquiries = await Enquiry.find();
      }

      inquiries.forEach((inquiry) => {
        csvData.push({
          日時: new Date(inquiry.createdAt),
          氏名: inquiry.name,
          会員ID: inquiry._id,
          メールアドレス: inquiry.email,
          内容: inquiry.message,
        });
      });

      const sortedCsvData = csvData.sort((a, b) => {
        const dateA = a["日時"];
        const dateB = b["日時"];

        if (dateA && dateB) {
          return dateB - dateA;
        }
        if (dateA) {
          return -1;
        }
        if (dateB) {
          return 1;
        }
        return 0;
      });

      csvData = sortedCsvData.map((data) => {
        return {
          ...data,
          日時: data["日時"].toISOString().split("T")[0],
        };
      });

      filename = "inquiry_list.csv";
    } else if (formType === "company_info") {
      let company_info;
      console.log(company_infoIds, "++++++++-+-+-");
      if (company_infoIds && Array.isArray(company_infoIds)) {
        company_info = await User.find({ _id: { $in: company_infoIds } });
      } else {
        company_info = await User.find();
      }

      company_info.forEach((company) => {
        csvData.push({
          企業ID: company._id,
          企業名: company.name01,
          登録日時: new Date(company.createdAt),
          代表者名: company.charge_name01,
          担当者名: company.charge_name02,
        });
      });

      const sortedCsvData = csvData.sort((a, b) => {
        const dateA = new Date(a["登録日時"]);
        const dateB = new Date(b["登録日時"]);

        if (dateA && dateB) {
          return dateB - dateA;
        }
        if (dateA) {
          return -1;
        }
        if (dateB) {
          return 1;
        }
        return 0;
      });

      csvData = sortedCsvData.map((data) => {
        return {
          ...data,
          登録日時: data["登録日時"].toISOString().split("T")[0],
        };
      });

      filename = "company_info.csv";
    } else if (formType === "order_info") {
      order_Ids.forEach((transaction) => {
        csvData.push({
          No: transaction._id,
          発注企業ID: transaction.customer_id,
          受注企業ID: transaction.seller_id,
          工程名: transaction.process_name,
          ステータス: statusSwitchToText(transaction.transaction_status),
          期間: new Date(transaction.createdAt),
        });
      });

      const sortedCsvData = csvData.sort((a, b) => {
        const dateA = new Date(a["期間"]);
        const dateB = new Date(b["期間"]);

        if (dateA && dateB) {
          return dateB - dateA;
        }
        if (dateA) {
          return -1;
        }
        if (dateB) {
          return 1;
        }
        return 0;
      });

      csvData = sortedCsvData.map((data) => {
        return {
          ...data,
          期間: new Date(data["期間"]).toISOString().split("T")[0],
        };
      });

      filename = "order_info.csv";
    } else if (formType === "partner-list") {
      let partners;
      console.log(partner_Ids, "++++++++-+-+-");
      if (partner_Ids && Array.isArray(partner_Ids)) {
        partners = await User.find({ _id: { $in: partner_Ids } });
      } else {
        partners = await User.find();
      }

      // Prepare CSV data
      partners.forEach((partner) => {
        const formattedDate = new Date(partner.createdAt);
        csvData.push({
          パートナー状態: partner.partner_status,
          企業ID: partner._id,
          登録日時: formattedDate,
          "Partner Request Time": partner.partner_request_time
            ? new Date(partner.partner_request_time)
            : "No incoming request",
          企業名: partner.name01,
        });
      });

      // Sort users according to Partner Request Time
      let sortedUsersAccordingToPartnerRequest = csvData.filter(
        (user) => user["Partner Request Time"] !== "No incoming request"
      );

      if (sortedUsersAccordingToPartnerRequest.length > 0) {
        sortedUsersAccordingToPartnerRequest.sort((a, b) => {
          return (
            new Date(b["Partner Request Time"]) -
            new Date(a["Partner Request Time"])
          );
        });
      }

      // Sort users according to Creation Time (only those without a Partner Request Time)
      let sortedUsersAccordingToCreationTime = csvData.filter(
        (user) => user["Partner Request Time"] === "No incoming request"
      );

      if (sortedUsersAccordingToCreationTime.length > 0) {
        sortedUsersAccordingToCreationTime.sort((a, b) => {
          return new Date(b["登録日時"]) - new Date(a["登録日時"]);
        });
      }

      // Combine the sorted arrays
      const sortedCsvData = [
        ...sortedUsersAccordingToPartnerRequest,
        ...sortedUsersAccordingToCreationTime,
      ];

      csvData = sortedCsvData.map((data) => {
        return {
          ...data,
          登録日時: data["登録日時"].toISOString().split("T")[0],
          "Partner Request Time":
            data["Partner Request Time"] !== "No incoming request"
              ? data["Partner Request Time"].toISOString().split("T")[0]
              : "No incoming request",
        };
      });

      filename = "partner_list.csv";
    } else if (formType === "notification") {
      // Logic for downloading CSV of notifications
      let notice;
      console.log(notice_ids, "++++++++-+-+-");
      // Fetch notifications based on notice_ids or any other criteria
      if (notice_ids && Array.isArray(notice_ids)) {
        notice = await News.find({ _id: { $in: notice_ids } });
      } else {
        notice = await News.find();
      }

      // Prepare CSV data
      notice.forEach((notice) => {
        const formattedDate = new Date(notice.createdAt);
        csvData.push({
          配信ONOFF: notice.delivery_flag ? "public" : "private",
          タイトル: notice.news_title,
          本文: notice.news_comment,
          配信日: formattedDate,
        });
      });

      const sortedCsvData = csvData.sort((a, b) => {
        const dateA = a["配信日"];
        const dateB = b["配信日"];

        if (dateA && dateB) {
          return dateB - dateA;
        }
        if (dateA) {
          return -1;
        }
        if (dateB) {
          return 1;
        }
        return 0;
      });

      csvData = sortedCsvData.map((data) => {
        return {
          ...data,
          配信日: data["配信日"].toISOString().split("T")[0],
        };
      });

      filename = "notice.csv";
    } else {
      return res
        .status(400)
        .json({ error: "Invalid formType or missing parameters" });
    }

    // Create a CSV string from the data
    csvString = await csv.writeToString(csvData, { headers: true });

    // Add BOM to the CSV string
    const bom = "\uFEFF";
    csvString = bom + csvString;

    // Set response headers
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Send the CSV data as response
    res.status(200).send(csvString);
  } catch (error) {
    console.error("Error downloading CSV:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req?.params?.id;

    // Check if userId is provided
    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User ID is required",
      });
    }

    const foundUser = await User.findById(userId);

    // Check if user is found
    if (!foundUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User found successfully",
      user: foundUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUsersByIds = async (req, res) => {
  try {
    const users = await User.find({}).select("_id name01");
    return res.status(200).json({ users });
  } catch (error) {
    console.log("Error fetching users by ids:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// create news by admin
export const createNewsAdmin = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const {
      news_title,
      image, // Base64 encoded image data
      news_comment,
      delivery_date,
      delivery_flag,
    } = req.body;

    console.log("image create", image);

    // Upload image to S3 and get the URL
    const imageUrl =
      image &&
      (await uploadBase64ImageToS3(
        image,
        process.env.AWS_BUCKET_NAME,
        `news-img-${crypto.randomBytes(8).toString("hex")}.png`
      ));

    // Create a new News object
    const news = new News({
      news_title,
      image: imageUrl,
      news_comment,
      delivery_date,
      delivery_flag,
      labels: ["重要"],
      // Add other fields as needed
    });

    if (delivery_flag) {
      news.stream_date = new Date();
    }

    // Save the news object to the database
    await news.save({ session });

    // Commit the transaction

    session.endSession();

    // Send a success response
    res.status(201).json({ message: "News added successfully.", news });
  } catch (error) {
    // Rollback the transaction if an error occurs

    session.endSession();

    console.error("Error adding news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update news privacy by admin (toggle isPrivate)
export const updateNewsPrivacyAdmin = async (req, res) => {
  const { id } = req.params; // Assuming id is passed as a URL parameter
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }

  const news_Id = new mongoose.Types.ObjectId(id);
  console.log("News ID:", news_Id);
  try {
    const news = await News.findById(news_Id);

    if (!news) {
      return res.status(404).json({ error: "News not found." });
    }

    news.delivery_flag = !news.delivery_flag;

    if (news.delivery_flag) {
      news.stream_date = new Date();
    }

    if (!news.delivery_flag) {
      news.readBy = [];
    }

    await news.save();

    return res
      .status(200)
      .json({ message: "News privacy updated successfully.", news });
  } catch (error) {
    console.error("Error updating news privacy:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const updateNewsAdmin = async (req, res) => {
//   const session = await mongoose.startSession();
//   try {
//     const { id } = req.params;
//     const {
//       news_title,
//       image,
//       noImage,
//       news_comment,
//       delivery_date,
//       delivery_flag,
//     } = req.body;
//     console.log("image", image);
//     console.log("noImage", noImage);
//     const news = await News.findById(id).session(session);
//     if (!news) {
//       return res.status(404).json({ error: "News not found" });
//     }
//     let imageUrl = news.image;
//     console.log("imageUrl", imageUrl);
//     if (image) {
//       //delete old image from s3
//       imageUrl = await uploadBase64ImageToS3(
//         image,
//         process.env.AWS_BUCKET_NAME,
//         `news-img-${crypto.randomBytes(8).toString("hex")}.png`
//       );
//       console.log("imageUrl uploadBase64ImageToS3", imageUrl);
//     }
//     if (noImage === "true") {
//       //delete old image from s3
//       imageUrl = null;
//     }
//     news.news_title = news_title;
//     news.image = imageUrl;
//     news.news_comment = news_comment;
//     news.delivery_date = delivery_date;
//     news.delivery_flag = delivery_flag;
//     await news.save({ session });
//     session.endSession();
//     res.status(200).json({ message: "News updated successfully." });
//   } catch (error) {
//     session.endSession();
//     console.error("Error updating news:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const updateNewsAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { id } = req.params;
    const {
      news_title,
      image,
      noImage,
      news_comment,
      delivery_date,
      delivery_flag,
    } = req.body;

    const news = await News.findById(id).session(session);
    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    let imageUrl = news.image;
    console.log("imageUrl", imageUrl);

    if (image) {
      // Delete old image from S3 if it exists
      if (imageUrl) {
        await deleteImageFromS3(imageUrl);
      }

      // Upload new image to S3
      imageUrl = await uploadBase64ImageToS3(
        image,
        process.env.AWS_BUCKET_NAME,
        `news-img-${crypto.randomBytes(8).toString("hex")}.png`
      );
      console.log("imageUrl uploadBase64ImageToS3", imageUrl);
    }

    if (noImage === "true") {
      // Delete old image from S3 if it exists
      if (imageUrl) {
        await deleteImageFromS3(imageUrl);
      }
      imageUrl = null;
    }

    news.news_title = news_title;
    news.image = imageUrl;
    news.news_comment = news_comment;
    news.delivery_date = delivery_date;
    news.delivery_flag = delivery_flag;

    await news.save({ session });
    session.endSession();
    res.status(200).json({ message: "News updated successfully." });
  } catch (error) {
    session.endSession();
    console.error("Error updating news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const addTax = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const newTax = new Tax({
//       amount,
//       create_date: new Date(), // Set current date as create_date
//     });

//     await newTax.save();

//     // Send a success response
//     res.status(201).json({ message: "Tax  created successfully" });
//   } catch (error) {
//     // Handle errors
//     console.error("Error creating tax:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const addTax = async (req, res) => {
  try {
    const { taxRate } = req.body;

    if (taxRate === undefined || taxRate === null) {
      return res.status(400).json({ error: "Tax rate is required" });
    }

    const newTax = await Tax.findOneAndUpdate(
      {},
      { rate: taxRate, create_date: new Date() },
      { new: true, upsert: true }
    );
    await newTax.save();
    const activeTransactions = await Transaction.find({
      $or: [
        { transaction_status: 1 },
        { transaction_status: 2 },
        { transaction_status: 3 },
        { transaction_status: 4 },
        { transaction_status: 5 },
      ],
    }).populate("quotation");
    await Promise.all(
      activeTransactions.map(async (transaction) => {
        if (
          transaction.transaction_status === 5 &&
          transaction.refund.taxDetails.totalAmountIncludingTax !== 0
        ) {
          const taxAmount = Math.floor(
            (transaction.refund.taxDetails.totalAmountExcludingTax * taxRate) /
              100
          );
          const totalAmountIncludingTax = Math.floor(
            taxAmount + transaction.refund.taxDetails.totalAmountExcludingTax
          );
          const foundTransaction = await Transaction.findById(transaction._id);
          foundTransaction.refund.taxDetails.adminRefundTax = taxRate;
          foundTransaction.refund.taxDetails.taxAmount = taxAmount;
          foundTransaction.refund.taxDetails.totalAmountIncludingTax =
            totalAmountIncludingTax;
          await foundTransaction.save();
        }
        const quotationIds = transaction.quotation.map((quote) => quote._id);
        const taxAmount = Math.floor(
          (parseIndianNumber(
            transaction.quotation[0]?.totalamountExcludingTax
          ) *
            taxRate) /
            100
        );
        const totalAmountIncludingTax = Math.floor(
          taxAmount +
            parseIndianNumber(transaction.quotation[0]?.totalamountExcludingTax)
        );
        await Transaction.findByIdAndUpdate(transaction._id, {
          adminTax: taxRate,
        });
        const quotations = await Quote.find({
          _id: {
            $in: quotationIds,
          },
        });
        await Promise.all(
          quotations.map(async (quote) => {
            await Quote.findByIdAndUpdate(quote._id, {
              taxAmount: formatIndianNumber(taxAmount),
              totalAmountIncludingTax: formatIndianNumber(
                totalAmountIncludingTax
              ),
            });
          })
        );
      })
    );
    res.status(200).json({ message: "Tax is Updated" });
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};

export const upperAmountLimits = async (req, res) => {
  try {
    const { upperLimit } = req.body;

    if (upperLimit === undefined || upperLimit === null) {
      return res.status(400).json({ message: "amount is required" });
    }

    const upperAmountLimit = await LimitAmount.findOneAndUpdate(
      {},
      { amount: upperLimit, create_date: new Date() },
      { news: true, upsert: true }
    );
    await upperAmountLimit.save();
    res
      .status(200)
      .json({ message: "Upper amount limit created successfully" });
  } catch (error) {
    console.error("Error creating upper amount limit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getupperAmountLimits = async (req, res) => {
  try {
    const upperAmountLimit = await LimitAmount.find({});
    console.log("upperAmountLimit", upperAmountLimit);
    if (!upperAmountLimit) return res.status(200).json({ amount: 1000 });

    const singleAmount = upperAmountLimit ? upperAmountLimit[0].amount : null;
    return res.status(200).json({ amount: singleAmount });
  } catch (error) {
    console.error("Error fetching upper amount limit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTax = async (req, res) => {
  try {
    const tax = await Tax.find({});
    if (tax.length === 0) return res.status(200).json({ tax: { rate: 10 } });
    const singleTax = tax ? tax[0].rate : null;
    return res.status(200).json({ tax: singleTax });
  } catch (error) {
    console.error("Error fetching tax data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateDeliveryFlag = async (req, res) => {
  const { id } = req.params;
  const { delivery_flg } = req.body;

  if (delivery_flg === undefined) {
    return res
      .status(400)
      .json({ message: "The delivery flag update data is missing." });
  }

  try {
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { $set: { delivery_flg } },
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res
        .status(404)
        .json({ message: "News item not found or has been deleted." });
    }

    res.status(200).json({
      data: updatedNews,
      message: "Delivery flag updated successfully.",
    });
  } catch (error) {
    console.error("Failed to update delivery flag:", error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Invalid update data.", details: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createMailTemplate = async (req, res) => {
  const { subject, header, footer, detail, creator_id, shop_id } = req.body;

  try {
    const newTemplate = new MailTemplate({
      subject,
      header,
      footer,
      detail,
      creator_id: creator_id || 2,
      create_date: new Date(),
      update_date: new Date(),
      shop_id: shop_id || 0,
    });

    const savedTemplate = await newTemplate.save();

    return res.status(201).json({
      success: true,
      message: "Email template created successfully",
      data: savedTemplate,
    });
  } catch (error) {
    console.error("Error creating email template:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create email template",
      error: error.message,
    });
  }
};

export const getAllMailTemplates = async (req, res) => {
  try {
    const allMailTemplates = await MailTemplate.find({}).select(
      "template subject header footer detail"
    );
    return res.status(200).json({ data: allMailTemplates });
  } catch (error) {
    console.error("Error fetching mail templates:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateMailTemplate = async (req, res) => {
  try {
    const { data } = req.body;
    console.log("Data:", data);
    const updatedTemplate = await MailTemplate.findOne({
      template: data.template,
    });

    if (updatedTemplate) {
      updatedTemplate.subject = unescapeHtml(data.subject);
      updatedTemplate.header = unescapeHtml(data.header);
      updatedTemplate.footer = unescapeHtml(data.footer);
      updatedTemplate.detail = unescapeHtml(data.detail);
      await updatedTemplate.save();
      return res
        .status(200)
        .json({ message: "Mail template updated successfully" });
    } else {
      return res.status(404).json({ error: "Template not found" });
    }
  } catch (error) {
    console.error("Error updating mail template:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const createDefaultUsage = async (req, res) => {
  try {
    const { rate, create_date, usage_name, del_flg } = req.body;

    const defaultUsage = await DefaultUsage.create({
      rate,
      create_date,
      usage_name,
      del_flg,
    });

    return res.status(201).json({
      message: "Default usage created successfully",
      data: defaultUsage,
    });
  } catch (error) {
    console.error("Error creating default usage:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const makeDefaultUsage = async (req, res) => {
  try {
    const { id } = req.params;
    const defaultUsages = await DefaultUsage.find({
      default: true,
    });
    if (defaultUsages.length > 0) {
      await Promise.all(
        defaultUsages.map(async (usage) => {
          usage.default = false;
          await usage.save();
        })
      );
    }
    const usage = await DefaultUsage.findById(id);
    if (!usage) {
      return res.status(404).json({ error: "Usage not found" });
    }
    if (req.body.isDefault) {
      usage.default = true;
      const activeTransactions = await Transaction.find({
        $or: [
          { transaction_status: 1 },
          { transaction_status: 2 },
          { transaction_status: 3 },
          { transaction_status: 4 },
          { transaction_status: 5 },
        ],
      });
      await Promise.all(
        activeTransactions.map(async (transaction) => {
          if (
            transaction.transaction_status === 5 &&
            transaction.refund.taxDetails.totalAmountIncludingTax !== 0
          ) {
            const foundTransaction = await Transaction.findById(
              transaction._id
            );
            foundTransaction.refund.taxDetails.adminRefundSystemFee =
              usage.rate;
            await foundTransaction.save();
          }
          await Transaction.findByIdAndUpdate(transaction._id, {
            adminSystemFee: usage.rate,
          });
        })
      );
    } else {
      usage.default = false;
    }
    await usage.save();
    return res
      .status(200)
      .json({ message: "Default usage updated successfully" });
  } catch (error) {
    console.error("Error creating default usage:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDefaultUsage = async (req, res) => {
  try {
    const defaultUsages = await DefaultUsage.find({ del_flg: { $ne: 1 } });

    if (!defaultUsages.length) {
      return res
        .status(200)
        .json({ message: "No default usage records found." });
    }

    res.status(200).json({ data: defaultUsages });
  } catch (error) {
    console.error("Error fetching default usage records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUsage = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log("Received ID:", id);
  console.log("Update Data:", updateData);
  const objectId = new mongoose.Types.ObjectId(id);

  try {
    const usageToUpdate = await DefaultUsage.findOneAndUpdate(
      { _id: objectId, del_flg: { $ne: 1 } },
      updateData,
      { new: true, runValidators: true }
    );

    if (!usageToUpdate) {
      return res.status(404).json({
        message: "Usage record not found or has been previously deleted.",
      });
    }

    res.status(200).json({ data: usageToUpdate });
  } catch (error) {
    console.error("Error updating usage record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUsage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received ID:", id);
    const objectId = new mongoose.Types.ObjectId(id);
    const result = await DefaultUsage.findByIdAndDelete(objectId);

    if (!result) {
      return res
        .status(200)
        .json({ message: `No document found with ID: ${id}` });
    } else {
      return res
        .status(200)
        .json({ message: "Default usage deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting default usage:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Master Management Controllers
export const createParentCategory = async (req, res) => {
  try {
    const { category_name, level, creator_id, shop_id, category_code } =
      req.body;
    const category_id = generateUniqueNumericId();
    // console.log(category_id, "category_id");

    const categories = await Category.find({
      parent_category_id: 0,
    }).select("_id");

    await Promise.all(
      categories.map(async (category) => {
        return await Category.findByIdAndUpdate(category._id, {
          $inc: {
            rank: 1,
          },
        });
      })
    );

    const newCategory = new Category({
      category_id: category_id,
      category_name,
      level,
      rank: 1,
      creator_id,
      shop_id,
      category_code,
    });

    await newCategory.save();

    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: error.essage });
  }
};

export const createSubCategory = async (req, res) => {
  try {
    const {
      parent_category_id,
      category_name,
      level,
      creator_id,
      shop_id,
      category_code,
    } = req.body;

    const category_id = generateUniqueNumericId();

    const parentCategory = await Category.findOne({
      category_id: parent_category_id,
    });
    if (!parentCategory) {
      res.status(404).json({ error: "Parent Category Not found " });
    }

    const subcategories = await Category.find({
      parent_category_id,
    });

    await Promise.all(
      subcategories.map(async (category) => {
        return await Category.findByIdAndUpdate(category._id, {
          $inc: {
            rank: 1,
          },
        });
      })
    );

    const newSubCategory = new Category({
      category_id,
      category_name,
      level,
      rank: 1,
      creator_id,
      shop_id,
      category_code,
      parent_category_id,
    });

    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(500).json({ error: error.essage });
  }
};

// export const updateCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       category_name,
//       level,
//       rank,
//       creator_id,
//       shop_id,
//       category_code,
//     } = req.body;

//     const category = await Category.findById({category_id:id});
//     if
//       (!category) {
//       res.status(404).json({ error: "Category Not found " });
//     }

//     category.category_name = category_name;
//     // category.level = level;
//     // category.rank = rank;
//     // category.creator_id = creator_id;
//     // category.shop_id = shop_id;
//     // category.category_code = category_code;
//     await category.save();
//     res.status(200).json(category);
//   }
//   catch (error) {
//     res.status(500).json({ error: error.essage });
//   }

// }

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, level, rank, creator_id, shop_id, category_code } =
      req.body;

    const category = await Category.findOne({ category_id: id });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update fields only if they are provided in the request body
    if (category_name !== undefined) category.category_name = category_name;
    if (level !== undefined) category.level = level;
    if (rank !== undefined) category.rank = rank;
    if (creator_id !== undefined) category.creator_id = creator_id;
    if (shop_id !== undefined) category.shop_id = shop_id;
    if (category_code !== undefined) category.category_code = category_code;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCategories = async (rq, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $match: { parent_category_id: 0 },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "parent_category_id",
          as: "child_Categories",
        },
      },
    ]);

    const sortedCategories = categories.sort((a, b) => {
      if (a.rank && b.rank) {
        return a.rank - b.rank;
      }
      if (a.rank) {
        return -1;
      }
      if (b.rank) {
        return 1;
      }
      return 0;
    });

    const sortedCategoriesWithChild = sortedCategories.map((category) => {
      const { child_Categories, ...rest } = category;
      return {
        ...rest,
        child_Categories: child_Categories.sort((a, b) => {
          if (a.rank && b.rank) {
            return a.rank - b.rank;
          }
          if (a.rank) {
            return -1;
          }
          if (b.rank) {
            return 1;
          }
          return 0;
        }),
      };
    });

    return res.status(200).json({ data: sortedCategoriesWithChild });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const category = await Category.findOne({ category_id: id });
    if (!category) {
      res.status(404).json({ error: "category not found" });
    }
    await Category.deleteOne({ category_id: id });
    res.status(200).json({ message: "category deleted successfully " });
  } catch (error) {
    res.status(500).json({ error: error.essage });
  }
};

export const createCommercialAct = async (req, res) => {
  try {
    const { actData } = req.body;

    if (!actData) {
      return res
        .status(400)
        .json({ message: "Missing actData in request body" });
    }

    const {
      distributor,
      operationManager,
      postCode,
      location,
      telephone,
      fax,
      email,
      url,
      requiredFees,
      howToOrder,
      paymentMethod,
      dueDateForPayment,
      deliveryTime,
      aboutReturnExchange,
    } = actData;

    console.log(req.body);

    if (
      !distributor ||
      !operationManager ||
      !postCode ||
      !location ||
      !telephone ||
      !email ||
      !requiredFees ||
      !howToOrder ||
      !paymentMethod ||
      !dueDateForPayment ||
      !deliveryTime ||
      !aboutReturnExchange
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const filter = {};

    // Define the update object
    const update = {
      distributor,
      operationManager,
      postCode,
      location,
      telephone,
      fax,
      email,
      url,
      requiredFees,
      howToOrder,
      paymentMethod,
      dueDateForPayment,
      deliveryTime,
      aboutReturnExchange,
    };

    const commercialAct = await CommercialTRansactionAct.findOneAndUpdate(
      filter,
      update,
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Commercial Act created or updated successfully",
      data: commercialAct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommercialAct = async (rq, res) => {
  try {
    const commercialAct = await CommercialTRansactionAct.find();

    return res.status(200).json({ data: commercialAct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletedCompanies = async (req, res) => {
  try {
    const { id } = req.body;
    const selectedUsers = await User.find({
      _id: {
        $in: id,
      },
    });
    const deletedUsers = await Promise.all(
      selectedUsers.map(async (user) => await User.findByIdAndDelete(user._id))
    );
    console.log("selected Users for deletion : ", deletedUsers);
    return res.status(200).json({
      message: "users deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting users");
    return res.status(500).json({
      message: "Error deleting users",
    });
  }
};

export const deletedOrders = async (req, res) => {
  try {
    const { id } = req.body;
    const selectedTransactions = await Transaction.find({
      _id: {
        $in: id,
      },
    });
    const deletedTransactions = await Promise.all(
      selectedTransactions.map(
        async (transaction) =>
          await Transaction.findByIdAndDelete(transaction._id)
      )
    );
    console.log("selected Users for deletion : ", deletedTransactions);
    return res.status(200).json({
      message: "users deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting users");
    return res.status(500).json({
      message: "Error deleting users",
    });
  }
};

export const deleteProcesses = async (req, res) => {
  try {
    const { id } = req.body;
    const selectedProcesses = await Dtb_process.find({
      _id: {
        $in: id,
      },
    });
    const deletedProcesses = await Promise.all(
      selectedProcesses.map(
        async (transaction) =>
          await Dtb_process.findByIdAndDelete(transaction._id)
      )
    );
    console.log("selected Users for deletion : ", deletedProcesses);
    return res.status(200).json({
      message: "users deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting users");
    return res.status(500).json({
      message: "Error deleting users",
    });
  }
};

export const addTaxAndSystemFeeToDatabase = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).populate("quotation");
    const foundActiveTransactions = transactions.filter(
      (transaction) => transaction.transaction_status !== 0
    );
    const ussageFees = await DefaultUsage.find({});
    const defautUsageFee = ussageFees.find((usage) => usage.default).rate;

    const taxes = await Tax.find({});
    const tax = taxes[0].rate;

    // console.log("defaultUsageFee", defautUsageFee);
    // console.log("tax", tax);

    await Promise.all(
      foundActiveTransactions.map(async (transaction) => {
        if (
          transaction.transaction_status === 5 &&
          transaction.refund.taxDetails.totalAmountIncludingTax !== 0
        ) {
          const taxAmount = Math.floor(
            (transaction.refund.taxDetails.totalAmountExcludingTax * tax) / 100
          );
          const totalAmountIncludingTax = Math.floor(
            taxAmount + transaction.refund.taxDetails.totalAmountExcludingTax
          );
          const foundTransaction = await Transaction.findById(transaction._id);
          foundTransaction.refund.taxDetails.adminRefundTax = tax;
          foundTransaction.refund.taxDetails.adminRefundSystemFee =
            defautUsageFee;
          foundTransaction.refund.taxDetails.taxAmount = taxAmount;
          foundTransaction.refund.taxDetails.totalAmountIncludingTax =
            totalAmountIncludingTax;
          await foundTransaction.save();
        }
        const quotationIds = transaction.quotation.map((quote) => quote._id);
        const taxAmount = Math.floor(
          (parseIndianNumber(
            transaction.quotation[0]?.totalamountExcludingTax
          ) *
            tax) /
            100
        );
        console.log(
          "quotation",
          transaction.quotation[0]?.totalamountExcludingTax
        );
        const totalAmountIncludingTax = Math.floor(
          taxAmount +
            parseIndianNumber(transaction.quotation[0]?.totalamountExcludingTax)
        );
        await Transaction.findByIdAndUpdate(transaction._id, {
          adminTax: tax,
          adminSystemFee: defautUsageFee,
        });
        const quotations = await Quote.find({
          _id: {
            $in: quotationIds,
          },
        });
        await Promise.all(
          quotations.map(async (quote) => {
            await Quote.findByIdAndUpdate(quote._id, {
              taxAmount: formatIndianNumber(taxAmount),
              totalAmountIncludingTax: formatIndianNumber(
                totalAmountIncludingTax
              ),
            });
          })
        );
      })
    );

    return res
      .status(200)
      .json({ foundActiveTransactions: foundActiveTransactions.length });
  } catch (error) {
    console.log("Error adding tex and system fee", error);
  }
};
