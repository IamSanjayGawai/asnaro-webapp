export const registrationEmailTemplateHtml = (
  customer_name,
  customer_charge,
  verification_link,
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
    .replace(/CUSTOMER_NAME/g, customer_name)
    .replace(/CUSTOMER_CHARGE/g, customer_charge)
    .replace(/VERIFICATION_LINK/g, verification_link);
  return replacedEmailHtml;
};
