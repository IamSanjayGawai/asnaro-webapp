import { useNavigate } from "react-router-dom";
import DashboardCards from "../components/DashboardCards";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { selectUser } from "../../state/slices/userSlice";
import { getUserByIdThunk } from "@/state/thunks/userThunks";
import Spinner from "@/components/static/Spinner";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { selectTransaction } from "@/state/slices/transactionSlice";
import { orderStatusDescriptions } from "../../utils/status-transaction";
import {
  fecthBuyerLiNotifyThunk,
  fecthSellerLiNotifyThunk,
  TransactionReadThunk,
} from "@/state/thunks/transactionThunks";

const DashboardTopPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { other, loading } = useAppSelector(selectUser);

  const [showModal, setShowModal] = useState(false);
  const { buyerNotification, sellerNotification } =
    useAppSelector(selectTransaction);

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #255BB3;
        color: #fff;
        font-size: 14px;
  
      `,
      Table: `
    --data-table-library_grid-template-columns:1.2fr 2fr 2fr 1fr 2fr 1fr ;
  
    @media (max-width: 1150px) {
      --data-table-library_grid-template-columns:repeat(6,minmax(10px,500px));
        overflow-x: auto;
        width: 200% !important;
        white-space: nowrap;
      } 
      @media (max-width: 500px) {
        --data-table-library_grid-template-columns:repeat(6,minmax(10px,500px));
        overflow-x: auto;
        width: 300% !important;
        white-space: nowrap;
      }    
      `,
      BaseCell: `
         &:nth-of-type(n) {
          font-weight: 500;
          text-align:center;
            align-items:start;
          }
        &:nth-of-type(6) {
            text-align:right;
        }
         &:nth-of-type(1) {
            text-align:left;
          }
  
      `,
    },
  ]);

  useEffect(() => {
    dispatch(getUserByIdThunk({}));
    dispatch(fecthBuyerLiNotifyThunk({}));
    dispatch(fecthSellerLiNotifyThunk({}));
  }, [dispatch]);

  let buyerNodes = [];
  if (buyerNotification && buyerNotification.data) {
    for (let i = 0; i < buyerNotification.data.length; i++) {
      const item = buyerNotification.data[i];
      buyerNodes.push({
        transaction_no: item?._id,
        seller_id: item?.seller_id,
        project: item?.process_name,
        company_name: item?.sellerName,
        transaction_status: item?.transaction_status,
        detailed: "詳細",
        message: item?.latest_note,
        __v: item?.__v,
      });
    }
  }

  let sellerNodes = [];
  if (sellerNotification && sellerNotification.data) {
    for (let i = 0; i < sellerNotification.data.length; i++) {
      const item = sellerNotification.data[i];
      sellerNodes.push({
        transaction_no: item?._id,
        seller_id: item?.seller_id,
        project: item?.process_name,
        company_name: "株式会社丸菱製作所",
        transaction_status: item?.transaction_status,
        detailed: "詳細",
        message: item?.latest_note,
        __v: item.__v,
      });
    }
  }

  const buyerData = { nodes: buyerNodes };
  const sellerData = { nodes: sellerNodes };

  const COLUMNS_buyer = [
    {
      label: (
        <span className="flex justify-center lg:text-[16px] xs:text-[14px] ">
          取引No
        </span>
      ),
      key: "transaction_no",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] break-all"
          style={{ whiteSpace: "normal" }}
        >
          {cell.transaction_no ? cell.transaction_no : "NA"}
        </div>
      ),
    },
    {
      label: (
        <span className="flex justify-center lg:text-[16px] xs:text-[14px]">
          工程
        </span>
      ),
      key: "project",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400]  line-clamp-3 text-center"
          style={{ whiteSpace: "normal" }}
        >
          {cell.project ? cell.project : "NA"}
        </div>
      ),
    },
    {
      label: (
        <span className="flex justify-center lg:text-[16px] xs:text-[14px]">
          企業名
        </span>
      ),
      key: "company_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] line-clamp-3 text-center"
          style={{ whiteSpace: "normal" }}
        >
          {cell.company_name ? cell.company_name : "NA"}
        </div>
      ),
    },
    // {
    //   label: <span className="flex justify-center">ステータス</span>,
    //   key: "status",
    //   renderCell: (cell) => (
    //     <div
    //       className="text-[#808080] text-[14px] font-[400] line-clamp-1 text-center"
    //       style={{ whiteSpace: "normal" }}
    //     >
    //       {cell.status ? cell.status : "NA"}
    //     </div>
    //   ),
    // },
    {
      label: <span className="lg:text-[16px] xs:text-[14px]">ステータス</span>,
      key: "transaction_status", // Make sure you reference the correct field key
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] line-clamp-3"
          style={{ whiteSpace: "normal" }}
        >
          {orderStatusDescriptions[cell.transaction_status] || "NA"}
        </div>
      ),
    },
    ,
    {
      label: (
        <span className="flex justify-center lg:text-[16px] xs:text-[14px]">
          メッセージ
        </span>
      ),
      key: "message",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] break-all text-center"
          style={{ whiteSpace: "normal" }}
        >
          {cell.message ? cell.message : "NA"}
          {/* {cell.est_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
        </div>
      ),
    },
    {
      label: (
        <span className="flex justify-center lg:text-[16px] xs:text-[14px]">
          詳細
        </span>
      ),
      key: "detailed",
      renderCell: (cell) => (
        <button
          onClick={() => {
            dispatch(
              TransactionReadThunk({
                transaction_id: cell.transaction_no,
                userRole: "buyer",
              })
            );
            navigate(`/transaction/${cell.transaction_no}`);
          }}
          // onClick={() => {
          //   dispatch(
          //     TransactionReadThunk({
          //       transaction_id: cell.transaction_no,
          //       userRole: "buyer",
          //     })
          //   ),
          //     navigate(`/transaction/${cell.transaction_no}
          //    }
          //   `);
          // }}
          className="text-[#fff] text-[14px] font-[400] bg-[#FFAA00] px-2 py-1 flex gap-2 items-center  justify-end mx-auto "
          style={{ whiteSpace: "normal" }}
        >
          {cell.detailed}
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
            >
              <path
                d="M0.184686 7.38979C0.0700362 7.28623 0.00946618 7.16632 0.00513976 7.02643C0.00081333 6.88654 0.0613833 6.76663 0.184686 6.66308L3.46196 3.91066L0.184686 1.15825C0.0700362 1.06015 0.00946618 0.940239 0.00081333 0.798531C-0.00783952 0.656822 0.0527305 0.533282 0.17387 0.431542C0.290684 0.327986 0.433456 0.2753 0.606513 0.271666C0.77957 0.268033 0.924506 0.318902 1.03916 0.422458L4.84641 3.6109C4.89617 3.65268 4.9351 3.69992 4.96106 3.7526C4.98702 3.80529 5 3.85798 5 3.91248C5 3.96698 4.98702 4.01967 4.96106 4.07236C4.9351 4.12504 4.89833 4.17046 4.84641 4.21407L1.04997 7.39887C0.935322 7.49516 0.792549 7.54421 0.621656 7.54421C0.450762 7.54421 0.305826 7.49334 0.182523 7.38979H0.184686Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
      ),
    },
  ];

  const COLUMNS_seller = [
    {
      label: (
        <span className="flex justify-center lg:text-[16px] xs:text-[14px]">
          取引No
        </span>
      ),
      key: "transaction_no",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] break-all"
          style={{ whiteSpace: "normal" }}
        >
          {cell.transaction_no ? cell.transaction_no : "NA"}
        </div>
      ),
    },
    {
      label: (
        <span className="flex justify-center lg:text-[16px] xs:text-[14px]">
          工程
        </span>
      ),
      key: "project",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400]  line-clamp-3  text-center"
          style={{ whiteSpace: "normal" }}
        >
          {cell.project ? cell.project : "NA"}
        </div>
      ),
    },
    {
      label: (
        <span className="flex justify-center lg:text-[16px] xs:text-[14px]">
          企業名
        </span>
      ),
      key: "company_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] text-left line-clamp-3"
          style={{ whiteSpace: "normal" }}
        >
          {cell.company_name ? cell.company_name : "NA"}
        </div>
      ),
    },
    // {
    //   label: "ステータス",
    //   key: "status",
    //   renderCell: (cell) => (
    //     <div
    //       className="text-[#808080] text-[14px] font-[400] line-clamp-1 "
    //       style={{ whiteSpace: "normal" }}
    //     >
    //       {cell.status ? cell.status : "NA"}
    //     </div>
    //   ),
    // },
    {
      label: <span className="lg:text-[16px] xs:text-[14px]">ステータス</span>,
      key: "transaction_status", // Make sure you reference the correct field key
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] line-clamp-3"
          style={{ whiteSpace: "normal" }}
        >
          {orderStatusDescriptions[cell.transaction_status] || "NA"}
        </div>
      ),
    },
    ,
    {
      label: (
        <span className="flex justify-center lg:text-[16px] xs:text-[14px]">
          メッセージ
        </span>
      ),
      key: "message",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] break-all"
          style={{ whiteSpace: "normal" }}
        >
          {cell.message ? cell.message : "NA"}
          {/* {cell.est_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
        </div>
      ),
    },

    {
      label: (
        <span className="flex justify-center lg:text-[16px] xs:text-[14px]">
          詳細
        </span>
      ),
      key: "detailed",
      renderCell: (cell) => (
        <button
          onClick={() => {
            dispatch(
              TransactionReadThunk({
                transaction_id: cell.transaction_no,
                userRole: "seller",
              })
            ),
              navigate(`/transaction/${cell.transaction_no}
           }
          `);
          }}
          className="text-[#fff] text-[14px] font-[400] bg-[#FFAA00] px-2 py-1 flex gap-2 items-center  justify-center mx-auto"
          style={{ whiteSpace: "normal" }}
        >
          {cell.detailed}
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
            >
              <path
                d="M0.184686 7.38979C0.0700362 7.28623 0.00946618 7.16632 0.00513976 7.02643C0.00081333 6.88654 0.0613833 6.76663 0.184686 6.66308L3.46196 3.91066L0.184686 1.15825C0.0700362 1.06015 0.00946618 0.940239 0.00081333 0.798531C-0.00783952 0.656822 0.0527305 0.533282 0.17387 0.431542C0.290684 0.327986 0.433456 0.2753 0.606513 0.271666C0.77957 0.268033 0.924506 0.318902 1.03916 0.422458L4.84641 3.6109C4.89617 3.65268 4.9351 3.69992 4.96106 3.7526C4.98702 3.80529 5 3.85798 5 3.91248C5 3.96698 4.98702 4.01967 4.96106 4.07236C4.9351 4.12504 4.89833 4.17046 4.84641 4.21407L1.04997 7.39887C0.935322 7.49516 0.792549 7.54421 0.621656 7.54421C0.450762 7.54421 0.305826 7.49334 0.182523 7.38979H0.184686Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full mx-10">
          <div className="flex justify-between items-center mb-10 sm:mb-0">
            <h1 className="sm:text-[#255BB3] text-[#808080] font-[700] sm:text-[24px] text-[18px] sm:mb-4 md:mb-0">
              売上・受注件数
            </h1>
            {other && other?.user?.partner_flg && (
              <button
                onClick={() => navigate("/dashboard/process-list/registration")}
                className="bg-[#FA0] lg:text-[18px] xs:text-[14px] text-[#fff] sm:px-4 sm:py-1 p-2"
              >
                工程を登録する
              </button>
            )}
          </div>

          <h1 className="mt-4 text-[#808080]  font-[700] text-[18px]">
            受注情報
          </h1>
          <DashboardCards
            data={{
              val_1: { name: "入金予定金額", value: 100 },
              val_2: { name: "未完了案件", value: 200 },
              val_3: { name: "未発注案件", value: 300 },
            }}
            partner_flag={other && other?.user?.partner_flg}
          />
          <h1 className="mt-4 text-[#808080]  font-[700] text-[18px]">
            最新情報
          </h1>
          {/* Just a test Height */}
          <div className="border-[1px] border-[#808080] min-h-[169px] mt-4">
            <div className=" border-[1px] border-[#E6E6E6] overflow-x-auto">
              <CompactTable
                data={buyerData}
                columns={COLUMNS_buyer}
                theme={theme}
              />
            </div>
          </div>
          <h1 className="mt-4 text-[#808080]  font-[700] text-[18px]">
            発注情報
          </h1>
          <DashboardCards
            data={{
              val_1: { name: "未発注案件", value: 100 },
              val_2: { name: "仮払い待ち案件", value: 200 },
              val_3: { name: "納品待ち案件", value: 300 },
            }}
            partner_flag={true}
          />
          <h1 className="mt-4 text-[#808080]  font-[700] text-[18px]">
            発注情報
          </h1>
          {/* Just a test  Height*/}
          <div className="border-[1px] border-[#808080] min-h-[169px] mt-4">
            <div className="border-[1px] border-[#E6E6E6] overflow-x-auto">
              <CompactTable
                data={sellerData}
                columns={COLUMNS_seller}
                theme={theme}
              />
            </div>
          </div>
        </div>
      )}
      {showModal ? (
        <Modal showModal={showModal} setShowModal={setShowModal} />
      ) : null}
    </>
  );
};

export default DashboardTopPage;
