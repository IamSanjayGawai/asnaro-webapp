import Rating from "@mui/material/Rating";

const RatingSystem = ({ averageRating, totalRatings }) => {
  return (
    <div className="flex items-center text-[#FFAA00] sm:text-[24px] text-[12px] font-[700] sm:w-[90%] w-[95%] mx-auto mt-1 gap-1 ">
      <Rating
        name="process-rating"
        precision={0.5}
        value={averageRating}
        size="large"
        className="ml-1"
        readOnly
      />
      {averageRating}
      <span className="text-[#808080] sm:text-[14px] lg:text-[16px]  font-[700] ml-1">
        ({totalRatings})
      </span>
    </div>
  );
};

export default RatingSystem;

// const STAR_COUNT = 5;

// const FullStar = () => <span>&#9733;</span>;
// const HalfStar = () => <span>&#9733; </span>;
// const EmptyStar = () => <span>&#9734;</span>;

// const getStars = (rating) => {
//   const stars = [];

//   for (let i = 0; i < STAR_COUNT; i++) {
//     if (i < Math.floor(rating)) {
//       stars.push(<FullStar key={i} />);
//     } else if (i === Math.floor(rating) && rating % 1 !== 0) {
//       stars.push(<HalfStar key={i} />);
//     } else {
//       stars.push(<EmptyStar key={i} />);
//     }
//   }

//   return stars;
// };
