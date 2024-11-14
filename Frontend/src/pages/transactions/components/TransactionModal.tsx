import { CompactTable } from "@table-library/react-table-library/compact";
import { theme } from "@/utils/tableTheme";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  registerTransaction,
  selectTransaction,
} from "../../../state/slices/transactionSlice";
import { selectAdmin } from "@/state/slices/adminSlice";
import { getUpperlimitThunk } from "@/state/thunks/adminThunks";

const TransactionModal = ({
  setModify,
  showContactModal,
  setShowContactModal,
  defaultRow,
  compactTableData,
  taxRate,
  lastQuotationTaxAmount,
  lasttotalAmountIncludingTax,
  lasttotalamountExcludingTax,
  lastNote,
}) => {
  const dispatch = useAppDispatch();
  const { estimateTable, transaction, taxDetails } =
    useAppSelector(selectTransaction);
  const { upperlimitRate } = useAppSelector(selectAdmin);
  const [lastNoteChange, setLastNote] = useState(lastNote);
  const [textareaValue, setTextareaValue] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [fixedRowLimit, setFixedRowLimit] = useState(15);
  const backQuotation = transaction?.transaction?.quotation;
  const [dateValue, setDateValue] = useState("");
  const [data, setData] = useState(() => {
    if (compactTableData && compactTableData?.nodes.length >= fixedRowLimit) {
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
          ? compactTableData.nodes.concat(
              defaultNodes.slice(compactTableData?.nodes.length)
            )
          : defaultNodes,
      };
    }
  });

  useEffect(() => {
    const initialDate =
      backQuotation && Array.isArray(backQuotation) && backQuotation?.length > 0
        ? new Date(backQuotation[0]?.deadline).toISOString().slice(0, 10)
        : estimateTable &&
            Array.isArray(estimateTable) &&
            estimateTable.length > 0
          ? estimateTable[0]?.deadline
          : dateValue;
    setDateValue(initialDate);
    if (
      backQuotation &&
      Array.isArray(backQuotation) &&
      backQuotation?.length > 0
    ) {
      setAmountExcludingTax(formatIndianNumber(lasttotalamountExcludingTax));
    }
    if (
      estimateTable &&
      Array.isArray(estimateTable) &&
      estimateTable.length > 0
    ) {
      setAmountExcludingTax(formatIndianNumber(taxDetails?.amountExcludingTax));
    }
    if (
      backQuotation &&
      Array.isArray(backQuotation) &&
      backQuotation.length > fixedRowLimit
    ) {
      setFixedRowLimit(backQuotation.length);
      setData({
        nodes: backQuotation.map((item, index) => ({
          id: String(index + 1),
          content: item.item_name,
          drawingNumber: item.drawing_number,
          unitPrice: item.unit_price,
          quantity: item.quantity,
          unit: item.unit,
          amount: parseIndianNumber(item.price),
          deadline: item.deadline,
        })),
      });
    }
  }, [estimateTable, backQuotation]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUpperlimitThunk({}));
    };
    fetchData();
  }, [dispatch]);

  const increaseRow = () => {
    setFixedRowLimit((prev) => prev + 1);
    setData((prevState) => {
      const newNodes = Array.from({ length: 1 }, (_, index) => ({
        ...defaultRow,
        id: String(prevState.nodes.length + index + 1),
      }));

      return {
        nodes: prevState.nodes.concat(newNodes),
      };
    });
  };

  const [amountExcludingTax, setAmountExcludingTax] = useState(
    lasttotalamountExcludingTax || ""
  );
  const [taxAmount, setTaxAmount] = useState(lastQuotationTaxAmount || "");
  const [totalAmountIncludingTax, setTotalAmountIncludingTax] = useState(
    lasttotalAmountIncludingTax || ""
  );

  // Helper function to format numbers with commas
  const formatIndianNumber = (number) => {
    if (number === null || number === undefined) {
      return "";
    }
    return number.toLocaleString("ja-JP");
  };

  // Function to parse numbers formatted with commas
  const parseIndianNumber = (numberString) => {
    if (!numberString || typeof numberString !== "string") {
      return numberString;
    }
    const parsedNumber = parseFloat(numberString.replace(/,/g, ""));
    return isNaN(parsedNumber) ? 0 : parsedNumber;
  };

  const validateFields = () => {
    let errors = [];

    data.nodes.forEach((node) => {
      if (
        node.content ||
        node.drawingNumber ||
        node.unitPrice ||
        node.quantity ||
        node.unit ||
        node.amount
      ) {
        if (!node.content) errors.push("内容列が空です。");
        if (!node.drawingNumber) errors.push("図番列が空です。");
        if (!node.unitPrice) errors.push("単価(税抜)列が空です。");
        if (!node.quantity) errors.push("数量列が空です。");
        if (!node.unit) errors.push("単位列が空です。");
        if (!node.amount) errors.push("金額(税抜)列が空です。");
      }
 
    });
    if (dateValue === "" || dateValue === null || dateValue === undefined) {
      errors.push("納期が空です。");
    }
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleChange = (event) => {
    setLastNote(event.target.value);
    setTextareaValue(event.target.value);
  };

  const handleUpdate = (value, id, property) => {
    setData((prevState) => {
      const updatedNodes = prevState.nodes.map((node) => {
        if (node.id === id) {
          return { ...node, [property]: value };
        }
        return node;
      });

      if (property === "unitPrice" || property === "quantity") {
        updatedNodes.forEach((node) => {
          const unitPrice = parseIndianNumber(node.unitPrice || 0);
          const quantity = parseIndianNumber(node.quantity || "0");
          node.amount =
            typeof unitPrice === "number" && typeof quantity === "number"
              ? unitPrice * quantity
              : 0;
        });

        const totalAmount = updatedNodes.reduce((acc, item) => {
          const parsedAmount = parseFloat(item.amount || "0");
          return acc + parsedAmount;
        }, 0);

        const validTaxRate = typeof taxRate === "number" ? taxRate : 0;
        const newTaxAmount = Math.floor(totalAmount * (validTaxRate / 100));
        const newTotalAmountIncludingTax = Math.floor(
          totalAmount + newTaxAmount
        );

        setAmountExcludingTax(totalAmount);
        setTaxAmount(newTaxAmount);
        setTotalAmountIncludingTax(newTotalAmountIncludingTax);
      }

      return { ...prevState, nodes: updatedNodes };
    });
  };

  const handleAmountChange = (value, id) => {
    calculateUnitOrUnitPrice(value, id);
    handleUpdate(value, id, "amount");
  };

  const calculateUnitOrUnitPrice = (amount, id) => {
    setData((prevState) => {
      let updatedNodes = [...prevState.nodes];

      const updatedNodeIndex = updatedNodes.findIndex((node) => node.id === id);

      if (updatedNodeIndex !== -1) {
        const node = updatedNodes[updatedNodeIndex];
        const quantity = parseFloat(node.quantity || 0);
        const newUnitPrice =
          quantity !== 0 ? (parseFloat(amount) / quantity).toFixed(2) : "0.00";

        if (node.unitPrice !== newUnitPrice) {
          updatedNodes[updatedNodeIndex] = { ...node, unitPrice: newUnitPrice };
        }
      }

      updatedNodes = updatedNodes.filter(
        (node) => parseFloat(node.unitPrice) !== 0
      );

      const totalAmount = updatedNodes.reduce((acc, item) => {
        const price = parseFloat(item.unitPrice || 0);
        const quantity = parseFloat(item.quantity || 0);
        return acc + price * quantity;
      }, 0);

      const newTaxAmount = totalAmount * (taxRate / 100);
      const newTotalAmountIncludingTax = totalAmount + newTaxAmount;

      setAmountExcludingTax(parseFloat(totalAmount.toFixed(2)));
      setTaxAmount(parseFloat(newTaxAmount.toFixed(2)));
      setTotalAmountIncludingTax(
        parseFloat(newTotalAmountIncludingTax.toFixed(2))
      );

      return { ...prevState, nodes: updatedNodes };
    });
  };

  const handleRegister = () => {
    setHasAttemptedSubmit(true);

    if (!validateFields()) {
      return;
    }

    setModify(true);
    const { nodes } = data;

    const filledItems = nodes.filter(
      ({
        content = "",
        drawingNumber = "",
        unitPrice = "",
        quantity = "",
        unit = "",
        amount = "",
      }) => {
        return (
          content.trim() !== "" ||
          drawingNumber.trim() !== "" ||
          unitPrice.trim() !== "" ||
          quantity.trim() !== "" ||
          unit.trim() !== "" ||
          (typeof amount === "string" && amount.trim() !== "")
        );
      }
    );

    const transformedData = {
      items: filledItems.map(
        ({
          content = "",
          drawingNumber = "",
          deadline = "",
          unitPrice = "",
          quantity = "",
          unit = "",
          amount = "",
        }) => ({
          content,
          deadline,
          drawingNumber,
          unitPrice,
          quantity,
          unit,
          amount,
        })
      ),
      taxDetails: {
        amountExcludingTax: formatIndianNumber(
          amountExcludingTax || lasttotalAmountIncludingTax
        ),
        taxAmount: formatIndianNumber(taxAmount || lastQuotationTaxAmount),
        totalAmountIncludingTax: formatIndianNumber(
          totalAmountIncludingTax || lasttotalAmountIncludingTax
        ),
        textareaValue: textareaValue || lastNote,
        deadline: dateValue,
      },
    };

    const itemsWithDeadline = transformedData.items.map((item) => ({
      ...item,
      deadline: dateValue,
    }));

    console.log("itemsWithDeadline", itemsWithDeadline);

    dispatch(
      registerTransaction({
        items: itemsWithDeadline,
        taxDetails: transformedData.taxDetails,
      })
    );
    setShowContactModal(false);
  };

  const totalLimitAmount = Math.floor(
    parseIndianNumber(amountExcludingTax) +
      parseIndianNumber(amountExcludingTax) * (taxRate / 100)
  );

  const exceedsLimit = totalLimitAmount >= upperlimitRate?.amount;
  const amountIsZero = totalLimitAmount === 0;

  // Define the COLUMNS variable here
  const COLUMNS = [
    {
      label: (
        <span className="flex items-center justify-center text-[16px]">
          内容
        </span>
      ),
      renderCell: (item) => (
        <input
          className="border text-[16px] font-[100] outline-none px-1 "
          type="text"
          style={{
            width: "100%",
          }}
          value={item.content || ""}
          onChange={(event) =>
            handleUpdate(event.target.value, item.id, "content")
          }
        />
      ),
    },
    {
      label: <span className="text-[16px]">図番</span>,
      renderCell: (item) => (
        <input
          className="border text-[16px] font-[100] outline-none px-1 "
          type="text"
          style={{
            width: "100%",
          }}
          value={item.drawingNumber || ""}
          onChange={(event) =>
            handleUpdate(event.target.value, item.id, "drawingNumber")
          }
        />
      ),
    },
    {
      label: <span className="text-[16px]">単価(税抜)</span>,
      renderCell: (item) => (
        <input
          className="border text-[16px] font-[100] outline-none px-1 text-end "
          type="text"
          style={{
            width: "100%",
          }}
          value={item.unitPrice || ""}
          onChange={(event) =>
            handleUpdate(event.target.value, item.id, "unitPrice")
          }
          onBlur={(event) =>
            handleUpdate(
              formatIndianNumber(parseIndianNumber(event.target.value)),
              item.id,
              "unitPrice"
            )
          }
        />
      ),
    },
    {
      label: <span className="text-[16px]">数量</span>,
      renderCell: (item) => (
        <input
          className="border text-[16px] font-[100] outline-none px-1 text-end "
          type="text"
          style={{
            width: "100%",
          }}
          value={item.quantity || ""}
          onChange={(event) =>
            handleUpdate(event.target.value, item.id, "quantity")
          }
        />
      ),
    },
    {
      label: (
        <span className="flex items-center justify-center text-center text-[16px]">
          単位
        </span>
      ),
      renderCell: (item) => (
        <input
          className="border text-[16px] font-[100] outline-none px-1 text-center "
          type="text"
          style={{
            width: "100%",
          }}
          value={item.unit || ""}
          onChange={(event) =>
            handleUpdate(event.target.value, item.id, "unit")
          }
        />
      ),
    },
    {
      label: <span className="text-[16px]">金額(税抜)</span>,
      renderCell: (item) => (
        <input
          className="border text-[16px] font-[100] outline-none px-1 text-end "
          type="text"
          style={{
            width: "100%",
          }}
          value={
            (item.amount || 0) !== 0 ? formatIndianNumber(item.amount || 0) : ""
          }
          onChange={(event) => {
            handleAmountChange(event.target.value, item.id);
          }}
        />
      ),
    },
  ];

  // console.log("backQuotation", backQuotation);
  // console.log("estimateTable", estimateTable);
  // console.log("taxDetails", taxDetails);

  return (
    <>
      {showContactModal ? (
        <div>
          <div className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000080]">
            <div
              className="relative xs:w-5/6 sm:w-5/6 md:w-3/4 lg:w-3/4 my-6 mx-auto max-w-3xl p-4 bg-[#fff] flex flex-col justify-center overflow-y-hidden"
              style={{ maxHeight: "95vh" }}
            >
              <span className="text-center mb-3 text-[#255BB3] font-bold ">
                取引条件入力フォーム
              </span>
              <div className="mt-4 bg-[#fff] overflow-y-auto overflow-x-auto border">
                <form className="flex flex-col  ">
                  <CompactTable columns={COLUMNS} data={data} theme={theme} />
            
                </form>
              </div>
       
              <div className="lg:w-full md:w-full ">
                <div className="flex items-center">
                  <div className=" lg:w-full  p-1 rounded-lg">
                    <input
                      type="date"
                      value={dateValue}
                      onChange={(e) => setDateValue(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div
                    onClick={increaseRow}
                    className="w-full  cursor-pointer bg-[#255BB3] text-white p-1 text-center  "
                  >
             行を追加
                  </div>
                  </div>
           
                    <div className="bg-[#E6E6E6] w-full  h-[2rem] lg:text-[18px] flex items-center justify-end">
                    <div className="flex justify-between xs:w-2/4 lg:w-2/4">
                        <span className="text-[#808080]">合計金額(税抜)</span>
                        <span className="mr-3">
                          {amountExcludingTax
                            ? formatIndianNumber(amountExcludingTax)
                            : formatIndianNumber(
                                lasttotalamountExcludingTax || "—"
                              )}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#ffffff] w-full  h-[2rem] lg:text-[18px] flex items-center justify-end">
                      <div className="flex justify-between xs:w-2/4 lg:w-2/4">
                        <span className="text-[#808080]">
                          消費税({taxRate}%)
                        </span>
                        <span className="mr-3">
                          {amountExcludingTax
                            ? formatIndianNumber(
                                Math.floor(
                                  parseIndianNumber(amountExcludingTax) *
                                    (taxRate / 100)
                                )
                              )
                            : formatIndianNumber(lastQuotationTaxAmount) || "—"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#FFF4DF] w-full h-[2rem] lg:text-[18px] flex items-center justify-end ">
                    <div className="flex justify-between xs:w-2/4 lg:w-2/4">
                        <span className="text-[#808080]">合計金額(税込)</span>
                        <span className="mr-3">
                          {amountExcludingTax ? (
                            exceedsLimit ? (
                              <span className="text-[red] flex ">
                                {formatIndianNumber(totalLimitAmount)}
                              </span>
                            ) : (
                              formatIndianNumber(totalLimitAmount)
                            )
                          ) : (
                            formatIndianNumber(lasttotalAmountIncludingTax) ||
                            "—"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#ffffff] w-full  h-[4.5rem] text-[18px] flex items-center justify-start ">
                      <div className="w-[6rem] h-[4rem] bg-[#E6E6E6] flex items-center justify-center text-[#808080]">
                        特記事項
                      </div>
                      <div className="w-full h-[4rem] flex">
                        <textarea
                          value={
                            lastNoteChange ? lastNoteChange : textareaValue
                          }
                          onChange={handleChange}
                          className="w-full h-full align-top p-2 resize-none border outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" text-red-600 text-center  ">
                {hasAttemptedSubmit && validationErrors.length > 0 && (
                  <ul className="flex flex-row justify-center items-center gap-2">
                    {validationErrors.map((error, index) => (
                      <li key={index} className=" text-center">
                        {error}
                      </li>
                    ))}
                  </ul>
                )}

                {exceedsLimit && !amountIsZero && (
                  <div>{`取引金額が限度額の "${formatIndianNumber(totalLimitAmount)}">"${formatIndianNumber(upperlimitRate?.amount)}"円を超えています。少なめの量でお試しください。`}</div>
                )}
              </div>
              <div className="w-full flex gap-2 mt-8 cursor-pointer mb-8">
                <div className="flex justify-center gap-6 lg:w-full xs:w-[200%]">
                  <span
                    onClick={() => setShowContactModal(false)}
                    className="lg:px-[6rem] xs:px-[3.2rem] py-3 lg:text-[18px] xs:text-[12px] text-[#fff] bg-[#808080]"
                  >
                    戻る
                  </span>
                  <span
                    onClick={exceedsLimit ? null : handleRegister}
                    className={`lg:px-[2rem] xs:px-[0.7rem] py-3 lg:text-[18px] xs:text-[12px] bg-[#FFAA00] text-[#fff] ${
                      exceedsLimit ? "cursor-not-allowed" : ""
                    } `}
                  >
                    この内容で登録する
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TransactionModal;
