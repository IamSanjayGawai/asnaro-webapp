import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { CompactTable } from "@table-library/react-table-library/compact";
import Spinner from "@/components/static/Spinner";
import { allApprovedPartnersThunk } from "@/state/thunks/adminThunks";
import { selectAdmin } from "@/state/slices/adminSlice";
import ApproveREmoveModal from "@/Admin/components/ApproveREmoveModal";
import { useTableTheme } from "@/utils/custom-hooks/useTableTheme";
// import DeletePartnerInfoModal from "@/Admin/components/DeletePartnerInfoModal";

const PartnerManagement = () => {
  const { allApprovedPartners, loading, partnerListLoading } =
    useAppSelector(selectAdmin);
  const dispatch = useAppDispatch();
  const [showPartnerModal, setShowModal] = useState(false);
  const [idToApprove, setIdToApprove] = useState<any>(null);
  const [partnerFlagStatus, setPartnerFlagStatus] = useState();
  // const [checked, setChecked] = useState(false);
  // const [selectedId, setSelectedId] = useState([]);
  // const [isDeleteModal, setIsDeleteModal] = useState(false);
  // const [errorIfNoSelected, setErrorIfNoSelected] = useState("");
  const theme = useTableTheme("1fr 2fr 4fr 4fr 4fr 3fr", 6);
  // pagination
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const router = useNavigate();
  const maxButtons = 10;
  const startPage = Math.max(
    1,
    allApprovedPartners?.pagination?.currentPage - Math.floor(maxButtons / 2)
  );
  const endPage = Math.min(
    allApprovedPartners?.pagination?.totalPages,
    startPage + maxButtons - 1
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    router(`/admin/dashboard/partner-management?page=${pageNumber}`);
  };

  // const handleUpdate = (value, id, partner_flg, property) => {
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
  //   setPartnerFlagStatus(partner_flg);
  // };

  const handleUpdate = (id, partner_flg) => {
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
    setPartnerFlagStatus(partner_flg);
  };

  useEffect(() => {
    dispatch(allApprovedPartnersThunk(currentPage));
  }, [currentPage, dispatch, partnerListLoading]);

  let nodes = [];
  useEffect(() => {
    if (Array.isArray(allApprovedPartners?.users)) {
      const updatedNodes =
        allApprovedPartners &&
        allApprovedPartners?.users?.map((company) => ({
          admit: company?.partner_flg,
          Enterprise_ID: company?._id || "NA",
          Registered_Date: company?.createdAt
            ? new Date(company.createdAt).toISOString().split("T")[0]
            : "NA",
          Partner_Request_Date: company?.partner_request_time
            ? new Date(company.partner_request_time).toISOString().split("T")[0]
            : "No incoming request",
          Company_name: company?.name01 || "NA",
          partner_status: company?.partner_status || "NA",
        }));
      setData({ nodes: updatedNodes });
    }
  }, [allApprovedPartners]);

  const [data, setData] = useState({ nodes });
  console.log("data:", data);

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleDownloadCSV = async () => {
    try {
      const partnerIds =
        allApprovedPartners?.csvPartners?.length > 0
          ? allApprovedPartners.csvPartners.map((item) => item._id)
          : allApprovedPartners?.csvPartners?.map((item) => item._id);
      console.log("allApprovedPartners partnerIds:", partnerIds);

      if (!partnerIds) {
        console.error("No partner IDs available for download.");
        return;
      }

      const response = await fetch(`${VITE_BASE_URL}/admin/download/csv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partner_Ids: partnerIds,
          formType: "partner-list",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "partner-list.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  // const handleSelectChange = (id) => {
  //   setSelectedId((prevSelected) => {
  //     const updatedSelected = prevSelected.includes(id)
  //       ? prevSelected.filter((item) => item !== id)
  //       : [...prevSelected, id];
  //     console.log("Updated selected IDs:", updatedSelected);
  //     return updatedSelected;
  //   });
  // };

  // const handleSelectAll = (e) => {
  //   if (e.target.checked) {
  //     const allIds = data?.nodes.map((item) => item.Enterprise_ID) || [];
  //     setSelectedId(allIds);
  //     console.log("Selected all IDs:", allIds);
  //   } else {
  //     setSelectedId([]);
  //     console.log("Deselected all IDs");
  //   }
  // };

  // const handleOpenDeleteMdodal = () => {
  //   if (selectedId.length === 0) {
  //     setErrorIfNoSelected(
  //       "削除するパートナー項目を少なくとも 1 つ選択してください。"
  //     );
  //     return;
  //   }
  //   setIsDeleteModal(true);
  //   setErrorIfNoSelected("");
  // };

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
            //   handleUpdate(
            //     event.target.checked,
            //     cell.Enterprise_ID,
            //     cell.admit,
            //     "admit"
            //   )
            // }
            onChange={() => handleUpdate(cell.Enterprise_ID, "admit")}
          />
        </div>
      ),
    },

    {
      label: "パートナー状態",
      key: "partner_status",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
          style={{ whiteSpace: "normal" }}
        >
          {cell.partner_status}
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
      key: "Registerd_Date",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
          style={{ whiteSpace: "normal" }}
        >
          {cell.Registered_Date}
        </div>
      ),
    },
    {
      label: "Partner Request Date",
      key: "Partner_Request_Date",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
          style={{ whiteSpace: "normal" }}
        >
          {cell.Partner_Request_Date}
        </div>
      ),
    },
    {
      label: "企業名",
      key: "Company name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
          style={{ whiteSpace: "normal" }}
        >
          {cell.Company_name}
        </div>
      ),
    },
  ];

  // console.log("pageNumbers:", pageNumbers);
  // console.log("endPage:", endPage);
  // console.log("allApprovedPartners:", allApprovedPartners);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mb-40">
          <div className="lg:mx-20 md:mx-8 xs:mx-8 flex  flex-col xs:mt-[24px] md:mt-[50px]">
            <h1 className="text-[#808080] font-[700] text-[24px] mb-4">
              パートナー管理
            </h1>
          </div>

          <div className="lg:mx-20 md:mx-8 xs:mx-8 mt-[3rem]  lg:min-w-[900px] ">
            {/* <span className="text-center text-[red] lg:text-[14px] xs:text-[12px] break-all   lg:hidden sm:hidden md:hidden ">
              {errorIfNoSelected}
            </span> */}
            <div className="flex items-center justify-between sm:block ">
              <div className="flex justify-end gap-2 text-center">
                {/* <span className="text-center text-[red] lg:text-[14px] xs:text-[12px] break-all md:block  sm:block xs:hidden lg:block">
                  {errorIfNoSelected}
                </span> */}
                {/* <button
                  onClick={() => {
                    handleOpenDeleteMdodal();
                  }}
                  className="text-white bg-[#808080] px-5 py-1 lg:text-[14px] xs:text-[12px]"
                >
                  消去
                </button> */}
                {/*CSVDTrigger */}
                <button
                  onClick={() => {
                    handleDownloadCSV();
                  }}
                  className="text-white bg-[#FFAA00] px-5 py-1 "
                >
                  CSV出力
                </button>
              </div>
            </div>

            <div className="mt-4 border-[1px] border-[#E6E6E6] overflow-x-auto">
              {!partnerListLoading ? (
                <CompactTable
                  data={data}
                  columns={COLUMNS}
                  theme={theme}
                  layout={{ custom: true, horizontalScroll: true }}
                />
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
              {endPage < allApprovedPartners?.pagination?.totalPages && (
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
      {showPartnerModal ? (
        <ApproveREmoveModal
          showPartnerModal={showPartnerModal}
          setShowModal={setShowModal}
          idToApprove={idToApprove}
          partnerFlagStatus={partnerFlagStatus}
        />
      ) : (
        ""
      )}

      {/* <DeletePartnerInfoModal
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
        id={selectedId}
      /> */}
    </>
  );
};

export default PartnerManagement;
