export const nodes = [
  {
    id: "1",
    transaction_no: "202306 - 888888",
    project: "形鋼・パイプ専用三次元レーザー加工機",
    company_name: "株式会社丸菱製作所",
    status: "商談中",
    deadline: "2021/10/10",
    est_amount: "600000",
    detailed: "詳細",
    review: "レビュー",
    cancel: "キャンセル",
  },
  {
    id: "2",
    transaction_no: "202306 - 888888",
    project: "形鋼・パイプ専用三次元レーザー加工機",
    company_name: "株式会社丸菱製作所",
    status: "受発注待ち",
    deadline: "2021/10/10",
    est_amount: "600000",
    detailed: "詳細",
    review: "レビュー",
    cancel: "キャンセル",
  },
  {
    id: "3",
    transaction_no: "202306 - 888888",
    project: "形鋼・パイプ専用三次元レーザー加工機",
    company_name: "株式会社丸菱製作所",
    status: "納品待ち",
    deadline: "2021/10/10",
    est_amount: "600000",
    detailed: "詳細",
    review: "レビュー",
    cancel: "キャンセル",
  },
  {
    id: "4",
    transaction_no: "202306 - 888888",
    project: "形鋼・パイプ専用三次元レーザー加工機",
    company_name: "株式会社丸菱製作所",
    status: "検収中",
    deadline: "2021/10/10",
    est_amount: "600000",
    detailed: "詳細",
    review: "レビュー",
    cancel: "キャンセル",
  },
  {
    id: "5",
    transaction_no: "202306 - 888888",
    project: "形鋼・パイプ専用三次元レーザー加工機",
    company_name: "株式会社丸菱製作所",
    status: "差戻し",
    deadline: "2021/10/10",
    est_amount: "600000",
    detailed: "詳細",
    review: "レビュー",
    cancel: "キャンセル",
  },
  {
    id: "6",
    transaction_no: "202306 - 888888",
    project: "形鋼・パイプ専用三次元レーザー加工機",
    company_name: "株式会社丸菱製作所",
    status: "取引完了",
    deadline: "2021/10/10",
    est_amount: "600000",
    detailed: "詳細",
    review: "レビュー",
    cancel: "キャンセル",
  },
  {
    id: "7",
    transaction_no: "202306 - 888888",
    project: "形鋼・パイプ専用三次元レーザー加工機",
    company_name: "株式会社丸菱製作所",
    status: "キャンセル",
    deadline: "2021/10/10",
    est_amount: "600000",
    detailed: "詳細",
    review: "レビュー",
    cancel: "キャンセル",
  },
  {
    id: "8",
    transaction_no: "202306 - 888888",
    project: "形鋼・パイプ専用三次元レーザー加工機",
    company_name: "株式会社丸菱製作所",
    status: "決済完了",
    deadline: "2021/10/10",
    est_amount: "600000",
    detailed: "詳細",
    review: "レビュー",
    cancel: "キャンセル",
  },
  {
    id: "9",
    transaction_no: "202306 - 888888",
    project: "形鋼・パイプ専用三次元レーザー加工機",
    company_name: "株式会社丸菱製作所",
    status: "決済完了",
    deadline: "2021/10/10",
    est_amount: "600000",
    detailed: "詳細",
    review: "レビュー",
    cancel: "キャンセル",
  },
];

export const COLUMNS = [
  {
    label: "取引No",
    key: "transaction_no",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400]"
        style={{ whiteSpace: "normal" }}
      >
        {cell.transaction_no}
      </div>
    ),
  },
  {
    label: "工程",
    key: "project",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400] text-left line-clamp-3"
        style={{ whiteSpace: "normal" }}
      >
        {cell.project} 
      </div>
    ),
  },
  {
    label: "企業名",
    key: "company_name",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400] text-left line-clamp-3"
        style={{ whiteSpace: "normal" }}
      >
        {cell.company_name}
      </div>
    ),
  },
  {
    label: "ステータス",
    key: "status",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400] line-clamp-1 "
        style={{ whiteSpace: "normal" }}
      >
        {cell.status}
      </div>
    ),
  },
  {
    label: "納期",
    key: "deadline",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400]"
        style={{ whiteSpace: "normal" }}
      >
        {cell.deadline}
      </div>
    ),
  },
  {
    label: "見積金額(税別)",
    key: "est_amount",
   renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400] break-all"
        style={{ whiteSpace: "normal" }}
      >
        {cell.est_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        
      </div>
    ),
  },
  {
    label: "詳細",
    key: "detailed",
    renderCell: (cell) => (
      <button
        className="text-[#fff] text-[12px] font-[400] bg-[#FFAA00] px-2 py-1 flex gap-2 items-center  justify-center mx-auto"
        style={{ whiteSpace: "normal" }}
      >
        {cell.detailed}{" "}
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
        className="text-[#808080] text-[12px] font-[500] w-fit bg-[#E6E6E6] p-1 text-center mx-auto"
        style={{ whiteSpace: "normal" }}
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
        className="text-[#808080] text-[12px] font-[500] w-fit bg-[#E6E6E6] p-1 text-center mx-auto"
        style={{ whiteSpace: "normal" }}
      >
        {cell.cancel}
      </div>
    ),
  },
];
