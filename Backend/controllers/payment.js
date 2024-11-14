import axios from "axios";
import path, { parse } from "path";
import fs from "fs";
import ejs from "ejs";
import puppeteer from "puppeteer";
import querystring from "querystring";
import GMO from "@motionpicture/gmo-service";
import { tokenizeCardUtils } from "../utils/encryptCard.js";
import {
  encodeChar,
  generateSecureRandomAlphanumeric,
} from "../utils/euc-jp-base64.js";
import { v4 as uuidv4 } from "uuid";
import Transaction from "../models/Transaction.js";
import Payment from "../models/Dtb_payment.js";
import { uploadChatAttachmentToS3 } from "../aws.js";
import Tax from "../models/Tax.js";

const shopID = process.env.TEST_GMO_SHOP_ID;
const shopPass = process.env.TEST_GMO_SHOP_PASS;

export const getBearerToken = async (req, res) => {
  try {
    const response = await axios.post(
      "https://stg.oauth.mul-pay.jp/token",
      "grant_type=client_credentials&scope=openapi",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Idempotency-Key": "0c8c6c14-69a0-48e4-b54b-ef5e924c26923",
          "X-MP-Version": "2023-06",
          Authorization: `Basic ${process.env.GMO_BASIC_AUTH}`,
        },
      }
    );
    res.status(200).json({ token: response.data.access_token });
  } catch (error) {
    console.error("Error obtaining Bearer token:", error);
    res.status(500).json({
      message: "Error obtaining Bearer token",
      error: error.message,
    });
  }
};

export const tokenizeCard = async (req, res) => {
  try {
    const encryptedData = tokenizeCardUtils();

    const params = {
      encryptionParameters: {
        type: "UNIQUE_PK",
        apiKey:
          "YmMxNjVlOWIwOTY0NTEyZDIyOGEzODFmY2RlNjNjNzI3ZDAyNmM4NjFlODAxMjZlYjUwZGUzNjA2OTBjZDQxNXRzaG9wMDAwNjYxNDY=",
      },
      encryptedData: encryptedData,
      createCount: "1",
    };

    console.log("Params:", params);

    const response = await axios.post(
      "https://stg.token.mul-pay.jp/payment/CreateToken.json",
      params,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return res.status(400).json({
      message: error.response ? error.response.data : error.message,
    });
  }
};

export const chargeCreditCard = async (req, res) => {
  try {
    const { bearerToken, paymentData } = req.body;

    const response = await axios.post(
      "https://stg.openapi.mul-pay.jp/credit/charge",
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
          "Idempotency-Key": "ede66c43-9b9d-4222-93ed-5f11c96e09",
          "X-MP-Version": "2023-06",
        },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error charging credit card:", error);
    return res.status(500).json({
      message: "Error charging credit card",
      error: error.message,
    });
  }
};

// In controllers/paymentController.js

export const captureTransaction = async (req, res) => {
  try {
    const { accessId, accessPass, amount, bearerResponseToken } = req.body;
    console.log(accessId, "*******????????????????");
    const captureData = {
      access_id: accessId,
      access_pass: accessPass,
      amount: amount,
    };

    const response = await axios.post(
      "https://stg.openapi.mul-pay.jp/order/capture",
      captureData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerResponseToken}`, // Use the bearer token from req.body
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error capturing transaction:", error);
    res.status(500).json({
      message: "Error capturing transaction",
      error: error.message,
    });
  }
};

// New controller for Bank Transfer
export const bankTransfer = async (req, res) => {
  try {
    // Step 1: Obtain Bearer Token
    const tokenResponse = await axios.post(
      "https://stg.oauth.mul-pay.jp/token",
      "grant_type=client_credentials&scope=openapi",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Idempotency-Key": "0c8c6c14-69a0-48e4-b54b-ef5e924c2699",
          "X-MP-Version": "2023-06",
          Authorization: `Basic ${process.env.GMO_BASIC_AUTH}`,
        },
      }
    );

    const bearerToken = tokenResponse.data.access_token;

    // Step 2: Make Bank Transfer Request
    const transferResponse = await axios.post(
      "https://stg.api.mul-pay.jp/v1/transfers",
      {
        // Replace with actual transfer details TODO
        orderId: "your-order-id",
        amount: 1000,
        currency: "JPY",
        bankAccount: {
          accountNumber: "12345678",
          accountType: "1", // 1: Savings, 2: Checking
          bankCode: "0001",
          branchCode: "001",
          accountHolderName: "John Doe",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
          "X-MP-Version": "2023-06",
        },
      }
    );

    return res.status(200).json(transferResponse.data);
  } catch (error) {
    console.error("Error making bank transfer:", error);
    return res.status(500).json({
      message: "Error making bank transfer",
      error: error.message,
    });
  }
};

export const transactionEntry = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    // Log the endpoint URL for debugging

    const creditService = new GMO.service.Credit(
      { endpoint: "https://pt01.mul-pay.jp/payment/" },
      { pool: {} }
    );

    const entryTranResult = await creditService.entryTran({
      shopId: process.env.TEST_GMO_SHOP_ID,
      shopPass: process.env.TEST_GMO_SHOP_PASS,
      orderId: orderId,
      jobCd: GMO.utils.util.JobCd.Auth,
      amount: amount,
      tdFlag: GMO.utils.util.TdFlag.Version2,
      tds2Type: GMO.utils.util.Tds2Type.Error,
    });

    return res.json(entryTranResult);
  } catch (error) {
    console.error("Transaction Entry Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

// Execute Payment Controller
export const ExecutePayment = async (req, res) => {
  try {
    const { accessId, accessPass, cardNumber, expire, securityCode } = req.body;
    const creditService = new GMO.service.Credit(
      { endpoint: process.env.GMO_ENDPOINT },
      { pool: {} }
    );

    const execTranResult = await creditService.execTran3ds({
      accessId: accessId,
      accessPass: accessPass,
      orderId: req.body.orderId,
      method: GMO.utils.util.Method.Lump,
      cardNo: cardNumber,
      expire: expire,
      securityCode: securityCode,
      retUrl: "http://localhost:8000/payment/handle3dsCallbac",
      callbackType: GMO.utils.util.CallbackType.Get,
    });

    return res.json(execTranResult);
  } catch (error) {
    console.error("Execute Payment Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

// Post-3D Secure Payment Execution Controller
export const postSecure = async (req, res) => {
  try {
    const { accessId, accessPass } = req.body;
    const creditService = new GMO.service.Credit(
      { endpoint: process.env.GMO_ENDPOINT },
      { pool: {} }
    );

    const secureTran2Result = await creditService.secureTran2({
      accessId: accessId,
      accessPass: accessPass,
    });

    return res.json(secureTran2Result);
  } catch (error) {
    console.error("Post Secure Payment Execution Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

// Search Trade Controller
export const searchTrade = async (req, res) => {
  try {
    const { orderId } = req.body;
    const creditService = new GMO.service.Credit(
      { endpoint: process.env.GMO_ENDPOINT },
      { pool: {} }
    );

    const searchTradeResult = await creditService.searchTrade({
      shopId: process.env.TEST_GMO_SHOP_ID,
      shopPass: process.env.TEST_GMO_SHOP_PASS,
      orderId: orderId,
    });

    return res.json(searchTradeResult);
  } catch (error) {
    console.error("Search Trade Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

// Alter Transaction Controller
export const alterTransaction = async (req, res) => {
  try {
    const { orderId, jobCd, amount } = req.body;
    const creditService = new GMO.service.Credit(
      { endpoint: process.env.GMO_ENDPOINT },
      { pool: {} }
    );

    const searchTradeResult = await creditService.searchTrade({
      shopId: process.env.TEST_GMO_SHOP_ID,
      shopPass: process.env.TEST_GMO_SHOP_PASS,
      orderId: orderId,
    });

    const alterTranResult = await creditService.alterTran({
      shopId: process.env.TEST_GMO_SHOP_ID,
      shopPass: process.env.TEST_GMO_SHOP_PASS,
      accessId: searchTradeResult.accessId,
      accessPass: searchTradeResult.accessPass,
      jobCd: jobCd,
      amount: amount,
    });

    return res.json(alterTranResult);
  } catch (error) {
    console.error("Alter Transaction Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

// Function to generate half-width alphanumeric string of 32 characters
function generateHalfWidthAlphanumeric(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const assignVirtualAccount = async (req, res) => {
  try {
    const {
      ShopID,
      ShopPass,
      BankCode,
      BranchCode,
      AccountType,
      AccountNumber,
    } = req.body;

    // Generate the ReserveID
    const ReserveID = generateHalfWidthAlphanumeric(32);

    // Prepare the request payload
    const postData = querystring.stringify({
      ShopID: process.env.TEST_GMO_SHOP_ID,
      ShopPass: process.env.TEST_GMO_SHOP_PASS,
      ReserveID,
      BankCode: "9998",
      BranchCode: "999",
      AccountType: "1",
      AccountNumber: "1119999",
    });

    // Make the POST request to the API endpoint
    const response = await axios.post(
      `${process.env.GMO_API_URL2}/payment/AssignVirtualaccount.idPass?${postData}`,
      null,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded;charset=windows-31j",
        },
      }
    );

    // Respond with the data received from the API
    return res.json(response.data);
  } catch (error) {
    console.error("AssignVirtualaccount Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

export const execTranVirtualAccount = async (req, res) => {
  try {
    // Get the transaction data from the previous middleware
    const { AccessID, AccessPass, OrderID } = req.transactionData;

    const { tradeDays, tradeReason, tradeClientName, tradeClientMailaddress } =
      req.body;

    const postData = querystring.stringify({
      ShopID: process.env.TEST_GMO_SHOP_ID,
      ShopPass: process.env.TEST_GMO_SHOP_PASS,
      AccessID: AccessID,
      AccessPass: AccessPass,
      OrderID: OrderID,
      TradeDays: "6",
      TradeReason: tradeReason || "",
      TradeClientName: tradeClientName || "",
      TradeClientMailaddress: tradeClientMailaddress || "",
    });

    const response = await axios.post(
      `${process.env.GMO_API_URL2}/payment/ExecTranVirtualaccount.idPass?${postData}`,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded;charset=windows-31j",
        },
      }
    );

    // Respond with the data received from GMO
    return res.json(response.data);
  } catch (error) {
    console.error("Execute Settlement Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

// Step 3: Transaction Status Reference
export const searchTradeMulti = async (req, res) => {
  try {
    const { accessId, accessPass, cardNumber, expire, securityCode } = req.body;
    const PostExePayment = querystring.stringify({
      AccessID: accessId,
      AccessPass: accessPass,
      Method: "1",
      CardNo: cardNumber,
      Expire: expire,
      OrderID: "ORDER00000022",
      SecurityCode: securityCode,
      HttpAccept: "text/html",
      HttpUserAgent: req.headers["user-agent"],
    });
    const response = await axios.post(
      `${process.env.GMO_API_URL2}/payment/BankAccountEntry.idPass?${encodedData}`,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=windows-31j",
        },
      }
    );

    console.log("BankAccountEntry Response Data:", response.data);

    // Respond with the data received from the API
    return res.json(response.data);
  } catch (error) {
    console.error("BankAccountEntry Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

export const queryApplicationResult = async (req, res) => {
  try {
    const { SiteID, SitePass, TranID } = req.body;

    // Prepare the request payload
    const postData = querystring.stringify({ SiteID, SitePass, TranID });

    // Make the POST request to the API endpoint
    const response = await axios.post(
      `${process.env.GMO_API_URL}/payment/BankAccountTranResult.idPass?${postData}`,
      null,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=windows-31j",
        },
      }
    );

    console.log("BankAccountTranResult Response Data:", response.data);

    // Respond with the data received from the API
    return res.json(response.data);
  } catch (error) {
    console.error("BankAccountTranResult Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

export const retrieveAccountInformation = async (req, res) => {
  try {
    const { SiteID, SitePass, MemberID } = req.body;

    // Prepare the request payload
    const postData = querystring.stringify({ SiteID, SitePass, MemberID });

    // Make the POST request to the API endpoint
    const response = await axios.post(
      `${process.env.GMO_API_URL}/payment/SearchMemberBankAccount.idPass?${postData}`,
      null,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=windows-31j",
        },
      }
    );

    console.log("SearchMemberBankAccount Response Data:", response.data);

    // Respond with the data received from the API
    return res.json(response.data);
  } catch (error) {
    console.error("SearchMemberBankAccount Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

export const handle3dsCallback = async (req, res) => {
  try {
    const { param: tds2Param } = req.body;
    const { MD: accessID } = req.query;
    const { accessPass, transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId)
      .populate("quotation")
      .populate({
        path: "seller_id",
        select: "name01 name02 zip01 zip02 pref addr01 addr02 business_id",
      })
      .populate("customer_id")
      .populate("process_id");
    const tax = await Tax.find({});
    if (tax.length === 0) return res.status(200).json({ tax: { rate: 10 } });
    const singleTax = tax ? tax[0].rate : null;

    const itemsArray = transaction?.quotation?.map((item) => item?.item_name);

    let totalAmountExcludingTax = 0;
    let taxAmount = 0;
    let totalAmountIncludingTax = 0;

    const formattedQuotation = transaction?.quotation?.map((item) => {
      const {
        note = "",
        totalamountExcludingTax,
        taxAmount: itemTaxAmount,
        totalAmountIncludingTax: itemTotalAmountIncludingTax,
        deadline,
      } = item;

      totalAmountExcludingTax = totalamountExcludingTax;
      taxAmount = itemTaxAmount;
      totalAmountIncludingTax = itemTotalAmountIncludingTax;

      return {
        drawing_number: item.drawing_number,
        item_name: item.item_name,
        deadline: new Date(item.deadline),
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        price: item.price,
        note,
        totalamountExcludingTax,
        taxAmount,
        totalAmountIncludingTax,
        deadline,
      };
    });

    // Generate PDF for the payment invoice
    const templatePath = path.resolve("./invoicesTemplates/advancePayment.ejs");
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");
    const renderedHtml = ejs.render(htmlTemplate, {
      process: transaction.process_id,
      buyerInfo: transaction.customer_id,
      quotation: formattedQuotation,
      transaction,
      singleTax,
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setContent(renderedHtml);
    const pdfBuffer = await page.pdf({ format: "Letter" });
    await browser.close();

    const uniqueId = uuidv4();
    const fileName = `advance_payment_invoice_${uniqueId}.pdf`;
    const s3FilePath = await uploadChatAttachmentToS3(
      process.env.AWS_BUCKET_NAME,
      fileName,
      pdfBuffer
    );
    console.log("Payment Invoice uploaded to S3", s3FilePath);
    transaction.advance_payment_invoice = s3FilePath;

    //Generate PDF for the Order form
    const orderFormTemplatePath = path.resolve(
      "./invoicesTemplates/orderForm.ejs"
    );
    const orderFormHtmlTemplate = fs.readFileSync(
      orderFormTemplatePath,
      "utf8"
    );
    console.log("sellerInfo", transaction.seller_id);
    const orderFormRenderedHtml = ejs.render(orderFormHtmlTemplate, {
      sellerInfo: transaction?.seller_id,
      buyerInfo: transaction?.customer_id,
      process: transaction.process_id,
      quotation: formattedQuotation,
      transaction,
      singleTax,
    });

    const orderFormBrowser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const orderFormPage = await orderFormBrowser.newPage();
    await orderFormPage.setCacheEnabled(false);
    await orderFormPage.setContent(orderFormRenderedHtml);
    const orderFormPdfBuffer = await orderFormPage.pdf({ format: "Letter" });
    await orderFormBrowser.close();

    const orderFormFileName = `order_form_${uniqueId}.pdf`;
    const orderFormS3FilePath = await uploadChatAttachmentToS3(
      process.env.AWS_BUCKET_NAME,
      orderFormFileName,
      orderFormPdfBuffer
    );

    console.log("Order Form PDF uploaded to S3:", orderFormS3FilePath);
    transaction.order_form = orderFormS3FilePath;
    transaction.paymentDeposit = true;
    transaction.transaction_status = 3;

    await transaction.save();

    console.log("itemsArray", itemsArray);

    console.log("Preparing data for Tds2Auth API call");
    const authData = {
      accessID,
      accessPass,
      tds2Param,
    };

    console.log("Calling Tds2Auth API with data:", authData);
    const { data: authResponse } = await axios.post(
      `https://pt01.mul-pay.jp/payment/Tds2Auth.json`,
      authData
    );
    console.log("Tds2Auth Response Data:", authResponse);

    console.log("Calling Tds2Result API with data:", { accessID, accessPass });
    const { data: tdsResult } = await axios.post(
      `https://pt01.mul-pay.jp/payment/Tds2Result.json`,
      {
        accessID,
        accessPass,
      }
    );
    console.log("Tds2Result Response Data:", tdsResult);

    console.log("Post Authentication Charge Execution with data :", {
      accessID,
      accessPass,
    });
    const { data: chargeResponse } = await axios.post(
      `https://pt01.mul-pay.jp/payment/SecureTran2.json`,
      {
        accessID,
        accessPass,
      }
    );
    console.log("Charge Response Data:", chargeResponse);

    res.render("gmoTemplate", {
      chargeResponse,
      transactionId,
      itemsArray,
      frontEndUrl: process.env.FRONT_END_URL,
      customerName: `${transaction?.customer_id?.name01}`,
      sellerName: `${transaction?.seller_id?.name01}`,
    });
  } catch (error) {
    console.error(
      "3DS 2.0 Callback Error:",
      error?.message,
      error.response?.data
    );
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

export const initiatePayment = async (req, res) => {
  try {
    const { accessId, accessPass, token, amount, orderId, shopId, shopPass } =
      req.body;

    const execTranData = querystring.stringify({
      ShopID: shopId,
      ShopPass: shopPass,
      OrderID: orderId,
      AccessID: accessId,
      AccessPass: accessPass,
      JobCd: "AUTH",
      Amount: amount,
      ItemCode: "0000990",
      Tax: "100",
      Method: "1",
      TokenType: "1",
      Token: token,
      RetUrl: "http://localhost:8000/payment/handle3dsCallback", // Ensure this URL is publicly accessible
      Tds2Type: "2",
      AppMode: "0", // Ensure this is correctly set
      Tds2ChallengeIndType: "1",
      CallbackType: "1", // Ensure this is correctly set
      Tds2ChAccChange: "20220101",
      Tds2ChAccDate: "20220101",
      Tds2ChAccPwChange: "20220101",
      Tds2NbPurchaseAccount: "3",
      Tds2PaymentAccAge: "20220101",
      Tds2ProvisionAttemptsDay: "1",
      Tds2ShipAddressUsage: "20220101",
      Tds2ShipNameInd: "01",
      Tds2SuspiciousAccActivity: "01",
      Tds2TxnActivityDay: "1",
      Tds2TxnActivityYear: "5",
      Tds2ThreeDSReqAuthTimestamp: "202307011230",
      Tds2ThreeDSReqAuthMethod: "02",
      Tds2AddrMatch: "Y",
      Tds2BillAddrCity: "Shibuya Ward",
      Tds2BillAddrCountry: "392",
      Tds2BillAddrLine1: "1-2-3 Shibuya",
      Tds2BillAddrLine2: "Building 4",
      Tds2BillAddrLine3: "",
      Tds2BillAddrPostCode: "1500002",
      Tds2BillAddrState: "13",
      Tds2Email: "customer@example.com",
      Tds2HomePhoneCC: "81",
      Tds2HomePhoneSubscriber: "312345678",
      Tds2MobilePhoneCC: "81",
      Tds2MobilePhoneSubscriber: "9012345678",
      Tds2WorkPhoneCC: "81",
      Tds2WorkPhoneSubscriber: "312345678",
      Tds2ShipAddrCity: "Shibuya Ward",
      Tds2ShipAddrCountry: "392",
      Tds2ShipAddrLine1: "1-2-3 Shibuya",
      Tds2ShipAddrLine2: "Building 4",
      Tds2ShipAddrLine3: "",
      Tds2ShipAddrPostCode: "1500002",
      Tds2ShipAddrState: "13",
      Tds2DeliveryEmailAddress: "",
      Tds2DeliveryTimeframe: "01",
      Tds2GiftCardAmount: "",
      Tds2GiftCardCount: "",
      Tds2GiftCardCurr: "",
      Tds2PreOrderDate: "",
      Tds2PreOrderPurchaseInd: "01",
      Tds2ReorderItemsInd: "01",
      Tds2ShipInd: "01",
    });

    const execTranResponse = await axios.post(
      "https://pt01.mul-pay.jp/payment/ExecTran.idPass",
      execTranData,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=windows-31j",
        },
      }
    );

    console.log("ExecTran Response Data:", execTranResponse.data);

    const redirectUrl = execTranResponse.data.RedirectUrl;

    if (redirectUrl) {
      res.json({ redirectUrl });
    } else {
      res.status(400).json({ message: "Failed to obtain RedirectUrl" });
    }
  } catch (error) {
    console.error("ExecTran Error:", error);
    res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

export const bankTransferPayment = async (req, res) => {
  try {
    const { transactionId, amount, promisedPaymentDate } = req.body;
    const transaction = await Transaction.findById(transactionId);
    transaction.promisedPaymentDate = promisedPaymentDate;
    await transaction.save();
    await Payment.create({
      paymentType: "Bank Transfer",
      amount: parseFloat(amount),
      transactionId,
    });
    return res
      .status(200)
      .json({ success: true, message: "Bank Transfer Initiated" });
  } catch (error) {
    console.error("Bank Transfer Error:", error);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
    }
    return res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

export const newPaymentCheck = async (req, res) => {
  try {
    const {
      cardNumber,
      cardholderName,
      expiryMonth,
      expiryYear,
      securityCode,
      transactionId,
      amount,
    } = req.body;

    const parseIndianNumber = (numberString) => {
      if (!numberString || typeof numberString !== "string") {
        return numberString;
      }
      const parsedNumber = parseFloat(numberString.replace(/,/g, ""));
      return isNaN(parsedNumber) ? 0 : parsedNumber;
    };

    const encodedTenantName = encodeChar("CareerSurvival01");
    const encryptedData = tokenizeCardUtils(
      cardNumber,
      cardholderName,
      expiryMonth,
      expiryYear,
      securityCode
    );
    const orderID = generateSecureRandomAlphanumeric(20);
    console.log("encryptedCard", encryptedData);
    console.log("encodedTenantName", encodedTenantName);
    console.log("orderID", orderID);

    // Step 1: CreateToken
    const params = {
      encryptionParameters: {
        type: "UNIQUE_PK",
        apiKey: process.env.GMO_API_KEY,
      },
      encryptedData,
      createCount: "1",
    };

    const { data: token } = await axios.post(
      "https://stg.token.mul-pay.jp/payment/CreateToken.json",
      params,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Token Response Data:", token);

    // Step 2: EntryTran
    const entryTranData = {
      shopID,
      shopPass,
      orderID,
      jobCd: "AUTH",
      amount: parseIndianNumber(amount),
      tax: "0",
      tdFlag: "2",
      tdTenantName: encodedTenantName,
      tds2Type: "3",
      tdRequired: "1",
    };

    console.log("EntryTran Data:", entryTranData);

    const entryTranResponse = await axios.post(
      "https://pt01.mul-pay.jp/payment/EntryTran.json",
      entryTranData,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
    console.log(entryTranResponse.data, "............<");
    const entryResponseData = entryTranResponse.data;
    const { accessID, accessPass } = entryResponseData;

    // Step 3: ExecTran
    const execTranData = {
      shopID,
      shopPass,
      orderID,
      accessID: accessID,
      accessPass: accessPass,
      jobCd: "AUTH",
      amount: amount,
      itemCode: "0000990",
      tax: "10",
      method: "3",
      tokenType: "1",
      token: token?.tokenList?.[0],
      retUrl: `${process.env.BACK_END_URL}/payment/handle3dsCallback/${accessPass}/${transactionId}`,
      appMode: "0",
      tds2ChallengeIndType: "1",
      callbackType: "2",
    };

    const execTranResponse = await axios.post(
      "https://pt01.mul-pay.jp/payment/ExecTran.json",
      execTranData,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );

    const responseData = execTranResponse.data;
    console.log("Response Data : ", responseData);

     await Payment.create({
      paymentType: "Credit",
      cardNumber,
      securityCode,
      cardholderName,
      transactionId,
      amount: parseIndianNumber(amount),
    });
    
    return res.status(200).json({ success: responseData });
  } catch (error) {
    console.log("ExecTran Error:", error);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
    }
    return res
      .status(500)
      .json({ error: error.message, details: error.response?.data });
  }
};

export const PaymentRedirect = async (req, res) => {
  const { url } = req.query;
  res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="0; URL=${url}" />
      </head>
      <body>
        Redirecting...
      </body>
    </html>
  `);
};
