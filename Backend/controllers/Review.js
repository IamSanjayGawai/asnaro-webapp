import ReviewBuyer from "../models/Review_to_Seller.js";
import ReviewSeller from "../models/Review_to_Buyer.js";
import Dtb_process from "../models/Dtb_process.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
import {
  getAverageRatingForSeller,
  getAverageRatingForProcess,
  getAverageRatingForBuyer,
} from "../utils/ratingsHelper.js";
import Notification from "../models/Notifications.js";
import User from "../models/User.js";

export const createReview = async (req, res) => {
  try {
    let {
      seller_id,
      process_id,
      ratingToProcess,
      transactionId,
      ratingToSeller,
      commentToSeller,
      commentToProcess
    } = req.body;
    seller_id = new mongoose.Types.ObjectId(seller_id);
    transactionId = new mongoose.Types.ObjectId(transactionId);

    console.log("ratingToProcess", ratingToProcess);
    console.log("ratingToSeller", ratingToSeller);

    const sender = await User.findById(req.user.id).select(
      "name01 profile_img"
    );

    const transaction = await Transaction.findById(transactionId);
    transaction.ratingByBuyer = true;

    if (transaction.ratingBySeller && !transaction.transaction_status !== 7) {
      console.log("completed");
      transaction.transaction_status = 6;
    }

    await transaction.save();

    // Create a new review instance
    const newReview = new ReviewBuyer({
      seller_id,
      process_id,
      ratingToProcess,
      ratingToSeller,
      commentToSeller,
      commentToProcess,
    });
    const savedReview = await newReview.save();

    const averageRatingSeller = await getAverageRatingForSeller(seller_id);
    const averageRatingProcess = await getAverageRatingForProcess(process_id);

    if (!savedReview) {
      return res.status(500).json({ message: "Failed to save review." });
    }

    const process = await Dtb_process.findById(process_id);

    const newTotalReviews = process.totalReviews + 1;
    const newTotalRatingSum =
      (process.totalRatingSum * process.totalReviews + ratingToProcess) /
      newTotalReviews;

    function roundDownToOneDecimalPlace(number) {
      return Math.floor(number * 10) / 10;
    }

    const newAverageRating = roundDownToOneDecimalPlace(
      Math.min(newTotalRatingSum, 5)
    );

    const updatedProcess = await Dtb_process.findByIdAndUpdate(
      process_id,
      {
        $push: {
          reviews: {
            rating: parseFloat(ratingToProcess),
            reviewId: savedReview._id,
          },
        },
        $set: {
          totalRatingSum: parseFloat(newAverageRating),
          totalReviews: newTotalReviews,
        },
      },
      { new: true }
    );

    const notification = new Notification({
      user_id: seller_id,
      notificationImage: sender.profile_img,
      notificationTitle: sender.name01,
      description: commentToSeller,
      creator_id: req.user.id,
      transaction_id: transactionId,
      labels: ["注文"],
    });

    await notification.save();

    res.status(201).json({
      review: savedReview,
      averageRatingSeller,
      averageRatingProcess,
      updatedProcess,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReviewToBuyer = async (req, res) => {
  try {
    let { customer_id, transactionId, ratingToBuyer, commentToBuyer } =
      req.body;
    customer_id = new mongoose.Types.ObjectId(customer_id);

    const sender = await User.findById(req.user.id).select(
      "name01 profile_img"
    );

    const transaction = await Transaction.findById(transactionId);
    transaction.ratingBySeller = true;

    if (transaction.ratingByBuyer && transaction.transaction_status !== 7) {
      console.log("completed");
      transaction.transaction_status = 6;
    }

    await transaction.save();
    // Create a new review instance
    const newReview = new ReviewSeller({
      customer_id,
      ratingToBuyer,
      commentToBuyer,
    });
    const savedReview = await newReview.save();
    // Optionally calculate averages
    const averageRatingBuyer = await getAverageRatingForBuyer(customer_id);

    const notification = new Notification({
      user_id: customer_id,
      notificationImage: sender.profile_img,
      notificationTitle: sender.name01,
      description: commentToBuyer,
      creator_id: req.user.id,
      transaction_id: transactionId,
      labels: ["注文"],
    });

    await notification.save();

    res.status(201).json({
      review: savedReview,
      averageRatingBuyer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBuyerReviewsForSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const reviews = await ReviewBuyer.find({
      seller_id: sellerId,
    });

    const ratingsToSeller = reviews.map((review) => review.ratingToSeller);

    let totalRating = 0;
    ratingsToSeller.forEach((rating) => {
      totalRating += rating;
    });

    const averageRating = totalRating / ratingsToSeller.length;
    const singleDecimalAverageRating = Math.round(averageRating * 10) / 10;

    if (reviews.length === 0) {
      console.log("No reviews found for the given seller_id");
    }

    return res.status(200).json({
      averageRating: singleDecimalAverageRating,
      ratingCount: ratingsToSeller.length,
    });
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSellerReviewsForBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const reviews = await ReviewSeller.find({
      customer_id: buyerId,
    });

    const ratingsToBuyer = reviews.map((review) => review.ratingToBuyer);

    let totalRating = 0;
    ratingsToBuyer.forEach((rating) => {
      totalRating += rating;
    });

    const averageRating = totalRating / ratingsToBuyer.length;
    const singleDecimalAverageRating = Math.round(averageRating * 10) / 10;

    if (reviews.length === 0) {
      console.log("No reviews found for the given buyer_id");
    }

    return res.status(200).json({
      averageRating: singleDecimalAverageRating,
      ratingCount: ratingsToBuyer.length,
    });
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    return res.status(500).json({ message: error.message });
  }
};
