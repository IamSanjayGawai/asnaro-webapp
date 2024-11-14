import { SqlReview } from "../../types/processTypes";
import { otherFieldsType } from "../../types/userTypes";

function roundDownToOneDecimalPlace(number: number) {
  return Math.floor(number * 10) / 10;
}

export const processReviewsObj = (
  reviewsArray: SqlReview,
  otherFields: otherFieldsType
) => {
  const processReviews = reviewsArray
    .filter((review: any) => review.process_id === otherFields.process_id)
    .map((review: any) => {
      return {
        rating: review.review as number,
        comment: review.review_comment as string,
      };
    });
  const newTotalRatingSum =
    processReviews.reduce(
      (
        acc: number,
        curr: {
          rating: number;
          commenet: string;
        }
      ) => {
        return acc + curr.rating;
      },
      0
    ) / processReviews.length;
  const newAverageRating = roundDownToOneDecimalPlace(
    Math.min(newTotalRatingSum, 5)
  );

  return {
    processReviews,
    newAverageRating,
  };
};
