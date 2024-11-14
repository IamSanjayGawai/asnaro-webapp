export const nodes = [
  {
    content: "—",
    drawingNumber: "—",
    deadline: "—",
    unitPrice: "—",
    quantity: "—",
    unit: "—",
    amount: "—",
  },
];

export const COLUMNS = [
  {
    label: <span className="flex justify-center">内容</span>,
    key: "content",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
        style={{ whiteSpace: "normal" }}
      >
        {cell.content}
      </div>
    ),
  },

  {
    label: "図番",
    key: "drawingNumber",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
        style={{ whiteSpace: "normal" }}
      >
        {cell.drawingNumber}
      </div>
    ),
  },
  {
    label: "納期",
    key: "deadline",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
        style={{ whiteSpace: "normal" }}
      >
        {cell.deadline}
      </div>
    ),
  },
  {
    label: "単価(税抜)",
    key: "unitPrice",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-right "
        style={{ whiteSpace: "normal" }}
      >
        {cell.unitPrice}
      </div>
    ),
  },
  {
    label: "数量",
    key: "quantity",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-right "
        style={{ whiteSpace: "normal" }}
      >
        {cell.quantity}
      </div>
    ),
  },

  {
    label: <span className="flex justify-center">単位</span>,
    key: "unit",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
        style={{ whiteSpace: "normal" }}
      >
        {cell.unit}
      </div>
    ),
  },

  {
    label: "金額(税抜)",
    key: "amount",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-right "
        style={{ whiteSpace: "normal" }}
      >
        {cell.amount}
      </div>
    ),
  },
];

// export const nodes = [
//     {
//     estimate_id: "—",
//     drawing_number: "—",
//     deadline: "—",
//     unit_price: "—",
//     quantity: "—",
//     item_name: "—",
//     price: "—"
//     },

//   ];

//   export const COLUMNS = [
//     {
//         label: <span className="flex justify-center">内容</span>,
//         key: "content",
//         renderCell: (cell) => (
//             <div
//               className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
//               style={{ whiteSpace: "normal" }}
//             >
//               {cell.content}
//             </div>
//           ),

//       },

//     {
//       label: "図番",
//       key: "figure_number",
//       renderCell: (cell) => (
//         <div
//           className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
//           style={{ whiteSpace: "normal" }}
//         >
//           {cell.figure_number}
//         </div>
//       ),
//     },
//     {
//       label: "納期",
//       key: "deadline",
//       renderCell: (cell) => (
//         <div
//           className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
//           style={{ whiteSpace: "normal" }}
//         >
//                  {cell.deadline}

//         </div>
//       ),
//     },
//     {
//       label: "単価(税抜)",
//       key: "unitPrice_excluding_tax",
//       renderCell: (cell) => (
//         <div
//           className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-right "
//           style={{ whiteSpace: "normal" }}
//         >
//               {cell.unitPrice_excluding_tax}

//         </div>
//       ),
//     },
//     {
//         label: "数量",
//         key: "quantity",
//         renderCell: (cell) => (
//           <div
//             className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-right "
//             style={{ whiteSpace: "normal" }}
//           >
//                 {cell.quantity}

//           </div>
//         ),
//       },

//       {
//         label: <span className="flex justify-center">単位</span>,
//         key: "unit",
//         renderCell: (cell) => (
//           <div
//             className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
//             style={{ whiteSpace: "normal" }}
//           >
//                 {cell.unit}

//           </div>
//         ),
//       },

//       {
//         label: "金額(税抜)",
//         key: "amount_excluding_tax",
//         renderCell: (cell) => (
//           <div
//             className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-right "
//             style={{ whiteSpace: "normal" }}
//           >
//                 {cell.amount_excluding_tax}

//           </div>
//         ),
//       },

//   ];
