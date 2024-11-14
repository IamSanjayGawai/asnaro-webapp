import { CompactTable } from "@table-library/react-table-library/compact";
import { theme } from "@/utils/tableTheme";
import { useState } from "react";
import { useAppDispatch } from "@/state/hooks";
import { registerRefundTransaction } from "../../../state/slices/transactionSlice";

const RefundModal = ({
  setModify,
  showContactModal,
  setShowContactModal,
  defaultRow,
  compactTableData,
  taxRate = 10,
  lastNote,
}) => {
  const dispatch = useAppDispatch();
  console.log("compactTableData", compactTableData);
  const [textareaValue, setTextareaValue] = useState("");
  const [lastNoteChange, setLastNote] = useState(lastNote);
  const [totalAmountExcludingTax, setTotalAmountExcludingTax] = useState(
    compactTableData
      ? compactTableData.nodes.reduce((acc, item) => {
          const parsedAmount = parseFloat(item.amount || 0);
          return acc + parsedAmount;
        }, 0)
      : 0
  );
  const validTaxRate = typeof taxRate === "number" ? taxRate : 0;
  const [taxAmount, setTaxAmount] = useState(
    totalAmountExcludingTax * (validTaxRate / 100) || 0
  );
  const [totalAmountIncludingTax, setTotalAmountIncludingTax] = useState(
    Math.floor(totalAmountExcludingTax + taxAmount) || 0
  );
  const handleChange = (event) => {
    if (lastNoteChange) {
      setLastNote(event.target.value);
    }
    setTextareaValue(event.target.value);
  };

  let fixedRowLimit = 15;

  const [data, setData] = useState(() => {
    if (
      compactTableData &&
      compactTableData.nodes &&
      compactTableData.nodes.length >= fixedRowLimit
    ) {
      return compactTableData;
    } else {
      const defaultNodes = Array.from(
        { length: fixedRowLimit },
        (_, index) => ({
          ...defaultRow,
          id: String(index + 1),
        })
      );

      return {
        nodes: compactTableData
          ? compactTableData.nodes?.concat(
              defaultNodes.slice(compactTableData.nodes.length)
            )
          : defaultNodes,
      };
    }
  });

  function formatIndianNumber(number) {
    if (number === null) {
      return "";
    }
    return number.toLocaleString("ja-JP");
  }

  const parseIndianNumber = (numberString) => {
    if (!numberString || typeof numberString !== "string") {
      return numberString;
    }
    const parsedNumber = parseFloat(numberString.replace(/,/g, ""));
    return isNaN(parsedNumber) ? 0 : parsedNumber;
  };

  const handleUpdate = (value, id, property) => {
    setData((prevState) => {
      const updatedNodes = prevState.nodes.map((node) => {
        if (node.id === id) {
          return { ...node, [property]: value };
        }
        return node;
      });

      // Calculate total amount for all rows in the modal
      const totalAmount = updatedNodes.reduce((acc, item) => {
        const parsedAmount = parseIndianNumber(item.amount || 0);
        return acc + parsedAmount;
      }, 0);
      const newTaxAmount = Math.floor(totalAmount * (validTaxRate / 100));
      const newTotalAmountIncludingTax = Math.floor(totalAmount + newTaxAmount);

      setTotalAmountExcludingTax(totalAmount);
      setTaxAmount(newTaxAmount);
      setTotalAmountIncludingTax(newTotalAmountIncludingTax);

      return { ...prevState, nodes: updatedNodes };
    });
  };

  // Register the transaction
  const handleRegister = () => {
    setModify(true);
    const { nodes } = data;
    // Function to calculate amount excluding tax and update total amount including tax

    // Filter out items with empty fields
    const filledItems = nodes.filter(({ content = "", amount = "" }) => {
      return (
        content.trim() !== "" ||
        (typeof amount === "string" && amount.trim() !== "")
      );
    });

    // Extract specific fields into arrays
    const transformedData = {
      items: filledItems.map(({ content = "", amount = "" }) => ({
        content,
        amount,
      })),
      taxDetails: {
        totalAmountExcludingTax: formatIndianNumber(totalAmountExcludingTax),
        taxAmount: formatIndianNumber(taxAmount),
        totalAmountIncludingTax: formatIndianNumber(totalAmountIncludingTax),
        textareaValue: textareaValue,
      },
    };
    dispatch(
      registerRefundTransaction({
        items: transformedData.items,
        RefundTaxDetails: transformedData.taxDetails,
      })
    );
    setShowContactModal(false);
  };
  //   all columns for transactionModal

  const COLUMNS = [
    {
      label: <span className="text-[16px]">内容</span>,
      renderCell: (item) => (
        <input
          className="border text-[16px] font-[100] outline-none px-1 text-start "
          type="text"
          style={{
            width: "100%",
          }}
          value={item.content}
          onChange={(event) =>
            handleUpdate(event.target.value, item.id, "content")
          }
        />
      ),
    },
    {
      label: <span className="text-[16px]">金額(税抜)</span>,
      renderCell: (item) => (
        <input
          className="border text-[16px] font-[100] outline-none px-1 text-start  lg:w-full"
          type="text"
          style={{
            width: "100%",
          }}
          value={
            (item.amount || 0) !== 0 ? formatIndianNumber(item.amount || 0) : ""
          }
          onChange={(event) =>
            handleUpdate(event.target.value, item.id, "amount")
          }
        />
      ),
    },
  ];

  return (
    <>
      {showContactModal ? (
        <div>
          <div className=" justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000080]">
            <div
              // ref={modalRef}
              className="relative xs:w-5/6 sm:w-5/6 md:w-3/4 lg:w-3/4 my-6 mx-auto max-w-3xl p-4 bg-[#fff] flex  flex-col justify-center overflow-y-hidden"
              style={{ maxHeight: "95vh" }}
            >
              <span className="text-center mb-3 text-[#255BB3] font-bold">
                取引条件入力フォーム
              </span>

              {/* all main containt  start*/}
              <div className="mt-4 bg-[#fff] overflow-y-auto  overflow-x-auto border">
                {/* table container */}
                <form className=" flex flex-col border  ">
                  <CompactTable columns={COLUMNS} data={data} theme={theme} />
                  <div className="lg:w-full md:w-full">
                    <div className="bg-[#E6E6E6] lg:w-full xs:w-[200%]  h-[2rem] text-[18px] flex items-center justify-end ">
                      {" "}
                      <div className="flex justify-between xs:w-1/4 lg:w-2/4">
                        {" "}
                        <span className="text-[#808080]">
                          合計金額(税抜)
                        </span>{" "}
                        <span className="mr-3">
                          {" "}
                          {formatIndianNumber(totalAmountExcludingTax)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#ffffff] lg:w-full xs:w-[200%]  h-[2rem] text-[18px] flex items-center justify-end">
                      {" "}
                      <div className="flex justify-between xs:w-1/4 lg:w-2/4">
                        {" "}
                        <span className="text-[#808080]">
                          消費税({taxRate}%)
                        </span>{" "}
                        <span className="mr-3">
                          {formatIndianNumber(taxAmount)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#FFF4DF] lg:w-full xs:w-[200%]  h-[2rem] text-[18px] flex items-center justify-end">
                      <div className="flex justify-between xs:w-1/4 lg:w-2/4">
                        {" "}
                        <span className="text-[#808080]">
                          合計金額(税込)
                        </span>{" "}
                        <span className="mr-3">
                          {" "}
                          {formatIndianNumber(totalAmountIncludingTax)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#ffffff] lg:w-full xs:w-[200%]  h-[7rem] text-[18px] flex items-center justify-start">
                      <div className="w-[6rem] h-[7rem] bg-[#E6E6E6] flex items-center justify-center text-[#808080]">
                        特記事項
                      </div>
                      <div className="w-full h-[5rem]  flex">
                        <textarea
                          value={
                            lastNoteChange ? lastNoteChange : textareaValue
                          }
                          onChange={handleChange}
                          className="w-full h-full align-top p-2 resize-none border-0 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                {/* table container end*/}
              </div>
              {/* all main containt end */}
              <div className=" w-full flex   gap-2 mt-8 cursor-pointer mb-8 ">
                <div className="flex justify-center gap-6  lg:w-full  xs:w-[200%]  ">
                  <span
                    onClick={() => setShowContactModal(false)}
                    className="lg:px-[6rem] xs:px-[3.2rem]  py-3 lg:text-[18px] xs:text-[12px]  text-[#fff] bg-[#808080]"
                  >
                    戻る
                  </span>{" "}
                  <span
                    onClick={handleRegister}
                    className="lg:px-[2rem] xs:px-[0.7rem] py-3  lg:text-[18px] xs:text-[12px] bg-[#FFAA00] text-[#fff]"
                  >
                    この内容で登録する
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default RefundModal;
