const Stepper = ({
  netTermsAgreed,
  buyername,
  deliveryStatus,
  netContractSigned,
  netPaymentDone,
  netDeliveryDone,
  netDeliveryOK,
}) => {
  console.log("netDeliveryDone", netDeliveryDone);
  const buyerSteps = [
    { label: "見積依頼", completed: true },
    { label: "見積合意", completed: netTermsAgreed ? true : false },
    {
      label: "仮払・発注",
      completed: netContractSigned ? true : false,
    },
    {
      label: "納品待ち",
      completed: netPaymentDone ? true : false,
    },

    {
      label: "検収",
      completed: netDeliveryDone ? true : false,
    },
    {
      label: "完了",
      completed: netDeliveryOK ? true : false,
    },
  ];

  const sellerSteps = [
    { label: "見積作成", completed: true },
    { label: "見積合意", completed: netTermsAgreed ? true : false },
    {
      label: "納品",
      completed: netPaymentDone && (deliveryStatus === 0 || 2) ? true : false,
    },
    {
      label: "検収待ち",
      completed: netDeliveryDone ? true : false,
    },
    {
      label: "完了",
      completed: netDeliveryOK ? true : false,
    },
  ];

  const lastCompletedBuyerStepIndex = buyerSteps.reduce(
    (acc, step, index) => (step.completed ? index : acc),
    -1
  );
  const lastCompletedSellerStepIndex = sellerSteps.reduce(
    (acc, step, index) => (step.completed ? index : acc),
    -1
  );

  return (
    <>
      {buyername ? (
        <div className="flex justify-center items-center mt-[20px] w-full">
          {buyerSteps.map((step, index) => (
            <span
              key={index}
              className={`${
                index === lastCompletedBuyerStepIndex
                  ? "bg-[#FFAA00] text-white"
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
                    : "bg-[#fff]"
                } h-[97%] w-[97%] flex justify-center items-center lg:text-[18px] xs:text-[12px] font-bold`}
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
      ) : (
        <div className="flex justify-center items-center mt-[20px] w-full">
          {sellerSteps.map((step, index) => (
            <span
              key={index}
              className={`${
                index === lastCompletedSellerStepIndex
                  ? "bg-[#FFAA00] text-white"
                  : "bg-[#255BB3] text-[#255BB3]"
              } lg:h-[80px] lg:w-[250px] xs:h-[50px] xs:w-[160px] sm:h-[55px] md:h-[70px] flex justify-center items-center`}
              style={{
                clipPath: "polygon(0% 0%, 88% 0, 100% 50%, 88% 100%, 0% 100%)",
              }}
            >
              <span
                className={`${
                  index === lastCompletedSellerStepIndex
                    ? "bg-[#FFAA00]"
                    : "bg-[#fff]"
                } h-[97%] w-[97%] flex justify-center items-center lg:text-[18px] xs:text-[12px] font-bold`}
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

export default Stepper;
