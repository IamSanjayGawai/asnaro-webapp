import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { CompactTable } from "@table-library/react-table-library/compact";
import Spinner from "@/components/static/Spinner";
import { selectAdmin } from "@/state/slices/adminSlice";
import { searchCompanyInfoThunk } from "@/state/thunks/adminThunks";
import { useTableTheme } from "@/utils/custom-hooks/useTableTheme";
import DeleteCompanyInfoModal from "@/Admin/components/DeleteCompanyInfoModal";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const CompanyInfoList = () => {
  const { searchCompanyData, loading, deleteUsers } =
    useAppSelector(selectAdmin);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const [company_Id, setCompanyId] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [representative_name, setRepresentativeName] = useState("");
  const [person_incharge_name, setPersonInchargeName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [limit, setLimit] = useState(5);
  const theme = useTableTheme("1fr 2fr  2fr 3fr 3fr 3fr", 6);
  const [invalidError, setInvalidError] = useState("");
  const [selectedId, setSelectedId] = useState([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [errorIfNoSelected, setErrorIfNoSelected] = useState("");

  const handlecompany_IdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setInvalidError("半角英数字で入力してください");
      setCompanyId(value);
      value === "" && setInvalidError("");
    } else {
      setCompanyId(value);
      setInvalidError("");
    }
  };
  const handlecompany_nameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCompanyName(e.target.value);
  const handlerepresentative_nameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setRepresentativeName(e.target.value);
  const handleperson_incharge_nameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setPersonInchargeName(e.target.value);
  const handleemailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^\d{0,10}$/.test(value)) {
      setInvalidError("無効な電話番号");
      setPhone(value);
    } else {
      setPhone(value);
      setInvalidError("");
    }
  };
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const fetchNotifications = (pageNumber, limit, resetPage = false) => {
    const params = {
      company_Id,
      company_name,
      representative_name,
      person_incharge_name,
      email,
      phone,
      currentPage: pageNumber,
      limit,
    };

    if (resetPage) {
      setCurrentPage(1);
    }

    dispatch(searchCompanyInfoThunk(params));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    handlePageChange(1);
    setInvalidError("");
    fetchNotifications(1, limit, true);
  };

  useEffect(() => {
    fetchNotifications(currentPage, limit);
  }, [dispatch, currentPage, deleteUsers]);

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    router(`/admin/dashboard/company-information?page=${pageNumber}`);
  };

  const router = useNavigate();
  const maxButtons = 10;
  const totalPages = searchCompanyData?.pagination?.totalPages;
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handleDownloadCSV = async () => {
    try {
      const company_infoIds = searchCompanyData?.csvUsers?.map(
        (item) => item._id
      );

      if (!company_infoIds || company_infoIds.length === 0) {
        console.log("No partner IDs available for download.");
        return;
      }

      const response = await fetch(`${VITE_BASE_URL}/admin/download/csv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_infoIds,
          formType: "company_info",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "company_info_list.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const nodes = searchCompanyData?.data || [];
  const processdata = {
    nodes: nodes.map((company) => ({
      company_id: company._id,
      company_name: company.name01,
      company_createdAt: company.createdAt
        ? new Date(company.createdAt).toISOString().split("T")[0]
        : "",
      representative_name: company.delegate_name01,
      person_incharge_name: company.charge_name01,
    })),
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
      const allIds = searchCompanyData?.data.map((item) => item._id) || [];
      setSelectedId(allIds);
      console.log("Selected all IDs:", allIds);
    } else {
      setSelectedId([]);
    }
  };

  const handleOpenDeleteMdodal = () => {
    if (selectedId.length === 0) {
      setErrorIfNoSelected("削除する会社を少なくとも 1 つ選択してください。");
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
          checked={selectedId.length === (searchCompanyData?.data?.length || 0)}
        />
      ),
      key: "checkbox",
      renderCell: (cell) => (
        <input
          type="checkbox"
          checked={selectedId.includes(cell.company_id)}
          onChange={() => handleSelectChange(cell.company_id)}
        />
      ),
    },
    {
      label: <span className="flex justify-center">企業ID</span>,
      key: "company_id",

      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-3 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/company-information-detail/${cell.company_id}`
            )
          }
        >
          {cell.company_id}
        </div>
      ),
    },
    {
      label: "企業名",
      key: "company_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-3 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/company-information-detail/${cell.company_id}`
            )
          }
        >
          {cell.company_name}
        </div>
      ),
    },
    {
      label: "登録日時",
      key: "company_createdAt",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-3 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/company-information-detail/${cell.company_id}`
            )
          }
        >
          {cell.company_createdAt}
        </div>
      ),
    },
    {
      label: "代表者名",
      key: "representative_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-3 text-center"
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/company-information-detail/${cell.company_id}`
            )
          }
        >
          {cell.representative_name}
        </div>
      ),
    },
    {
      label: <span className="flex justify-center">担当者名</span>,
      key: "person_incharge_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
          style={{ whiteSpace: "normal" }}
          onClick={() =>
            router(
              `/admin/dashboard/company-information-detail/${cell.company_id}`
            )
          }
        >
          {cell.person_incharge_name}
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mb-40">
          <form
            onSubmit={handleSearch}
            className="lg:mx-20 md:mx-8 xs:mx-8 flex flex-col xs:mt-[24px] md:mt-[50px]"
          >
            <h1 className="text-[#808080] font-[700] text-[24px] mb-4">
              企業情報一覧
            </h1>
            <div className="w-full p-4 bg-[#F8F8F8] text-[#808080]">
              検索条件設定
              <div className="xs:w-full sm:w-full md:w-[23rem] lg:w-[23rem] flex flex-col justify-start gap-3">
                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-5 ">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    企業ID
                  </label>
                  <input
                    type="text"
                    className="border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]"
                    value={company_Id}
                    onChange={handlecompany_IdChange}
                  />
                </div>

                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-2 ">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    企業名
                  </label>
                  <input
                    type="text"
                    className="border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]"
                    value={company_name}
                    onChange={handlecompany_nameChange}
                  />
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-2">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    代表者名
                  </label>
                  <input
                    type="text"
                    className="border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]"
                    value={representative_name}
                    onChange={handlerepresentative_nameChange}
                  />
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-2">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    担当者名
                  </label>
                  <input
                    type="text"
                    className="border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]"
                    value={person_incharge_name}
                    onChange={handleperson_incharge_nameChange}
                  />
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-2">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    メールアドレス
                  </label>
                  <input
                    type="text"
                    className="border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]"
                    value={email}
                    onChange={handleemailChange}
                  />
                </div>
                <div className="flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-2">
                  <label className="text-[#808080] lg:text-[14px] xs:text-[12px]">
                    電話番号
                  </label>
                  <input
                    type="text"
                    className="border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]"
                    value={phone}
                    onChange={handlephoneChange}
                  />
                </div>
                <div className="flex xs:flex-row lg:flex-col lg:items-center justify-between mt-2 mb-3 text-[#808080] lg:text-[14px] xs:text-[12px]">
                  <div className="flex flex-row lg:w-full lg:gap-20 xs:gap-3">
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
                        {/* Add a disabled option to act as a placeholder */}
                        <option value="" disabled>
                          鋳造
                        </option>
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
                      onClick={handleSearch}
                    >
                      この条件で検索する
                    </button>
                  </div>
                </div>
                {invalidError && <p className="text-fifth">{invalidError}</p>}
              </div>
              <div className="lg:w-full flex justify-center items-center">
                <button
                  className="text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1 lg:mt-2 lg:text-[14px] xs:text-[12px] xs:hidden lg:block"
                  type="submit"
                  onClick={handleSearch}
                >
                  この条件で検索する
                </button>
              </div>
            </div>
          </form>
          <div className="lg:mx-20 md:mx-8 xs:mx-8 mt-[3rem] lg:min-w-[900px]   ">
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
                <button
                  onClick={() => router("/admin/dashboard/member-registration")}
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
              className={`mt-4  overflow-x-auto  ${
                searchCompanyData &&
                searchCompanyData?.data &&
                searchCompanyData?.data?.length === 0
                  ? "flex justify-center items-center"
                  : "border-[1px] border-[#E6E6E6]"
              }`}
            >
              {searchCompanyData &&
              searchCompanyData?.data &&
              searchCompanyData?.data?.length === 0 ? (
                `${
                  company_Id ||
                  company_name ||
                  representative_name ||
                  person_incharge_name ||
                  email ||
                  phone
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
                {searchCompanyData &&
                  searchCompanyData?.data &&
                  searchCompanyData?.data?.length !== 0 &&
                  pageNumbers.map((value, index) => (
                    <button
                      className={`border w-[25px] lg:text-[14px] xs:text-[12px] ${
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
        </div>
      )}

      <DeleteCompanyInfoModal
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
        id={selectedId}
      />
    </>
  );
};

export default CompanyInfoList;
