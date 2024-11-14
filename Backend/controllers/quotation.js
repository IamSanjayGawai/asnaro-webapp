import { StatusCodes } from "http-status-codes";
import Quotation from "../models/Quotation.js";
import Message from "../models/Message.js";
import Process from "../models/Dtb_process.js";
import fs from "fs"; // for file system operations
import htmlPdf from "html-pdf"; // for converting HTML to PDF
import path from "path";
import ejs from "ejs";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import puppeteer from "puppeteer";
import { uploadChatAttachmentToS3 } from "../aws.js";
import Transaction from "../models/Transaction.js";
import Quote from "../models/Quote.js";
import Tax from "../models/Tax.js";
import DefaultUsage from "../models/DefaultUsage.js";

export const createEstimateProcess = async (req, res) => {
  try {
    const { quotation, tax } = req.body;
    const usageFees = await DefaultUsage.find({});
    const defaultUsageFee = usageFees.find((usage) => usage.default).rate;

    // Validate input data
    if (!Array.isArray(quotation)) {
      throw new Error("Quotation data is not an array");
    }

    // Initialize variables for total amounts
    let totalAmountExcludingTax = 0;
    let taxAmount = 0;
    let totalAmountIncludingTax = 0;

    // Format each item in the quotation array
    const formattedQuotation = quotation.map((item) => {
      // Extract metadata
      const {
        note,
        totalamountExcludingTax,
        taxAmount: itemTaxAmount,
        totalAmountIncludingTax: itemTotalAmountIncludingTax,
        createdAt,
      } = item.metadata;

      // Calculate total amounts
      totalAmountExcludingTax = totalamountExcludingTax;
      taxAmount = itemTaxAmount;
      totalAmountIncludingTax = itemTotalAmountIncludingTax;

      return {
        drawing_number: item.drawing_number,
        deadline: new Date(item.deadline),
        item_name: item.item_name,
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        price: item.price,
        note,
        totalamountExcludingTax,
        taxAmount,
        totalAmountIncludingTax,
        createdAt,
      };
    });

    // Find the Transaction record
    const transaction = await Transaction.findById(req.params.transId)
      .populate({
        path: "seller_id",
        select: "name01 name02 zip01 zip02 pref addr01 addr02 business_id",
      })
      .populate("customer_id")
      .populate("quotation");

    // Read HTML template
    const templatePath = path.resolve("./invoicesTemplates/estimate.ejs");
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");
    const renderedHtml = ejs.render(htmlTemplate, {
      quotation: formattedQuotation,
      sellerInfo: transaction.seller_id,
      buyerInfo: transaction.customer_id,
      process: transaction.process_id,
      transaction,
      tax,
    });

    // Generate PDF using puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ["--disable-extensions"],
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setContent(renderedHtml);
    const pdfBuffer = await page.pdf({ format: "Letter" });
    await browser.close();

    // Save formatted quotation data to the database
    const newQuotationProcess = await Quote.create(formattedQuotation);

    // Update the Transaction record with the formatted quotation data
    const estimateData = await Transaction.findByIdAndUpdate(
      req.params.transId,
      {
        quotation: newQuotationProcess,
      },
      { new: true }
    );

    // Upload PDF to AWS S3
    const uniqueId = uuidv4(); // Generate a unique identifier
    const fileName = `estimate_${uniqueId}.pdf`;
    const s3FilePath = await uploadChatAttachmentToS3(
      process.env.AWS_BUCKET_NAME,
      fileName,
      pdfBuffer
    );

    transaction.estimation_pdf = s3FilePath;
    transaction.adminTax = tax;
    transaction.adminSystemFee = defaultUsageFee ? defaultUsageFee : 10;
    await transaction.save();

    // Set headers to force download
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "application/pdf");

    // Send PDF buffer as the response
    res.status(StatusCodes.CREATED).send(pdfBuffer);
  } catch (error) {
    console.error("Error creating estimate process:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const createAdvancePayment = async (req, res) => {
  try {
    const { quotation } = req.body;

    // Validate input data
    if (!Array.isArray(quotation)) {
      throw new Error("Quotation data is not an array");
    }

    // Initialize variables for total amounts
    let totalAmountExcludingTax = 0;
    let taxAmount = 0;
    let totalAmountIncludingTax = 0;

    // Format each item in the quotation array
    const formattedQuotation = quotation.map((item) => {
      // Extract metadata
      const {
        note,
        totalamountExcludingTax,
        taxAmount: itemTaxAmount,
        totalAmountIncludingTax: itemTotalAmountIncludingTax,
      } = item.metadata;

      // Calculate total amounts
      totalAmountExcludingTax = totalamountExcludingTax;
      taxAmount = itemTaxAmount;
      totalAmountIncludingTax = itemTotalAmountIncludingTax;

      return {
        drawing_number: item.drawing_number,
        deadline: new Date(item.deadline),
        item_name: item.item_name,
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        price: item.price,
        note,
        totalamountExcludingTax,
        taxAmount,
        totalAmountIncludingTax,
      };
    });
    // Read HTML template
    const templatePath = path.resolve("./invoicesTemplates/advacnePayment.ejs");
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");
    const renderedHtml = ejs.render(htmlTemplate, {
      quotation: formattedQuotation,
    });
    // Generate PDF using puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ["--disable-extensions"],
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(renderedHtml);
    const pdfBuffer = await page.pdf({ format: "Letter" });
    await browser.close();
    // Write PDF to a file
    const uniqueId = uuidv4(); // Generate a unique identifier
    const outputPath = path.resolve(`./estimate_${uniqueId}.pdf`);
    fs.writeFileSync(outputPath, pdfBuffer);
    //     // Save formatted quotation data to the database
    //     // Save formatted quotation data to the database
    // Save formatted quotation data to the database
    const newQuotationProcess = await Quote.create(formattedQuotation);

    // Update the Transaction record with the formatted quotation data
    await Transaction.findByIdAndUpdate(req.params.transId, {
      quotation: newQuotationProcess,
    });

    // Upload PDF to AWS S3
    const fileName = `estimate_${uniqueId}.pdf`;
    const s3FilePath = await uploadChatAttachmentToS3(
      process.env.AWS_BUCKET_NAME,
      fileName,
      pdfBuffer
    );

    // Update the Transaction record with the S3 URL
    const transactions = await Transaction.findById(req.params.transId);
    transactions.estimation_pdf = s3FilePath;
    await transactions.save();

    // Send response with success message and PDF path
    return res.status(StatusCodes.CREATED).json({
      quotation: newQuotationProcess,
    });
  } catch (error) {
    console.error("Error creating estimate process:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const getMostRecentQuotation = async (req, res) => {
  try {
    const userId = req.user._id;

    const mostRecentQuotation = await Quotation.findOne({
      buyer_id: userId,
    }).sort({ createdAt: -1 });

    if (!mostRecentQuotation) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No recent quotation found for the user" });
    }

    return res.status(StatusCodes.OK).json({ mostRecentQuotation });
  } catch (error) {
    console.error("Error fetching most recent quotation:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const getPrivateConversation = async (req, res) => {
  try {
    const { senderId, buyerId } = req.params;

    // Check if senderId and buyerId are valid MongoDB ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(buyerId)
    ) {
      return res.status(400).json({ message: "Invalid senderId or buyerId" });
    }

    // Query messages where the sender_id is either senderId or buyerId
    const messages = await Message.find({
      $or: [
        { sender_id: senderId, contractor_id: buyerId },
        { sender_id: buyerId, contractor_id: senderId },
      ],
    }).sort({ create_date: 1 }); // Sort by creation date ascending

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching private conversation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getQuotationsBySellerAndTransactionId = async (req, res) => {
  try {
    const { sellerId, transactionId } = req.params;

    // Query the database for quotations
    const quotations = await Quotation.find({
      seller_id: sellerId,
      transaction_id: transactionId,
    }).limit(1);

    // Check if quotations were found
    if (!quotations || quotations.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Quotations not found" });
    }

    // Send quotations in the response
    return res.status(StatusCodes.OK).json({ data: quotations });
  } catch (error) {
    console.error("Error fetching quotations:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const createRefund = async (req, res) => {
  try {
    const { transId } = req.params;
    const { tableData, taxDetails } = req.body;

    const usageFees = await DefaultUsage.find({});
    const defaultUsageFee = usageFees.find((usage) => usage.default).rate;

    // Fetch the transaction
    const transaction = await Transaction.findById(transId).populate(
      "customer_id"
    );
    if (!transaction) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Transaction not found" });
    }

    // Update the transaction record with the refund data
    transaction.refund = {
      tableData,
      taxDetails: {
        ...taxDetails,
        adminRefundSystemFee: defaultUsageFee ? defaultUsageFee : 10,
      },
    };
    await transaction.save();

    // Format the data for the PDF
    const formattedRefundData = {
      tableData,
      taxDetails,
      currentDate: new Date().toLocaleDateString("ja-JP"), // Add today's date
      transaction,
    };

    console.log(formattedRefundData, "....................");

    // Read the HTML template for the PDF
    const templatePath = path.resolve("./invoicesTemplates/refund-trans.ejs"); // Ensure you have this template
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");
    const renderedHtml = ejs.render(htmlTemplate, {
      refundData: formattedRefundData,
      buyerInfo: transaction.customer_id,
      singleTax: taxDetails.adminRefundTax,
    });

    // Generate the PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ["--disable-extensions"],
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(renderedHtml);
    const pdfBuffer = await page.pdf({ format: "Letter" });
    await browser.close();

    // Write the PDF to a file
    const uniqueId = uuidv4(); // Generate a unique identifier
    const outputPath = path.resolve(`./refund_${uniqueId}.pdf`);
    fs.writeFileSync(outputPath, pdfBuffer);

    // Upload the PDF to AWS S3
    const fileName = `refund_${uniqueId}.pdf`;
    const s3FilePath = await uploadChatAttachmentToS3(
      process.env.AWS_BUCKET_NAME,
      fileName,
      pdfBuffer
    );

    // Update the transaction record with the S3 URL
    const res1 = (transaction.refund_invoice = s3FilePath);
    const finalresult = await transaction.save();
    console.log(res1, "res1....");
    console.log(finalresult, "final result");
    // Send response with success message and refund data
    return res.status(StatusCodes.CREATED).json({
      tableData,
      taxDetails,
      refund_invoice: s3FilePath,
    });
  } catch (error) {
    console.error("Error creating refund:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
