export const contactEmailTemplate = (
  name,
  company,
  email,
  subject,
  phone,
  message,
  formattedDate,
  file,
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
    .replace(/DATE/g, formattedDate)
    .replace(/CUSTOMER_NAME/g, name)
    .replace(/CUSTOMER_COMPANY/g, company)
    .replace(/FILE_LINK/g, file)
    .replace(/CUSTOMER_EMAIL/g, email)
    .replace(/CONTACT_PHONE/g, phone)
    .replace(/CONTACT_SUBJECT/g, subject)
    .replace(/CONTACT_MESSAGE/g, message);
  return replacedEmailHtml;
};
