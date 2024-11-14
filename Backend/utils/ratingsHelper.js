import ReviewSeller from "../models/Review_to_Seller.js";
import ReviewBuyer from "../models/Review_to_Buyer.js";
import mongoose from "mongoose";

export async function getAverageRatingForBuyer(customer_id) {
  const result = await ReviewBuyer.aggregate([
    { $match: { customer_id: new mongoose.Types.ObjectId(customer_id) } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$ratingToBuyer" },
        ratingCount: { $sum: 1 },
      },
    },
    {
      $project: {
        averageRating: { $round: ["$averageRating", 1] },
        ratingCount: 1,
      },
    },
  ]);

  if (result.length > 0) {
    return {
      averageRating: result[0].averageRating || 0,
      ratingCount: result[0].ratingCount || 0,
    };
  } else {
    return {
      averageRating: 0,
      ratingCount: 0,
    };
  }
}

export async function getAverageRatingForSeller(seller_id) {
  const result = await ReviewSeller.aggregate([
    { $match: { seller_id: new mongoose.Types.ObjectId(seller_id) } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$ratingToSeller" },
        ratingCount: { $sum: 1 },
      },
    },
    {
      $project: {
        averageRating: { $round: ["$averageRating", 1] },
        ratingCount: 1,
      },
    },
  ]);

  if (result.length > 0) {
    return {
      averageRating: result[0].averageRating || 0,
      ratingCount: result[0].ratingCount || 0,
    };
  } else {
    return {
      averageRating: 0,
      ratingCount: 0,
    };
  }
}

export async function getAverageRatingForProcess(process_id) {
  const result = await ReviewSeller.aggregate([
    { $match: { process_id: new mongoose.Types.ObjectId(process_id) } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$ratingToProcess" },
        ratingCount: { $sum: 1 },
      },
    },
    {
      $project: {
        averageRating: { $round: ["$averageRating", 1] },
        ratingCount: 1,
      },
    },
  ]);

  if (result.length > 0) {
    return {
      averageRating: result[0].averageRating || 0,
      ratingCount: result[0].ratingCount || 0,
    };
  } else {
    return {
      averageRating: 0,
      ratingCount: 0,
    };
  }
}

// export async function getAverageRatingForProcesses() {
//     const result = await Review.aggregate([
//         {
//             $group: {
//                 _id: "$process_id",
//                 averageRating: { $avg: "$ratingToProcess" },
//                 ratingCount: { $sum: 1 }
//             }
//         },
//         {
//             $project: {
//                 _id: 0,
//                 process_id: "$_id",
//                 averageRating: { $round: ["$averageRating", 1] },
//                 ratingCount: 1
//             }
//         }
//     ]);

//     return result.map(process => ({
//         process_id: process.process_id,
//         averageRating: process.averageRating || 0,
//         ratingCount: process.ratingCount || 0
//     }));
// }
