import { StatusCodes } from "http-status-codes";
import News from "../models/News.js";
import User from "../models/User.js";
import Notification from "../models/Notifications.js";
import mongoose from "mongoose";
import Joi from "joi";
import { io } from "../socket.js";
import { uploadBase64ImageToS3 } from "../aws.js";
import crypto from "crypto";

export const createNews = async (req, res) => {
  const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const {
      news_date,
      rank,
      labels, // This should be an array of strings ['重要', '注文', 'misc']
      news_title,
      news_comment,
      news_select,
      create_date,
      img1,
      del_flg,
      shop_id,
      delivery_flg,
      delivery_date,
      news_url,
    } = req.body;

    // Upload image to S3 and get the URL
    const img1Url =
      img1 &&
      (await uploadBase64ImageToS3(
        img1,
        process.env.AWS_BUCKET_NAME,
        `news-img-${crypto.randomBytes(8).toString("hex")}.png`
      ));

    const news = new News({
      news_date,
      rank,
      news_title,
      news_comment,
      news_select,
      creator_id: "65b7457ee13f304d7d1df776",
      create_date,
      image: img1Url,
      del_flg,
      shop_id,
      delivery_flg,
      delivery_date,
      news_url,
    });

    await news.save({ session });

    const userIds = await User.find({}, "_id");

    let notifications = "";
    await Promise.all(
      userIds.map(async (user) => {
        notifications = new Notification({
          user_id: user._id,
          notificationTitle: `dev praveen test "${news.news_title}" Alert`,
          labels,
          read: false,
          description: `dev praveen test  "${news.news_comment}" has been added.`,
          creator_id: "65b7457ee13f304d7d1df776",
        });

        await notifications.save({ session });
      })
    );

    io.emit("newNews", { data: notifications });
    // await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "News added successfully." });
  } catch (error) {
    // await session.abortTransaction();
    session.endSession();

    console.error("Error adding news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllNews = async (req, res) => {
  try {
    // Pagination parameters
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 10;

    const skip = (page - 1) * pageSize;

    const latestNews = await News.find({ delivery_flag: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    console.log("latestNews", latestNews);

    const totalNews = await News.countDocuments({ delivery_flag: true });

    res.status(StatusCodes.OK).json({
      success: true,
      news: latestNews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalNews / pageSize),
        totalItems: totalNews,
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllNewsAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const latestNews = await News.find({})
      .sort({ delivery_date: -1 })
      .skip(skip)
      .limit(limit);

    const totalNews = await News.countDocuments({});

    res.status(StatusCodes.OK).json({
      success: true,
      news: latestNews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalNews / limit),
        totalItems: totalNews,
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getNotificationsByUserId = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const notifications = await Notification.find({
      user_id: userId,
      del_flag: { $ne: 1 },
    })
      .populate({
        path: "user_id",
        select: "img1",
      })
      .sort({ createdAt: -1 });
    const updatedNotifications = notifications.map((notification) => {
      const id = {
        notificationId: notification._id,
        transactionId: notification.transaction_id
          ? notification.transaction_id
          : null,
      };
      const type = "notification";
      const title = notification.notificationTitle;
      const description = notification.description;
      const image = notification.notificationImage;
      const labels = notification.labels;
      const readBy = notification.readBy;
      const createdAt = notification.createdAt;
      return {
        id,
        type,
        title,
        description,
        image,
        labels,
        readBy,
        createdAt,
      };
    });

    const news = await News.find({
      delivery_flag: true,
    }).sort({
      stream_date: -1,
    });
    const updatedNews = news.map((newsItem) => {
      const id = {
        notificationId: newsItem._id,
        transactionId: null,
      };
      const type = "news";
      const title = newsItem.news_title;
      const description = newsItem.news_comment;
      const image = newsItem.image;
      const labels = newsItem.labels;
      const readBy = newsItem.readBy.filter((entry) =>
        entry.user_id.equals(userId)
      )
        ? newsItem.readBy
        : [];
      const createdAt = newsItem.stream_date;
      return {
        id,
        type,
        title,
        description,
        image,
        labels,
        readBy,
        createdAt,
      };
    });

    const allNotifications = [...updatedNotifications, ...updatedNews];
    const sortedNotifications = allNotifications.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // console.log("All Notifications:", allNotifications);

    res.status(200).json({ success: true, data: sortedNotifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid News ID" });
    }

    const news = await News.findOne({ _id: id, del_flg: { $ne: 1 } });

    if (!news) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "News not found" });
    }

    res.status(StatusCodes.OK).json({ success: true, news });
  } catch (error) {
    console.error("Error fetching news by ID:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

export const updateNotificationReadStatus = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user._id;
    const { type } = req.body;

    // console.log("notificationId", notificationId);
    // console.log("type", type);

    let notification;
    if (type === "notification") {
      notification = await Notification.findById(notificationId);

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      const userIndex = notification.readBy.find((entry) =>
        entry.user_id.equals(userId)
      );
      if (userIndex) {
        return res.status(200).json({
          success: true,
          message: "Notification read status is already true for this user",
          notificationId: notification._id,
        });
      }
      if (!userIndex) {
        notification.readBy.push({ user_id: userId, read: true });
      }

      await notification.save();
    } else {
      notification = await News.findById(notificationId);

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      const userIndex = notification.readBy.findIndex((entry) =>
        entry.user_id.equals(userId)
      );
      if (userIndex !== -1 && notification.readBy[userIndex].read === true) {
        return res.status(200).json({
          success: true,
          message: "Notification read status is already true for this user",
          notificationId: notification._id,
        });
      }
      if (userIndex === -1) {
        notification.readBy.push({ user_id: userId, read: true });
      } else {
        notification.readBy[userIndex].read = true;
      }

      await notification.save();
    }
    return res.status(200).json({
      success: true,
      message: "Notification read status updated successfully",
      notificationId: notification._id,
    });
  } catch (error) {
    console.error("Error updating notification read status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchNotificationAdmin = async (req, res) => {
  try {
    const { keyword, mod } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Use limit from query or default to 10

    let dbQuery = {};

    if (keyword) {
      dbQuery.$or = [
        { news_title: { $regex: `${keyword}`, $options: "i" } },
        { description: { $regex: `${keyword}`, $options: "i" } },
      ];
    }

    if (mod) {
      // Use a date range if the exact match is not returning results
      const modDate = new Date(mod);
      dbQuery.delivery_date = {
        $gte: new Date(modDate.setHours(0, 0, 0, 0)),
        $lt: new Date(modDate.setHours(23, 59, 59, 999)),
      };
    }

    console.log("dbQuery:", dbQuery);
    console.log("Limit:", limit, "Page:", page);

    const skip = (page - 1) * limit;

    const [newsList, totalResults] = await Promise.all([
      News.find(dbQuery).skip(skip).limit(limit).sort({createdAt:-1}),
      News.countDocuments(dbQuery),
    ]);

    const csvNews = await News.find(dbQuery).sort({createdAt:-1});

    console.log("Returned News List:", newsList.length);
    console.log("Total Results:", totalResults);

    return res.status(200).json({
      count: totalResults,
      data: newsList,
      pagination: {
        totalPages: Math.ceil(totalResults / limit), // Use limit instead of pageSize
        currentPage: page,
        totalTransactions: totalResults,
      },
      csvNews,
    });
  } catch (error) {
    console.error("Error searching for notifications:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchNotificationUser = async (req, res) => {
  try {
    const { title, read, userId } = req.body;

    console.log(req.body);
    let dbQueryForNotification = { creator_id: { $ne: userId } };
    let dbQueryForNews = {};

    let notificationOrConditions = [];
    let notificationAndConditions = [];
    let newsOrConditions = [];
    let newsAndConditions = [];

    if (title) {
      notificationOrConditions.push(
        { notificationTitle: { $regex: `${title}`, $options: "i" } },
        { description: { $regex: `${title}`, $options: "i" } },
        { labels: { $regex: `${title}`, $options: "i" } }
      );
      newsOrConditions.push(
        { news_title: { $regex: `${title}`, $options: "i" } },
        { news_comment: { $regex: `${title}`, $options: "i" } },
        { labels: { $regex: `${title}`, $options: "i" } }
      );
    }

    if (read === true) {
      notificationAndConditions.push(
        { "readBy.read": { $ne: true } },
        { readBy: { $size: 0 } }
      );
      newsAndConditions.push(
        { "readBy.read": { $ne: true } },
        {delivery_flag : true},
        { readBy: { $size: 0 } }
      );
    }

    if (notificationOrConditions.length > 0) {
      dbQueryForNotification.$or = notificationOrConditions;
    }

    if (notificationAndConditions.length > 0) {
      dbQueryForNotification.$and = notificationAndConditions;
    }

    if (newsOrConditions.length > 0) {
      dbQueryForNews.$or = newsOrConditions;
    }

    if (newsAndConditions.length > 0) {
      dbQueryForNews.$and = newsAndConditions;
    }

    // console.log("dbQueryForNotification", dbQueryForNotification);
    // console.log("dbQueryForNews", dbQueryForNews);

    const [notificationList, totalNotificationResults] = await Promise.all([
      Notification.find(dbQueryForNotification),
      Notification.countDocuments(dbQueryForNotification),
    ]);

    const [newsList, totalNewsResults] = await Promise.all([
      News.find(dbQueryForNews),
      News.countDocuments(dbQueryForNews),
    ]);

    // console.log(notificationList, "notificationList..");
    // console.log(newsList, "newsList..");

    const updatedNotifications = notificationList.map((notification) => {
      const id = {
        notificationId: notification._id,
        transactionId: notification.transaction_id
          ? notification.transaction_id
          : null,
      };
      const type = "notification";
      const title = notification.notificationTitle;
      const description = notification.description;
      const image = notification.notificationImage;
      const labels = notification.labels;
      const readBy = notification.readBy;
      const createdAt = notification.createdAt;
      return {
        id,
        type,
        title,
        description,
        image,
        labels,
        readBy,
        createdAt,
      };
    });

    const updatedNews = newsList.map((newsItem) => {
      const id = {
        notificationId: newsItem._id,
        transactionId: null,
      };
      const type = "news";
      const title = newsItem.news_title;
      const description = newsItem.news_comment;
      const image = newsItem.image;
      const labels = newsItem.labels;
      const readBy = newsItem.readBy.filter((entry) =>
        entry.user_id.equals(userId)
      )
        ? newsItem.readBy
        : [];
      const createdAt = newsItem.stream_date;
      return {
        id,
        type,
        title,
        description,
        image,
        labels,
        readBy,
        createdAt,
      };
    });

    const allNotifications = [...updatedNotifications, ...updatedNews];
    const sortedNotifications = allNotifications.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    const totalResults = totalNotificationResults + totalNewsResults;

    return res.status(200).json({
      count: totalResults,
      data: sortedNotifications,
    });
  } catch (error) {
    console.error("Error searching for notifications:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
