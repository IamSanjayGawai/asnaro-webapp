import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerEstimateTable,
  createEstimatePdf,
  etEstimateDataByTransaction,
  fecthBuyerLiNotify,
  fecthSellerLiNotify,
  transactionRead,
  buyerAgreeOrder,
  contractSigned,
  getTax,
  makePayment,
  createAdvancePaymentPdf,
  // getPayemetDetail,
  createCancellation,
  getTransactionStatusCounts,
  acceptCancellation,
  getCancelTransaction,
  requestRefundTransaction,
  agreeRefundTransaction,
  createRefundRatingToSeller,
  getaverageRatingSeller,
  getaverageRatingProcess,
  createRefundRatingToBuyer,
  getaverageRatingBuyer,
  setRefundStatus,
  createRefund,
  upperLimit,
} from "../../api/transactionApi";
import {
  ErrorType,
  BadRequest,
  Unauthorized,
  ServerError,
  Other,
} from "@/types/types";
import { RootState } from "../store";
import { setDeliveryStatus } from "../../api/transactionApi";
import {
  createTransaction,
  fetchTransaction,
  fetchBuyerList,
  fetchSellerList,
  sendMessage,
} from "../../api/transactionApi";

export const registerEstimateTableThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("estimate_table/add", async (Data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await registerEstimateTable(Data, user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// create estimate pdf 2
export const CreateEstimatePdfThunk = createAsyncThunk<
  any,
  { estimateData: any; taxRate: any; transactionId: string },
  { rejectValue: ErrorType }
>(
  "advance-payment/create-pdf",
  async ({ estimateData, taxRate, transactionId }, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState() as RootState;
      const data = await createEstimatePdf(
        estimateData,
        taxRate,
        transactionId,
        user?.user?.token
      );
      return data;
    } catch (error: Error | any) {
      if (error?.response?.status === 400)
        return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
      else if (error?.response?.status === 401)
        return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
      else if (error?.response?.status === 500)
        return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
      else return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
);

export const createRefundThunk = createAsyncThunk<
  any,
  {
    tableData: { content: string; amount: number }[];
    taxDetails: {
      totalAmountExcludingTax: number;
      taxAmount: number;
      totalAmountIncludingTax: number;
      textareaValue: string;
      adminRefundTax: any;
    };
    transId: string;
  },
  { rejectValue: ErrorType }
>(
  "transaction/refund",
  async ({ tableData, taxDetails, transId }, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState() as RootState;
      const data = await createRefund(
        tableData,
        taxDetails,
        transId,
        user?.user?.token
      );
      return data;
    } catch (error: Error | any) {
      if (error?.response?.status === 400)
        return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
      else if (error?.response?.status === 401)
        return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
      else if (error?.response?.status === 500)
        return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
      else return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
);

// create estimate pdf 2
export const createAdvancePaymentPdfThunk = createAsyncThunk<
  any,
  { estimateData: any; transactionId: string },
  { rejectValue: ErrorType }
>(
  "estimate_table/create-pdf",
  async ({ estimateData, transactionId }, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState() as RootState;
      const data = await createAdvancePaymentPdf(
        estimateData,
        transactionId,
        user?.user?.token
      );
      return data;
    } catch (error: Error | any) {
      if (error?.response?.status === 400)
        return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
      else if (error?.response?.status === 401)
        return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
      else if (error?.response?.status === 500)
        return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
      else return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
);

// create estimate pdf
// export const CreateEstimatePdfThunk = createAsyncThunk<
//   any,
//   any,
//   { rejectValue: ErrorType }
// >("estimate_table/create-pdf", async (Data, thunkAPI) => {
//   try {
//     const { ustoken: string, token: any, token: anyPI.getState() as RootState;
//     const data = await createEstimatePdf(Data, user?.user?.token);
//     return data;
//   } catch (error: Error | any) {
//     if (error?.response?.status === 400)
//       return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
//     else if (error?.response?.status === 401)
//       return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
//     else if (error?.response?.status === 500)
//       return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
//     else return thunkAPI.rejectWithValue(error?.response?.data as Other);
//   }
// });

export const createTransactionThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("transaction/create", async ({ seller_id, process_id }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await createTransaction(
      seller_id,
      process_id,
      user?.user?.token
    );
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const fetchTransactionThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("transaction/fetch", async (id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await fetchTransaction(id, user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const sendMessageThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("transaction/send-message", async (Data, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await sendMessage(
      Data.transactionId,
      Data.message,
      user?.user?.token
    );
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// export const getSellerListThunk = createAsyncThunk<
//   any,
//   any,
//   { rejectValue: ErrorType }
// >("sellerList/fetch", async (page, thunkAPI) => {
//   try {
//     const { user } = thunkAPI.getState() as RootState;
//     const data = await fetchSellerList(page,user?.user?.token);
//     return data;
//   } catch (error: Error | any) {
//     if (error?.response?.status === 400)
//       return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
//     else if (error?.response?.status === 401)
//       return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
//     else if (error?.response?.status === 500)
//       return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
//     else return thunkAPI.rejectWithValue(error?.response?.data as Other);
//   }
// });

// export const getSellerListThunk = createAsyncThunk<
//   any,
//   any,
//   { rejectValue: ErrorType }
// >(
//   "sellerList/fetch",
//   async (page, status, thunkAPI) => {
//     try {
//       const { user } = thunkAPI.getState() as RootState;
//       const data = await fetchSellerList(page, status, user?.user?.token);
//       return data;
//     } catch (error: Error | any) {
//       if (error?.response?.status === 400)
//         return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
//       else if (error?.response?.status === 401)
//         return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
//       else if (error?.response?.status === 500)
//         return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
//       else return thunkAPI.rejectWithValue(error?.response?.data as Other);
//     }
//   }
// );

// export const getBuyerListThunk = createAsyncThunk<
//   any,
//   any,
//   { rejectValue: ErrorType }
// >("buyerList/fetch", async (page, thunkAPI) => {
//   try {
//     const { user } = thunkAPI.getState() as RootState;
//     const data = await fetchBuyerList(page, user?.user?.token);
//     return data;
//   } catch (error: Error | any) {
//     if (error?.response?.status === 400)
//       return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
//     else if (error?.response?.status === 401)
//       return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
//     else if (error?.response?.status === 500)
//       return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
//     else return thunkAPI.rejectWithValue(error?.response?.data as Other);
//   }
// });

export const getSellerListThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("sellerList/fetch", async ({ page, status }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await fetchSellerList({ page, status }, user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getBuyerListThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("buyerList/fetch", async ({ page, status }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await fetchBuyerList({ page, status }, user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const fecthBuyerLiNotifyThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("buyerList/notifiaction", async ({}, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await fecthBuyerLiNotify(user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const fecthSellerLiNotifyThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("sellerList/notifiaction", async ({}, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await fecthSellerLiNotify(user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// TransactionReadThunk

export const TransactionReadThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("transaction/read", async ({ transaction_id, userRole }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await transactionRead(
      { transaction_id, userRole },
      user?.user?.token
    );
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getEstimateDataByTransactionThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("get/quatation", async ({ seller_id, transaction_id }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await etEstimateDataByTransaction(
      seller_id,
      transaction_id,
      user?.user?.token
    );
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const buyerAgreeOrderThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("buyer/agree", async (transaction_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await buyerAgreeOrder(transaction_id, user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const contractSignedThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("conract/sign", async (transaction_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await contractSigned(transaction_id, user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getTaxThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("get/tax", async (_, thunkAPI) => {
  try {
    const data = await getTax();
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getUpperLimitsThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("get/upper-limit", async (_, thunkAPI) => {
  try {
    const data = await upperLimit();
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const makePaymentThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("buyer/payment", async ({ paymentDetails, transactionId }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await makePayment(
      paymentDetails,
      transactionId,
      user?.user?.token
    );
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const cancelTransactionThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("transaction/cancel", async (transaction_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await createCancellation(transaction_id, user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getTransactionStatus = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("Transaction/Status", async ({ status, role }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await getTransactionStatusCounts(
      user?.user?.token,
      status,
      role
    );
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const acceptCancelTransactionThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("transaction/accept-cancel", async (transaction_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;

    const data = await acceptCancellation(transaction_id, user?.user?.token);

    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const requestRefundTransactionThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("transaction/request-refund", async (transaction_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;

    const data = await requestRefundTransaction(
      transaction_id,
      user?.user?.token
    );

    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const acceptRefundTransactionThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("transaction/accept-refund", async (transaction_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;

    const data = await agreeRefundTransaction(
      transaction_id,
      user?.user?.token
    );

    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getCancelTransactionThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("transaction/get/cancel-data", async (transaction_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;

    const data = await getCancelTransaction(transaction_id, user?.user?.token);

    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const setDeliveryStatusThunk = createAsyncThunk<
  { transactionId: string; deliveryStatus: number },
  any,
  { rejectValue: ErrorType }
>(
  "transaction/set-delivery-status",
  async ({ transactionId, deliveryStatus }, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState() as RootState;
      const data = await setDeliveryStatus(
        transactionId,
        deliveryStatus,
        user?.user?.token
      );
      return data;
    } catch (error: Error | any) {
      if (error?.response?.status === 400)
        return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
      else if (error?.response?.status === 401)
        return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
      else if (error?.response?.status === 500)
        return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
      else return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
);

export const createRefundRatingToSellerThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>(
  "review/CreateRatingToseller",
  async (
    {
      transactionId,
      seller_id,
      process_id,
      ratingToProcess,
      ratingToSeller,
      commentToSeller,
      commentToProcess,
    },
    thunkAPI
  ) => {
    try {
      const { user } = thunkAPI.getState() as RootState;
      const data = await createRefundRatingToSeller(
        {
          transactionId,
          seller_id,
          process_id,
          ratingToProcess,
          ratingToSeller,
          commentToSeller,
          commentToProcess,
        },
        user?.user?.token
      );
      return data;
    } catch (error: Error | any) {
      if (error?.response?.status === 400)
        return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
      else if (error?.response?.status === 401)
        return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
      else if (error?.response?.status === 500)
        return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
      else return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
);

export const getaverageRatingSellerThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("review/getSellerRatings", async (seller_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;

    const data = await getaverageRatingSeller(seller_id, user?.user?.token);

    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getaverageRatingProcessThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("review/getProcessRatings", async (process_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;

    const data = await getaverageRatingProcess(process_id, user?.user?.token);

    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const createRefundRatingToBuyerThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>(
  "review/CreateRatingTobuyer",
  async (
    { transactionId, customer_id, ratingToBuyer, commentToBuyer },
    thunkAPI
  ) => {
    try {
      const { user } = thunkAPI.getState() as RootState;
      console.log("data of rating", customer_id, ratingToBuyer, commentToBuyer);
      const data = await createRefundRatingToBuyer(
        { transactionId, customer_id, ratingToBuyer, commentToBuyer },
        user?.user?.token
      );
      return data;
    } catch (error: Error | any) {
      if (error?.response?.status === 400)
        return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
      else if (error?.response?.status === 401)
        return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
      else if (error?.response?.status === 500)
        return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
      else return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
);

export const getaverageRatingBuyerThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("review/getBuyerRatings", async (customer_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;

    const data = await getaverageRatingBuyer(customer_id, user?.user?.token);

    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const setRefundStatusThunk = createAsyncThunk<
  {
    transactionId: string;
  },
  any,
  { rejectValue: ErrorType }
>("transaction/set-refund-status", async ({ transactionId }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    console.log("transactionId", transactionId);
    const data = await setRefundStatus(transactionId, user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});
