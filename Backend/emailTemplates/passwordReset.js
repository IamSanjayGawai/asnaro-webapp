export const passwordResetTemplateHtml = (
  customer_name,
  customer_charge,
  password_link,
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
    .replace(/PASSWORD_LINK/g, password_link);
  return replacedEmailHtml;
};
