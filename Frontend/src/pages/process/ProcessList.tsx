import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  UserProcessListThunk,
  UserProcessListReleasedThunk,
  UserProcessListPrivateThunk,
  totalProcessCountThunk,
} from "@/state/thunks/processThunks";
import { getUserByIdThunk } from "@/state/thunks/userThunks";
import { selectProcess } from "@/state/slices/processSlice";
import UserProcessCards from "../components/UserProcessCards";
import { selectUser } from "@/state/slices/userSlice";
import Spinner from "@/components/static/Spinner";
import { EditCalendarAction } from "@/state/slices/processSlice";

const ProcessList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = React.useState(
    page ? parseInt(page) : 1
  );
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const {
    process,
    status,
    processCount,
    appErr,
    loading: processLoading,
  } = useAppSelector(selectProcess);
  const {
    other,
    partnerResponse,
    loading: userLoading,
  } = useAppSelector(selectUser);
  const [filter, setFilter] = React.useState("all");
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
    dispatch(getUserByIdThunk({}));
    dispatch(EditCalendarAction(false));
  }, [dispatch, partnerResponse]);

  React.useEffect(() => {
    if (filter === "all") {
      dispatch(UserProcessListThunk(currentPage));
    } else if (filter === "on-sale") {
      dispatch(UserProcessListReleasedThunk(currentPage));
    } else if (filter === "past") {
      dispatch(UserProcessListPrivateThunk(currentPage));
    }
  }, [currentPage, status, process?.processData?.status, filter, dispatch]);

  React.useEffect(() => {
    dispatch(totalProcessCountThunk());
  }, [status, dispatch]);

  console.log(process);

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    router(`/dashboard/process-list?page=${pageNumber}`);
  };

  return (
    <>
      {userLoading ? (
        <Spinner />
      ) : other?.user?.partner_flg ? (
        <div className="px-[45px] xl:px-0 xl:pl-[50px] xl:pr-[70px] md:max-w-[950px] mx-auto w-full text-base text-tertiary pb-[110px]">
          <div className="grid grid-cols-12 gap-y-3">
            {appErr && (
              <div className="col-span-12 flex justify-center items-center">
                <p className="text-[16px] text-fifth">{appErr}</p>
              </div>
            )}
            <div className="col-span-12 flex justify-between">
              <p className="text-[24px] text-primary font-bold">工程一覧</p>
              <button
                onClick={() => router("/dashboard/process-list/registration")}
                className="bg-fourth text-white flex justify-center items-center w-[150px] h-[36px]"
              >
                工程を登録する
              </button>
            </div>
            <div className="col-span-12"></div>
            <div className="col-span-12 grid grid-cols-12 gap-x-3 h-[30px] border-b border-secondary">
              <p
                className={`xs:col-span-3 lg:col-span-2 font-[500] ${
                  filter === "all" ? "border-b border-primary text-primary" : ""
                } md:px-1 lg:px-3 cursor-pointer`}
                onClick={() => setFilter("all")}
              >
                ALL({processCount?.processCount?.totalProcesses})
              </p>
              <p
                className={`xs:col-span-3 lg:col-span-2 font-[500] ${
                  filter === "on-sale"
                    ? "border-b border-primary text-primary"
                    : ""
                } lg:px-1 cursor-pointer`}
                onClick={() => setFilter("on-sale")}
              >
                公開中({processCount?.processCount?.releaseProcesses})
              </p>
              <p
                className={`xs:col-span-4 lg:col-span-2 font-[500] ${
                  filter === "past"
                    ? "border-b border-primary text-primary"
                    : ""
                } lg:px-1 cursor-pointer`}
                onClick={() => setFilter("past")}
              >
                非公開({processCount?.processCount?.privateProcesses})
              </p>
            </div>
            {processLoading ? (
              <div className="col-span-12">
                <Spinner />
              </div>
            ) : (
              <div className="col-span-12 flex flex-col gap-5">
                {process?.data && process?.data?.length > 0 ? (
                  process.data.map((value, index) => (
                    <UserProcessCards
                      key={index}
                      value={value}
                      loading={processLoading}
                      index={index}
                    />
                  ))
                ) : (
                  <div className="col-span-12 text-primary text-center text-[32px] font-bold flex justify-center items-center h-screen">
                    表示するデータがありません
                  </div>
                )}
              </div>
            )}
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
        </div>
      ) : (
        <div className="flex justify-center xs:gap-2 md:gap-10 w-full h-screen my-[75px]">
          Become a partner to view this page
        </div>
      )}
    </>
  );
};

export default ProcessList;
