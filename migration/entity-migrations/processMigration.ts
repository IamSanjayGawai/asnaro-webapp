import mongoose from "mongoose";
import { QueryResult } from "mysql2";
import Dtb_process from "../models/Dtb_process";
import { correspondingPrefFunc } from "../utils/process/correspondingPref";
import { processReviewsObj } from "../utils/process/processReviews";
import { SqlProcess, SqlReview, User } from "../types/processTypes";

export const processesMigration = async (
  sqlProcesses: QueryResult,
  sqlProcessReviews: QueryResult,
  sqlPrefs: QueryResult,
  users: User[]
) => {
  const processesArray = Array.isArray(sqlProcesses)
    ? (sqlProcesses as unknown as SqlProcess[])
    : [];
  const reviewsArray = Array.isArray(sqlProcessReviews)
    ? (sqlProcessReviews as unknown as SqlReview[])
    : [];
  const truncatedProcesses =
    processesArray.length > 0
      ? processesArray.map((process: SqlProcess) => {
          const {
            process_counter,
            cost_price,
            hourly_price,
            image_path,
            search_word,
            city,
            review,
            create_date,
            update_date,
            parent_category_id,
            children_category,
            ...otherFields
          } = process;

          const parsedCreateDate = create_date ? new Date(create_date) : null;
          const parsedUpdateDate = update_date ? new Date(update_date) : null;
          const correspondingPref = correspondingPrefFunc(
            sqlPrefs,
            otherFields
          );
          const correspondingUserMongoInd = users.find((user: User) => {
            return user.customer_id === otherFields.customer_id.toString();
          }) as User;
          const properMongoId = new mongoose.Types.ObjectId(
            `${correspondingUserMongoInd._id}`
          );
          const { processReviews, newAverageRating } = processReviewsObj(
            reviewsArray,
            otherFields
          );
          const tags = search_word.split(",");

          return {
            ...otherFields,
            years_type: otherFields.years_type.toString(),
            status: otherFields.status === 1 ? "release" : "private",
            pref: correspondingPref.pref_name,
            mun: city,
            user: properMongoId,
            parent_category: parent_category_id.toString(),
            child_category: children_category.toString(),
            reviews: processReviews,
            totalRatingSum: newAverageRating ? newAverageRating : 0,
            totalReviews: processReviews.length,
            tags,
            createdAt:
              parsedCreateDate && !isNaN(parsedCreateDate.getTime())
                ? parsedCreateDate
                : null,
            updatedAt:
              parsedUpdateDate && !isNaN(parsedUpdateDate.getTime())
                ? parsedUpdateDate
                : null,
          };
        })
      : [];

  const processes = await Promise.all(
    truncatedProcesses.map((process: any) => Dtb_process.create(process))
  );

  return { processes };
};
