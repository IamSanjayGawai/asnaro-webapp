import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/state/hooks";
import { useTableTheme } from "@/utils/custom-hooks/useTableTheme";
import { CompactTable } from "@table-library/react-table-library/compact";
import { OrderNodesType, searchDataType } from "@/types/types";
import { orderSearchAdmin } from "@/api/admin";
import Spinner from "@/components/static/Spinner";
import { statusSwitchToText } from "@/utils/statusSwitch";
import DeleteOrderInfoModal from "@/Admin/components/DeleteOrderInfoModal";
import { selectAdmin } from "@/state/slices/adminSlice";

const statusValuesArray: string[] = [
  "商談中",
  "受発注待ち",
  "納品待ち",
  "検収中",
  "差戻し",
  "取引完了",
  "キャンセル",
  "決済完了",
];

const initialSearchDataValues = {
  transactionId: "",
  sellerId: "",
  sellerName: "",
  buyerId: "",
  buyerName: "",
  status: "ステータス",
  processName: "",
  startDate: "",
  endDate: "",
  pageSize: 5,
};

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const OrderManagement = () => {
  const router = useNavigate();
  const { loading, deleteTransactions } = useAppSelector(selectAdmin);
  const location = useLocation();
  const theme = useTableTheme("1fr 1.2fr 2fr 2fr 2fr 2fr 2fr", 7);
  const nodes = [
    {
      id: "",
      no: "",
      Ordering_company_ID: "",
      Order_company_ID: "",
      Process_name: "",
      Status: "",
      Period: "",
    },
  ];
  const [data, setData] = useState<OrderNodesType>({ nodes });
  const [orders, setOrders] = useState<{data ?: any, csvTransactions ?: any}>({});
  const [selectedId, setSelectedId] = useState([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [errorIfNoSelected, setErrorIfNoSelected] = useState("");
  const [change, setChange] = useState(true);

  const [searchData, setSearchData] = useState<searchDataType>(
    initialSearchDataValues
  );
  const [notFound, setNotFound] = useState<string>("");
  const [paginationResponse, setPaginationResponse] = useState<{
    currentPage: number;
    totalPages: number;
    totalTransactions: number;
  }>(null);
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    page ? parseInt(page) : 1
  );
  const maxButtons = 10;
  const startPage = Math.max(
    1,
    paginationResponse?.currentPage - Math.floor(maxButtons / 2)
  );
  const endPage = Math.min(
    paginationResponse?.totalPages,
    startPage + maxButtons - 1
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  useEffect(() => {
    fetchOrders();
  }, [ change, currentPage, deleteTransactions]);

  const handleDownloadCSV = async () => {
    try {
      const order_Ids = orders?.csvTransactions

      if (!order_Ids || order_Ids.length === 0) {
        console.error("No partner IDs available for download.");
        return;
      }

      const response = await fetch(`${VITE_BASE_URL}/admin/download/csv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_Ids,
          formType: "order_info",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "order_info_list.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handlePageChange = async (pageNumber) => {
    if (currentPage===1){
      setChange(!change);
    }
    setCurrentPage(pageNumber);
    router(`/admin/dashboard/order-management?page=${pageNumber}`);
  };

  console.log("currentPage", currentPage);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  // const resetSearch = () => {
  //   setSearchData({
  //     ...initialSearchDataValues,
  //     pageSize: searchData.pageSize,
  //   });
  // };

  const fetchOrders = async () => {
    if (searchData.status === "ステータス") {
      searchData.status = "";
    }
    
    console.log("searchData", searchData);

    const response = await orderSearchAdmin(searchData, page);
    console.log("response", response)
    if (response?.data){
      setOrders(response);
    }
    if (response?.data && response?.data?.length === 0) {
      console.log("reached")
      setNotFound("No data found");
      return;
    }

    setData({
      nodes:
        response?.data && response?.data?.length > 0
          ? response?.data?.map(
              (transaction: {
                _id: string;
                customer_id: string;
                seller_id: string;
                process_name: string;
                transaction_status: number;
                createdAt: string;
              }) => {
                return {
                  no: transaction?._id,
                  Ordering_company_ID: transaction?.customer_id,
                  Order_company_ID: transaction?.seller_id,
                  Process_name: transaction?.process_name,
                  Status: statusSwitchToText(transaction?.transaction_status),
                  Period: new Date(transaction?.createdAt)
                    .toISOString()
                    .split("T")[0],
                };
              }
            )
          : [],
    });
    setPaginationResponse({
      currentPage: response?.pagination?.currentPage,
      totalPages: response?.pagination?.totalPages,
      totalTransactions: response?.pagination?.totalTransactions,
    });
    // resetSearch();
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotFound("");
    handlePageChange(1);
  };

  const useNavigationCallback = () => {
    const navigate = useNavigate();
    return (id: string) => {
      navigate("/admin/dashboard/order-management-detail/" + id);
    };
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
      const allIds = data?.nodes.map((item) => item.no) || [];
      setSelectedId(allIds);
      console.log("Selected all IDs:", allIds);
    } else {
      setSelectedId([]);
    }
  };

  const handleOpenDeleteMdodal = () => {
    if (selectedId.length === 0) {
      setErrorIfNoSelected("削除する注文を少なくとも 1 つ選択してください");
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
          checked={selectedId.length === (data?.nodes.length || 0)}
        />
      ),
      key: "checkbox",
      renderCell: (cell) => (
        <input
          type="checkbox"
          checked={selectedId.includes(cell.no)}
          onChange={() => handleSelectChange(cell.no)}
        />
      ),
    },
    {
      label: <span className="flex justify-center">No</span>,
      key: "no",
      renderCell: (cell) => {
        const navigationCallBack = useNavigationCallback();
        return (
          <div
            onClick={() => {
              navigationCallBack(cell.no);
            }}
            className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
            style={{ whiteSpace: "normal" }}
          >
            {cell.no}
          </div>
        );
      },
    },
    {
      label: "発注企業ID",
      key: "Ordering_company_ID",
      renderCell: (cell) => {
        const navigationCallBack = useNavigationCallback();
        return (
          <div
            onClick={() => {
              navigationCallBack(cell.no);
            }}
            className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
            style={{ whiteSpace: "normal" }}
          >
            {cell.Ordering_company_ID}
          </div>
        );
      },
    },
    {
      label: "受注企業ID",
      key: "Order_company_ID",
      renderCell: (cell) => {
        const navigationCallBack = useNavigationCallback();
        return (
          <div
            onClick={() => {
              navigationCallBack(cell.no);
            }}
            className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
            style={{ whiteSpace: "normal" }}
          >
            {cell.Order_company_ID}
          </div>
        );
      },
    },
    {
      label: "工程名",
      key: "Process_name",
      renderCell: (cell) => {
        const navigationCallBack = useNavigationCallback();
        return (
          <div
            onClick={() => {
              navigationCallBack(cell.no);
            }}
            className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
            style={{ whiteSpace: "normal" }}
          >
            {cell.Process_name}
          </div>
        );
      },
    },
    {
      label: "ステータス",
      key: "Status",
      renderCell: (cell) => {
        const navigationCallBack = useNavigationCallback();
        return (
          <div
            onClick={() => {
              navigationCallBack(cell.no);
            }}
            className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
            style={{ whiteSpace: "normal" }}
          >
            {cell.Status}
          </div>
        );
      },
    },
    {
      label: <span className="flex justify-center">期間</span>,
      key: "Period",
      renderCell: (cell) => {
        const navigationCallBack = useNavigationCallback();
        return (
          <div
            onClick={() => {
              navigationCallBack(cell.no);
            }}
            className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center"
            style={{ whiteSpace: "normal" }}
          >
            {cell.Period}
          </div>
        );
      },
    },
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full mb-40">
          <form
            onSubmit={handleSearchSubmit}
            className="lg:mx-20 md:mx-8 xs:mx-8 flex  flex-col xs:mt-[24px] md:mt-[50px]"
          >
            <h1 className="text-[#808080] font-[700] text-[24px] mb-4">
              受発注管理
            </h1>
            <div className="w-full p-4 bg-[#F8F8F8] text-[#808080]">
              検索条件設定
              <div className="xs:w-full sm:w-full md:w-[18rem] lg:w-[20rem] flex  flex-col justify-start">
                <div className="flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    発注No
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={searchData.transactionId}
                    onChange={handleInput}
                    className="border lg:text-[14px] xs:text-[12px]  xs:mt-[5px]   lg:h-[30px] md:h-[30px] xs:h-[39px]"
                  />
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    発注企業ID
                  </label>
                  <input
                    type="text"
                    name="buyerId"
                    value={searchData.buyerId}
                    onChange={handleInput}
                    className="border lg:text-[14px] xs:text-[12px] xs:mt-[5px]   lg:h-[30px] md:h-[30px] xs:h-[39px]"
                  />
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    発注企業名
                  </label>
                  <input
                    type="text"
                    name="buyerName"
                    value={searchData.buyerName}
                    onChange={handleInput}
                    className="border lg:text-[14px] xs:text-[12px] xs:mt-[5px]   lg:h-[30px] md:h-[30px] xs:h-[39px]"
                  />
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    受注企業ID
                  </label>
                  <input
                    type="text"
                    name="sellerId"
                    value={searchData.sellerId}
                    onChange={handleInput}
                    className="border lg:text-[14px] xs:text-[12px] xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px]"
                  />
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    受注企業名
                  </label>
                  <input
                    type="text"
                    name="sellerName"
                    value={searchData.sellerName}
                    onChange={handleInput}
                    className="border lg:text-[14px] xs:text-[12px] xs:mt-[5px]   lg:h-[30px] md:h-[30px] xs:h-[39px]"
                  />
                </div>
                <div className=" flex lg:flex-row  lg:items-center lg:justify-between  md:justify-between mt-5  text-[#808080] ">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    ステータス
                  </label>

                  <select
                    name="status"
                    value={searchData.status}
                    onChange={handleInput}
                    className="text-tertiary lg:text-[14px] xs:text-[12px] h-[25px] border-[1px] border-[#DCDCDC] lg:px-10 xs:px-10px  outline-0  text-sm ml-[3.5rem]  lg:mr-4  "
                  >
                    <option className="text-tertiary" value="none">
                      ステータス
                    </option>
                    {statusValuesArray.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    工程名
                  </label>
                  <input
                    type="text"
                    name="processName"
                    value={searchData.processName}
                    onChange={handleInput}
                    className="border lg:text-[14px] xs:text-[12px] xs:mt-[5px]   lg:h-[30px] md:h-[30px] xs:h-[39px]"
                  />
                </div>

                <div className="flex lg:flex-row md:flex-row md:w-[25.6rem] lg:w-[25.6rem]  items-center justify-between mt-5 ">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    期間指定
                  </label>
                  <div className="flex flex-row  items-center justify-around  gap-2">
                    <input
                      type="date"
                      name="startDate"
                      value={searchData.startDate}
                      onChange={handleInput}
                      className="border w-[8rem]  lg:h-[25px] md:h-[30px] xs:h-[30px]  text-[#808080]  lg:text-[14px] xs:text-[12px] p-2"
                      lang="ja"
                    />
                    ~
                    <input
                      type="date"
                      name="endDate"
                      value={searchData.endDate}
                      onChange={handleInput}
                      className="border  w-[8rem]  lg:h-[25px] md:h-[30px] xs:h-[30px] text-[#808080]  lg:text-[14px] xs:text-[12px] p-2"
                      lang="ja"
                    />
                  </div>
                </div>

                <div className="flex xs:flex-row lg:flex-col lg:items-center justify-between mb-3 text-[#808080] lg:text-[14px] xs:text-[12px] mt-5">
                  <div className="flex flex-row lg:w-full lg:gap-[4.7rem] xs:gap-3">
                    <label className="text-[#808080] lg:text-[14px] xs:text-[12px] xs:mt-[5px]">
                      表示件数
                    </label>
                    <div className="flex flex-row md:flex-row  items-center  ">
                      <select
                        name="pageSize"
                        value={searchData.pageSize}
                        onChange={handleInput}
                        className="text-tertiary border-[1px] h-[25px]   border-[#DCDCDC] lg:px-4 xs:px-1 outline-0  lg:text-[14px] xs:text-[12px]  bg-white  focus:ring-0  focus:border"
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
                  <div className="lg:w-full flex justify-end items-center  lg:hidden  xs:block lg:mt-2  lg:text-[14px] xs:text-[12px] ">
                    <button
                      type="submit"
                      className="text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1 l"
                    >
                      この条件で検索する
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:w-full  flex justify-center items-center ">
                <button className="text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1 lg:mt-2  lg:text-[14px] xs:text-[12px]  xs:hidden  lg:block">
                  この条件で検索する
                </button>
              </div>
            </div>
          </form>

          <div className="lg:mx-20 md:mx-8 xs:mx-8 mt-[3rem] lg:min-w-[900px]">
            <span className="text-center text-[red] lg:text-[14px] xs:text-[12px] break-all   lg:hidden sm:hidden md:hidden ">
              {errorIfNoSelected}
            </span>
            <div className="flex items-center justify-between sm:block ">
              <div className="flex justify-end gap-2 text-center">
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
                {/*CSVDTrigger */}
                <button
                  onClick={() => handleDownloadCSV()}
                  className="text-white bg-[#FFAA00] px-5 py-1 lg:text-[14px] xs:text-[12px] "
                >
                  CSV出力
                </button>
              </div>
            </div>

            <div className="mt-4 border-[1px] border-[#E6E6E6] overflow-x-auto">
              {notFound ? (
                "The search does not return any results"
              ) : (
                <CompactTable
                  data={data}
                  columns={COLUMNS}
                  theme={theme}
                  layout={{ custom: true, horizontalScroll: true }}
                />
              )}
            </div>
            <div className="col-span-12 bg-[#F5F5F5] h-[60px] flex justify-center items-center gap-2 mt-[50px]">
              <div className="flex gap-1">
                {!notFound &&
                  pageNumbers.map((value, index) => (
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
              {endPage < paginationResponse?.totalPages && (
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

      <DeleteOrderInfoModal
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
        id={selectedId}
      />
    </>
  );
};

export default OrderManagement;
