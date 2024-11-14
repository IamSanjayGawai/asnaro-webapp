import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { CompactTable } from "@table-library/react-table-library/compact";
import Spinner from "@/components/static/Spinner";
import { selectAdmin } from "@/state/slices/adminSlice";
import { serachProcessForAdminThunk } from "@/state/thunks/adminThunks";
import { useTableTheme } from "@/utils/custom-hooks/useTableTheme";
import DeleteProcessInfoModal from "@/Admin/components/DeleteProcessInfoModal";

const ProcessManagement = () => {
  const { allProcess, searchProcessData, deleteProcesses, loading } =
    useAppSelector(selectAdmin);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const router = useNavigate();
  const theme = useTableTheme("1fr 1fr 1fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr", 10);

  // State variables to store input field values
  const [process_name, setProcessName] = useState("");
  const [status, setStatus] = useState("");
  const [seller_id, setSellerId] = useState("");
  const [seller_name, setSellerName] = useState("");
  const [process_id, setProcessId] = useState("");
  const [limit, setLimit] = useState(5);
  const [selectedId, setSelectedId] = useState([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [errorIfNoSelected, setErrorIfNoSelected] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(new URLSearchParams(location.search).get("page")) || 1
  );
  const [invalidError, setInvalidError] = useState<string>("");
  enum ErrorMessages {
    processidErr = "プロセスIDに無効な文字があります",
    selleridErr = "販売者IDに無効な文字が含まれています",
  }

  const handleProcessNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setProcessName(value);
  };

  const handleProcessIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setInvalidError(ErrorMessages.processidErr);
      setProcessId(value);
      value === "" && setInvalidError("");
    } else {
      setProcessId(value);
      setInvalidError("");
    }
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleSellerIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setInvalidError(ErrorMessages.selleridErr);
      setSellerId(value);
      value === "" && setInvalidError("");
    } else {
      setSellerId(value);
      setInvalidError("");
    }
  };
  const handleSellerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSellerName(event.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const fetchProcesses = (pageNumber, limit, resetPage = false) => {
    const params = {
      process_id,
      process_name,
      status,
      seller_id,
      seller_name,
      currentPage: pageNumber,
      limit,
    };

    if (resetPage) {
      setCurrentPage(1);
    }

    dispatch(serachProcessForAdminThunk(params));
    setSelectedId([]);
  };

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    router(`/admin/dashboard/process-management?page=${pageNumber}`);
  };

  // console.log("processes", searchProcessData);

  const handleDownloadCSV = async () => {
    try {
      const processIds =
        searchProcessData?.sortedCsvProcesses?.length > 0
          ? searchProcessData?.sortedCsvProcesses?.map((item) => item._id)
          : allProcess?.sortedCsvProcesses?.map((item) => item._id);

      if (!processIds || processIds.length === 0) {
        console.log("No process IDs available for download.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/download/csv`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            process_ids: processIds,
            formType: "process-list",
          }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "process_list.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handelSearch = (event) => {
    event.preventDefault();
    handlePageChange(1);
    setInvalidError("");
    fetchProcesses(1, limit, true);
  };

  useEffect(() => {
    fetchProcesses(currentPage, limit);
  }, [currentPage, deleteProcesses]);

  const nodes = searchProcessData?.data ||
    allProcess?.data || [" No data Found"];
  const processdata = {
    nodes: nodes.map((process) => {
      const statuses =
        process?.availabilities?.map(
          (availability) => availability.selectedStatus
        ) || [];

      const statusCounts = {
        Vacancies: 0,
        Adjustable: 0,
        "Consultation Required": 0,
        "No Vacancies": 0,
      };

      statuses.forEach((status) => {
        if (statusCounts[status] !== undefined) {
          statusCounts[status]++;
        }
      });

      const maxAvailability = Object.keys(statusCounts).reduce((a, b) =>
        statusCounts[a] > statusCounts[b] ? a : b
      );

      let availability = "";
      if (maxAvailability === "Vacancies") {
        availability = "空きあり";
      } else if (maxAvailability === "Adjustable") {
        availability = "調整可能";
      } else if (maxAvailability === "Consultation Required") {
        availability = "要相談";
      } else {
        availability = "空きなし";
      }

      return {
        key: process?._id || "NA",
        Process_ID: process?._id || "NA",
        Exhibiting_company_ID: process?.user?._id || "NA",
        Process_name: process?.name || "NA",
        category: process?.parent_category || "NA",
        tag: process?.tags || "NA",
        area: process?.mun || "NA",
        status: process?.status || "NA",
        evaluation: process?.unit_price || "NA",
        Number_of_free_days: availability,
      };
    }),
  };

  const handleSelectChange = (id) => {
    setSelectedId((prevSelected) => {
      const updatedSelected = prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id];
      console.log("Updated selected IDs:", updatedSelected);
      return updatedSelected;
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = searchProcessData?.data.map((item) => item._id) || [];
      setSelectedId(allIds);
      console.log("Selected all IDs:", allIds);
    } else {
      setSelectedId([]);
    }
  };

  const handleOpenDeleteMdodal = () => {
    if (selectedId.length === 0) {
      setErrorIfNoSelected(
        "削除するプロセスを少なくとも 1 つ選択してください。"
      );
      return;
    }
    setIsDeleteModal(true);
    setErrorIfNoSelected("");
  };

  const COLUMNS = [
    {
      label: (
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={selectedId.length === (searchProcessData?.data?.length || 0)}
        />
      ),
      key: "checkbox",
      renderCell: (cell) => (
        <input
          type="checkbox"
          checked={selectedId.includes(cell.Process_ID)}
          onChange={() => handleSelectChange(cell.Process_ID)}
        />
      ),
    },
    {
      label: <span className="flex justify-center">工程ID</span>,
      key: "Process_ID",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-3 text-center break-all"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/process-management-detail/${cell.Process_ID}`
            )
          }
        >
          {cell.Process_ID || "NA"}
        </div>
      ),
    },
    {
      label: "出品企業ID",
      key: "Exhibiting_company_ID",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-3 text-center break-all"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/process-management-detail/${cell.Process_ID}`
            )
          }
        >
          {cell.Exhibiting_company_ID || "NA"}
        </div>
      ),
    },
    {
      label: "工程名",
      key: "Process_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-3 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/process-management-detail/${cell.Process_ID}`
            )
          }
        >
          {cell.Process_name || "NA"}
        </div>
      ),
    },
    {
      label: "カテゴリ",
      key: "category",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/process-management-detail/${cell.Process_ID}`
            )
          }
        >
          {cell.category || "NA"}
        </div>
      ),
    },
    {
      label: "タグ",
      key: "tags",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] text-center break-all"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/process-management-detail/${cell.Process_ID}`
            )
          }
        >
          {cell.tag || "NA"}
        </div>
      ),
    },
    {
      label: "地域",
      key: "area",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/process-management-detail/${cell.Process_ID}`
            )
          }
        >
          {cell.area || "NA"}
        </div>
      ),
    },
    {
      label: "ステータス",
      key: "status",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/process-management-detail/${cell.Process_ID}`
            )
          }
        >
          {cell.status || "NA"}
        </div>
      ),
    },
    {
      label: "評価",
      key: "evaluation",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/process-management-detail/${cell.Process_ID}`
            )
          }
        >
          {cell.evaluation || "NA"}
        </div>
      ),
    },
    {
      label: "空き日数",
      key: "Number_of_free_days",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/process-management-detail/${cell.Process_ID}`
            )
          }
        >
          {cell.Number_of_free_days || "NA"}
        </div>
      ),
    },
  ];

  const startPage = Math.max(1, currentPage - Math.floor(10 / 2));
  const endPage = Math.min(
    startPage + 10 - 1,
    searchProcessData?.pagination?.totalPages ||
      allProcess?.pagination?.totalPages
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  // /admin/dashboard/process-registration

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mb-40">
          <div className="lg:mx-20 md:mx-8 xs:mx-8 flex flex-col mt-[50px]">
            <h1 className="text-[#808080] font-[700] text-[24px] mb-4">
              工程一覧
            </h1>
            <div className="w-full p-4 bg-[#F8F8F8] text-[#808080]">
              検索条件設定
              <form className="xs:w-full sm:w-full md:w-[18rem] lg:w-[20rem] flex flex-col justify-start">
                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    工程ID
                  </label>
                  <input
                    type="text"
                    className="border lg:text-[14px] xs:text-[12px] xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px]"
                    value={process_id}
                    onChange={handleProcessIdChange}
                  />
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    工程名
                  </label>
                  <input
                    type="text"
                    className="border lg:text-[14px] xs:text-[12px] xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px]"
                    value={process_name}
                    onChange={handleProcessNameChange}
                  />
                </div>

                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    出品企業ID
                  </label>
                  <input
                    type="text"
                    className="border lg:text-[14px] xs:text-[12px] xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px]"
                    value={seller_id}
                    onChange={handleSellerIdChange}
                  />
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    出品企業名
                  </label>
                  <input
                    type="text"
                    className="border lg:text-[14px] xs:text-[12px] xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px]"
                    value={seller_name}
                    onChange={handleSellerNameChange}
                  />
                </div>
                <div className="flex flex-row items-center mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    ステータス
                  </label>
                  <select
                    id="first_name"
                    className="text-tertiary h-[25px] border-[1px] border-[#DCDCDC] px-10 outline-0 text-sm ml-[3.5rem] lg:text-[14px] xs:text-[12px]"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <option className="text-tertiary" value="">
                      status
                    </option>
                    <option className="text-tertiary" value="release">
                      release
                    </option>
                    <option className="text-tertiary" value="private">
                      private
                    </option>
                  </select>
                </div>
                <div className="flex xs:flex-row lg:flex-col lg:items-center justify-between mb-3 text-[#808080] lg:text-[14px] xs:text-[12px] mt-5">
                  <div className="flex flex-row lg:w-full lg:gap-[4.5rem] xs:gap-3">
                    <label className="text-[#808080] lg:text-[14px] xs:text-[12px] xs:mt-[5px]">
                      表示件数
                    </label>
                    <div className="flex flex-row md:flex-row items-center">
                      <select
                        id="first_name"
                        className="text-tertiary border-[1px] h-[25px] border-[#DCDCDC] lg:px-4 xs:px-1 outline-0 lg:text-[14px] xs:text-[12px] bg-white focus:ring-0 focus:border"
                        value={limit}
                        onChange={handleLimitChange}
                      >
                        {[1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(
                          (value, index) => (
                            <option key={index} value={value}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                      <span className="ml-2"> 件</span>
                    </div>
                  </div>
                  <div className="lg:w-full flex justify-end items-center lg:hidden xs:block lg:mt-2 lg:text-[14px] xs:text-[12px]">
                    <button
                      className="text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1"
                      onClick={handelSearch}
                      type="submit"
                    >
                      この条件で検索する
                    </button>
                  </div>
                </div>
              </form>
              <div className="lg:w-full flex justify-center items-center">
                <button
                  className="text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1 lg:mt-2 lg:text-[14px] xs:text-[12px] xs:hidden lg:block"
                  onClick={handelSearch}
                >
                  この条件で検索する
                </button>
              </div>
              {invalidError && <p className="text-fifth">{invalidError}</p>}
            </div>
          </div>
          <div className="lg:mx-20 md:mx-8 xs:mx-8 mt-[3rem] lg:min-w-[900px]  ">
            <span className="text-center text-[red] lg:text-[14px] xs:text-[12px] break-all   lg:hidden sm:hidden md:hidden ">
              {errorIfNoSelected}
            </span>
            <div className="flex items-center justify-between sm:block">
              <div className="flex justify-end gap-2">
                <span className="text-center text-[red] lg:text-[14px] xs:text-[12px] break-all md:block  sm:block xs:hidden lg:block">
                  {errorIfNoSelected}
                </span>
                <button
                  onClick={() => {
                    handleOpenDeleteMdodal();
                  }}
                  className="text-white bg-[#808080] px-5 py-1 lg:text-[14px] xs:text-[12px]"
                >
                  消去
                </button>
                <button
                  onClick={() =>
                    router("/admin/dashboard/process-registration")
                  }
                  className="text-white bg-[#255BB3] px-5 py-1 lg:text-[14px] xs:text-[12px]"
                >
                  新規登録
                </button>

                <button
                  onClick={handleDownloadCSV}
                  className="text-white bg-[#FFAA00] px-5 py-1 lg:text-[14px] xs:text-[12px]"
                >
                  CSV出力
                </button>
              </div>
            </div>
            <div
              className={`mt-4  overflow-x-auto ${
                searchProcessData?.data?.length == 0
                  ? "flex justify-center items-center"
                  : "border-[1px] border-[#E6E6E6]"
              }`}
            >
              {searchProcessData &&
              searchProcessData?.data &&
              searchProcessData?.data?.length === 0 ? (
                `${
                  process_name ||
                  status ||
                  seller_id ||
                  seller_name ||
                  process_id
                }」に一致する結果はありません。別のキーワードをお試しください`
              ) : (
                <CompactTable
                  data={processdata}
                  columns={COLUMNS}
                  theme={theme}
                  layout={{ custom: true, horizontalScroll: true }}
                />
              )}
            </div>
            <div className="col-span-12 bg-[#F5F5F5] h-[60px] flex justify-center items-center gap-2 mt-[50px]">
              <div className="flex gap-1">
                {searchProcessData &&
                  searchProcessData?.data &&
                  searchProcessData?.data?.length !== 0 &&
                  pageNumbers.map((value, index) => (
                    <button
                      className={`border w-[25px] ${
                        (
                          searchProcessData?.data?.length > 0
                            ? currentPage === value
                            : currentPage === value
                        )
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
              {endPage < searchProcessData?.pagination?.totalPages ||
                (allProcess?.pagination?.totalPages &&
                  searchProcessData?.pagination?.totalPages < 1 && (
                    <div
                      className="flex gap-1 items-center cursor-pointer"
                      onClick={() => handlePageChange(endPage)}
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
                  ))}
            </div>
          </div>
        </div>
      )}
      <DeleteProcessInfoModal
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
        id={selectedId}
      />
    </>
  );
};

export default ProcessManagement;
