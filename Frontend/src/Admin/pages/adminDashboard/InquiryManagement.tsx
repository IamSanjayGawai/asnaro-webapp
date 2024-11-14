import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/state/hooks";
import { selectUser } from "@/state/slices/userSlice";
import { CompactTable } from "@table-library/react-table-library/compact";
import Spinner from "@/components/static/Spinner";
import { selectAdmin } from "@/state/slices/adminSlice";
import { useAppDispatch } from "@/state/hooks";
import { adminGetAllInquriesThunk } from "@/state/thunks/adminThunks";
import DeleteEnquiryModal from "@/Admin/components/DeleteEnquiryModal";
import { useTableTheme } from "@/utils/custom-hooks/useTableTheme";
const InquiryManagement = () => {
  const { loading } = useAppSelector(selectUser);
  const { allinquiryData } = useAppSelector(selectAdmin);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const theme = useTableTheme("1fr 2fr 2fr 2fr 2fr 3fr 1fr", 7);

  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<any>(null); // State to hold the ID to delete
  console.log("allinquiryData", allinquiryData);

  const dispatch = useAppDispatch();

  console.log(allinquiryData, "++++++++++++dispatch++++++++++++");
  useEffect(() => {
    dispatch(adminGetAllInquriesThunk(currentPage));
  }, [showModal, currentPage]);

  const maxButtons = 10;
  const startPage = Math.max(
    1,
    allinquiryData?.currentPage - Math.floor(maxButtons / 2)
  );
  const endPage = Math.min(
    allinquiryData?.totalPages,
    startPage + maxButtons - 1
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    // router(`/admin/dashboard/inquiry-management/${uid}?page=${pageNumber}`);
    router(`/admin/dashboard/inquiry-management?page=${pageNumber}`);
  };

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;
  const handleDownloadCSV = async () => {
    try {
      // Check if inquiries data is available
      if (
        !allinquiryData?.inquiries ||
        !Array.isArray(allinquiryData.inquiries)
      ) {
        console.error("Inquiries data is not available");
        return;
      }

      // Extract _id from each inquiry to form the process_ids array
      const processIds = allinquiryData?.csvInquiries?.map((inquiry) => inquiry._id);

      // Proceed with the fetch request if there are IDs to process
      if (processIds.length > 0) {
        const response = await fetch(`${VITE_BASE_URL}/admin/download/csv`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Pass the dynamically generated array of process_ids
          body: JSON.stringify({
            process_ids: processIds,
            formType: "inquiry",
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "inquiries_list.csv"); // Set a meaningful name for the downloaded file
        document.body.appendChild(link);
        link.click();
      } else {
        console.log("No inquiry IDs found for CSV export");
      }
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  let nodes = [];
  useEffect(() => {
    if (allinquiryData?.inquiries && Array.isArray(allinquiryData.inquiries)) {
      const updatedNodes = allinquiryData.inquiries.map((inquiry) => ({
        ...inquiry, // Spread all properties to keep the data structure
        situation: inquiry.situation ? "未読" : "NA", // Add or modify properties as needed
        date_time: inquiry.createdAt || "NA",
        fullname: inquiry.name || "NA",
        member_id: inquiry._id || "NA",
        delete: "削除",
      }));
      setData({ nodes: updatedNodes });
    }
  }, [allinquiryData]);

  // Other code...

  console.log("admin all enquries component", nodes);

  const [data, setData] = useState({ nodes });

  const handleDelete = (value, id, property) => {
    setData((state) => ({
      ...state,
      nodes: state.nodes.map((node) => {
        if (node.member_id === id) {
          setIdToDelete(id);
          return { ...node, [property]: value };
        } else {
          return node;
        }
      }),
    }));
    setShowModal(true);
  };

  const COLUMNS = [
    {
      label: <span className="flex justify-center items-center">状況</span>,
      key: "situation",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3  "
          style={{ whiteSpace: "normal" }}
        >
          {cell.situation}
        </div>
      ),
    },

    {
      label: "日時",
      key: "date_time",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3  "
          style={{ whiteSpace: "normal" }}
        >
          {new Date(cell.date_time).toISOString().split("T")[0]}
        </div>
      ),
    },
    {
      label: "氏名",
      key: "fullname",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3  "
          style={{ whiteSpace: "normal" }}
        >
          {cell.fullname}
        </div>
      ),
    },
    {
      label: "会員ID",
      key: "member_id",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3  "
          style={{ whiteSpace: "normal" }}
        >
          {cell.member_id}
        </div>
      ),
    },

    {
      label: "メールアドレス",
      key: "email",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3  "
          style={{ whiteSpace: "normal" }}
        >
          {cell.email}
        </div>
      ),
    },
    {
      label: <span className="flex justify-center items-center">内容</span>,
      key: "message",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3  text-center "
          style={{ whiteSpace: "normal" }}
        >
          {cell.message}
        </div>
      ),
    },
    {
      label: "削除",
      key: "delete",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center  bg-[#D9D9D9] py-1 px-2 cursor-pointer"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            handleDelete(cell.member_id, cell.member_id, "member_id")
          }
        >
          {cell.delete}
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full mb-40 ">
          <div className="lg:mx-20 md:mx-8 xs:mx-8 flex  flex-col xs:mt-[24px] md:mt-[50px]">
            <h1 className="text-[#808080] font-[700] text-[24px] mb-4">
              お問い合わせ管理
            </h1>
          </div>

          <div className=" lg:mx-20 md:mx-8 xs:mx-8 mt-[3rem]  lg:min-w-[900px]">
            <div className="flex items-center justify-between sm:block ">
              <h1 className="sm:text-[#808080] text-[#808080] font-[700] sm:text-[24px] text-xl  md:mb-0"></h1>
              <div className="flex  justify-end gap-2 ">
                {/*CSVDTrigger */}
                <button
                  onClick={handleDownloadCSV}
                  className="text-white bg-[#FFAA00] px-5 py-1 lg:text-[14px] xs:text-[12px]"
                >
                  CSV出力
                </button>
              </div>
            </div>

            <div className="mt-4 border-[1px] border-[#E6E6E6] overflow-x-auto">
              <CompactTable
                data={data}
                columns={COLUMNS}
                theme={theme}
                layout={{ custom: true, horizontalScroll: true }}
              />
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
              {endPage < allinquiryData?.totalPages && (
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
        <DeleteEnquiryModal
          showModal={showModal}
          setShowModal={setShowModal}
          idToDelete={idToDelete}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default InquiryManagement;
