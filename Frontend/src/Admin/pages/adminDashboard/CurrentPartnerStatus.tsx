import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { CompactTable } from "@table-library/react-table-library/compact";
import ApprovalModal from "@/Admin/components/ApprovalModal";
import Spinner from "@/components/static/Spinner";
import { selectAdmin } from "@/state/slices/adminSlice";
import { currentPartnerInfoThunk } from "@/state/thunks/adminThunks";
import React from "react";
import { useTableTheme } from "@/utils/custom-hooks/useTableTheme";

const CurrentPartnerStatus = () => {
  const { loading } = useAppSelector(selectAdmin);
  const { allpartnersData, partnerListLoading } = useAppSelector(selectAdmin);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [idToApprove, setIdToApprove] = useState<any>(null);
  const dispatch = useAppDispatch();
  const theme = useTableTheme("1.2fr 2fr 2fr 4fr", 4);
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  // Extracting uid from the URL params

  const router = useNavigate();

  const maxButtons = 10;
  const startPage = Math.max(
    1,
    allpartnersData?.pagination?.currentPage - Math.floor(maxButtons / 2)
  );
  const endPage = Math.min(
    allpartnersData?.pagination?.totalPages,
    startPage + maxButtons - 1
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(currentPartnerInfoThunk(currentPage));
    };

    fetchData();
  }, [currentPage, dispatch, partnerListLoading]);

  let nodes = [];
  React.useEffect(() => {
    if (Array.isArray(allpartnersData?.partners)) {
      const updatedNodes =
        allpartnersData &&
        allpartnersData?.partners?.map((company) => ({
          admit: company.partner_flg,
          Enterprise_ID: company._id || "NA",
          Registered_Date: company.createdAt || "NA",
          Company_name: company.name01 || "NA",
        }));
      setData({ nodes: updatedNodes });
    }
  }, [allpartnersData, allpartnersData?.partners]);

  //

  const [data, setData] = useState({ nodes });

  // const handleAdmitPartners = (value, id, property) => {
  //   setData((state) => ({
  //     ...state,
  //     nodes: state.nodes.map((node) => {
  //       if (node.Enterprise_ID === id) {
  //         return { ...node, [property]: value };
  //       } else {
  //         return node;
  //       }
  //     }),
  //   }));
  //   setIdToApprove(id);
  //   setShowModal(true);
  // };

  
  const handleAdmitPartners = ( id) => {
    setData((state) => ({
      ...state,
      nodes: state.nodes.map((node) => {
        if (node.Enterprise_ID === id) {
          return { ...node };
        } else {
          return node;
        }
      }),
    }));
    setIdToApprove(id);
    setShowModal(true);
  };


  const COLUMNS = [
    {
      label: "承認",
      key: "admit",
      renderCell: (cell) => (
        <div className="flex items-center ">
          <input
            type="checkbox"
            checked={cell.admit}
            // onChange={(event) =>
            //   handleAdmitPartners(
            //     event.target.checked,
            //     cell.Enterprise_ID,
            //     "admit"
            //   )
            // }
                    onChange={() =>
              handleAdmitPartners(
           
                cell.Enterprise_ID,

              )
            }
          />
        </div>
      ),
    },

    {
      label: "企業ID",
      key: "Enterprise_ID",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
          style={{ whiteSpace: "normal" }}
        >
          {cell.Enterprise_ID}
        </div>
      ),
    },
    {
      label: "登録日時",
      key: "Registered_Date",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
          style={{ whiteSpace: "normal" }}
        >
          {new Date(cell.Registered_Date).toISOString().split("T")[0]}
        </div>
      ),
    },
    {
      label: <span className="flex justify-center items-center ">企業名</span>,
      key: "Company_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-3 text-center break-all"
          style={{ whiteSpace: "normal" }}
        >
          {cell.Company_name}
        </div>
      ),
    },
  ];

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    router(`/admin/dashboard?page=${pageNumber}`);
  };

  // console.log("allpartnersData", allpartnersData);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full mb-40">
          <div className="lg:mx-20 md:mx-8 xs:mx-8 flex  flex-col xs:mt-[24px] md:mt-[50px]">
            <h1 className="text-[#808080] font-[700] text-[24px] mb-4">
              現在の取引先企業の状況
            </h1>
            <textarea className="w-full h-[150px] border-[1px]  p-4 resize-none " />
          </div>

          <div className="lg:mx-20 md:mx-8 xs:mx-8 mt-[3rem]  lg:min-w-[900px] ">
            <div className="flex items-center justify-between sm:block ">
              <h1 className="sm:text-[#808080] text-[#808080] font-[700] sm:text-[24px] text-xl  md:mb-0">
                パートナー管理
              </h1>
            </div>
            <div className="text-sm hidden sm:block  font-medium text-center text-[#808080]  dark:text-gray-400">
              <ul className="flex flex-wrap -mb-px gap-4 mt-4 ">
                <li className="me-2">
                  <a
                    href="#"
                    className="inline-block p-1 text-[12px] text-[#808080] rounded-t-lg active dark:text-[#808080] "
                    aria-current="page"
                  >
                    ※パートナー未承認企業が一覧で表示されます
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-4 border-[1px] border-[#E6E6E6] overflow-x-auto">
              {!partnerListLoading &&
              allpartnersData &&
              allpartnersData.partners?.length > 0 ? (
                <CompactTable
                  data={data}
                  columns={COLUMNS}
                  theme={theme}
                  layout={{ custom: true, horizontalScroll: true }}
                />
              ) : !partnerListLoading &&
                allpartnersData &&
                allpartnersData.partners?.length === 0 ? (
                <div>No incoming partner requests or unapproved partners</div>
              ) : (
                <Spinner className="w-full h-full" />
              )}
            </div>
            <div className="col-span-12 bg-[#F5F5F5] h-[60px] flex justify-center items-center gap-2 mt-[50px]">
              <div className="flex gap-1">
                {pageNumbers.map((value, index) => (
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
                ))}
              </div>
              {endPage < allpartnersData?.pagination?.totalPages && (
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
        </div>
      )}
      {showModal ? (
        <ApprovalModal
          showModal={showModal}
          setShowModal={setShowModal}
          idToApprove={idToApprove}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default CurrentPartnerStatus;
