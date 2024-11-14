export const messageEmail = (
  sender_name,
  process_name,
  message,
  transaction_link,
  emailDetail,
  emailFooter
) => {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Message from ASNARO</title>
      <style>
        /* Add your styles here */
      </style>
    </head>
    <body>
      ${emailDetail}
      ${emailFooter}
    </body>
    </html>
    `;

  const replacedEmailHtml = emailHtml
    .replace(/SENDER_NAME/g, sender_name)
    .replace(/PROCESS_NAME/g, process_name)
    .replace(/MESSAGE/g, message)
    .replace(/TRANSACTION_LINK/g, transaction_link);
  return replacedEmailHtml;
};
