import { useState } from "react";
import Modal from "./Modal";

interface DataProps {
  val_1: { name: string; value: number };
  val_2: { name: string; value: number };
  val_3: { name: string; value: number };
}

type Props = {
  data: DataProps;
  partner_flag: boolean;
};

const DashboardCards = ({ data, partner_flag }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="lg:p-4 xs:p-2 mt-4 border-[1px] border-[#E6E6E6] grid grid-cols-2 sm:grid-cols-3 sm:gap-10 gap-5 bg-[#f2f1f1] text-center">
      {partner_flag ? (
        <>
          <div className="p-4 bg-[#fff] border-[#E6E6E6]">
            <h1 className="text-[#808080] font-[500] text-[16px]">
              {data.val_1.name}
            </h1>
            <h1 className="text-[#255BB3] font-[700] text-[32px]">
              {data.val_1.value} 
              <span className="text-[16px] font-[700] ml-2">
              円
              </span>
            </h1>
          </div>
          <div className="p-4 bg-[#fff] border-[#E6E6E6]">
            <h1 className="text-[#808080] font-[500] text-[16px]">
              {data.val_2.name}
            </h1>
            <h1 className="text-[#255BB3] font-[700] text-[32px]">
              {data.val_2.value}
              <span className="text-[16px] font-[700] ml-2"
              > 件</span>
            </h1>
          </div>
          <div className="p-4 bg-[#fff] border-[#E6E6E6] col-span-2 sm:col-span-1">
            <h1 className="text-[#808080] font-[500] text-[16px]">
              {" "}
              {data.val_3.name}
            </h1>
            <h1 className="text-[#255BB3] font-[700] text-[32px] ">
              {" "}
              {data.val_3.value} 
              <span className="text-[16px] font-[700] ml-2">
              件
              </span>
            </h1>
          </div>
        </>
      ) : (
        <>
          <div className="col-span-3 lg:mx-[6rem]  xs:mx-[0.5rem] p-4 bg-[#fff]">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#FA0] text-[14px] text-[#fff] px-4 py-2 w-full"
            >
              パートナー申請をする
            </button>
            <h1 className="text-[#808080] font-[500] lg:text-[16px] xs:text-[12px]  mt-2">
              ※工程を登録するには、パートナー登録をする必要があります
            </h1>
          </div>
        </>
      )}

      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
    </div>
  );
};

export default DashboardCards;
