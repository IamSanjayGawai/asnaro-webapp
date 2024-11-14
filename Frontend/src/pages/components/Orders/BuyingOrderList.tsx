import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { getUserByIdThunk } from "@/state/thunks/userThunks";
import { selectUser } from "@/state/slices/userSlice";
import { selectTransaction } from "@/state/slices/transactionSlice";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import Spinner from "@/components/static/Spinner";
import { DrawerDemo } from "./FiltersDrawer";
import { RiFilter3Line } from "react-icons/ri";
import {
  getBuyerListThunk,
  getTransactionStatus,
} from "@/state/thunks/transactionThunks";
import { orderStatusDescriptions } from "../../../utils/status-transaction";
import TransactionCancelModal from "@/pages/transactions/components/CancelTransDashboardModal";
import ReviewTransDashboardModal from "@/pages/transactions/components/ReviewTransDashboardModal";
import CancelProgressModal from "@/pages/transactions/components/CancelProgressModal";
import TransactionCompletedModal from "@/pages/transactions/components/TransactionCompletedModal";
import ReviewCompletedModal from "@/pages/transactions/components/ReviewCompletedModal";
import CancelProgressReviewModal from "@/pages/transactions/components/CancelProgressReviewModal";
import {
  showCancelModalThunk,
  ShowReviewModalThunk,
} from "@/state/slices/transactionSlice";

const BuyingOrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const [selectedStatus] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(["10"]);
  const { other, partnerResponse, loading } = useAppSelector(selectUser);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelProgress, setCancelProgress] = useState(false);
  const [completedTransactionModal, setTransactionCompletedModal] =
    useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [completedReviewModal, setReviewCompletedModal] = useState(false);
  const [cancelProgressReview, setCancelReviewProgress] = useState(false);
  const [reviewModalshow, setReviewModal] = useState(false);
  const router = useNavigate();

  const { buerList, transactionStatus, statusLoading, listLoading } =
    useAppSelector(selectTransaction);
  const dispatch = useAppDispatch();
  const maxButtons = 10;
  const startPage = Math.max(
    1,
    buerList?.pagination?.currentPage - Math.floor(maxButtons / 2)
  );
  const endPage = Math.min(
    buerList?.pagination?.totalPages,
    startPage + maxButtons - 1
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );
  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/dashboard/purchase-list?page=${pageNumber}`);
  };

  useEffect(() => {
    dispatch(getBuyerListThunk({ status: filter, page: currentPage }));
    dispatch(getTransactionStatus({ status: filter, role: "buyer" }));
  }, [filter, currentPage, dispatch]);

  useEffect(() => {
    dispatch(getUserByIdThunk({}));
  }, [dispatch, partnerResponse]);

  useEffect(() => {
    dispatch(ShowReviewModalThunk(false));
  }, []);

  console.log(buerList, "buerList>>>>>>>>>>>>>>>");
  console.log(transactionStatus, "transactionStatus");

  let nodes = [];
  if (buerList && buerList?.data) {
    for (let i = 0; i < buerList?.data.length; i++) {
      const item = buerList?.data[i];
      nodes.push({
        transaction_no: item._id,
        customer_id: item.customer_id,
        seller_id: item.seller_id,
        quotations: item.quotations,
        conversation: item.conversation,
        project: item.process_name,
        company_name: item.buyerDetails.name01,
        transaction_status: item.transaction_status,
        estimate_name: item.estimate_name,
        dept_name: item.dept_name,
        subtotal: item.subtotal,
        discount: item.discount,
        charge: item.charge,
        tax: item.tax,
        total: item.total,
        payment_total: item.payment_total,
        payment_id: item.payment_id,
        payment_method: item.payment_method,
        deliv_id: item.deliv_id,
        status: item.status,
        issue_date: item.issue_date,
        expiration_date: item.expiration_date,
        title: item.title,
        estimate_number: item.estimate_number,
        latestQuoteTotalExcludingTax:
          item.transaction_status === 5 &&
          item.refund &&
          item.refund.taxDetails &&
          item.refund.taxDetails.totalAmountIncludingTax !== 0
            ? item.latestQuoteTotalExcludingTax -
              item.refund.taxDetails.totalAmountExcludingTax
            : item.latestQuoteTotalExcludingTax,
        del_flg: item.del_flg,
        order_id: item.order_id,
        zip01: item.zip01,
        zip02: item.zip02,
        pref: item.pref,
        addr01: item.addr01,
        addr02: item.addr02,
        transport_costs: item.transport_costs,
        contract_agree: item.contract_agree,
        orderer_agree: item.orderer_agree,
        estimation_pdf: item.estimation_pdf,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        paymentDeposit: item.paymentDeposit,
        est_amount: 520000,
        deadline: "21/06/2024",
        detailed: "詳細",
        review: "レビュー",
        cancel: "キャンセル",
        __v: item.__v,
      });
    }
  }

  console.log(
    buerList?.data?.map((item) => item.paymentDeposit),
    "nodes>>>>>>>>>>>>>>>"
  );

  const COLUMNS = [
    {
      label: "取引No",
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
      label: "工程",
      key: "project",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] text-left line-clamp-3"
          style={{ whiteSpace: "normal" }}
        >
          {cell.project ? cell.project : "NA"}
        </div>
      ),
    },
    {
      label: "企業名",
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

    {
      label: "ステータス",
      key: "transaction_status", // Make sure you reference the correct field key
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] line-clamp-1"
          style={{ whiteSpace: "normal" }}
        >
          {orderStatusDescriptions[cell.transaction_status] || "NA"}
        </div>
      ),
    },
    {
      label: "納期",
      key: "deadline",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400]"
          style={{ whiteSpace: "normal" }}
        >
          {cell.deadline ? cell.deadline : "NA"}
        </div>
      ),
    },
    {
      label: "見積金額(税別)",
      key: "est_amount",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[400] break-all"
          style={{ whiteSpace: "normal" }}
        >
          {cell.latestQuoteTotalExcludingTax}
        </div>
      ),
    },
    {
      label: "詳細",
      key: "detailed",
      renderCell: (cell) => (
        <button
          onClick={() => navigate(`/transaction/${cell.transaction_no}`)}
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
    {
      label: "レビュー",
      key: "review",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[14px] font-[500] w-fit bg-[#E6E6E6] p-1 text-center mx-auto cursor-pointer"
          style={{ whiteSpace: "normal" }}
          onClick={() => {
            if (cell.paymentDeposit) {
              if (cell.transaction_status === 5) {
                setCancelReviewProgress(true);
              } else if (cell.transaction_status === 6) {
                setReviewCompletedModal(true);
              } else if (cell.transaction_status === 8) {
                router(`/transaction/${cell.transaction_no}`);
                dispatch(ShowReviewModalThunk(true));
                dispatch(showCancelModalThunk(false));
              } else {
                setReviewModal(true);
              }
            } else {
              setReviewModal(true);
            }
          }}
        >
          {cell.review}
        </div>
      ),
    },
    {
      label: "キャンセル",
      key: "cancel",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[13px] font-[500] w-fit bg-[#E6E6E6] p-1 text-center mx-auto cursor-pointer"
          // onClick={() => {
          //   if (cell.paymentDeposit) {
          //     if (
          //       cell.transaction_status !== 6 &&
          //       cell.transaction_status !== 7 &&
          //       cell.transaction_status !== 8 &&
          //       cell.transaction_status !== 9
          //     ) {
          //       if (cell.transaction_status === 5) {
          //         setCancelProgress(true);
          //         setTransactionId(cell.transaction_no );
          //       } else {
          //         router(`/transaction/${cell.transaction_no}`);
          //       }
          //     } else {
          //       setCancelModal(true);
          //     }
          //   } else {
          //     setCancelModal(true);
          //   }
          // }}

          onClick={() => {
            if (cell.paymentDeposit) {
              if (cell.transaction_status === 5) {
                setCancelProgress(true);
                setTransactionId(cell.transaction_no);
              } else if (
                cell.transaction_status === 6 ||
                cell.transaction_status === 8
              ) {
                setTransactionCompletedModal(true);
              } else if (
                cell.transaction_status !== 7 &&
                cell.transaction_status !== 9
              ) {
                router(`/transaction/${cell.transaction_no}`);
                dispatch(showCancelModalThunk(true));
                dispatch(ShowReviewModalThunk(false));
              } else {
                setCancelModal(true);
              }
            } else {
              setCancelModal(true);
            }
          }}
          style={{ whiteSpace: "normal" }}
        >
          {cell.transaction_status === 7 || cell.transaction_status === 9
            ? " "
            : cell.cancel}
        </div>
      ),
    },
  ];

  let filteredNodes = nodes;
  if (selectedStatus !== null) {
    filteredNodes = nodes.filter(
      (node) => node.transaction_status.toString() === selectedStatus
    );
  }

  const data = { nodes: filteredNodes };

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #255BB3;
        color: #fff;
        font-size: 14px;

      `,
      Table: `
      --data-table-library_grid-template-columns:1.7fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr 1.2fr 1.5fr 1.5fr;

    @media (max-width: 1150px) {
      --data-table-library_grid-template-columns:repeat(9,minmax(10px,500px));
        overflow-x: auto;
        width: 200% !important;
        white-space: nowrap;
      } 
      @media (max-width: 500px) {
        --data-table-library_grid-template-columns:repeat(9,minmax(10px,500px));
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

  const statusLabels = [
    { label: "ALL", key: ["10"] },
    { label: "商談中", key: ["1"] },
    { label: "受発注待ち", key: ["2"] },
    { label: "納品待ち", key: ["3"] },
    { label: "検収中", key: ["4"] },
    { label: "差戻し", key: ["5"] },
    { label: "取引完了", key: ["6"] },
    { label: "キャンセル", key: ["7", "9"] },
    { label: "決済完了", key: ["8"] },
  ];

  return (
    <>
      {loading && statusLoading ? (
        <Spinner />
      ) : other && other?.user?.partner_flg ? (
        <div className="mx-8 mt-[-0.5rem]">
          <div className="flex items-center justify-between sm:block my-4">
            <h1 className="sm:text-[#255BB3] text-[#808080] font-[700] sm:text-[24px] text-xl mb-4 md:mb-0">
              受注一覧
            </h1>
            <div className="flex items-center gap-2 sm:hidden">
              <h1 className="text-[#808080] text-sm font-medium">
                Filter By :{" "}
              </h1>
              {/* <DrawerTrigger> */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white bg-[#FFAA00] px-6 py-1 "
              >
                <RiFilter3Line className="w-6 h-6" />
              </button>
              {/* </DrawerTrigger> */}
            </div>
          </div>
          <div className="text-[14px] hidden sm:block font-medium text-center text-[#808080] border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px gap-2 mt-4">
              {statusLabels.map((status) => (
                <li
                  key={
                    Array.isArray(status.key)
                      ? status.key.join("-")
                      : status.key
                  }
                  className="me-2"
                >
                  <span
                    className={`inline-block p-1 text-[14px] ${
                      (
                        Array.isArray(status.key)
                          ? status.key.some((key) => filter.includes(key))
                          : filter.includes(status.key)
                      )
                        ? "border-b-2 border-[#255BB3] text-[#255BB3]"
                        : "border-transparent"
                    } rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer`}
                    onClick={(e) => {
                      e.preventDefault();
                      setFilter(
                        Array.isArray(status.key) && status.key.length > 1
                          ? status.key
                          : Array.isArray(status.key) && status.key.length === 1
                          ? [status.key[0]]
                          : [status.key.toString()]
                      );
                      handlePageChange(1);
                    }}
                  >
                    {status.label}(
                    {transactionStatus && transactionStatus?.countInfo
                      ? transactionStatus?.countInfo.reduce((acc, item) => {
                          if (Array.isArray(status.key)) {
                            return (
                              acc +
                              (status.key.includes(item.status.toString())
                                ? item.count
                                : 0)
                            );
                          }
                          return (
                            acc +
                            (item.status === parseInt(status.key)
                              ? item.count
                              : 0)
                          );
                        }, 0)
                      : 0}
                    )
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:hidden block">
            <DrawerDemo
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              statusLabels={statusLabels}
              setFilter={setFilter}
              handlePageChange={handlePageChange}
            />
          </div>
          {listLoading ? (
            <Spinner className="h-full" />
          ) : (
            <div className="mt-4 border-[1px] border-[#E6E6E6] overflow-x-auto">
              <CompactTable data={data} columns={COLUMNS} theme={theme} />
            </div>
          )}
          <div className="col-span-12 bg-[#F5F5F5] h-[60px] flex justify-center items-center gap-2 mt-[50px]">
            <div className="flex gap-1">
              {pageNumbers.map((value, index) => (
                <>
                  <button
                    className={`border w-[25px] ${
                      currentPage === value
                        ? "bg-primary text-white"
                        : "bg-white"
                    } border-[#DCDCDC]`}
                    key={index}
                    onClick={() => handlePageChange(value)}
                  >
                    {value}
                  </button>
                </>
              ))}
            </div>
            {endPage < buerList &&
              buerList.transactions?.pagination?.totalPages && (
                <div
                  className="flex gap-1 items-center cursor-pointer"
                  onClick={() => handlePageChange(endPage + 1)}
                >
                  <div className="font-[500] text-primary text-[16px] w-full">
                    次ページ
                  </div>
                  <svg
                    className=""
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                  >
                    <path
                      d="M15.4318 9L0.138137 17.6603L0.138138 0.339745L15.4318 9Z"
                      fill="#255BB3"
                    />
                  </svg>
                </div>
              )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center xs:gap-2 md:gap-10 w-full h-screen my-[75px]">
          Become a partner to view this page
        </div>
      )}

      <TransactionCancelModal
        cancelModalshow={cancelModal}
        setCancelModal={setCancelModal}
      />
      <ReviewTransDashboardModal
        reviewModalshow={reviewModalshow}
        setReviewModal={setReviewModal}
      />
      <CancelProgressReviewModal
        cancelProgressshow={cancelProgressReview}
        setCancelProgressModal={setCancelReviewProgress}
      />

      <CancelProgressModal
        cancelProgressshow={cancelProgress}
        setCancelProgressModal={setCancelProgress}
        transactionId={transactionId}
      />

      <TransactionCompletedModal
        completedTransactionModalshow={completedTransactionModal}
        setCompletedTransactionModal={setTransactionCompletedModal}
      />

      <ReviewCompletedModal
        completedTransactionModalshow={completedReviewModal}
        setCompletedTransactionModal={setReviewCompletedModal}
      />
    </>
  );
};

export default BuyingOrderList;
