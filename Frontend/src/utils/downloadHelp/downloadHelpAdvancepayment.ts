import { S3Client } from "@aws-sdk/client-s3";
console.log(import.meta.env.VITE_AWS_BUCKET_REGION, ".......");
const DownloadPDFAdvancePayment = async (transaction) => {
  const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_BUCKET_REGION as string,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VVITE_AWS_SECRET_ACCESS_KEY,
    },
  });
  if (
    transaction &&
    transaction?.transaction &&
    transaction?.transaction?.advance_payment_invoice
  ) {
    try {
      const response = await fetch(
        transaction?.transaction?.advance_payment_invoice
      );
      const blob = await response.blob();
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      // Create a link element
      const a = document.createElement("a");
      a.href = url;
      a.download = "advance_payment.pdf";
      // Append the link to the body and trigger the download
      document.body.appendChild(a);
      a.click();
      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  }
  console.log(s3Client);
};
export default DownloadPDFAdvancePayment;
