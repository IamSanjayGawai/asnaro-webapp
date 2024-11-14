const RefundStepper = ({
  IsTrue,
  buyername,
  sellername,
  netAgreedToCancel,
  netRefundRequested,
  netRefundTermsAgreed,
  ratingByBuyer,
  ratingBySeller,
}) => {
  const buyerRefundSteps = [
    {
      label: "キャンセル依頼",
      completed: IsTrue ? true : false,
    },
    {
      label: "返金依頼",
      completed: netAgreedToCancel ? true : false,
    },
    {
      label: "返金完了",
      completed: netRefundTermsAgreed ? true : false,
    },
    { label: "評価", completed: ratingByBuyer ? true : false },
    { label: "", completed: false },
    { label: "", completed: false },
  ];

  const sellerRefundSteps = [
    {
      label: "キャンセル合意",
      completed: IsTrue ? true : false,
    },
    {
      label: "返金承認",
      completed: netRefundRequested ? true : false,
    },
    {
      label: "返金完了",
      completed: netRefundTermsAgreed ? true : false,
    },
    { label: "評価", completed: ratingBySeller ? true : false },
    { label: "", completed: false },
    { label: "", completed: false },
  ];

  const lastCompletedBuyerStepIndex = buyerRefundSteps.reduce(
    (acc, step, index) => (step.completed ? index : acc),
    -1
  );
  const lastCompletedSellerStepIndex = sellerRefundSteps.reduce(
    (acc, step, index) => (step.completed ? index : acc),
    -1
  );

  return (
    <>
      {buyername && (
        <div className="flex  mt-[20px] w-full">
          {buyerRefundSteps.map((step, index) => (
            <span
              key={index}
              className={`${
                index === lastCompletedBuyerStepIndex
                  ? "bg-[#FFAA00] text-white"
                  : step.label === ""
                  ? "bg-[#F5F5F5] text-[#F5F5F5]"
                  : "bg-[#255BB3] text-[#255BB3]"
              } lg:h-[80px] lg:w-[180px] xs:h-[50px] xs:w-[160px] sm:h-[55px] md:h-[70px] flex justify-center items-center`}
              style={{
                clipPath: "polygon(0% 0%, 88% 0, 100% 50%, 88% 100%, 0% 100%)",
              }}
            >
              <span
                className={`${
                  index === lastCompletedBuyerStepIndex
                    ? "bg-[#FFAA00]"
                    : step.label === ""
                    ? "bg-[#F5F5F5] text-[#F5F5F5]"
                    : "bg-[#fff]"
                } h-[97%] w-[97%] flex justify-center items-center lg:text-[18px] xs:text-[10px] font-bold`}
                style={{
                  clipPath:
                    "polygon(0% 0%, 88% 0, 100% 50%, 88% 100%, 0% 100%)",
                }}
              >
                {step.label}
              </span>
            </span>
          ))}
        </div>
      )}

      {sellername && (
        <div className="flex  mt-[20px] w-full">
          {sellerRefundSteps.map((step, index) => (
            <span
              key={index}
              className={`${
                index === lastCompletedSellerStepIndex
                  ? "bg-[#FFAA00] text-white"
                  : step.label === ""
                  ? "bg-[#F5F5F5] text-[#F5F5F5]"
                  : "bg-[#255BB3] text-[#255BB3]"
              } lg:h-[80px] lg:w-[180px] xs:h-[50px] xs:w-[160px] sm:h-[55px] md:h-[70px] flex justify-center items-center`}
              style={{
                clipPath: "polygon(0% 0%, 88% 0, 100% 50%, 88% 100%, 0% 100%)",
              }}
            >
              <span
                className={`${
                  index === lastCompletedSellerStepIndex
                    ? "bg-[#FFAA00]"
                    : step.label === ""
                    ? "bg-[#F5F5F5] text-[#F5F5F5]"
                    : "bg-[#fff]"
                } h-[97%] w-[97%] flex justify-center items-center lg:text-[18px] xs:text-[10px] font-bold`}
                style={{
                  clipPath:
                    "polygon(0% 0%, 88% 0, 100% 50%, 88% 100%, 0% 100%)",
                }}
              >
                {step.label}
              </span>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default RefundStepper;
