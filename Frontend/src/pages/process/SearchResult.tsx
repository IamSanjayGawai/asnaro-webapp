import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { processSearchThunk } from "../../state/thunks/processThunks";
import { selectProcess } from "@/state/slices/processSlice";
import SearchProcessCards from "../components/SearchProcessCards";
import dayjs from "dayjs";
import Spinner from "@/components/static/Spinner";
import { FaListUl } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

function SearchResults() {
  const navigate = useNavigate();
  const [grid, setGrid] = useState(false); // Default View is List Type
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = React.useState(
    page ? parseInt(page) : 1
  );
  const startDate = queryParams.get("startDate")
    ? queryParams.get("startDate")
    : "";
  const endDate = queryParams.get("endDate") ? queryParams.get("endDate") : "";
  const keyword = queryParams.get("keyword") ? queryParams.get("keyword") : "";
  const category = queryParams.get("cat")
    ? (queryParams.get("cat") as unknown as string[])
    : ("" as unknown as any);
  const subCategory = queryParams.get("subCat")
    ? queryParams.get("subCat")
    : ("" as unknown as any);
  const selectedState = queryParams.get("pref")
    ? (queryParams.get("pref") as unknown as string[])
    : ("" as unknown as any);
  const selectedCities = queryParams.get("mun")
    ? (queryParams.get("mun") as unknown as string[])
    : ("" as unknown as any);

  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, process } = useAppSelector(selectProcess);

  const maxButtons = 10;
  const startPage = Math.max(
    1,
    process?.pagination?.currentPage - Math.floor(maxButtons / 2)
  );
  const endPage = Math.min(
    process?.pagination?.totalPages,
    startPage + maxButtons - 1
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  React.useEffect(() => {
    dispatch(
      processSearchThunk({
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        keyword,
        cat: category,
        subCat: subCategory,
        pref: selectedState,
        mun: selectedCities,
        page: currentPage,
        pageSize: 12,
      })
    );
  }, [currentPage, dispatch]);

  console.log(process);

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    router(
      `/process/search-results?page=${pageNumber}&startDate=${startDate}&endDate=${endDate}&keyword=${keyword}`
    );
  };

  console.log("search result", process);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className=" mx-auto md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6 mt-10">
          <div className="flex justify-between">
            <div className="flex items-center">
              <h1 className="text-[#255BB3] text-[24px] hidden sm:block  font-[700] pr-4">
                工程検索結果{" "}
              </h1>
              <span className="text-[#808080] text-[16px] font-[700] ml-4">
                該当件数：{process?.pagination?.totalItems}件
              </span>
              <button
                onClick={() => navigate("/process/advance-search")}
                className="bg-[#255BB3] text-[#fff] rounded-sm p-2 text-[14px] font-[700] ml-5 hidden sm:flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                >
                  <path
                    d="M7 11.2998L0.937822 0.799805L13.0622 0.799804L7 11.2998Z"
                    fill="white"
                  />
                </svg>{" "}
                条件で絞り込む
              </button>
            </div>
            <div className="flex gap-3 items-center">
              <FaListUl
                className="cursor-pointer"
                onClick={() => setGrid(false)}
                size={20}
                color={grid && "#808080"}
              />

              <IoGrid
                className="cursor-pointer"
                onClick={() => setGrid(true)}
                size={20}
                color={!grid && "#808080"}
              />
            </div>
          </div>

          <div
            className={
              grid
                ? "grid grid-cols-2 sm:grid-cols-3 sm:gap-4 gap-2 mt-[30px]"
                : "grid grid-cols-1 gap-4 mt-[30px]"
            }
          >
            {process?.data && process?.data.length > 0 ? (
              process?.data?.map((processItem) => (
                <SearchProcessCards
                  process={processItem}
                  key={processItem._id}
                  grid={grid}
                  setGrid={setGrid}
                />
              ))
            ) : (
              <div className="col-span-12 text-primary text-center text-[32px] font-bold flex justify-center items-center h-screen">
                表示するデータがありません
              </div>
            )}
          </div>
          {process?.data?.length > 0 && (
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
              {endPage < process?.pagination?.totalPages && (
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
          )}
        </div>
      )}
    </>
  );
}

export default SearchResults;
