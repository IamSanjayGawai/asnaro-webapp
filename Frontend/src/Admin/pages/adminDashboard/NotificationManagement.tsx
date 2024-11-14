import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { selectUser } from "@/state/slices/userSlice";
import { CompactTable } from "@table-library/react-table-library/compact";
import Spinner from "@/components/static/Spinner";
import { selectNews } from "@/state/slices/newsSlice";
import { serachNotificationAdminThunk } from "@/state/thunks/newsApiThunks";
import NewsOnOffModal from "@/Admin/components/NewsOnOffModal";
import { useTableTheme } from "@/utils/custom-hooks/useTableTheme";
// import DeleteNewsInfoModal from "@/Admin/components/DeleteNewsInfoModal";

const NotificationManagement = () => {
  const location = useLocation();
  const { loading } = useAppSelector(selectUser);
  const { newsSearchData } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [idToTurnOnOff, setIdToTurnOnOff] = useState<any>(null);
  const [delievryTurnOnOff, setDelievryTurnOnOff] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [mod, setMod] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(new URLSearchParams(location.search).get("page")) || 1
  );
  const [limit, setLimit] = useState(5);
  const theme = useTableTheme("1fr 1fr 2fr", 3);
  // const [selectedId, setSelectedId] = useState([]);
  // const [isDeleteModal, setIsDeleteModal] = useState(false);
  // const [errorIfNoSelected, setErrorIfNoSelected] = useState("");

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(event.target.value);
  const handleModChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMod(event.target.value);

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const fetchNotifications = (pageNumber, limit, resetPage = false) => {
    const params = {
      keyword,
      mod,
      currentPage: pageNumber,
      limit,
    };
    console.log("page : ", pageNumber);
    if (resetPage) {
      console.log("reset true");
      setCurrentPage(1);
    }
    dispatch(serachNotificationAdminThunk(params));
  };

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    router(`/admin/dashboard/notification-management?page=${pageNumber}`);
  };

  const router = useNavigate();

  const paginationData = newsSearchData?.pagination || {
    totalPages: 0,
    currentPage: 1,
  };
  const totalPages = paginationData.totalPages;
  const startPage = Math.max(1, currentPage - Math.floor(10 / 2));
  const endPage = Math.min(totalPages, startPage + 10 - 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  useEffect(() => {
    fetchNotifications(currentPage, limit, false);
  }, [dispatch, currentPage, showModal, delievryTurnOnOff]);

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;
  const handleDownloadCSV = async () => {
    try {
      if (!newsSearchData?.data || !Array.isArray(newsSearchData?.data)) {
        console.log("Inquiries data is not available");
        return;
      }

      const noticeIds = newsSearchData?.csvNews.map((notice) => notice._id);

      if (noticeIds.length > 0) {
        const response = await fetch(`${VITE_BASE_URL}/admin/download/csv`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notice_ids: noticeIds,
            formType: "notification",
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "notice_list.csv");
        document.body.appendChild(link);
        link.click();
      } else {
        console.log("No inquiry IDs found for CSV export");
      }
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handelSearch = (event) => {
    event.preventDefault();
    handlePageChange(1);
    fetchNotifications(1, limit, true);
  };

  const nodes = newsSearchData?.data || [];
  const processdata = {
    nodes: nodes.map((newsInfo) => ({
      id: newsInfo?._id || "NA",
      delivery_ON_OFF: newsInfo?.delivery_flag,
      title: newsInfo?.news_title || "NA",
      delivery_date: newsInfo?.delivery_date || "NA",
    })),
  };

  const [, setData] = useState({ nodes });

  const handleUpdate = (value, id, delivery_ON_OFF, property) => {
    setData((state) => ({
      ...state,
      nodes: state.nodes.map((node) => {
        if (node.id === id) {
          return { ...node, [property]: value };
        } else {
          return node;
        }
      }),
    }));
    setIdToTurnOnOff(id);
    setShowModal(true);
    setDelievryTurnOnOff(delivery_ON_OFF);
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
  //     const allIds = nodes.map((item) => item._id) || [];
  //     setSelectedId(allIds);
  //     console.log("Selected all IDs:", allIds);
  //   } else {
  //     setSelectedId([]);
  //   }
  // };

  // const handleOpenDeleteMdodal = () => {
  //   if (selectedId.length === 0) {
  //     setErrorIfNoSelected(
  //       "削除するニュースを少なくとも 1 つ選択してください。"
  //     );
  //     return;
  //   }
  //   setIsDeleteModal(true);
  //   setErrorIfNoSelected("");
  // };

  const COLUMNS = [
    {
      label: "配信ON/OFF",
      key: "delivery_flag",
      renderCell: (cell) => (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={cell.delivery_ON_OFF === true}
            onChange={(event) =>
              handleUpdate(
                event.target.checked,
                cell.id,
                cell.delivery_ON_OFF,
                "delivery_flag"
              )
            }
          />
        </div>
      ),
    },
    {
      label: "タイトル",
      key: "title",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-3 text-center break-all"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(`/admin/dashboard/notification-management-detail/${cell.id}`)
          }
        >
          {cell.title}
        </div>
      ),
    },
    {
      label: "配信日",
      key: "delivery_date",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-3 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(`/admin/dashboard/notification-management-detail/${cell.id}`)
          }
        >
          {isValidDate(cell.delivery_date)
            ? new Date(cell.delivery_date).toISOString().split("T")[0]
            : "Invalid date"}
        </div>
      ),
    },
  ];
  function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handelSearch} className="mb-40">
          <div className="lg:mx-20 md:mx-8 xs:mx-8 flex flex-col xs:mt-[24px] md:mt-[50px]">
            <h1 className="text-[#808080] font-[700] text-[24px] mb-4">
              お知らせ管理
            </h1>
            <div className="w-full p-4 bg-[#F8F8F8] text-[#808080]">
              検索条件設定
              <div className="xs:w-full sm:w-full md:w-[18rem] lg:w-[21rem] flex flex-col justify-start">
                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-5">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    キーワード
                  </label>
                  <input
                    type="text"
                    className="border lg:text-[14px] xs:text-[12px] xs:mt-[5px] lg:px-4 xs:px-1 lg:h-[30px] md:h-[30px] xs:h-[39px]"
                    onChange={handleKeywordChange}
                  />
                </div>
                <div className="flex lg:flex-row lg:items-center lg:justify-start xs:justify-start md:justify-between mt-5 text-[#808080]">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    配信月
                  </label>
                  <input
                    type="date"
                    id="first_name"
                    className="text-tertiary h-[25px] lg:text-[14px] xs:text-[12px] border-[1px] border-[#DCDCDC] px-10 outline-0 text-sm ml-[4.2rem]"
                    onChange={handleModChange}
                  />
                </div>
                <div className="flex xs:flex-row lg:flex-col lg:items-center justify-between mt-5 mb-3 text-[#808080] lg:text-[14px] xs:text-[12px]">
                  <div className="flex flex-row lg:w-full lg:gap-[3.4rem] xs:gap-3">
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
                      className="text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1 l"
                      type="submit"
                    >
                      この条件で検索する
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:w-full flex justify-center items-center">
                <button
                  className="text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1 lg:mt-2 lg:text-[14px] xs:text-[12px] xs:hidden lg:block"
                  type="submit"
                >
                  この条件で検索する
                </button>
              </div>
            </div>
          </div>
          <div className="lg:mx-20 md:mx-8 xs:mx-8 mt-[3rem]   lg:min-w-[900px] ">
            {/* <span className="text-center text-[red] lg:text-[14px] xs:text-[12px] break-all   lg:hidden sm:hidden md:hidden ">
              {errorIfNoSelected}
            </span> */}
            <div className="flex items-center justify-between sm:block ">
              <div className="flex justify-end gap-2 text-center">
                {/* <span className="text-center text-[red] lg:text-[14px] xs:text-[12px] break-all md:block  sm:block xs:hidden lg:block">
                  {errorIfNoSelected}
                </span> */}
                {/* <button
                type="button"
                  onClick={() => {
                    handleOpenDeleteMdodal();
                  }}
                  className="text-white bg-[#808080] px-5 py-1 lg:text-[14px] xs:text-[12px]"
                >
                  消去
                </button> */}
                <button
                  type="button"
                  onClick={() =>
                    router("/admin/dashboard/notification-management-create")
                  }
                  className="text-white bg-[#255BB3] px-5 py-1 lg:text-[14px] xs:text-[12px]"
                >
                  新規登録
                </button>
                <button
                  type="button"
                  onClick={handleDownloadCSV}
                  className="text-white bg-[#FFAA00] px-5 py-1 lg:text-[14px] xs:text-[12px]"
                >
                  CSV出力
                </button>
              </div>
            </div>
            <div
              className={`mt-4  overflow-x-auto ${
                newsSearchData?.data?.length == 0
                  ? "flex justify-center items-center"
                  : "  border-[1px] border-[#E6E6E6]"
              } `}
            >
              {newsSearchData?.data?.length == 0 ? (
                `${keyword}」に一致する結果はありません。別のキーワードをお試しください`
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
                {pageNumbers.map((value, index) => (
                  <button
                    type="button"
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
              {currentPage < totalPages && (
                <div
                  className="flex gap-1 items-center cursor-pointer"
                  onClick={() => handlePageChange(currentPage + 1)}
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
        </form>
      )}
      {showModal ? (
        <NewsOnOffModal
          showModal={showModal}
          setShowModal={setShowModal}
          idToTurnOnOff={idToTurnOnOff}
          delievryTurnOnOff={delievryTurnOnOff}
        />
      ) : (
        ""
      )}

      {/* <DeleteNewsInfoModal
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
        id={selectedId}
      /> */}
    </>
  );
};

export default NotificationManagement;
