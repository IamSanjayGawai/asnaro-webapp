import {
  CreateEstimatePdfThunk,
  createTransactionThunk,
  fetchTransactionThunk,
  sendMessageThunk,
  getSellerListThunk,
  getBuyerListThunk,
  getEstimateDataByTransactionThunk,
  fecthBuyerLiNotifyThunk,
  fecthSellerLiNotifyThunk,
  TransactionReadThunk,
  buyerAgreeOrderThunk,
  contractSignedThunk,
  getTaxThunk,
  makePaymentThunk,
  createAdvancePaymentPdfThunk,
  cancelTransactionThunk,
  getTransactionStatus,
  acceptCancelTransactionThunk,
  getCancelTransactionThunk,
  requestRefundTransactionThunk,
  acceptRefundTransactionThunk,
  createRefundRatingToSellerThunk,
  getaverageRatingSellerThunk,
  getaverageRatingProcessThunk,
  setDeliveryStatusThunk,
  getaverageRatingBuyerThunk,
  createRefundRatingToBuyerThunk,
  setRefundStatusThunk,
  createRefundThunk,
  getUpperLimitsThunk,
} from "../thunks/transactionThunks";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TransactionSate {
  statusLoading?: boolean;
  listLoading?: boolean;
  loading?: boolean;
  ratingLoading?: boolean;
  pdfBuffer?: any | null;
  IsRefund?: boolean;
  estimateLoading?: boolean;
  refundLoading?: boolean;
  refundHit?: boolean;
  transaction?: any;
  buyerAgreeFlag?: any | null;
  buerList?: any;
  sellerList?: any;
  message?: any;
  notificationLoading?: boolean;
  estimateTable?: any[];
  quatation?: any | null;
  appErr?: any | null;
  registerContent?: boolean;
  buyerNotification?: any;
  sellerNotification?: any;
  readNotification?: any;
  taxData?: any | null;
  upperLimit?: any | null;
  orderCancel?: any | null;
  paymentSuccess?: any;
  delivery?: any;
  firstTimeAfterPayment?: boolean;
  paymentModalShow?: boolean;
  ordererdAgree?: any | null;
  contractSigned?: any | null;
  acceptCancelRequest?: any | null;
  requestRefund?: any | null;
  acceptRefund?: any | null;
  reviewModalShow?: boolean;
  cancelModalshow?: boolean;
  transactionStatus?: any | null;
  ratingToProcess_Seller?: any | null;
  getRatings_Process?: any | null;
  getRatings_Seller?: any | null;
  refundTable?: { content: string; amount: number }[] | null;
  registerRefundContent?: boolean;
  ratingToProcess_Buyer?: any | null;
  getRatings_Buyer?: any | null;
  taxDetails?: {
    amountExcludingTax: number;
    taxAmount: number;
    totalAmountIncludingTax: number;
    textareaValue: string;
  };
  RefundTaxDetails?: {
    totalAmountExcludingTax: number;
    taxAmount: number;
    totalAmountIncludingTax: number;
    textareaValue: string;
  };
}
const initialState: TransactionSate = {
  paymentModalShow: true,
  firstTimeAfterPayment: false,
  IsRefund: false,
};

const localStorageKey = "estimateTableData";
// const localStorageKeyRefund = "refundTableData";
const localStorageKeyTax = "taxDetails";
// const localStorageKeyRefundTax = "RefundTaxDetails";
const localStorageKeyAmount = "amountDetails";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setFirstTimeAfterPayment: (state, action) => {
      state.firstTimeAfterPayment = action.payload;
    },
    removeError: (state) => {
      state.appErr = null;
    },
    setLocalAmount: (_, action) => {
      localStorage.setItem(
        localStorageKeyAmount,
        JSON.stringify(action.payload)
      );
    },
    getLocalAmount: () => {
      const data = localStorage.getItem(localStorageKeyAmount);
      return data ? JSON.parse(data) : null;
    },
    deleteLocalAmount: () => {
      localStorage.removeItem(localStorageKeyAmount);
    },
    registerTransaction: (
      state,
      action: PayloadAction<{
        items: any[];
        taxDetails: {
          amountExcludingTax: number;
          taxAmount: number;
          totalAmountIncludingTax: number;
          textareaValue: string;
        };
      }>
    ) => {
      state.estimateTable = action.payload.items || [];
      state.taxDetails = action.payload.taxDetails;
      localStorage.setItem(
        localStorageKeyTax,
        JSON.stringify(state.taxDetails)
      );
      state.registerContent = true;
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(state.estimateTable)
      );
    },
    registerRefundTransaction: (
      state,
      action: PayloadAction<{
        items: any[];
        RefundTaxDetails: {
          totalAmountExcludingTax: number;
          taxAmount: number;
          totalAmountIncludingTax: number;
          textareaValue: string;
        };
      }>
    ) => {
      state.refundTable = action.payload.items || [];
      state.RefundTaxDetails = action.payload.RefundTaxDetails;
      state.refundHit = false;
      // localStorage.setItem(
      //   localStorageKeyRefundTax,
      //   JSON.stringify(state.RefundTaxDetails)
      // );
      state.registerRefundContent = true;
      // localStorage.setItem(
      //   localStorageKeyRefund,
      //   JSON.stringify(state.refundTable)
      // );
    },

    FetchQuotationThunk: (state, action: PayloadAction<any>) => {
      state.quatation = action.payload;
    },
    showPaymentModal: (state, action: PayloadAction<any>) => {
      state.paymentModalShow = action.payload;
    },
    ShowReviewModalThunk: (state, action: PayloadAction<any>) => {
      state.reviewModalShow = action.payload;
    },
    showCancelModalThunk: (state, action: PayloadAction<any>) => {
      state.cancelModalshow = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(CreateEstimatePdfThunk.pending, (state) => {
      state.estimateLoading = true;
    });
    builder.addCase(
      CreateEstimatePdfThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.estimateLoading = false;
        state.pdfBuffer = action.payload;
      }
    );
    builder.addCase(CreateEstimatePdfThunk.rejected, (state) => {
      state.estimateLoading = false;
      state.pdfBuffer = null;
    });

    builder.addCase(createRefundThunk.pending, (state) => {
      state.refundLoading = true;
      state.refundHit = false;
    });
    builder.addCase(
      createRefundThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.refundLoading = false;
        state.refundHit = true;
        state.refundTable = action.payload?.tableData;
        state.RefundTaxDetails = action.payload?.taxDetails;
      }
    );
    builder.addCase(createRefundThunk.rejected, (state) => {
      state.refundLoading = false;
      state.refundHit = false;
      state.refundTable = null;
      state.RefundTaxDetails = null;
    });

    builder.addCase(setRefundStatusThunk.pending, (state) => {
      state.IsRefund = false;
    });
    builder.addCase(setRefundStatusThunk.fulfilled, (state) => {
      state.IsRefund = true;
    });
    builder.addCase(setRefundStatusThunk.rejected, (state) => {
      state.IsRefund = false;
    });

    builder.addCase(setDeliveryStatusThunk.pending, (state) => {
      state.loading = true;
      state.delivery = null;
    });
    builder.addCase(
      setDeliveryStatusThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.delivery = action.payload;
      }
    );
    builder.addCase(setDeliveryStatusThunk.rejected, (state) => {
      state.loading = false;
      state.delivery = null;
    });
    builder.addCase(createAdvancePaymentPdfThunk.pending, (state) => {
      state.estimateLoading = true;
    });
    builder.addCase(
      createAdvancePaymentPdfThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.estimateLoading = false;
        state.estimateTable = action.payload;
      }
    );
    builder.addCase(createAdvancePaymentPdfThunk.rejected, (state) => {
      state.estimateLoading = false;
      state.estimateTable = null;
    });
    builder.addCase(createTransactionThunk.pending, (state) => {
      state.loading = true;
      state.transaction = null;
      state.appErr = null;
    });

    builder.addCase(
      createTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.transaction = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      createTransactionThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
        state.transaction = null;
      }
    );
    builder.addCase(fetchTransactionThunk.pending, (state) => {
      state.loading = true;
      state.transaction = null;
      state.appErr = null;
    });
    builder.addCase(
      fetchTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.transaction = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      fetchTransactionThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
        state.transaction = null;
      }
    );
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.loading = true;
      state.message = null;
      state.appErr = null;
    });
    builder.addCase(
      sendMessageThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.message = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      sendMessageThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
        state.message = null;
      }
    );
    builder.addCase(getSellerListThunk.pending, (state) => {
      state.loading = true;
      state.sellerList = null;
      state.appErr = null;
    });
    builder.addCase(
      getSellerListThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.sellerList = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getSellerListThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
        state.transaction = null;
      }
    );
    builder.addCase(getBuyerListThunk.pending, (state) => {
      state.listLoading = true;
      state.transaction = null;
      state.appErr = null;
    });
    builder.addCase(
      getBuyerListThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.listLoading = false;
        state.buerList = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getBuyerListThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.listLoading = false;
        state.appErr = action.payload;
        state.buerList = null;
      }
    );
    builder.addCase(getEstimateDataByTransactionThunk.pending, (state) => {
      state.loading = true;
      state.quatation = null;
      state.appErr = null;
    });
    builder.addCase(
      getEstimateDataByTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.quatation = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getEstimateDataByTransactionThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
        state.transaction = null;
      }
    );
    builder.addCase(fecthBuyerLiNotifyThunk.pending, (state) => {
      state.loading = true;
      state.buyerNotification = null;
      state.appErr = null;
    });
    builder.addCase(
      fecthBuyerLiNotifyThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.buyerNotification = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      fecthBuyerLiNotifyThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
        state.transaction = null;
      }
    );
    builder.addCase(fecthSellerLiNotifyThunk.pending, (state) => {
      state.loading = true;
      state.sellerNotification = null;
      state.appErr = null;
    });
    builder.addCase(
      fecthSellerLiNotifyThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.sellerNotification = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      fecthSellerLiNotifyThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
        state.transaction = null;
      }
    );

    builder.addCase(TransactionReadThunk.pending, (state) => {
      state.loading = true;
      state.readNotification = null;
      state.appErr = null;
    });
    builder.addCase(
      TransactionReadThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.readNotification = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      TransactionReadThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
        state.transaction = null;
      }
    );

    builder.addCase(buyerAgreeOrderThunk.pending, (state) => {
      state.loading = true;
      state.buyerAgreeFlag = null;
      state.appErr = null;
    });
    builder.addCase(
      buyerAgreeOrderThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.buyerAgreeFlag = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      buyerAgreeOrderThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
        state.buyerAgreeFlag = null;
      }
    );
    builder.addCase(contractSignedThunk.pending, (state) => {
      state.loading = true;
      state.contractSigned = null;
      state.appErr = null;
    });
    builder.addCase(
      contractSignedThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.contractSigned = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      contractSignedThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
        state.transaction = null;
      }
    );

    builder.addCase(getTaxThunk.pending, (state) => {
      state.loading = true;
      state.taxData = null;
      state.appErr = null;
    });
    builder.addCase(
      getTaxThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.taxData = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getTaxThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getUpperLimitsThunk.pending, (state) => {
      state.loading = true;
      state.upperLimit = null;
      state.appErr = null;
    });
    builder.addCase(
      getUpperLimitsThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.upperLimit = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getUpperLimitsThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(makePaymentThunk.pending, (state) => {
      state.loading = true;
      state.paymentSuccess = null;
      state.appErr = null;
    });
    builder.addCase(
      makePaymentThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.paymentSuccess = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      makePaymentThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(cancelTransactionThunk.pending, (state) => {
      state.loading = true; // Just an example, no action.payload available here
    });
    builder.addCase(
      cancelTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.orderCancel = action.payload; // Here we assign the payload to the transaction
      }
    );
    builder.addCase(cancelTransactionThunk.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload || "Failed to cancel the transaction";
    });

    builder.addCase(acceptCancelTransactionThunk.pending, (state) => {
      state.loading = true; // Just an example, no action.payload available here
    });
    builder.addCase(
      acceptCancelTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.acceptCancelRequest = action.payload; // Here we assign the payload to the transaction
      }
    );
    builder.addCase(acceptCancelTransactionThunk.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload || "Failed to cancel the transaction";
    });

    builder.addCase(getCancelTransactionThunk.pending, (state) => {
      state.loading = true; // Just an example, no action.payload available here
    });
    builder.addCase(
      getCancelTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.orderCancel = action.payload; // Here we assign the payload to the transaction
      }
    );
    builder.addCase(getCancelTransactionThunk.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload || "Failed to cancel the transaction";
    });

    builder.addCase(requestRefundTransactionThunk.pending, (state) => {
      state.loading = true; // Just an example, no action.payload available here
    });
    builder.addCase(
      requestRefundTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.requestRefund = action.payload; // Here we assign the payload to the transaction
      }
    );
    builder.addCase(requestRefundTransactionThunk.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload || "Failed to cancel the transaction";
    });

    builder.addCase(acceptRefundTransactionThunk.pending, (state) => {
      state.loading = true; // Just an example, no action.payload available here
    });
    builder.addCase(
      acceptRefundTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.acceptRefund = action.payload; // Here we assign the payload to the transaction
      }
    );
    builder.addCase(acceptRefundTransactionThunk.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload || "Failed to cancel the transaction";
    });
    builder.addCase(getTransactionStatus.pending, (state) => {
      state.statusLoading = true;
    });
    builder.addCase(
      getTransactionStatus.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.statusLoading = false;
        state.transactionStatus = action.payload;
      }
    );
    builder.addCase(getTransactionStatus.rejected, (state, action) => {
      state.statusLoading = false;
      state.appErr = action.payload || "Failed to cancel the transaction";
    });

    builder.addCase(createRefundRatingToSellerThunk.pending, (state) => {
      state.ratingLoading = true;
    });
    builder.addCase(createRefundRatingToSellerThunk.fulfilled, (state) => {
      state.ratingLoading = false;
      state.ratingToProcess_Seller = true;
    });
    builder.addCase(
      createRefundRatingToSellerThunk.rejected,
      (state, action) => {
        state.ratingLoading = false;
        state.appErr = action.payload || "Failed to cancel the transaction";
      }
    );



    builder.addCase(getaverageRatingProcessThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getaverageRatingProcessThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.getRatings_Process = action.payload;
      }
    );
    builder.addCase(getaverageRatingProcessThunk.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload || "Failed to cancel the transaction";
    });

    builder.addCase(createRefundRatingToBuyerThunk.pending, (state) => {
      state.ratingLoading = true;
    });
    builder.addCase(createRefundRatingToBuyerThunk.fulfilled, (state) => {
      state.ratingLoading = false;
      state.ratingToProcess_Buyer = true;
    });
    builder.addCase(
      createRefundRatingToBuyerThunk.rejected,
      (state, action) => {
        state.ratingLoading = false;
        state.appErr = action.payload || "Failed to cancel the transaction";
      }
    );

    builder.addCase(getaverageRatingSellerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getaverageRatingSellerThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.getRatings_Seller = action.payload;
      }
    );
    builder.addCase(getaverageRatingSellerThunk.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload || "Failed to cancel the transaction";
    });

    builder.addCase(getaverageRatingBuyerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getaverageRatingBuyerThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.getRatings_Buyer = action.payload;
      }
    );
    builder.addCase(getaverageRatingBuyerThunk.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload || "Failed to cancel the transaction";
    });
  },
});

export const {
  registerTransaction,
  setFirstTimeAfterPayment,
  removeError,
  FetchQuotationThunk,
  showPaymentModal,
  ShowReviewModalThunk,
  showCancelModalThunk,
  registerRefundTransaction,
  setLocalAmount,
  getLocalAmount,
  deleteLocalAmount,
} = transactionSlice.actions;
export const selectTransaction = (state: RootState) => state.transaction;
export default transactionSlice.reducer;
