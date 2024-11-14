const NewsDetailSkeleton = () => {
  return (
    <div>
      <div className="  gap-[10px] border-t-[1px]  border-t-[#E6E6E6] border-b-[#E6E6E6] pt-6 pb-2 cursor-pointer w-full">
        <div>
          <div className=" animate-pulse h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4 w-[40%] mt-4"></div>
          <div className=" animate-pulse h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4 w-[90%] mt-4"></div>
        </div>
      </div>
    </div>
  );
};
export default NewsDetailSkeleton;
