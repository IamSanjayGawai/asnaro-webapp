import axios from "axios";

//  export const BASE_URL = "https://asnaro-backend-test.onrender.com";
export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

// export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

//
export const registerEstimateTable = async (
  estimateData: any,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/estimate-process`,
      estimateData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// create pdf API 2
export const createEstimatePdf = async (
  estimateData: any,
  taxRate: any,
  transactionId: string,
  token: string
) => {
  try {
    console.log(transactionId, "............");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/quotation/estimate-process/${transactionId}`,
      { quotation: estimateData, tax: taxRate },
      config
    );
    console.log("create pdf ....", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRefund = async (
  tableData: { content: string; amount: number }[],
  taxDetails: {
    totalAmountExcludingTax: number;
    taxAmount: number;
    totalAmountIncludingTax: number;
    textareaValue: string;
    adminRefundTax: any;
  },
  transId: string,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/quotation/create-refund/${transId}`,
      { tableData, taxDetails },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// create pdf API 2
export const createAdvancePaymentPdf = async (
  estimateData: any,
  transactionId: string,
  token: string
) => {
  try {
    console.log(transactionId, "............");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/quotation//adnavce-payment/${transactionId}`,
      { quotation: estimateData },
      config
    );
    console.log("create pdf ....", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// create pdf API
// export const createEstimatePdf = async (estimateData: any, token: string) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.post(
//       `${BASE_URL}/quotation/estimate-process`,
//       estimateData,
//       config
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const createTransaction = async (
  seller_id: any,
  process_id: any,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/create-transaction`,
      { seller_id, process_id },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTransaction = async (transaction_id: any, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/transaction/get-transaction/${transaction_id}`,
      config
    );
    console.log("fetch transaction", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (
  transactionId: any,
  message: string,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/send-message`,
      { transactionId, message },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBuyerList = async (
  { page, status }: { page: number; status?: string },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { page, status },
  };
  const response = await axios.get(
    `${BASE_URL}/transaction/buying-list/`,
    config
  );
  return response.data;
};

export const fetchSellerList = async (
  { page, status }: { page: number; status?: string },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { page, status },
  };
  const response = await axios.get(
    `${BASE_URL}/transaction/seller-list/`,
    config
  );
  return response.data;
};

// export const fetchBuyerList = async (page: number, token: string) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.get(
//       `${BASE_URL}/transaction/buying-list?page=${page}`,
//       config
//     );
//     console.log("buyinglist api", response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fetchSellerList = async (token: string) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.get(
//       `${BASE_URL}/transaction/seller-list`,
//       config
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fetchSellerList = async (page: number, status:string, token: string) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     // Append the page query parameter to the URL
//     const response = await axios.get(
//       `${BASE_URL}/transaction/seller-list?page=${page}/status=${status}`,
//       config
//     );
//     return response.data;
//   } catch (error) {
//     throw error.response.data; // It's often helpful to throw the response data for better error handling
//   }
// };

export const fecthBuyerLiNotify = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/transaction/buyerlistlimited`,
      // "http://localhost:8000/transaction/buyerlistlimited",
      config
    );
    console.log("buyinglist api limited", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fecthSellerLiNotify = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/transaction/sellerlistlimited`,
      // "http://localhost:8000/transaction/sellerlistlimited",
      config
    );
    console.log("sellinglist api limited", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const transactionRead = async (
  { transaction_id, userRole },
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${BASE_URL}/transaction/read-status/${transaction_id}`,

      { userRole },
      config
    );
    console.log("quotation get api", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const etEstimateDataByTransaction = async (
  seller_id,
  transaction_id,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/quotation/${seller_id}/${transaction_id}`,
      config
    );
    console.log("quotation get api", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// /agree-buyer/:transactionId

export const buyerAgreeOrder = async (transaction_id, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/agree-buyer/${transaction_id}`,
      config
    );
    console.log("agree-buyer  api", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const contractSigned = async (transaction_id, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/contract-signed/${transaction_id}`,
      config
    );
    console.log("agree-buyer  api", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get tax api

export const getTax = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/get-tax`);
    console.log("get tax api data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const upperLimit = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/get-upperlimits`);
    console.log("get upper limit api data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const makePayment = async (
  paymentDetails: any,
  transactionId,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("paymentDetails++++transactionId", transactionId);
    const response = await axios.post(
      `${BASE_URL}/transaction/create-payment/${transactionId}`,
      paymentDetails,
      config
    );
    console.log("make payment api", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPayemetDetail = async (transaction_id, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/transaction/getPayment-details/${transaction_id}`,
      config
    );
    console.log("agree-buyer  api", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCancellation = async (transactionId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/cancel-order`,
      { transactionId },
      config
    );
    console.log("Cancel Order API response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTransactionStatusCounts = async (
  token: string,
  status: string,
  role: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/status/counts`,
      { status, role },
      config
    );
    console.log("TransactionStatusCounts api", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const acceptCancellation = async (transactionId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/cancel-accept`,
      { transactionId },
      config
    );
    console.log("Cancel Order API response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCancelTransaction = async (transactionId, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/transaction/getorderhistory/${transactionId}`,
      config
    );
    console.log("agree-buyer  api", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestRefundTransaction = async (transactionId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/request-refund`,
      { transactionId },
      config
    );
    console.log("Cancel Order API response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const agreeRefundTransaction = async (transactionId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/agree-refundTerms`,
      { transactionId },
      config
    );
    console.log("Cancel Order API response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setDeliveryStatus = async (
  transactionId,
  deliveryStatus,
  token
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/set-delivery-status`,
      { transactionId, deliveryStatus },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRefundRatingToSeller = async (
  {
    transactionId,
    seller_id,
    process_id,
    ratingToProcess,
    ratingToSeller,
    commentToSeller,
    commentToProcess,
  },
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("ratings++++");
    const response = await axios.post(
      `${BASE_URL}/review/create-review`,
      {
        transactionId,
        seller_id,
        process_id,
        ratingToProcess,
        ratingToSeller,
        commentToSeller,
        commentToProcess,
      },
      config
    );
    console.log("make payment api", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRefundRatingToBuyer = async (
  { transactionId, customer_id, ratingToBuyer, commentToBuyer },
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("ratings++++");
    const response = await axios.post(
      `${BASE_URL}/review/create-reviewbuyer`,
      { transactionId, customer_id, ratingToBuyer, commentToBuyer },
      config
    );
    console.log("make payment api", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getaverageRatingSeller = async (seller_id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/review/average-rating/seller/${seller_id}`,
      config
    );
    console.log("rating Seller API response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getaverageRatingBuyer = async (customer_id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/review/average-rating/buyer/${customer_id}`,
      config
    );
    console.log("rating Buyer API response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getaverageRatingProcess = async (process_id, token) => {
  try {
    console.log("process id ", process_id);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/review/average-rating/process/${process_id}`,
      config
    );
    console.log("rating process API response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setRefundStatus = async (transactionId, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/transaction/set-refund`,
      { transactionId },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
