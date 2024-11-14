import { useState, useEffect } from "react";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CompactTable } from "@table-library/react-table-library/compact";
import {
  dashed,
  defaultRefundRow,
  defaultRow,
  theme,
} from "@/utils/transactionSupport";
import TransactionModal from "./components/TransactionModal";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setNewNotification } from "@/state/slices/newsSlice";
import {
  selectTransaction,
  FetchQuotationThunk,
  showPaymentModal,
  setFirstTimeAfterPayment,
  ShowReviewModalThunk,
  showCancelModalThunk,
} from "@/state/slices/transactionSlice";
import {
  contractSignedThunk,
  CreateEstimatePdfThunk,
  createRefundThunk,
} from "@/state/thunks/transactionThunks";
import DownloadPDF from "../../utils/downloadHelp/downloadHelpEstimation";
import DownloadPDFAdvancePayment from "../../utils/downloadHelp/downloadHelpAdvancepayment";
import DownloadPDFOrderForm from "@/utils/downloadHelp/downloadHelpOrderForm";
import StepperMessage from "./components/StepperMessage";
import Spinner from "@/components/static/Spinner";
import { COLUMNS } from "@/utils/columns";
import { getTaxThunk } from "@/state/thunks/transactionThunks";
import Stepper from "./components/Stepper";
import { socket } from "@/state/store";
import DownloadPDFDelivery from "@/utils/downloadHelp/downloadHelpDelivery";
import DownloadPDFReceipt from "@/utils/downloadHelp/downloadHelpReceipt";
import DownloadPDFAcceptance from "@/utils/downloadHelp/downloadHelpAcceptance";
import DownloadPDFTransactionInvoice from "@/utils/downloadHelp/downloadHelpTransactionInvoice";
import DownloadPDFSystem from "@/utils/downloadHelp/downloadHelpSystem";
import ReviewModal from "./components/ReviewModal";
import CancelationModal from "./components/CancelationModal";
import RefundStepper from "./components/RefundStepper";
import RefundStepperMessage from "./components/RefundStepperMessage";
import RefundModal from "./components/RefundModal";
import DownloadPDFRefundInvoice from "@/utils/downloadHelp/downloadHelpRefundInvoice";
import DownloadPDFRefundTransactionInvoice from "@/utils/downloadHelp/downloadHelpRefundTransactionInoice";
import DownloadPDFRefundSystem from "@/utils/downloadHelp/downloadHelpRefundSystem";
import { selectAdmin } from "@/state/slices/adminSlice";
import { fetchTransactionForAdminViewThunk } from "@/state/thunks/adminThunks";

type socketRefundTaxDetailsProps = {
  totalAmountExcludingTax?: string;
  totalAmountIncludingTax?: string;
  taxAmount?: string;
  textareaValue?: string;
};

const SellerTransaction = () => {
  const router = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const chatRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [quotationRequested, setQuotationRequested] = useState(false);
  const [quotationSent, setQuotationSent] = useState(false);
  const [quotationReceived, setQuotationReceived] = useState(false);
  const [reQuoteRequested, setReQuoteRequested] = useState(false);
  const [reQuoteReceived, setReQuoteReceived] = useState(false);
  const [reQuoteSent, setReQuoteSent] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [modify, setModify] = useState(false);
  const [contractSigned, setContractSigned] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [payByBuyer, setPayByBuyer] = useState(false);
  const [deliveryDone, setDeliveryDone] = useState(false);
  const [deliveryOK, setDeliveryOK] = useState(false);
  const [refundActive, setRefundActive] = useState(false);
  const [agreedToCancel, setAgreedToCancel] = useState(false);
  const [refundRequested, setRefundRequested] = useState(false);
  const [refundTermsAgreed, setRefundTermsAgreed] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [reQuoteLoading, setReQuoteLoading] = useState(false);
  const [agreeLoading, setAgreeLoading] = useState(false);
  const [concludeLoading, setConcludeLoading] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [sentBackLoading, setSentBackLoading] = useState(false);
  const [acceptedLoading, setAcceptedLoading] = useState(false);
  const [refundCancelLoading, setRefundCancelLoading] = useState(false);
  const [cancelAgreeLoading, setCancelAgreeLoading] = useState(false);
  const [requestRefundLoading, setRequestRefundLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [refresh, setRefresh] = useState<number>(0);
  const [refreshOrderForm, setRefreshOrderForm] = useState<number>(0);
  const [refreshDeliverySlip, setRefreshDeliverySlip] = useState<number>(0);
  const [refreshReceipt, setRefreshReceipt] = useState<number>(0);
  const [refreshAcceptance, setRefreshAcceptance] = useState<number>(0);
  const [refreshRefundInvoice, setRefreshRefundInvoice] = useState<number>(0);
  const [chatArray, setChatArray] = useState([]);
  const [message, setMessage] = useState<string>("");
  const [msgFile, setMsgFile] = useState<File>(null);
  const [socketRefundPdf, setSocketRefundPdf] = useState<string>("");
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [AdminRefresh, setAdminRefresh] = useState(false);
  const {
    loading,
    registerContent,
    firstTimeAfterPayment,
    estimateLoading,
    refundLoading,
    quatation: quotation,
    refundTable,
    refundHit,
    taxData,
    taxDetails,
    RefundTaxDetails,
    ordererdAgree: ordererAgreeChange,
    contractSigned: contractSignedChange,
    reviewModalShow,
    cancelModalshow,
  } = useAppSelector(selectTransaction);
  const { transaction } = useAppSelector(selectAdmin);

  const netQuotationRequested =
    quotationRequested || transaction?.transaction?.quotationRequested;
  const netQuotationSent =
    quotationSent || transaction?.transaction?.quotationSent;
  const netQuotationReceived =
    quotationReceived || transaction?.transaction?.quotationReceived;
  const netReQuoteRequested =
    reQuoteRequested || transaction?.transaction?.reQuoteRequested;
  const netReQuoteReceived =
    reQuoteReceived || transaction?.transaction?.reQuoteReceived;
  const netReQuoteSent = reQuoteSent || transaction?.transaction?.reQuoteSent;
  const netTermsAgreed = termsAgreed || transaction?.transaction?.orderer_agree;
  const netContractSigned =
    contractSigned || transaction?.transaction?.contractSigned;
  const netPaymentDone =
    paymentDone || transaction?.transaction?.paymentDeposit;
  const netDeliveryDone =
    deliveryDone || transaction?.transaction?.delivery_status === 1;
  const netDeliveryOK =
    deliveryOK || transaction?.transaction?.delivery_status === 3;
  const netAgreedToCancel =
    agreedToCancel || transaction?.transaction?.agreedToCancel;
  const netRefundRequested =
    refundRequested || transaction?.transaction?.refundRequested;
  const netRefundTermsAgreed =
    refundTermsAgreed || transaction?.transaction?.refundTransferred;
  const [socketEstimate, setSocketEstimate] = useState([]);
  const [socketRefund, setSocketRefund] = useState([]);
  const [socketRefundTaxDetails, setSocketRefundTaxDetails] =
    useState<socketRefundTaxDetailsProps>();
  const backQuotation = transaction?.transaction?.quotation;
  const calculationString = localStorage.getItem("estimateTableData");
  const estimateTable = calculationString ? JSON.parse(calculationString) : [];
  const taxRate = taxData?.taxes[0]?.rate;
  const hasRun = useRef<boolean>(false);
  const isBlueButtonForEstimation =
    transaction && transaction?.transaction?.estimation_pdf;
  const isBlueButtonForAdvancePayment =
    transaction && transaction?.transaction?.advance_payment_invoice;
  const isBlueButtonForOrderForm =
    transaction && transaction?.transaction?.order_form;
  const isBlueButtonForDeliverySlip =
    transaction && transaction?.transaction?.delivery_slip;
  const isBlueButtonForReceipt =
    transaction && transaction?.transaction?.Receipt;
  const isBlueButtonForAcceptanceLetter =
    transaction && transaction?.transaction?.acceptance_letter;
  const isBlueButtonForTransactionInvoice =
    transaction && transaction?.transaction?.transaction_invoice;
  const isBlueButtonForRefundTransactionInvoice =
    transaction && transaction?.transaction?.refund_transaction_invoice;
  const isBlueButtonForSystemFee =
    transaction && transaction?.transaction?.system_fee_invoice;
  const isBlueButtonForRefundSystemFee =
    transaction && transaction?.transaction?.refund_system_fee_invoice;
  const isBlueButtonForRefundInvoice = socketRefundPdf
    ? socketRefundPdf
    : transaction && transaction?.transaction?.refund_invoice;
  const [sentTable, setSentTable] = useState(false);
  console.log(
    isBlueButtonForRefundInvoice,
    "isBlueButtonForRefundInvoice........"
  );
  const refundQuotation =
    backQuotation &&
    backQuotation.concat(
      socketRefund?.length > 0
        ? socketRefund
        : !refundHit && refundTable
        ? refundTable
        : transaction?.transaction?.refund?.tableData
    );
  const refundOnlyQuotation =
    socketRefund?.length > 0
      ? socketRefund
      : !refundHit && refundTable
      ? refundTable
      : transaction?.transaction?.refund?.tableData;

  function formatIndianNumber(number) {
    if (number === null) {
      return "";
    }
    return number.toLocaleString("ja-JP");
  }

  // Function to parse Indian number format (with commas)
  const parseIndianNumber = (numberString) => {
    if (!numberString || typeof numberString !== "string") {
      return numberString;
    }
    const parsedNumber = parseFloat(numberString.replace(/,/g, ""));
    return isNaN(parsedNumber) ? 0 : parsedNumber;
  };

  const compactTableData = {
    nodes:
      socketEstimate &&
      Array.isArray(socketEstimate) &&
      socketEstimate?.length > 0
        ? socketEstimate.map((item, index) => ({
            id: index.toString(),
            amount: item?.price,
            content: item?.item_name,
            deadline: item?.deadline,
            drawingNumber: item?.drawing_number,
            quantity: item?.quantity,
            unit: item?.unit,
            unitPrice: item?.unit_price,
            taxAmount: item?.taxAmount,
            totalAmountIncludingTax: item?.totalAmountIncludingTax,
            totalamountExcludingTax: item?.totalamountExcludingTax,
          }))
        : !registerContent &&
          quotation &&
          Array.isArray(quotation) &&
          quotation?.length > 0
        ? quotation.map((item, index) => ({
            id: index.toString(),
            amount: item.price,
            content: item.item_name,
            deadline: item.deadline
              ? new Date(item.deadline).toISOString().slice(0, 10)
              : null,
            drawingNumber: item.drawing_number,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unit_price,
            taxAmount: item.taxAmount,
            totalAmountIncludingTax: item.totalAmountIncludingTax,
            totalamountExcludingTax: item.totalamountExcludingTax,
          }))
        : Array.isArray(estimateTable) && estimateTable.length > 0
        ? estimateTable.map((item, index) => ({
            id: index.toString(),
            amount: formatIndianNumber(item.amount),
            content: item.content,
            deadline: item.deadline,
            drawingNumber: item.drawingNumber,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            totalAmountIncludingTax: item.totalAmountIncludingTax,
            totalamountExcludingTax: item.totalamountExcludingTax,
          }))
        : backQuotation &&
          Array.isArray(backQuotation) &&
          backQuotation?.length > 0
        ? backQuotation.map((item, index) => ({
            id: index.toString(),
            amount: item?.price,
            content: item?.item_name,
            deadline: item?.deadline
              ? new Date(item?.deadline).toISOString().split("T")[0]
              : null,
            drawingNumber: item?.drawing_number,
            quantity: item?.quantity,
            unit: item?.unit,
            unitPrice: item?.unit_price,
            taxAmount: item?.taxAmount,
            totalAmountIncludingTax: item?.totalAmountIncludingTax,
            totalamountExcludingTax: item?.totalamountExcludingTax,
          }))
        : show
        ? defaultRow.nodes
        : dashed.nodes,
  };

  const refundTableData = {
    nodes:
      refundQuotation &&
      Array.isArray(refundQuotation) &&
      refundQuotation?.length > 0
        ? refundQuotation.map((item, index) => ({
            id: index.toString(),
            amount: item?.amount
              ? `-${formatIndianNumber(parseIndianNumber(item?.amount))}`
              : item?.price,
            content: item?.item_name || item?.content,
            deadline: item?.deadline
              ? new Date(item?.deadline).toISOString().split("T")[0]
              : null,
            drawingNumber: item?.drawing_number,
            quantity: item?.quantity,
            unit: item?.unit,
            unitPrice: item?.unit_price,
            taxAmount: item?.taxAmount,
            totalAmountIncludingTax: item?.totalAmountIncludingTax,
            totalamountExcludingTax: item?.totalamountExcludingTax,
          }))
        : show
        ? defaultRow.nodes
        : dashed.nodes,
  };

  const refundOnlyData = {
    nodes:
      refundOnlyQuotation &&
      Array.isArray(refundOnlyQuotation) &&
      refundOnlyQuotation?.length > 0
        ? refundOnlyQuotation.map((item, index) => ({
            id: index.toString(),
            amount: item?.amount,
            content: item?.content,
          }))
        : show
        ? defaultRefundRow.nodes
        : dashed.nodes,
  };

  useEffect(() => {
    if (transaction || sentTable) {
      dispatch(FetchQuotationThunk(transaction?.transaction?.quotation));
    }
  }, [dispatch, transaction?.transaction?.quotation, transaction]);

  useEffect(() => {
    fetchData();
  }, [
    dispatch,
    id,
    ordererAgreeChange,
    contractSignedChange,
    termsAgreed,
    deliveryDone,
    deliveryOK,
    refundActive,
    cancel,
    AdminRefresh,
  ]);

  useEffect(() => {
    if (refresh === 0) {
      return;
    } else {
      DownloadPDF(transaction);
    }
  }, [refresh]);

  useEffect(() => {
    if (refreshOrderForm === 0) {
      return;
    } else {
      DownloadPDFOrderForm(transaction);
    }
  }, [refreshOrderForm]);

  useEffect(() => {
    if (refreshDeliverySlip === 0) {
      return;
    } else {
      DownloadPDFDelivery(transaction);
    }
  }, [refreshDeliverySlip]);

  useEffect(() => {
    if (refreshReceipt === 0) {
      return;
    } else {
      DownloadPDFReceipt(transaction);
    }
  }, [refreshReceipt]);

  useEffect(() => {
    if (refreshAcceptance === 0) {
      return;
    } else {
      DownloadPDFAcceptance(transaction);
    }
  }, [refreshAcceptance]);

  useEffect(() => {
    if (refreshRefundInvoice === 0) {
      return;
    } else {
      DownloadPDFRefundInvoice(transaction);
    }
  }, [refreshRefundInvoice]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    if (messageRef.current) {
      messageRef.current.focus();
    }
  }, [chatArray, transaction]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (transaction && transaction?.transaction?.conversation?.length > 0) {
      setChatArray(
        transaction?.transaction?.conversation?.map((chat) =>
          chat?.file_path
            ? {
                sender_name: chat?.sender_id?.name01,
                sender_pic: chat?.sender_id?.profile_img,
                message: chat?.file_name,
                file_path: chat?.file_path,
                first_msg: chat?.first_msg,
                seller_quote: chat?.seller_quote,
                buyer_reQuote: chat?.buyer_reQuote,
                buyer_Agree: chat?.buyer_Agree,
                contract_sign: chat?.contract_sign,
                paymentDeposited: chat?.paymentDeposited,
                deliveryCompleted: chat?.deliveryCompleted,
                receiptGenerated: chat?.receiptGenerated,
                deliverySentBack: chat?.deliverySentBack,
                deliveryAccepted: chat?.deliveryAccepted,
                cancelRequest: chat?.cancelRequest,
                cancelAgree: chat?.cancelAgree,
                requestRefund: chat?.requestRefund,
                refundTermsAgree: chat?.refundTermsAgree,
                cancelRefundRequest: chat?.cancelRefundRequest,
              }
            : {
                sender_name: chat?.sender_id?.name01,
                sender_pic: chat?.sender_id?.profile_img,
                message: chat?.note,
                first_msg: chat?.first_msg,
                seller_quote: chat?.seller_quote,
                buyer_reQuote: chat?.buyer_reQuote,
                buyer_Agree: chat?.buyer_Agree,
                contract_sign: chat?.contract_sign,
                paymentDeposited: chat?.paymentDeposited,
                deliveryCompleted: chat?.deliveryCompleted,
                receiptGenerated: chat?.receiptGenerated,
                deliverySentBack: chat?.deliverySentBack,
                deliveryAccepted: chat?.deliveryAccepted,
                cancelRequest: chat?.cancelRequest,
                cancelAgree: chat?.cancelAgree,
                requestRefund: chat?.requestRefund,
                refundTermsAgree: chat?.refundTermsAgree,
                cancelRefundRequest: chat?.cancelRefundRequest,
              }
        )
      );
    }
    if (transaction?.transaction?.paymentDeposit && firstTimeAfterPayment) {
      handlePaymentCompleted();
      dispatch(setFirstTimeAfterPayment(false));
    }
  }, [transaction]);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }

    socket.emit("join", id);

    socket.on("newMessage", (data) => {
      dispatch(setNewNotification(true));
      if (data.file_path) {
        setChatArray((prevChatArray) => [
          ...prevChatArray,
          {
            sender_name: data.sender_name,
            sender_pic: data.sender_pic,
            message: data.message,
            file_path: data.file_path,
            first_msg: data.first_msg,
            seller_quote: data.seller_quote,
            buyer_reQuote: data.buyer_reQuote,
            buyer_Agree: data.buyer_Agree,
            contract_sign: data.contract_sign,
            paymentDeposited: data.paymentDeposited,
            deliveryCompleted: data.deliveryCompleted,
            receiptGenerated: data.receiptGenerated,
            deliverySentBack: data.deliverySentBack,
            deliveryAccepted: data.deliveryAccepted,
            cancelRequest: data.cancelRequest,
            cancelAgree: data.cancelAgree,
            requestRefund: data.requestRefund,
            refundTermsAgree: data.refundTermsAgree,
            cancelRefundRequest: data.cancelRefundRequest,
          },
        ]);
      } else {
        setChatArray((prevChatArray) => [
          ...prevChatArray,
          {
            sender_name: data.sender_name,
            sender_pic: data.sender_pic,
            message: data.message,
            first_msg: data.first_msg,
            seller_quote: data.seller_quote,
            buyer_reQuote: data.buyer_reQuote,
            buyer_Agree: data.buyer_Agree,
            contract_sign: data.contract_sign,
            paymentDeposited: data.paymentDeposited,
            deliveryCompleted: data.deliveryCompleted,
            receiptGenerated: data.receiptGenerated,
            deliverySentBack: data.deliverySentBack,
            deliveryAccepted: data.deliveryAccepted,
            cancelRequest: data.cancelRequest,
            cancelAgree: data.cancelAgree,
            requestRefund: data.requestRefund,
            refundTermsAgree: data.refundTermsAgree,
            cancelRefundRequest: data.cancelRefundRequest,
          },
        ]);
      }
    });

    socket.on("newMessageQuote", (data) => {
      setQuotationReceived(true);
      setTermsAgreed(false);
      setSocketEstimate(data.estimateTable);
      setReQuoteSent(data.reQuoteSent);
      dispatch(setNewNotification(true));
      console.log("QuoteData", data);
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          seller_quote: data.seller_quote,
        },
      ]);
    });

    socket.on("newMessageReQuote", (data) => {
      setReQuoteReceived(true);
      setTermsAgreed(false);
      dispatch(setNewNotification(true));
      console.log("QuoteData", data);
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          buyer_reQuote: data.buyer_reQuote,
        },
      ]);
    });

    socket.on("newMessageAgee", (data) => {
      setTermsAgreed(true);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
        },
      ]);
    });

    socket.on("newMessageContractSign", (data) => {
      setContractSigned(true);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
          contract_sign: data.contract_sign,
        },
      ]);
    });

    socket.on("newMessagePayment", (data) => {
      setPayByBuyer(true);
      setPaymentDone(true);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
          contract_sign: data.contract_sign,
          paymentDeposited: data.paymentDeposited,
        },
      ]);
    });

    socket.on("newMessageDeliveryCompleted", (data) => {
      setDeliveryDone(true);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
          contract_sign: data.contract_sign,
          paymentDeposited: data.paymentDeposited,
          deliveryCompleted: data.deliveryCompleted,
          receiptGenerated: data.receiptGenerated,
        },
      ]);
    });

    socket.on("newMessageDeliverySentBack", (data) => {
      setDeliveryDone(false);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
          contract_sign: data.contract_sign,
          paymentDeposited: data.paymentDeposited,
          deliveryCompleted: data.deliveryCompleted,
          receiptGenerated: data.receiptGenerated,
          deliverySentBack: data.deliverySentBack,
          deliveryAccepted: data.deliveryAccepted,
          cancelRequest: data.cancelRequest,
          cancelAgree: data.cancelAgree,
          requestRefund: data.requestRefund,
          refundTermsAgree: data.refundTermsAgree,
          cancelRefundRequest: data.cancelRefundRequest,
        },
      ]);
    });

    socket.on("newMessageDeliveryAccepted", (data) => {
      setDeliveryOK(true);
      setPayByBuyer(false);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
          contract_sign: data.contract_sign,
          paymentDeposited: data.paymentDeposited,
          deliveryCompleted: data.deliveryCompleted,
          receiptGenerated: data.receiptGenerated,
          deliverySentBack: data.deliverySentBack,
          deliveryAccepted: data.deliveryAccepted,
          cancelRequest: data.cancelRequest,
          cancelAgree: data.cancelAgree,
          requestRefund: data.requestRefund,
          refundTermsAgree: data.refundTermsAgree,
          cancelRefundRequest: data.cancelRefundRequest,
        },
      ]);
    });

    socket.on("newMessageCancelRequest", (data) => {
      setPayByBuyer(false);
      setRefundActive(true);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
          contract_sign: data.contract_sign,
          paymentDeposited: data.paymentDeposited,
          deliveryCompleted: data.deliveryCompleted,
          receiptGenerated: data.receiptGenerated,
          deliverySentBack: data.deliverySentBack,
          deliveryAccepted: data.deliveryAccepted,
          cancelRequest: data.cancelRequest,
          cancelAgree: data.cancelAgree,
          requestRefund: data.requestRefund,
          refundTermsAgree: data.refundTermsAgree,
          cancelRefundRequest: data.cancelRefundRequest,
        },
      ]);
    });

    socket.on("newMessageRefundCancellation", (data) => {
      setCancel(true);
      setRefundActive(false);
      setRefundRequested(false);
      setAgreedToCancel(false);
      setRefundTermsAgreed(false);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
          contract_sign: data.contract_sign,
          paymentDeposited: data.paymentDeposited,
          deliveryCompleted: data.deliveryCompleted,
          receiptGenerated: data.receiptGenerated,
          deliverySentBack: data.deliverySentBack,
          deliveryAccepted: data.deliveryAccepted,
          cancelRequest: data.cancelRequest,
          cancelAgree: data.cancelAgree,
          requestRefund: data.requestRefund,
          refundTermsAgree: data.refundTermsAgree,
          cancelRefundRequest: data.cancelRefundRequest,
        },
      ]);
    });

    socket.on("newMessageCancelAgreed", (data) => {
      setAgreedToCancel(true);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
          contract_sign: data.contract_sign,
          paymentDeposited: data.paymentDeposited,
          deliveryCompleted: data.deliveryCompleted,
          receiptGenerated: data.receiptGenerated,
          deliverySentBack: data.deliverySentBack,
          deliveryAccepted: data.deliveryAccepted,
          cancelRequest: data.cancelRequest,
          cancelAgree: data.cancelAgree,
          requestRefund: data.requestRefund,
          refundTermsAgree: data.refundTermsAgree,
          cancelRefundRequest: data.cancelRefundRequest,
        },
      ]);
    });

    socket.on("newMessageRequestRefund", (data) => {
      setSocketRefund(data.refundTable);
      setSocketRefundTaxDetails(data.RefundTaxDetails);
      setSocketRefundPdf(data.refundPdfLink);
      setRefundRequested(true);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
          contract_sign: data.contract_sign,
          paymentDeposited: data.paymentDeposited,
          deliveryCompleted: data.deliveryCompleted,
          receiptGenerated: data.receiptGenerated,
          deliverySentBack: data.deliverySentBack,
          deliveryAccepted: data.deliveryAccepted,
          cancelRequest: data.cancelRequest,
          cancelAgree: data.cancelAgree,
          requestRefund: data.requestRefund,
          cancelRefundRequest: data.cancelRefundRequest,
        },
      ]);
    });

    socket.on("newMessageRefundTermsAgree", (data) => {
      setRefundTermsAgreed(true);
      dispatch(setNewNotification(true));
      setChatArray((prevChatArray) => [
        ...prevChatArray,
        {
          sender_name: data.sender_name,
          sender_pic: data.sender_pic,
          message: data.message,
          file_path: data.file_path,
          buyer_Agree: data.buyer_Agree,
          contract_sign: data.contract_sign,
          paymentDeposited: data.paymentDeposited,
          deliveryCompleted: data.deliveryCompleted,
          receiptGenerated: data.receiptGenerated,
          deliverySentBack: data.deliverySentBack,
          deliveryAccepted: data.deliveryAccepted,
          cancelRequest: data.cancelRequest,
          cancelAgree: data.cancelAgree,
          requestRefund: data.requestRefund,
          refundTermsAgree: data.refundTermsAgree,
          cancelRefundRequest: data.cancelRefundRequest,
        },
      ]);
    });

    socket.on("adminDeliveryStatusChangeRefresh", async (data) => {
      console.log("adminDeliveryStatusChangeRefresh", data);
      setAdminRefresh(true);
      setDeliveryDone(false);
    });

    socket.on("adminTransactionCancelRefresh", async (data) => {
      console.log("adminTransactionCancelRefresh", data);
      setAdminRefresh(true);
    });

    hasRun.current = true;
  }, [id]);

  const fetchData = async () => {
    await dispatch(fetchTransactionForAdminViewThunk({ transactionId: id }));
  };
  const handleQuotationSending = async () => {
    await fetchData();
    setRefresh((prev) => prev + 1);
  };

  const handleOrderFormSending = async () => {
    await fetchData();
    setRefreshOrderForm((prev) => prev + 1);
  };

  const handleDeliverySlipSending = async () => {
    await fetchData();
    setRefreshDeliverySlip((prev) => prev + 1);
  };

  const handleReceiptSending = async () => {
    await fetchData();
    setRefreshReceipt((prev) => prev + 1);
  };

  const handleAcceptanceSending = async () => {
    await fetchData();
    setRefreshAcceptance((prev) => prev + 1);
  };

  const handleRefundInvoiceSending = async () => {
    await fetchData();
    setRefreshRefundInvoice((prev) => prev + 1);
  };

  const handleDispatchContractSigned = async () => {
    const transactionId = transaction?.transaction?._id;
    await dispatch(contractSignedThunk(transactionId));
  };

  const handlePayment = () => {
    router(`/transaction/${id}/payment`);
    dispatch(showPaymentModal(true));
  };

  const handleRequestReQuotation = async () => {
    setReQuoteLoading(true);
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "再見積を依頼しました",
        buyer_reQuote: true,
      },
    ]);
    socket.emit(
      "sendReQuote",
      {
        transactionId: id,
        message: "再見積を依頼しました",
        sender_id: transaction?.user?.id,
      },
      async () => {
        setReQuoteRequested(true);
        setReQuoteSent(false);
        setTermsAgreed(false);
        setReQuoteLoading(false);
        await fetchData();
      }
    );
  };

  const handleAgreeToTerms = async () => {
    setAgreeLoading(true);
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "取引条件に合意しました",
        buyer_Agree: true,
      },
    ]);
    socket.emit(
      "agreeQuote",
      {
        transactionId: id,
        message: "取引条件に合意しました",
        sender_id: transaction?.user?.id,
        buyer_Agree: true,
      },
      async () => {
        setTermsAgreed(true);
        setAgreeLoading(false);
        await fetchData();
      }
    );
  };

  const handleContract = async () => {
    setConcludeLoading(true);
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "契約を締結しました",
        contract_sign: true,
      },
    ]);
    {
      socket.emit(
        "contractSign",
        {
          transactionId: id,
          message: "契約を締結しました",
          file: msgFile,
          sender_id: transaction?.user?.id,
        },
        async () => {
          setContractSigned(true);
          setConcludeLoading(false);
          await handleDispatchContractSigned();
        }
      );
    }
  };

  const handlePaymentCompleted = async () => {
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "仮払いが完了し、発注書が発行されました",
        paymentDeposited: true,
      },
    ]);
    {
      socket.emit(
        "paymentCompleted",
        {
          transactionId: id,
          message: "仮払いが完了し、発注書が発行されました",
          sender_id: transaction?.user?.id,
        },
        async () => {
          setPaymentDone(true);
        }
      );
    }
  };

  const handleDeliveryCompleted = async () => {
    setDelivery(true);
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "納品が完了し、納品書・受領書が発行されました",
        deliveryCompleted: true,
        receiptGenerated: true,
      },
    ]);
    {
      socket.emit(
        "deliveryCompleted",
        {
          transactionId: id,
          message: "納品が完了し、納品書・受領書が発行されました",
          sender_id: transaction?.user?.id,
        },
        async () => {
          setDeliveryDone(true);
          setDelivery(false);
        }
      );
    }
  };

  const handleDeliverySentBack = async () => {
    setSentBackLoading(true);
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "納品が完了し、納品書・受領書が発行されました",
        deliverySentBack: true,
      },
    ]);
    socket.emit(
      "deliverySentBack",
      {
        transactionId: id,
        message: "納品が完了し、納品書・受領書が発行されました",
        sender_id: transaction?.user?.id,
      },
      async () => {
        setSentBackLoading(false);
        setDeliveryDone(false);
      }
    );
  };

  const handleDeliveryAccepted = async () => {
    setAcceptedLoading(true);
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "納品が完了し、納品書・受領書が発行されました",
        deliveryAccepted: true,
      },
    ]);
    {
      socket.emit(
        "deliveryAccepted",
        {
          transactionId: id,
          message: "納品が完了し、納品書・受領書が発行されました",
          sender_id: transaction?.user?.id,
        },
        async () => {
          setDeliveryOK(true);
          setAcceptedLoading(false);
        }
      );
    }
  };

  const handleCancelRequest = async () => {
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "キャンセルを依頼しました",
        cancelRequest: true,
      },
    ]);
    {
      socket.emit(
        "cancelRequest",
        {
          transactionId: id,
          message: "キャンセルを依頼しました",
          sender_id: transaction?.user?.id,
          userId: transaction?.user?.id,
        },
        async () => {
          setRefundActive(true);
          setPayByBuyer(false);
          await fetchData();
        }
      );
    }
  };

  const handleRefundCancel = async () => {
    setRefundCancelLoading(true);
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "キャンセルを取り消す",
        cancelRefundRequest: true,
      },
    ]);
    {
      socket.emit(
        "cancelRefundRequest",
        {
          transactionId: id,
          message: "キャンセルを取り消す",
          sender_id: transaction?.user?.id,
          userId: transaction?.user?.id,
        },
        async () => {
          setCancel(true);
          setRefundActive(false);
          setRefundRequested(false);
          setAgreedToCancel(false);
          setRefundTermsAgreed(false);
          setRefundCancelLoading(false);
          await fetchData();
        }
      );
    }
  };

  const handleCancelAgree = async () => {
    setCancelAgreeLoading(true);
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "キャンセル受付中",
        cancelAgree: true,
      },
    ]);
    {
      socket.emit(
        "cancelAgree",
        {
          transactionId: id,
          message: "キャンセル受付中",
          sender_id: transaction?.user?.id,
        },
        async () => {
          setAgreedToCancel(true);
          setCancelAgreeLoading(false);
          await fetchData();
        }
      );
    }
  };

  const handleRequestRefund = async () => {
    setRequestRefundLoading(true);
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "返金が要求されました",
        requestRefund: true,
      },
    ]);
    {
      socket.emit(
        "requestRefund",
        {
          transactionId: id,
          message: "返金が要求されました",
          sender_id: transaction?.user?.id,
          refundTable,
          RefundTaxDetails,
        },
        async () => {
          setRefundRequested(true);
          setRequestRefundLoading(false);
          await fetchData();
        }
      );
    }
  };

  const handleRefundTermsAgree = async () => {
    setInvoiceLoading(true);
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "返金内容に合意する",
        refundTermsAgree: true,
      },
    ]);
    {
      socket.emit(
        "refundTermsAgree",
        {
          transactionId: id,
          message: "返金内容に合意する",
          sender_id: transaction?.user?.id,
        },
        async () => {
          setRefundTermsAgreed(true);
          await fetchData();
          setInvoiceLoading(false);
        }
      );
    }
  };

  const handleChat = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.length === 0) {
      return;
    }
    if (
      !quotationRequested &&
      transaction?.transaction?.conversation?.length === 0
    ) {
      chatArray.push({
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "見積を依頼しました",
        first_msg: true,
        seller_quote: false,
        buyer_reQuote: false,
        buyer_Agree: false,
        contract_sign: false,
        paymentDeposited: false,
        deliveryCompleted: false,
        receiptGenerated: false,
        deliverySentBack: false,
        deliveryAccepted: false,
        cancelRequest: false,
        cancelAgree: false,
        requestRefund: false,
        refundTermsAgree: false,
        cancelRefundRequest: false,
      });
      socket.emit("sendMessage", {
        transactionId: id,
        message: "見積を依頼しました",
        sender_id: transaction?.user?.id,
        first_msg: true,
        seller_quote: false,
        buyer_reQuote: false,
        buyer_Agree: false,
        contract_sign: false,
        paymentDeposited: false,
        deliveryCompleted: false,
        receiptGenerated: false,
        deliverySentBack: false,
        deliveryAccepted: false,
        cancelRequest: false,
        cancelAgree: false,
        requestRefund: false,
        refundTermsAgree: false,
        cancelRefundRequest: false,
      });
      setQuotationRequested(true);
    }
    setTimeout(() => {
      if (msgFile) {
        setChatArray((prevChatArray) => [
          ...prevChatArray,
          {
            sender_name: transaction?.user?.name,
            sender_pic: transaction?.user?.pic,
            message,
            file_path: URL.createObjectURL(msgFile),
            file_type: msgFile.type,
          },
        ]);
        socket.emit("sendMessage", {
          transactionId: id,
          message,
          file: msgFile,
          sender_id: transaction?.user?.id,
        });
      } else {
        setChatArray((prevChatArray) => [
          ...prevChatArray,
          {
            sender_name: transaction?.user?.name,
            sender_pic: transaction?.user?.pic,
            message,
          },
        ]);
        socket.emit("sendMessage", {
          transactionId: id,
          message,
          sender_id: transaction?.user?.id,
        });
      }
      setMessage("");
      setMsgFile(null);
    }, 500);
  };

  const submitQuotation = async () => {
    if (!estimateTable || !Array.isArray(estimateTable)) {
      console.error("estimateTable is null or not an array");
      return;
    }
    const transformedDataArray = [];
    estimateTable.forEach(
      ({
        content,
        deadline,
        drawingNumber,
        unitPrice,
        quantity,
        unit,
        amount,
      }) => {
        transformedDataArray.push({
          item_name: content,
          drawing_number: drawingNumber,
          quantity: parseFloat(quantity),
          deadline,
          unit: unit,
          price: formatIndianNumber(amount),
          unit_price: formatIndianNumber(unitPrice),
          metadata: {
            note: taxDetails?.textareaValue || "",
            totalamountExcludingTax: taxDetails?.amountExcludingTax || 0,
            taxAmount: taxDetails?.taxAmount || 0,
            totalAmountIncludingTax: taxDetails?.totalAmountIncludingTax || 0,
          },
        });
      }
    );
    await dispatch(
      CreateEstimatePdfThunk({
        estimateData: transformedDataArray,
        taxRate: 10,
        transactionId: id,
      })
    );
    setChatArray((prevChatArray) => [
      ...prevChatArray,
      {
        sender_name: transaction?.user?.name,
        sender_pic: transaction?.user?.pic,
        message: "見積書を送信しました",
        seller_quote: true,
      },
    ]);
    socket.emit(
      "sendQuote",
      {
        transactionId: id,
        message: "見積書を送信しました",
        sender_id: transaction?.user?.id,
        estimateTable: transformedDataArray,
      },
      async () => {
        localStorage.removeItem("estimateTableData");
        localStorage.removeItem("taxDetails");

        setQuotationSent(true);
        setReQuoteReceived(false);
        setTermsAgreed(false);
        setSentTable(true);
        await fetchData();
      }
    );
  };

  const submitRefund = async () => {
    if (!refundTable || !Array.isArray(refundTable)) {
      console.error("refundTable is null or not an array");
      return;
    }
    const parsedRefundTable = refundTable.map((item) => {
      return {
        content: item?.content,
        amount: parseIndianNumber(item?.amount),
      };
    });
    await dispatch(
      createRefundThunk({
        tableData: parsedRefundTable,
        taxDetails: {
          totalAmountExcludingTax:
            parseIndianNumber(RefundTaxDetails?.totalAmountExcludingTax) || 0,
          taxAmount: parseIndianNumber(RefundTaxDetails?.taxAmount) || 0,
          totalAmountIncludingTax:
            parseIndianNumber(RefundTaxDetails?.totalAmountIncludingTax) || 0,
          textareaValue: RefundTaxDetails?.textareaValue || "",
          adminRefundTax: 10,
        },
        transId: id,
      })
    );
    handleRequestRefund();
    await fetchData();
  };

  const handleClick = () => {
    setShow(true);
    dispatch(getTaxThunk({}));
  };

  const handelRefundClick = () => {
    console.log("refund");
    setShowRefundModal(true);
  };

  const handleDownload = () => {
    DownloadPDF(transaction);
  };

  const handleDownloadAdvancePayment = () => {
    DownloadPDFAdvancePayment(transaction);
  };

  const handleDownloadOrderForm = () => {
    DownloadPDFOrderForm(transaction);
  };

  const handleDownloadDeliverySlip = () => {
    DownloadPDFDelivery(transaction);
  };

  const handleDownloadReceipt = () => {
    DownloadPDFReceipt(transaction);
  };

  const handleDownloadAcceptance = () => {
    DownloadPDFAcceptance(transaction);
  };

  const handleDownloadTransactionInvoice = () => {
    DownloadPDFTransactionInvoice(transaction);
  };

  const handleDownloadRefundInvoice = () => {
    DownloadPDFRefundInvoice(transaction);
  };
  const handleDownloadRefundTransactionInvoice = () => {
    DownloadPDFRefundTransactionInvoice(transaction);
  };

  const handleDownloadSystem = () => {
    DownloadPDFSystem(transaction);
  };
  const handleDownloadRefundSystem = () => {
    DownloadPDFRefundSystem(transaction);
  };

  const lastquotationObject =
    backQuotation && backQuotation.length > 0
      ? backQuotation[backQuotation.length - 1]
      : null;
  const lastquotationtaxAmount = lastquotationObject
    ? lastquotationObject.taxAmount
    : null;
  const lasttotalAmountIncludingTax = lastquotationObject
    ? lastquotationObject.totalAmountIncludingTax
    : null;
  const lasttotalamountExcludingTax = lastquotationObject
    ? lastquotationObject.totalamountExcludingTax
    : null;
  const lastNote = lastquotationObject ? lastquotationObject.note : null;

  //All comments go down here :-
  // console.log("estimateTable", estimateTable);
  // console.log("registerContent", registerContent);
  // console.log("taxDetails", taxDetails);
  // console.log("taxData", taxRate);
  // console.log("firstTimeAfterPayment", firstTimeAfterPayment);
  // console.log("compactTableData", compactTableData?.nodes);
  // console.log(
  //   "taxDetails?.textareaValue ",
  //   taxDetails && taxDetails?.textareaValue
  // );
  // console.log("refund", IsRefund);
  // console.log("backQuotation", backQuotation?.[0]?.totalamountExcludingTax);
  // console.log("socketEstimate", socketEstimate);
  // console.log("termsAgreed", termsAgreed);
  // console.log("lasttotalAmountIncludingTax", lasttotalAmountIncludingTax)
  // console.log("netDeliveryDone", netDeliveryDone);
  // console.log("deliveryDone", deliveryDone);
  // console.log("netRefundTermsAgreed", netRefundTermsAgreed);
  // console.log("refundTermsAgreed", refundTermsAgreed);
  // console.log("taxDetails?.textareaValue", taxDetails?.textareaValue);
  //   console.log("payByBuyer", payByBuyer);
  console.log("transaction", transaction);
  // console.log("taxDetails", taxDetails);
  //   console.log("netDeliveryOk", netDeliveryOK);
  //   console.log("refundData", refundTable);
  //   console.log("refundHit", refundHit);
  // console.log("refundQuotation", refundQuotation);
  // console.log("RefundTaxDetails", RefundTaxDetails);
  // console.log(
  //   "Deduction",
  //   parseIndianNumber(lasttotalamountExcludingTax) -
  //     parseIndianNumber(RefundTaxDetails?.totalAmountExcludingTax)
  // );
  //   console.log("socketRefund", socketRefund);
  // console.log("socketTaxDetails", socketRefundTaxDetails);
  // console.log("socketRefundPdf", socketRefundPdf);

  const handleReviewModalShow = () => {
    dispatch(ShowReviewModalThunk(true));
  };

  const handleCancelModalShow = () => {
    dispatch(showCancelModalThunk(true));
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Limit for showing part of the content
  const contentLimit = 160;
  const content = transaction?.transaction?.customer_id?.business_content;
  const content_2 = transaction?.transaction?.seller_id?.business_content;
  const isLongContent = content && content.length > contentLimit;
  const isLongContent_2 = content_2 && content_2.length > contentLimit;
  const displayedContent = isExpanded
    ? content
    : content?.slice(0, contentLimit);
  const displayedContent_2 = isExpanded
    ? content_2
    : content_2?.slice(0, contentLimit);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center flex-col w-full  items-center sm:mb-80 mb-10 mt-5 text-start ">
          {/* main div */}
          <div className="md:block lg:w-[1200px] sm:w-[700px] xs:w-[400px]  sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6 flex justify-start flex-col xs:px-[1.8rem] ">
            {transaction &&
            transaction?.user &&
            transaction?.user?.name &&
            transaction?.user.name === transaction?.seller_name ? (
              <p className=" text-[#808080] lg:text-[18px] xs:text-[12] ">
                {transaction?.seller_name}
              </p>
            ) : (
              <p className=" text-[#808080] lg:text-[18px] xs:text-[12] ">
                {transaction?.seller_name}
              </p>
            )}
            {transaction &&
            transaction?.user &&
            transaction?.user?.name &&
            transaction?.user.name === transaction?.seller_name ? (
              <p className="text-[#255BB3] lg:text-[24px] xs:text-[18px] font-bold mt-2">
                {transaction?.transaction?.process_name}
              </p>
            ) : (
              <p className="text-[#255BB3] lg:text-[24px] xs:text-[18px] font-bold mt-2">
                {transaction?.transaction?.process_name}
              </p>
            )}

            {transaction?.transaction?.transaction_status !== 9 ? (
              <div className="mt-5  text-[#808080]  lg:text-[24px] xs:text-[14px]">
                現在のステータス
                {!transaction?.transaction?.initiateRefund?.IsTrue ? (
                  <div className="flex flex-col justify-center  bg-[#F5F5F5]  px-2  mt-[9px]  ">
                    <Stepper
                      buyername={
                        transaction &&
                        transaction.user &&
                        transaction.user.name === transaction.customer_name
                      }
                      netTermsAgreed={netTermsAgreed}
                      deliveryStatus={
                        transaction && transaction?.transaction?.delivery_status
                      }
                      netContractSigned={netContractSigned}
                      netPaymentDone={netPaymentDone}
                      netDeliveryDone={netDeliveryDone}
                      netDeliveryOK={netDeliveryOK}
                    />
                    <StepperMessage
                      admin={true}
                      buyername={
                        transaction &&
                        transaction.user &&
                        transaction.user.name === transaction.customer_name
                      }
                      sellername={
                        transaction &&
                        transaction.user &&
                        transaction.user.name === transaction.seller_name
                      }
                      transactionId={
                        transaction && transaction?.transaction?._id
                      }
                      quotation={
                        transaction &&
                        transaction?.transaction?.quotation?.length > 0
                      }
                      ordererAgree={
                        transaction && transaction?.transaction?.orderer_agree
                      }
                      handleAgreeToTerms={handleAgreeToTerms}
                      handleContract={handleContract}
                      contract_agree={
                        transaction && transaction?.transaction?.contract_agree
                      }
                      paymentDeposit={
                        transaction && transaction?.transaction?.paymentDeposit
                      }
                      handleDeliveryCompleted={handleDeliveryCompleted}
                      handleDeliverySentBack={handleDeliverySentBack}
                      handleDeliveryAccepted={handleDeliveryAccepted}
                      deliveryStatus={
                        transaction && transaction?.transaction?.delivery_status
                      }
                      handleReviewModalShow={handleReviewModalShow}
                      ratingByBuyer={
                        transaction && transaction?.transaction?.ratingByBuyer
                      }
                      ratingBySeller={
                        transaction && transaction?.transaction?.ratingBySeller
                      }
                      estimateTable={estimateTable}
                      submitQuotation={submitQuotation}
                      handleRequestReQuotation={handleRequestReQuotation}
                      netQuotationRequested={netQuotationRequested}
                      netQuotationSent={netQuotationSent}
                      netQuotationReceived={netQuotationReceived}
                      netReQuoteRequested={netReQuoteRequested}
                      netReQuoteReceived={netReQuoteReceived}
                      netReQuoteSent={netReQuoteSent}
                      netTermsAgreed={netTermsAgreed}
                      netContractSigned={netContractSigned}
                      netPaymentDone={netPaymentDone}
                      netDeliveryDone={netDeliveryDone}
                      netDeliveryOK={netDeliveryOK}
                      estimateLoading={estimateLoading}
                      reQuoteLoading={reQuoteLoading}
                      agreeLoading={agreeLoading}
                      concludeLoading={concludeLoading}
                      delivery={delivery}
                      sentBackLoading={sentBackLoading}
                      acceptedLoading={acceptedLoading}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center  bg-[#F5F5F5]  px-2  mt-[9px]  ">
                    <RefundStepper
                      IsTrue={transaction?.transaction?.initiateRefund?.IsTrue}
                      buyername={
                        transaction &&
                        transaction.user &&
                        transaction.user.name === transaction.customer_name
                      }
                      sellername={
                        transaction &&
                        transaction.user &&
                        transaction.user.name === transaction.seller_name
                      }
                      netAgreedToCancel={netAgreedToCancel}
                      ratingByBuyer={
                        transaction && transaction?.transaction?.ratingByBuyer
                      }
                      ratingBySeller={
                        transaction && transaction?.transaction?.ratingBySeller
                      }
                      netRefundRequested={netRefundRequested}
                      netRefundTermsAgreed={netRefundTermsAgreed}
                    />
                    <RefundStepperMessage
                      admin={true}
                      initiateRefund={transaction?.transaction?.initiateRefund}
                      buyername={
                        transaction &&
                        transaction.user &&
                        transaction.user.name === transaction.customer_name
                      }
                      sellername={
                        transaction &&
                        transaction.user &&
                        transaction.user.name === transaction.seller_name
                      }
                      handleCancelAgree={handleCancelAgree}
                      netAgreedToCancel={netAgreedToCancel}
                      agreedToCancel={transaction?.transaction?.agreedToCancel}
                      handleRequestRefund={submitRefund}
                      transactionRefundStatus={
                        transaction?.transaction?.transaction_status === 5
                      }
                      handleRefundTermsAgree={handleRefundTermsAgree}
                      refundTransferred={
                        transaction?.transaction?.refundTransferred
                      }
                      handleReviewModalShow={handleReviewModalShow}
                      ratingByBuyer={
                        transaction && transaction?.transaction?.ratingByBuyer
                      }
                      ratingBySeller={
                        transaction && transaction?.transaction?.ratingBySeller
                      }
                      handleRefundCancel={handleRefundCancel}
                      invoiceLoading={invoiceLoading}
                      transactionCancelledStatus={
                        transaction?.transaction?.transaction_status === 7
                      }
                      netRefundRequested={netRefundRequested}
                      netRefundTermsAgreed={netRefundTermsAgreed}
                      refundCancelLoading={refundCancelLoading}
                      cancelAgreeLoading={cancelAgreeLoading}
                      requestRefundLoading={requestRefundLoading}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                {" "}
                <div className="mt-5  text-[#808080] bg-[#F5F5F5]  lg:text-[24px] xs:text-[14px] border flex items-center flex-col p-4">
                  <span
                    className="lg:h-[80px]  xs:h-[40px]  sm:h-[55px] md:h-[70px]   bg-[#255BB3] flex  justify-center items-center w-[98%]"
                    style={{
                      clipPath:
                        "polygon(0% 0%, 95% 0, 100% 50%, 95% 100%, 0% 100%",
                    }}
                  >
                    <span
                      className="bg-[#fff] h-[95%] w-[99.5%] flex  justify-center items-center lg:text-[16px] xs:text-[10px] text-[#255BB3]  font-bold"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 95% 0, 100% 50%, 95% 100%, 0% 100%",
                      }}
                    >
                      この取引は管理者によってキャンセルされました
                    </span>
                  </span>

                  <div className="flex justify-center w-full">
                    <span
                      className="lg:h-[120px] xs:h-[140px] w-full bg-[#FFAA00] flex justify-center items-center text-[18px] "
                      style={{
                        clipPath:
                          "polygon(1% 100%, 99% 100%, 99% 20%, 54% 20%, 53% 0, 52% 20%, 1% 20%) ",
                      }}
                    >
                      <span
                        className="h-[97.50%] xs:w-[99.58%] lg:w-[99.90%] bg-[#FFF4DF] flex justify-center items-center"
                        style={{
                          clipPath:
                            "polygon(1% 100%, 99% 100%, 99% 20%, 54% 20%, 53% 0, 52% 20%, 1% 20%) ",
                        }}
                      >
                        トランザクションは管理者によってキャンセルされました。詳細についてはサポートにお問い合わせください。
                      </span>
                    </span>
                  </div>
                </div>
              </>
            )}
            {transaction &&
            transaction?.user &&
            transaction?.user?.name &&
            transaction?.user.name === transaction?.seller_name ? (
              <div className="w-full mt-8">
                <span className="lg:text-[24px] xs:text-[18px] font-bold text-[#808080]">
                  取引先
                </span>
                <div className="flex xs:flex-col lg:flex-row justify-between border p-4 mt-2">
                  <div className="lg:w-[8rem] xs:h-[5rem] flex lg:justify-center lg:items-center xs:justify-start xs:items-center ">
                    <img
                      src={transaction?.transaction?.customer_id?.profile_img}
                      className="relative inline-flex lg:text-[1rem] xs:text-[0.6rem] items-center justify-center lg:w-[100px] lg:h-[100px] xs:w-[70px] xs:h-[70px] overflow-hidden rounded-full border-2"
                    />
                    <span className="text-[#255BB3] lg:hidden xs:block font-bold xs:ml-5 lg:text-[18px] xs:text-[16px]">
                      {transaction?.customer_name}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col lg:ml-3 ">
                    <span className="text-[#255BB3] lg:block xs:hidden font-bold lg:text-[18px] xs:text-[16px]">
                      {transaction?.customer_name}
                    </span>
                    <span className="flex flex-wrap xs:w-full text-[#808080] lg:text-[18px] xs:text-[14px]">
                      <p className="text-pretty break-word">
                        {displayedContent}
                        {/* {isLongContent && !isExpanded && '...'} */}
                        {isLongContent && (
                          <button
                            onClick={toggleReadMore}
                            className="text-[#255BB3]  mt-1 m-2"
                          >
                            {isExpanded ? "読む量を減らす" : "... 続きを読む"}
                          </button>
                        )}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full mt-8">
                <span className="lg:text-[24px] xs:text-[18px] font-bold text-[#808080]">
                  取引先
                </span>
                <div className="flex xs:flex-col lg:flex-row justify-between border p-4 mt-2">
                  <div className="lg:w-[8rem] xs:h-[5rem] flex lg:justify-center lg:items-center xs:justify-start xs:items-center ">
                    <img
                      src={transaction?.transaction?.seller_id?.profile_img}
                      className="relative inline-flex lg:text-[1rem] xs:text-[0.6rem] items-center justify-center lg:w-[100px] lg:h-[100px] xs:w-[70px] xs:h-[70px] overflow-hidden rounded-full border-2"
                    />
                    <span className="text-[#255BB3] lg:hidden xs:block font-bold xs:ml-5 lg:text-[18px] xs:text-[16px]">
                      {transaction?.seller_name}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col lg:ml-3">
                    <span className="text-[#255BB3] lg:block xs:hidden font-bold lg:text-[18px] xs:text-[16px]">
                      {transaction?.seller_name}
                    </span>

                    <span className="flex flex-wrap xs:w-full text-[#808080] lg:text-[18px] xs:text-[14px]">
                      <p className="text-pretty break-word">
                        {displayedContent_2}
                        {/* {isLongContent && !isExpanded && '...'} */}
                        {isLongContent_2 && (
                          <button
                            onClick={toggleReadMore}
                            className="text-[#255BB3]  mt-1 m-2"
                          >
                            {isExpanded ? "読む量を減らす" : "... 続きを読む"}
                          </button>
                        )}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-[4rem] flex gap-4 items-center ">
              <span className="text-[#808080] font-bold lg:text-[24px] xs:text-[14]">
                取引条件
              </span>
              <span className=" bg-[#E6E6E6] px-3 py-1 text-[#808080] lg:text-[24px] xs:text-[14px]">
                未確定
              </span>
            </div>

            {!transaction?.transaction?.initiateRefund?.IsTrue ? (
              <div className="mt-4 border-[1px] border-[#E6E6E6] overflow-x-auto">
                <CompactTable
                  data={compactTableData}
                  columns={COLUMNS}
                  theme={theme}
                  layout={{ custom: true, horizontalScroll: true }}
                />

                <div className="bg-[#E6E6E6] xl:w-full lg:w-full xs:w-[200%]  h-[2rem] lg:text-[18px] xs:text-[14px] flex items-center justify-end ">
                  <div className="flex justify-between w-1/4">
                    <span className="text-[#808080]">合計金額(税抜)</span>
                    {/*" : '—'"*/}
                    <span className="mr-3 text-[#808080]">
                      {" "}
                      {socketEstimate &&
                      backQuotation &&
                      socketEstimate?.length > 0
                        ? socketEstimate?.[0]?.metadata.totalamountExcludingTax
                        : taxDetails
                        ? taxDetails?.amountExcludingTax || "—"
                        : lasttotalamountExcludingTax || "—"}
                    </span>
                  </div>
                </div>
                <div className="bg-[#ffffff] lg:w-full xs:w-[200%]  h-[2rem] lg:text-[18px] xs:text-[14px] flex items-center justify-end">
                  <div className="flex justify-between w-1/4">
                    <span className="text-[#808080]">消費税(10%)</span>{" "}
                    <span className="mr-3 text-[#808080]">
                      {socketEstimate &&
                      backQuotation &&
                      socketEstimate?.length > 0
                        ? socketEstimate?.[0]?.metadata.taxAmount
                        : taxDetails
                        ? taxDetails?.taxAmount || "—"
                        : lastquotationtaxAmount || "—"}
                    </span>
                  </div>
                </div>
                <div className="bg-[#FFF4DF] lg:w-full xs:w-[200%]  h-[2rem] lg:text-[18px] xs:text-[14px] flex items-center justify-end">
                  <div className="flex justify-between w-1/4">
                    <span className="text-[#808080]">合計金額(税込)</span>{" "}
                    <span className="mr-3 text-[#808080]">
                      {socketEstimate &&
                      backQuotation &&
                      socketEstimate?.length > 0
                        ? socketEstimate?.[0]?.metadata.totalAmountIncludingTax
                        : taxDetails
                        ? taxDetails?.totalAmountIncludingTax || "—"
                        : lasttotalAmountIncludingTax || "—"}
                    </span>
                  </div>
                </div>
                <div className="bg-[#ffffff] lg:w-full  xs:w-[200%]  h-[7rem] lg:text-[18px] xs:text-[14px] flex items-center justify-start">
                  <div className="w-[6rem] h-[7rem] bg-[#E6E6E6] flex items-center justify-center text-[#808080]">
                    特記事項
                  </div>{" "}
                  <div className="w-full h-[5rem] p-3 text-[#808080] flex flex-wrap break-all">
                    {socketEstimate && socketEstimate?.length > 0
                      ? socketEstimate?.[0]?.metadata.note
                      : taxDetails
                      ? taxDetails?.textareaValue
                      : lastNote}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 border-[1px] border-[#E6E6E6] overflow-x-auto">
                <CompactTable
                  data={refundTableData}
                  columns={COLUMNS}
                  theme={theme}
                  layout={{ custom: true, horizontalScroll: true }}
                />
                <div className="bg-[#E6E6E6] xl:w-full lg:w-full xs:w-[200%]  h-[2rem] lg:text-[18px] xs:text-[14px] flex items-center justify-end ">
                  <div className="flex justify-between w-1/4">
                    <span className="text-[#808080]">合計金額(税抜)</span>
                    {/*" : '—'"*/}
                    {transaction &&
                    !transaction?.transaction?.initiateRefund?.IsTrue ? (
                      <span className="mr-3 text-[#808080]">
                        {" "}
                        {socketEstimate &&
                        backQuotation &&
                        socketEstimate?.length > 0
                          ? socketEstimate?.[0]?.metadata
                              .totalamountExcludingTax
                          : taxDetails
                          ? taxDetails?.amountExcludingTax || "—"
                          : lasttotalamountExcludingTax || "—"}
                      </span>
                    ) : (
                      transaction &&
                      transaction?.transaction?.initiateRefund?.IsTrue && (
                        <span className="mr-3 text-[#808080]">
                          {" "}
                          {backQuotation &&
                          backQuotation?.length > 0 &&
                          socketRefundTaxDetails
                            ? formatIndianNumber(
                                parseIndianNumber(lasttotalamountExcludingTax) -
                                  parseIndianNumber(
                                    socketRefundTaxDetails?.totalAmountExcludingTax ||
                                      transaction?.transaction?.refund
                                        ?.taxDetails?.totalAmountExcludingTax
                                  )
                              )
                            : backQuotation &&
                              backQuotation?.length > 0 &&
                              RefundTaxDetails
                            ? formatIndianNumber(
                                parseIndianNumber(lasttotalamountExcludingTax) -
                                  parseIndianNumber(
                                    RefundTaxDetails?.totalAmountExcludingTax ||
                                      transaction?.transaction?.refund
                                        ?.taxDetails?.totalAmountExcludingTax
                                  )
                              )
                            : transaction &&
                              transaction?.transaction?.refund?.taxDetails &&
                              !RefundTaxDetails
                            ? formatIndianNumber(
                                parseIndianNumber(lasttotalamountExcludingTax) -
                                  parseIndianNumber(
                                    RefundTaxDetails?.totalAmountExcludingTax ||
                                      transaction?.transaction?.refund
                                        ?.taxDetails?.totalAmountExcludingTax
                                  )
                              )
                            : transaction &&
                              !transaction?.transaction?.refund?.taxDetails &&
                              !RefundTaxDetails
                            ? lasttotalamountExcludingTax
                            : "—"}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="bg-[#ffffff] lg:w-full xs:w-[200%]  h-[2rem] lg:text-[18px] xs:text-[14px] flex items-center justify-end">
                  <div className="flex justify-between w-1/4">
                    <span className="text-[#808080]">消費税(10%)</span>{" "}
                    {transaction &&
                    !transaction?.transaction?.initiateRefund?.IsTrue ? (
                      <span className="mr-3 text-[#808080]">
                        {socketEstimate &&
                        backQuotation &&
                        socketEstimate?.length > 0
                          ? socketEstimate?.[0]?.metadata.taxAmount
                          : taxDetails
                          ? taxDetails?.taxAmount || "—"
                          : lastquotationtaxAmount || "—"}
                      </span>
                    ) : (
                      <span className="mr-3 text-[#808080]">
                        {backQuotation &&
                        backQuotation?.length > 0 &&
                        socketRefundTaxDetails
                          ? formatIndianNumber(
                              parseIndianNumber(lastquotationtaxAmount) -
                                parseIndianNumber(
                                  socketRefundTaxDetails?.taxAmount ||
                                    transaction?.transaction?.refund?.taxDetails
                                      ?.taxAmount
                                )
                            )
                          : backQuotation &&
                            backQuotation?.length > 0 &&
                            RefundTaxDetails
                          ? formatIndianNumber(
                              parseIndianNumber(lastquotationtaxAmount) -
                                parseIndianNumber(
                                  RefundTaxDetails?.taxAmount ||
                                    transaction?.transaction?.refund?.taxDetails
                                      ?.taxAmount
                                )
                            )
                          : transaction &&
                            transaction?.transaction?.refund?.taxDetails &&
                            !RefundTaxDetails
                          ? formatIndianNumber(
                              parseIndianNumber(lastquotationtaxAmount) -
                                parseIndianNumber(
                                  RefundTaxDetails?.taxAmount ||
                                    transaction?.transaction?.refund?.taxDetails
                                      ?.taxAmount
                                )
                            )
                          : transaction &&
                            !transaction?.transaction?.refund?.taxDetails &&
                            !RefundTaxDetails
                          ? lastquotationtaxAmount
                          : "—"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-[#FFF4DF] lg:w-full xs:w-[200%]  h-[2rem] lg:text-[18px] xs:text-[14px] flex items-center justify-end">
                  <div className="flex justify-between w-1/4">
                    <span className="text-[#808080]">合計金額(税込)</span>{" "}
                    {transaction &&
                    !transaction?.transaction?.initiateRefund?.IsTrue ? (
                      <span className="mr-3 text-[#808080]">
                        {socketEstimate &&
                        backQuotation &&
                        socketEstimate?.length > 0
                          ? socketEstimate?.[0]?.metadata
                              .totalAmountIncludingTax
                          : taxDetails
                          ? taxDetails?.totalAmountIncludingTax || "—"
                          : lasttotalAmountIncludingTax || "—"}
                      </span>
                    ) : (
                      <span className="mr-3 text-[#808080]">
                        {backQuotation &&
                        backQuotation?.length > 0 &&
                        socketRefundTaxDetails
                          ? formatIndianNumber(
                              parseIndianNumber(lasttotalAmountIncludingTax) -
                                parseIndianNumber(
                                  socketRefundTaxDetails?.totalAmountIncludingTax ||
                                    transaction?.transaction?.refund?.taxDetails
                                      ?.totalAmountIncludingTax
                                )
                            )
                          : backQuotation &&
                            backQuotation?.length > 0 &&
                            RefundTaxDetails
                          ? formatIndianNumber(
                              parseIndianNumber(lasttotalAmountIncludingTax) -
                                parseIndianNumber(
                                  RefundTaxDetails?.totalAmountIncludingTax ||
                                    transaction?.transaction?.refund?.taxDetails
                                      ?.totalAmountIncludingTax
                                )
                            )
                          : transaction &&
                            transaction?.transaction?.refund?.taxDetails &&
                            !RefundTaxDetails
                          ? formatIndianNumber(
                              parseIndianNumber(lasttotalAmountIncludingTax) -
                                parseIndianNumber(
                                  RefundTaxDetails?.totalAmountIncludingTax ||
                                    transaction?.transaction?.refund?.taxDetails
                                      ?.totalAmountIncludingTax
                                )
                            )
                          : transaction &&
                            !transaction?.transaction?.refund?.taxDetails &&
                            !RefundTaxDetails
                          ? lasttotalAmountIncludingTax
                          : "—"}
                      </span>
                    )}
                    {/* quotation?  lasttotalAmountIncludingTax :  */}
                  </div>
                </div>
                <div className="bg-[#ffffff] lg:w-full  xs:w-[200%]  h-[7rem] lg:text-[18px] xs:text-[14px] flex items-center justify-start">
                  <div className="w-[6rem] h-[7rem] bg-[#E6E6E6] flex items-center justify-center text-[#808080]">
                    特記事項
                  </div>{" "}
                  <div className="w-full h-[5rem] p-3 text-[#808080] flex flex-wrap break-all">
                    {backQuotation &&
                    backQuotation?.length > 0 &&
                    socketRefundTaxDetails
                      ? socketRefundTaxDetails?.textareaValue
                      : backQuotation &&
                        backQuotation?.length > 0 &&
                        RefundTaxDetails
                      ? RefundTaxDetails?.textareaValue
                      : transaction &&
                        transaction?.transaction?.refund?.taxDetails &&
                        !RefundTaxDetails
                      ? transaction?.transaction?.refund?.taxDetails
                          ?.textareaValue
                      : transaction &&
                        !transaction?.transaction?.refund?.taxDetails &&
                        !RefundTaxDetails
                      ? lastNote
                      : "—"}
                  </div>
                </div>
              </div>
            )}
            {/* table end */}

            {/* open estimate table modal and cancel_btn */}
            {transaction?.transaction?.transaction_status !== 9 && (
              <div className=" w-full hidden gap-2 mt-8 cursor-pointer">
                <div
                  className={`flex   ${
                    transaction && transaction?.transaction?.paymentDeposit
                      ? "xl:justify-end  lg:justify-end xs:justify-center md:justify-end  lg:w-[70vw] xs:w-[100vw]"
                      : "lg:justify-center xs:justify-center items-center"
                  } gap-10 xs:gap-6   w-[100vw] `}
                >
                  {transaction &&
                    transaction.user &&
                    (transaction.user.name ===
                    transaction.customer_name ? null : transaction.user.name ===
                      transaction.seller_name ? (
                      <>
                        {!netContractSigned && (
                          <span
                            onClick={handleClick}
                            className={`lg:px-10 xs:px-2 py-3 text-[18px] xs:text-[14px] font-bold lg:text-white lg:bg-[#808080]  xs:bg-[#F8F8F8] xs:border-2 xs:text-[#808080] ${
                              transaction?.transaction?.orderer_agree &&
                              transaction?.transaction?.contract_agree
                                ? ""
                                : ""
                            }`}
                          >
                            条件を修正する
                          </span>
                        )}
                        {netTermsAgreed &&
                        !transaction?.transaction?.contract_agree ? (
                          <>
                            {modify ? (
                              <span
                                onClick={
                                  estimateTable &&
                                  Array.isArray(estimateTable) &&
                                  estimateTable.length > 0
                                    ? submitQuotation
                                    : null
                                }
                                className={`lg:px-10 xs:px-2 py-3  text-[18px] font-bold xs:text-[14px] text-white bg-[#FFAA00] ${
                                  estimateTable &&
                                  Array.isArray(estimateTable) &&
                                  estimateTable.length > 0 &&
                                  !estimateLoading
                                    ? "cursor-pointer"
                                    : "cursor-not-allowed"
                                }`}
                              >
                                {estimateLoading ? (
                                  <Spinner className="h-full" />
                                ) : (
                                  "見積を送信する"
                                )}
                              </span>
                            ) : (
                              <span
                                onClick={handleContract}
                                className={`lg:px-10 xs:px-2 py-3 text-[18px] xs:text-[14px] font-bold lg:text-white text-white bg-[#FFAA00] ${
                                  concludeLoading
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                              >
                                {concludeLoading ? (
                                  <Spinner className="h-full" />
                                ) : (
                                  "契約締結する"
                                )}
                              </span>
                            )}
                          </>
                        ) : !netTermsAgreed &&
                          !transaction?.transaction?.contract_agree ? (
                          <span
                            onClick={
                              estimateTable &&
                              Array.isArray(estimateTable) &&
                              estimateTable.length > 0
                                ? submitQuotation
                                : null
                            }
                            className={`lg:px-10 xs:px-2 py-3  text-[18px] font-bold xs:text-[14px] text-white bg-[#FFAA00]  ${
                              estimateTable &&
                              Array.isArray(estimateTable) &&
                              estimateTable.length > 0 &&
                              !estimateLoading
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            }`}
                          >
                            {estimateLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "見積を送信する"
                            )}
                          </span>
                        ) : null}
                      </>
                    ) : null)}
                  {transaction &&
                    (transaction?.transaction?.quotation?.length > 0 ||
                      socketEstimate.length > 0) &&
                    transaction.user &&
                    transaction.user.name &&
                    transaction.user.name === transaction.customer_name &&
                    !transaction?.transaction?.paymentDeposit && (
                      <>
                        {netQuotationReceived &&
                        !netReQuoteRequested &&
                        !netReQuoteSent &&
                        !netContractSigned ? (
                          <span
                            onClick={
                              transaction?.transaction?.initiateRefund
                                ?.IsTrue &&
                              transaction?.transaction?.agreedToCancel
                                ? handelRefundClick
                                : handleRequestReQuotation
                            }
                            className={` lg:px-10 xs:px-2 py-3 text-[18px] xs:text-[14px] font-bold lg:text-white lg:bg-[#808080]  xs:bg-[#F8F8F8] xs:border-2 xs:text-[#808080] ${
                              reQuoteLoading
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {reQuoteLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "再見積を依頼する"
                            )}
                          </span>
                        ) : netQuotationReceived &&
                          netReQuoteRequested &&
                          !netReQuoteSent &&
                          !netContractSigned ? (
                          <span
                            onClick={handleRequestReQuotation}
                            className={` lg:px-10 xs:px-2 py-3 text-[18px] xs:text-[14px] font-bold lg:text-white   bg-[#FFAA00] xs:text-white
                          xs:border-2 ${
                            reQuoteLoading
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          >
                            {reQuoteLoading ? (
                              <Spinner className="h-full" />
                            ) : (
                              "再見積を依頼する"
                            )}
                          </span>
                        ) : (
                          netQuotationReceived &&
                          netReQuoteRequested &&
                          netReQuoteSent &&
                          !netContractSigned && (
                            <span
                              onClick={handleRequestReQuotation}
                              className={` lg:px-10 xs:px-2 py-3 text-[18px] xs:text-[14px] font-bold lg:text-white lg:bg-[#808080]  xs:bg-[#F8F8F8] xs:border-2 xs:text-[#808080] ${
                                reQuoteLoading
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              } `}
                            >
                              {reQuoteLoading ? (
                                <Spinner className="h-full" />
                              ) : (
                                "再見積を依頼する"
                              )}
                            </span>
                          )
                        )}

                        {transaction &&
                          (transaction?.transaction?.quotation?.length > 0 ||
                            socketEstimate.length > 0) &&
                          transaction.user &&
                          transaction.user.name &&
                          transaction.user.name === transaction.customer_name &&
                          !transaction?.transaction?.paymentDeposit &&
                          !transaction?.transaction?.orderer_agree && (
                            <>
                              {netQuotationReceived &&
                              !netReQuoteRequested &&
                              !netReQuoteSent ? (
                                <span
                                  onClick={handleAgreeToTerms}
                                  className={`lg:px-[65px] md:px-[25px] sm:px-[40px] xs:px-[35px] py-3  text-[18px] font-bold xs:text-[14px] text-white bg-[#FFAA00]  cursor-pointer`}
                                >
                                  合意する
                                </span>
                              ) : netQuotationReceived &&
                                netReQuoteRequested &&
                                !netReQuoteSent ? (
                                <span
                                  onClick={handleAgreeToTerms}
                                  className={`lg:px-[65px] md:px-[25px] sm:px-[40px] xs:px-[35px] py-3  text-[18px] font-bold xs:text-[14px] text-white bg-[#FFAA00]  cursor-pointer hidden`}
                                >
                                  ""
                                </span>
                              ) : (
                                netQuotationReceived &&
                                netReQuoteRequested &&
                                netReQuoteSent && (
                                  <span
                                    onClick={handleAgreeToTerms}
                                    className={`lg:px-[65px] md:px-[25px] sm:px-[40px] xs:px-[35px] py-3  text-[18px] font-bold xs:text-[14px] text-white bg-[#FFAA00]  ${
                                      agreeLoading
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                    }`}
                                  >
                                    {agreeLoading ? (
                                      <Spinner className="h-full" />
                                    ) : (
                                      "合意する"
                                    )}
                                  </span>
                                )
                              )}
                            </>
                          )}

                        {netContractSigned &&
                          (transaction?.transaction?.transaction_status === 1 ||
                            transaction?.transaction?.transaction_status ===
                              2) && (
                            <span
                              onClick={
                                !transaction?.transaction?.initiateRefund
                                  ?.IsTrue && handlePayment
                              }
                              className={`lg:px-[65px] md:px-[25px] sm:px-[40px] xs:px-[35px] py-3  text-[18px] font-bold xs:text-[14px] text-white bg-[#FFAA00]  cursor-pointer`}
                            >
                              {transaction?.transaction?.initiateRefund?.IsTrue
                                ? "返金を依頼する"
                                : "仮払いする"}
                            </span>
                          )}
                      </>
                    )}
                  {transaction &&
                    transaction?.customer_name === transaction?.user?.name &&
                    !netRefundTermsAgreed &&
                    transaction?.transaction?.initiateRefund?.IsTrue &&
                    netAgreedToCancel && (
                      <div className="w-full flex justify-center items-center gap-3">
                        <span
                          onClick={handelRefundClick}
                          className={`lg:px-10 xs:px-2 py-3 text-[18px] xs:text-[14px] font-bold lg:text-white lg:bg-[#808080]  xs:bg-[#F8F8F8] xs:border-2 xs:text-[#808080]  ${
                            agreeLoading
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          {agreeLoading ? (
                            <Spinner className="h-full" />
                          ) : (
                            "条件を修正する"
                          )}
                        </span>
                        <span
                          onClick={submitRefund}
                          className={`lg:px-[65px] md:px-[25px] sm:px-[40px] xs:px-[35px] py-3  text-[18px] font-bold xs:text-[14px] text-white bg-[#FFAA00]  ${
                            !refundLoading &&
                            refundTable &&
                            refundTable?.length > 0 &&
                            !refundHit
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                        >
                          {refundLoading ? (
                            <Spinner className="h-full" />
                          ) : (
                            "返金を依頼する"
                          )}
                        </span>
                      </div>
                    )}
                </div>
                <div>
                  {((transaction &&
                    transaction?.transaction?.paymentDeposit &&
                    !transaction?.transaction?.initiateRefund?.IsTrue &&
                    (transaction?.transaction?.transaction_status !== 5 ||
                      (transaction?.transaction?.transaction_status !== 6 &&
                        transaction?.transaction?.transaction_status !== 7 &&
                        transaction?.transaction?.transaction_status !== 8)) &&
                    !netDeliveryOK) ||
                    payByBuyer) && (
                    <div className="flex lg:justify-end  xs:items-center gap-2 lg:py-3  lg:w-[25vw]  xs:w-[45vw] sm:w-[27vw] ">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#808080] "
                      >
                        <path
                          d="M5.87508 13.0033L9.00008 9.87825L12.1251 13.0033L13.0001 12.1283L9.87508 9.00325L13.0001 5.87825L12.1251 5.00325L9.00008 8.12825L5.87508 5.00325L5.00008 5.87825L8.12508 9.00325L5.00008 12.1283L5.87508 13.0033ZM9.00008 17.3366C7.86119 17.3366 6.7848 17.1178 5.77091 16.6803C4.75703 16.2428 3.87161 15.6456 3.11466 14.8887C2.35772 14.1317 1.7605 13.2463 1.323 12.2324C0.885498 11.2185 0.666748 10.1421 0.666748 9.00325C0.666748 7.85048 0.885498 6.76714 1.323 5.75325C1.7605 4.73937 2.35772 3.85742 3.11466 3.10742C3.87161 2.35742 4.75703 1.76367 5.77091 1.32617C6.7848 0.888672 7.86119 0.669922 9.00008 0.669922C10.1529 0.669922 11.2362 0.888672 12.2501 1.32617C13.264 1.76367 14.1459 2.35742 14.8959 3.10742C15.6459 3.85742 16.2397 4.73937 16.6772 5.75325C17.1147 6.76714 17.3334 7.85048 17.3334 9.00325C17.3334 10.1421 17.1147 11.2185 16.6772 12.2324C16.2397 13.2463 15.6459 14.1317 14.8959 14.8887C14.1459 15.6456 13.264 16.2428 12.2501 16.6803C11.2362 17.1178 10.1529 17.3366 9.00008 17.3366ZM9.00008 16.0866C10.9723 16.0866 12.6459 15.3956 14.0209 14.0137C15.3959 12.6317 16.0834 10.9616 16.0834 9.00325C16.0834 7.03103 15.3959 5.35742 14.0209 3.98242C12.6459 2.60742 10.9723 1.91992 9.00008 1.91992C7.04175 1.91992 5.37161 2.60742 3.98966 3.98242C2.60772 5.35742 1.91675 7.03103 1.91675 9.00325C1.91675 10.9616 2.60772 12.6317 3.98966 14.0137C5.37161 15.3956 7.04175 16.0866 9.00008 16.0866Z"
                          fill="#808080"
                        />
                      </svg>
                      <span
                        onClick={handleCancelModalShow}
                        className="text-[#808080] lg:text-[18px] xs:text-[14px] "
                      >
                        取引をキャンセルする
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* modal and cancel_btn end*/}

            {/* List   */}
            {transaction &&
            transaction?.user?.name &&
            transaction?.user?.name === transaction?.customer_name ? (
              <>
                {!transaction?.transaction?.initiateRefund?.IsTrue ? (
                  <div className="mt-[56px] text-[#808080] font-bold  lg:text-[24px] xs:text-[18px] ">
                    帳票一覧
                    <div className=" grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4  jus  border gap-4 lg:px-[124px] sm:px-[100px] xs:px-10 py-10 mt-2">
                      <span
                        className={`py-2 lg:px-2 sm:px-2 ${
                          isBlueButtonForEstimation
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForEstimation ? handleDownload : undefined
                        }
                      >
                        見積書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForAdvancePayment
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForAdvancePayment
                            ? handleDownloadAdvancePayment
                            : undefined
                        }
                      >
                        仮払請求書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForOrderForm
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForOrderForm
                            ? handleDownloadOrderForm
                            : undefined
                        }
                      >
                        発注書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForDeliverySlip
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForDeliverySlip
                            ? handleDownloadDeliverySlip
                            : undefined
                        }
                      >
                        納品書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForReceipt
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForReceipt
                            ? handleDownloadReceipt
                            : undefined
                        }
                      >
                        受領書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForAcceptanceLetter
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForAcceptanceLetter
                            ? handleDownloadAcceptance
                            : undefined
                        }
                      >
                        検収書
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-[56px] text-[#808080] font-bold  lg:text-[24px] xs:text-[14px] ">
                    帳票一覧
                    <div className=" grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4  jus  border gap-4 lg:px-[124px] sm:px-[100px] xs:px-10 py-10 mt-2">
                      {isBlueButtonForEstimation && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForEstimation
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownload}
                        >
                          見積書
                        </span>
                      )}
                      {isBlueButtonForAdvancePayment && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForAdvancePayment
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadAdvancePayment}
                        >
                          仮払請求書
                        </span>
                      )}
                      {isBlueButtonForOrderForm && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForOrderForm
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadOrderForm}
                        >
                          発注書
                        </span>
                      )}
                      {isBlueButtonForDeliverySlip && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForDeliverySlip
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadDeliverySlip}
                        >
                          納品書
                        </span>
                      )}
                      {isBlueButtonForReceipt && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForReceipt
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadReceipt}
                        >
                          受領書
                        </span>
                      )}
                      {isBlueButtonForAcceptanceLetter && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForAcceptanceLetter
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadAcceptance}
                        >
                          検収書
                        </span>
                      )}
                      <span
                        className={`py-2 lg:px-2 sm:px-2 flex justify-center items-center ${
                          isBlueButtonForRefundInvoice
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForRefundInvoice
                            ? handleDownloadRefundInvoice
                            : undefined
                        }
                      >
                        返金請求書
                      </span>
                      {/* working on refund transaction invoice for buyer */}
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForRefundTransactionInvoice
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForRefundTransactionInvoice
                            ? handleDownloadRefundTransactionInvoice
                            : undefined
                        }
                      >
                        取引請求書
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mt-[56px] text-[#808080] font-bold  lg:text-[24px] xs:text-[14px] ">
                  帳票一覧
                  {!transaction?.transaction?.initiateRefund?.IsTrue ? (
                    <div className=" grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4   border gap-4 lg:px-[124px] sm:px-[100px] xs:px-10 py-10 mt-2">
                      <span
                        className={`py-2 lg:px-2 sm:px-2 ${
                          isBlueButtonForEstimation
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed"
                        }`}
                        onClick={
                          isBlueButtonForEstimation ? handleDownload : undefined
                        }
                      >
                        見積書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForOrderForm
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForOrderForm
                            ? handleDownloadOrderForm
                            : undefined
                        }
                      >
                        発注書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForDeliverySlip
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForDeliverySlip
                            ? handleDownloadDeliverySlip
                            : undefined
                        }
                      >
                        納品書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForReceipt
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForReceipt
                            ? handleDownloadReceipt
                            : undefined
                        }
                      >
                        受領書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForAcceptanceLetter
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForAcceptanceLetter
                            ? handleDownloadAcceptance
                            : undefined
                        }
                      >
                        検収書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForTransactionInvoice
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForTransactionInvoice
                            ? handleDownloadTransactionInvoice
                            : undefined
                        }
                      >
                        取引請求書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForSystemFee
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForSystemFee
                            ? handleDownloadSystem
                            : undefined
                        }
                      >
                        システム利用料請求書
                      </span>
                    </div>
                  ) : (
                    <div className=" grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4  jus  border gap-4 lg:px-[124px] sm:px-[100px] xs:px-10 py-10 mt-2">
                      {isBlueButtonForEstimation && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForEstimation
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownload}
                        >
                          見積書
                        </span>
                      )}
                      {isBlueButtonForOrderForm && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForOrderForm
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadOrderForm}
                        >
                          発注書
                        </span>
                      )}
                      {isBlueButtonForDeliverySlip && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForDeliverySlip
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadDeliverySlip}
                        >
                          納品書
                        </span>
                      )}
                      {isBlueButtonForReceipt && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForReceipt
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadReceipt}
                        >
                          受領書
                        </span>
                      )}
                      {isBlueButtonForAcceptanceLetter && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForAcceptanceLetter
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadAcceptance}
                        >
                          検収書
                        </span>
                      )}
                      {isBlueButtonForTransactionInvoice && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForTransactionInvoice
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadTransactionInvoice}
                        >
                          取引請求書
                        </span>
                      )}
                      {isBlueButtonForSystemFee && (
                        <span
                          className={`py-2 lg:px-2 sm:px-2 ${
                            isBlueButtonForSystemFee
                              ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                              : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                          }`}
                          onClick={handleDownloadSystem}
                        >
                          システム利用料請求書
                        </span>
                      )}
                      <span
                        className={`py-2 lg:px-2 sm:px-2 flex justify-center items-center ${
                          isBlueButtonForRefundInvoice
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForRefundInvoice
                            ? handleDownloadRefundInvoice
                            : undefined
                        }
                      >
                        返金請求書
                      </span>

                      {/* working on refund transaction invoice and  system usage fee for seller */}
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForRefundTransactionInvoice
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForRefundTransactionInvoice
                            ? handleDownloadRefundTransactionInvoice
                            : undefined
                        }
                      >
                        取引請求書
                      </span>
                      <span
                        className={`py-2 lg:px-2  sm:px-2 xs:text-[14px] lg:text-[18px]   ${
                          isBlueButtonForRefundSystemFee
                            ? "bg-[#255BB3] text-[white] cursor-pointer xs:text-[14px] lg:text-[18px]  text-center"
                            : "bg-[#E6E6E6] text-[gray] xs:text-[14px] lg:text-[18px]  text-center cursor-not-allowed "
                        }`}
                        onClick={
                          isBlueButtonForRefundSystemFee
                            ? handleDownloadRefundSystem
                            : undefined
                        }
                      >
                        システム利用料請求書
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* messages */}
            <div className="mt-8 ">
              <span className="text-[#808080] font-bold lg:text-[24px] xs:text-[18px]">
                {" "}
                メッセージ
              </span>
              <div
                className="border w-full h-[500px] mt-2 overflow-scroll "
                ref={chatRef}
              >
                <div className={`lg:p-6 xs:p-4 flex w-full`}>
                  <div className={`w-full `}>
                    {chatArray.map((chat, index) => (
                      <div
                        key={index}
                        className={`flex flex-row w-[100%] ${
                          transaction &&
                          transaction?.user?.name === chat?.sender_name
                            ? "flex-row-reverse lg:gap-10 xs:gap-4 mt-5 items-center"
                            : "mt-3 items-center"
                        } `}
                        ref={messageRef}
                      >
                        {/* logi */}
                        <div
                          className={`${
                            transaction &&
                            transaction?.user?.name === chat?.sender_name
                              ? "lg:w-[10%] xs:w-[20%] sm:w-[12%] flex xs:items-start xs:justify-start "
                              : "lg:w-[10%] xs:w-[20%] sm:w-[12%]  "
                          } `}
                        >
                          {chat?.sender_pic ? (
                            <img
                              src={`${chat?.sender_pic}`}
                              className="rounded-full bg-[#DCDCDC] lg:h-[60px] lg:w-[60px]  xs:h-[51px] xs:w-[51px] flex justify-center items-center text-[#808080] xs:text-[14px] lg:text-[18px] border-2 mt-6"
                            />
                          ) : (
                            <div className="rounded-full bg-[#DCDCDC] lg:h-[60px] lg:w-[60px]  xs:h-[51px] xs:w-[51px] flex justify-center items-center text-[#808080] xs:text-[14px] lg:text-[18px] ">
                              Logo
                            </div>
                          )}
                        </div>

                        <div
                          className={
                            chat?.first_msg ||
                            chat?.seller_quote ||
                            chat?.buyer_reQuote ||
                            chat?.buyer_Agree ||
                            chat?.contract_sign ||
                            chat?.paymentDeposited ||
                            chat?.deliveryCompleted ||
                            chat?.receiptGenerated ||
                            chat?.deliverySentBack ||
                            chat?.deliveryAccepted ||
                            chat?.cancelRequest ||
                            chat?.cancelRefundRequest ||
                            chat?.cancelAgree ||
                            chat?.requestRefund ||
                            chat?.refundTermsAgree ||
                            chat?.message === "Request New Quotation Sent!" ||
                            chat?.message === "取引条件に合意しました" ||
                            chat?.message === "Signed a Contract"
                              ? " lg:w-[60%] xs:w-[80%] sm:w-[60%] flex flex-col gap-1 mt-1 breal-all "
                              : " lg:w-[60%] xs:w-[80%] sm:w-[60%] flex flex-col gap-1 mt-1 break-all "
                          }
                        >
                          <div
                            className={`flex ${
                              transaction &&
                              transaction?.user?.name === chat?.sender_name
                                ? "flex-row-reverse"
                                : ""
                            } `}
                          >
                            <span
                              className={` text-[#808080] xs:text-[14px] lg:text-[18px] font-bold`}
                            >
                              {chat?.sender_name}
                            </span>
                          </div>
                          <div
                            className={`px-5 ${
                              chat?.file_path || chat?.file_type
                                ? ` h-[300px]`
                                : "h-auto "
                            }  rounded flex xs:flex-col md:flex-row xs:justify-center  md:items-center ${
                              chat?.first_msg ||
                              chat?.seller_quote ||
                              chat?.buyer_reQuote ||
                              chat?.buyer_Agree ||
                              chat?.contract_sign ||
                              chat?.paymentDeposited ||
                              chat?.deliveryCompleted ||
                              chat?.receiptGenerated ||
                              chat?.deliverySentBack ||
                              chat?.deliveryAccepted ||
                              chat?.cancelRequest ||
                              chat?.cancelRefundRequest ||
                              chat?.cancelAgree ||
                              chat?.requestRefund ||
                              chat?.refundTermsAgree ||
                              chat?.message === "Request New Quotation Sent!" ||
                              chat?.message === "取引条件に合意しました" ||
                              chat?.message === "Signed a Contract"
                                ? `${
                                    transaction &&
                                    transaction?.user?.name ===
                                      chat?.sender_name
                                      ? "bg-[#d2e3fe] "
                                      : "bg-[#FFF4DF]   "
                                  }  `
                                : `${
                                    transaction &&
                                    transaction?.user?.name ===
                                      chat?.sender_name
                                      ? "bg-[#d2e3fe]"
                                      : "bg-[#FFF4DF] "
                                  } `
                            } `}
                          >
                            {chat?.file_path || chat?.file_type ? (
                              <a
                                target="_blank"
                                href={chat?.file_path}
                                className="flex flex-col gap-1 text-[#808080] xs:text-[14px] lg:text-[18px] h-full  w-full "
                              >
                                <p className={` 0`}>{chat?.message}</p>
                                {(chat?.file_path &&
                                  ["png", "jpeg", "jpg", "svg+xml", "gif"].some(
                                    (type) => chat.file_path.includes(type)
                                  )) ||
                                (chat?.file_type &&
                                  [
                                    "image/png",
                                    "image/jpeg",
                                    "image/jpg",
                                    "image/svg+xml",
                                    "image/gif",
                                  ].some((type) =>
                                    chat.file_type.includes(type)
                                  )) ? (
                                  <img
                                    src={chat?.file_path}
                                    className="w-full max-h-[250px] object-contain "
                                    alt="img-preview"
                                  />
                                ) : null}
                              </a>
                            ) : (
                              <div
                                className={`flex xs:flex-col lg:flex-row     ${
                                  transaction &&
                                  transaction?.user?.name === chat?.sender_name
                                    ? "flex-row-reverse justify-between  lg:items-center xs:items-end "
                                    : "xs:flex-row md:flex-row justify-between  lg:items-center xs:items-start "
                                }   py-2 xs:gap-2 lg:gap-1 w-full `}
                              >
                                <span
                                  className={
                                    chat?.first_msg ||
                                    chat?.seller_quote ||
                                    chat?.buyer_reQuote ||
                                    chat?.buyer_Agree ||
                                    chat?.contract_sign ||
                                    chat?.paymentDeposited ||
                                    chat?.deliveryCompleted ||
                                    chat?.receiptGenerated ||
                                    chat?.deliverySentBack ||
                                    chat?.deliveryAccepted ||
                                    chat?.cancelRequest ||
                                    chat?.cancelRefundRequest ||
                                    chat?.cancelAgree ||
                                    chat?.requestRefund ||
                                    chat?.refundTermsAgree ||
                                    chat?.message ===
                                      "Request New Quotation Sent!" ||
                                    chat?.message ===
                                      "取引条件に合意しました" ||
                                    chat?.message === "Signed a Contract"
                                      ? ` ${
                                          transaction &&
                                          transaction?.user?.name ===
                                            chat?.sender_name
                                            ? "text-[#255BB3] w-full text-end"
                                            : "text-[#FFAA00]  w-full"
                                        }  xs:text-[12px] lg:text-[18px] font-bold   ${
                                          transaction &&
                                          transaction?.user?.name ===
                                            chat?.sender_name
                                            ? " lg:order-2 text-justify"
                                            : ""
                                        }`
                                      : `   text-[#808080] xs:text-[12px] lg:text-[18px] w-full     ${
                                          transaction &&
                                          transaction?.user?.name ===
                                            chat?.sender_name
                                            ? "flex justify-end text-justify"
                                            : ""
                                        }  `
                                  }
                                >
                                  {chat?.message}
                                </span>

                                {chat?.first_msg ||
                                chat?.seller_quote ||
                                chat?.buyer_reQuote ||
                                chat?.buyer_Agree ||
                                chat?.contract_sign ||
                                chat?.paymentDeposited ||
                                chat?.deliveryCompleted ||
                                chat?.receiptGenerated ||
                                chat?.deliverySentBack ||
                                chat?.deliveryAccepted ||
                                chat?.cancelRequest ||
                                chat?.cancelRefundRequest ||
                                chat?.cancelAgree ||
                                chat?.requestRefund ||
                                chat?.refundTermsAgree ||
                                chat?.message ===
                                  "Request New Quotation Sent!" ||
                                chat?.message === "取引条件に合意しました" ||
                                chat?.message === "Signed a Contract" ? (
                                  <div
                                    className={` h-full lg:w-[50%] xs:w-full flex  gap-1 ${
                                      transaction &&
                                      transaction?.user?.name ===
                                        chat?.sender_name
                                        ? " xs:justify-end xs:items-end lg:justify-start lg:items-start"
                                        : "xs:justify-start xs:items-start lg:justify-end lg:items-end "
                                    } `}
                                  >
                                    {chat?.seller_quote && (
                                      <div
                                        className={` ${
                                          transaction &&
                                          transaction?.user?.name ===
                                            chat?.sender_name
                                            ? "bg-[#255BB3]"
                                            : "bg-[#FFAA00]"
                                        } xs:text-[12px] lg:text-[18px] h-full xs:w-[50%] lg:w-[50%] text-white flex justify-center items-center py-2 `}
                                      >
                                        <button
                                          onClick={handleQuotationSending}
                                          type="button"
                                          className="h-full w-full xs:text-[12px]  lg:text-[18px] "
                                        >
                                          見積書
                                        </button>
                                      </div>
                                    )}
                                    {chat?.paymentDeposited && (
                                      <div
                                        className={`${
                                          transaction &&
                                          transaction?.user?.name ===
                                            chat?.sender_name
                                            ? "bg-[#255BB3]"
                                            : "bg-[#FFAA00]"
                                        } xs:text-[12px] lg:text-[18px]  h-full xs:w-[50%] lg:w-[50%]  text-white flex justify-center items-center py-2`}
                                      >
                                        <button
                                          onClick={handleOrderFormSending}
                                          type="button"
                                          className="h-full w-full  xs:text-[12px]  lg:text-[18px]"
                                        >
                                          発注書
                                        </button>
                                      </div>
                                    )}
                                    {chat?.deliveryCompleted && (
                                      <div
                                        className={`${
                                          transaction &&
                                          transaction?.user?.name ===
                                            chat?.sender_name
                                            ? "bg-[#255BB3]"
                                            : "bg-[#FFAA00]"
                                        } xs:text-[12px] lg:text-[18px] h-full xs:w-[50%] lg:w-[50%]  text-white flex justify-center items-center py-2`}
                                      >
                                        <button
                                          onClick={handleDeliverySlipSending}
                                          type="button"
                                          className="h-full w-full  xs:text-[12px]  lg:text-[18px]"
                                        >
                                          納品書
                                        </button>
                                      </div>
                                    )}
                                    {chat?.receiptGenerated && (
                                      <div
                                        className={`${
                                          transaction &&
                                          transaction?.user?.name ===
                                            chat?.sender_name
                                            ? "bg-[#255BB3]"
                                            : "bg-[#FFAA00]"
                                        } xs:text-[12px] lg:text-[18px] "h-full xs:w-[50%] lg:w-[50%]  text-white flex justify-center items-center py-2"`}
                                      >
                                        <button
                                          onClick={handleReceiptSending}
                                          type="button"
                                          className="h-full w-full  xs:text-[12px]  lg:text-[18px] py-2"
                                        >
                                          受領書
                                        </button>
                                      </div>
                                    )}
                                    {chat?.deliveryAccepted && (
                                      <div
                                        className={`${
                                          transaction &&
                                          transaction?.user?.name ===
                                            chat?.sender_name
                                            ? "bg-[#255BB3]"
                                            : "bg-[#FFAA00]"
                                        }  xs:text-[12px] lg:text-[18px] h-full xs:w-[50%] lg:w-[50%]  text-white flex justify-center items-center py-2`}
                                      >
                                        <button
                                          onClick={handleAcceptanceSending}
                                          type="button"
                                          className="h-full w-full  xs:text-[12px]  lg:text-[18px]"
                                        >
                                          検収書
                                        </button>
                                      </div>
                                    )}
                                    {chat?.requestRefund && (
                                      <div
                                        className={`${
                                          transaction &&
                                          transaction?.user?.name ===
                                            chat?.sender_name
                                            ? "bg-[#255BB3]"
                                            : "bg-[#FFAA00]"
                                        } xs:text-[12px] lg:text-[18px]  h-full xs:w-[50%] lg:w-[50%]  text-white flex justify-center items-center py-2`}
                                      >
                                        <button
                                          onClick={handleRefundInvoiceSending}
                                          type="button"
                                          className="h-full w-full  xs:text-[12px]  lg:text-[18px]"
                                        >
                                          返金請求書
                                        </button>
                                      </div>
                                    )}
                                    {chat?.refundTermsAgree && (
                                      <div
                                        className={`${
                                          transaction &&
                                          transaction?.user?.name ===
                                            chat?.sender_name
                                            ? "bg-[#255BB3]"
                                            : "bg-[#FFAA00]"
                                        } xs:text-[12px] lg:text-[18px]  h-full xs:w-[50%] lg:w-[50%]  text-white flex justify-center items-center py-2`}
                                      >
                                        <button
                                          onClick={handleRefundInvoiceSending}
                                          type="button"
                                          className="h-full w-full  xs:text-[12px]  lg:text-[18px]"
                                        >
                                          返金請求書
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* message box */}
            <form
              onSubmit={handleChat}
              className="border border-black h-[200px] w-full mt-2"
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-[150px] align-top p-2 resize-none border-0 outline-none"
                disabled
              />
              <div className="flex justify-between px-2 sm:px-2 mt-1">
                <label className="bg-[#E6E6E6] xs:px-3 lg:py-1 xs:py-2  text-[#808080] border border-gray-500 lg:text-[18px] xs:text-[14px] cursor-pointer">
                  ファイルを選択
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      setMessage(e.target.files[0].name);
                      setMsgFile(e.target.files[0]);
                      e.target.value = "";
                    }}
                  />
                </label>
                <button
                  type="submit"
                  className="bg-[#255BB3] xs:px-2 lg:py-1 xs:py-2 text-white border border-blue-500 lg:text-[18px] xs:text-[14px]"
                >
                  メッセージを送信
                </button>
              </div>
            </form>

            {show ? (
              <TransactionModal
                setModify={setModify}
                showContactModal={show}
                setShowContactModal={setShow}
                defaultRow={defaultRow}
                compactTableData={compactTableData}
                taxRate={taxRate}
                lastQuotationTaxAmount={lastquotationtaxAmount}
                lasttotalAmountIncludingTax={lasttotalAmountIncludingTax}
                lasttotalamountExcludingTax={lasttotalamountExcludingTax}
                lastNote={lastNote}
              />
            ) : null}
          </div>
        </div>
      )}
      {reviewModalShow && (
        <ReviewModal
          reviewModalShow={reviewModalShow}
          transaction={transaction}
          buyerName={
            transaction &&
            transaction.user &&
            transaction.user.name === transaction.customer_name
          }
        />
      )}

      {showRefundModal ? (
        <RefundModal
          setModify={setModify}
          showContactModal={showRefundModal}
          setShowContactModal={setShowRefundModal}
          defaultRow={defaultRefundRow}
          compactTableData={refundOnlyData}
          taxRate={taxRate}
          lastNote={RefundTaxDetails?.textareaValue}
        />
      ) : null}

      {cancelModalshow && (
        <CancelationModal
          cancelModalshow={cancelModalshow}
          handleCancelRequest={handleCancelRequest}
        />
      )}
    </>
  );
};
export default SellerTransaction;
