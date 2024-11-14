
export const COLUMNS = [
  {
    label: <span className="flex justify-center lg:text-[18px] xs:text-[14px]">内容</span>,
    key: "content",
    renderCell: (cell) => (
      <div
        className="text-[#808080] lg:text-[18px] xs:text-[14px] font-[400]  line-clamp-3 text-center "
        style={{ whiteSpace: "normal" }}
      >
        {cell.content}
      </div>
    ),
  },

  {
    label: <span className="lg:text-[18px] xs:text-[14px]">図番</span>,
    key: "drawingNumber",
    renderCell: (cell) => (
      <div
        className="text-[#808080] lg:text-[18px] xs:text-[14px] font-[400]  line-clamp-3 text-center "
        style={{ whiteSpace: "normal" }}
      >
        {cell.drawingNumber}
      </div>
    ),
  },
  // {
  //   label: <span className="lg:text-[18px] xs:text-[14px]">納期 </span>,
  //   key: "deadline",
  //   renderCell: (cell) => (
  //     <div
  //       className="text-[#808080] lg:text-[18px] xs:text-[14px] font-[400]  line-clamp-3 text-center "
  //       style={{ whiteSpace: "normal" }}
  //     >
  //       {cell.deadline}
  //     </div>
  //   ),
  // },
  {
    label:<span className="lg:text-[18px] xs:text-[14px]">単価(税抜)</span>,
    key: "unitPrice",
    renderCell: (cell) => (
      <div
        className="text-[#808080] lg:text-[18px] xs:text-[14px] font-[400] line-clamp-1 text-right "
        style={{ whiteSpace: "normal" }}
      >
        {cell.unitPrice}
      </div>
    ),
  },
  {
    label:<span className="lg:text-[18px] xs:text-[14px]">数量 </span>,
    key: "quantity",
    renderCell: (cell) => (
      <div
        className="text-[#808080] lg:text-[18px] xs:text-[14px] font-[400] line-clamp-1 text-right  "
        style={{ whiteSpace: "normal" }}
      >
        {cell.quantity}
      </div>
    ),
  },

  {
    label: <span className="flex justify-center lg:text-[18px] xs:text-[14px]">単位</span>,
    key: "unit",
    renderCell: (cell) => (
      <div
        className="text-[#808080] lg:text-[18px] xs:text-[14px] font-[400] line-clamp-1 text-center "
        style={{ whiteSpace: "normal" }}
      >
        {cell.unit}
      </div>
    ),
  },

  {
    label: <span className="lg:text-[18px] xs:text-[14px]">金額(税抜)</span>,
    key: "amount",
    renderCell: (cell) => (
      <div
        className="text-[#808080] lg:text-[18px] xs:text-[14px] font-[400] line-clamp-1 text-right "
        style={{ whiteSpace: "normal" }}
      >
        {cell.amount}
      </div>
    ),
  },
];