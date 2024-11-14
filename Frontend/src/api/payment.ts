import { ThreeDSErrorType, ThreeDSResponseType } from "@/types/types";
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const newPayment = async (paymentData: {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  securityCode: string;
  paymentType: string;
  transactionId: string;
  amount: string;
}): Promise<ThreeDSResponseType | ThreeDSErrorType> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payment/newpaymentcheck`,
      paymentData
    );
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const bankTransferPayment = async (
  transactionId: string,
  amount: number,
  promisedPaymentDate: Date
) => {
  try {
    const response = await axios.post(`${BASE_URL}/payment/bank-transfer`, {
      transactionId,
      amount,
      promisedPaymentDate,
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
