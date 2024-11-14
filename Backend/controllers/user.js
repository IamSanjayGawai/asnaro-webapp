import User from "../models/User.js";
import Notification from "../models/Notifications.js";
import Location from "../models/City_master.js";
import MailTemplate from "../models/Mail_Template.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  sendEmail,
  uploadContactAttachmentToS3,
  deleteImageFromS3,
  uploadBase64ImageToS3,
} from "../aws.js";
//import registrationEmailTemplate from "../emailTemplates/registrationEmail.js";
import { validateUser } from "../validation/userValidation.js";
import UserRepository from "../repositories/userRepository.js";
import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcrypt";
import { passwordResetTemplateHtml } from "../emailTemplates/passwordReset.js";
import Enquiry from "../models/Enquiry.js";
import { contactEmailTemplate } from "../emailTemplates/contactEmail.js";
import Dtb_process from "../models/Dtb_process.js";
import { registrationEmailTemplateHtml } from "../emailTemplates/registrationEmail.js";
import Transaction from "../models/Transaction.js";
import { cleanSubject } from "../utils/Html.js";

const bucketName = process.env.AWS_BUCKET_NAME;

const registrationEmailTemplate = (
  name,
  charge01,
  verificationLink,
  contactEmail,
  { header, detail, footer }
) => {
  // Replace placeholders in the parts
  let emailHeader = header
    .replace("[name]", name)
    .replace("[charge01]", charge01);
  let emailDetail = detail
    .replace("[verificationLink]", verificationLink)
    .replace("[contactEmail]", contactEmail);

  // Concatenate the parts with enhanced HTML structure and styling
  let emailContent = `
    <div class="header">${emailHeader}</div>
    <div class="content">${emailDetail}</div>
    <div class="footer">${footer}</div>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ASNARO Membership Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      padding: 20px;

      flex-direction: column;
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      padding: 10px;
      text-align: center;
    }
    .content {
      padding: 20px;
      text-align: left;
      line-height: 1.6;
      dispaly: block;
    }
    .footer {
      background-color: #f4f4f4;
      color: #888888;
      font-size: 12px;
      text-align: center;
      padding: 10px;
    }
    a {
      color: #007bff;
    }
  </style>
</head>
<body>
<div class="container">
  ${emailContent}
</div>
</body>
</html>
  `;
};

export const registerNewCustomer = async (req, res) => {
  try {
    const { email, profile_img, img1, img2, img3, ...otherUserData } = req.body;

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `User already exists with email: ${email}`,
      });
    }

    const imgUrls = await Promise.all([
      profile_img &&
        uploadBase64ImageToS3(
          profile_img,
          bucketName,
          `profile_img-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img1 &&
        uploadBase64ImageToS3(
          img1,
          bucketName,
          `img1-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img2 &&
        uploadBase64ImageToS3(
          img2,
          bucketName,
          `img2-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img3 &&
        uploadBase64ImageToS3(
          img3,
          bucketName,
          `img3-${crypto.randomBytes(8).toString("hex")}.png`
        ),
    ]);

    console.log(imgUrls, "imgUrls");

    const newUser = await UserRepository.create({
      ...otherUserData,
      email,
      profile_img: imgUrls[0] || "",
      img1: imgUrls[1] || "",
      img2: imgUrls[2] || "",
      img3: imgUrls[3] || "",
      usage_id: 1,
      partner_flg: false,
    });

    // Token generation for email verification link
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const verificationLink = `${process.env.FRONT_END_URL}/verify-email?token=${token}`;

    const registrationEmailTemplate = await MailTemplate.findOne({
      template: "registration",
    });

    // Correctly pass the template parts as an object
    const emailHtml = registrationEmailTemplateHtml(
      newUser.name01,
      newUser.charge_name01,
      verificationLink,
      registrationEmailTemplate?.detail,
      registrationEmailTemplate?.footer
    );

    // Adapt the SES email sending parameters
    const emailParams = {
      Destination: { ToAddresses: [email] },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailHtml,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: cleanSubject(registrationEmailTemplate?.subject),
        },
      },
      Source: process.env.AWS_SES_VERIFIED_EMAIL,
    };

    // Sending the email
    await sendEmail(emailParams);

    // Success response
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const registerNewCustomerAdmin = async (req, res) => {
  try {
    const {
      email,
      profile_img,
      img1,
      img2,
      img3,
      email_verification,
      ...otherUserData
    } = req.body;

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `User already exists with email: ${email}`,
      });
    }

    const imgUrls = await Promise.all([
      profile_img &&
        uploadBase64ImageToS3(
          profile_img,
          bucketName,
          `profile_img-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img1 &&
        uploadBase64ImageToS3(
          img1,
          bucketName,
          `img1-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img2 &&
        uploadBase64ImageToS3(
          img2,
          bucketName,
          `img2-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img3 &&
        uploadBase64ImageToS3(
          img3,
          bucketName,
          `img3-${crypto.randomBytes(8).toString("hex")}.png`
        ),
    ]);

    console.log(imgUrls, "imgUrls");

    const newUser = new User({
      ...otherUserData,
      email,
      profile_img: imgUrls[0] || "",
      img1: imgUrls[1] || "",
      img2: imgUrls[2] || "",
      img3: imgUrls[3] || "",
      usage_id: 1,
      partner_flg: false,
    });

    if (email_verification === "0") {
      newUser.isVerified = true;
      await newUser.save();
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User created successfully",
      });
    }

    await newUser.save();

    // Token generation for email verification link
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const verificationLink = `${process.env.FRONT_END_URL}/verify-email?token=${token}`;

    const registrationEmailTemplate = await MailTemplate.findOne({
      template: "registration",
    });

    // Correctly pass the template parts as an object
    const emailHtml = registrationEmailTemplateHtml(
      newUser.name01,
      newUser.charge_name01,
      verificationLink,
      registrationEmailTemplate?.detail,
      registrationEmailTemplate?.footer
    );

    // Adapt the SES email sending parameters
    const emailParams = {
      Destination: { ToAddresses: [email] },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailHtml,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: cleanSubject(registrationEmailTemplate?.subject),
        },
      },
      Source: process.env.AWS_SES_VERIFIED_EMAIL,
    };

    // Sending the email
    await sendEmail(emailParams);

    // Success response
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginCustomer = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    // Check if the account is verified
    if (!user.isVerified) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log(isMatch, "matched!");
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Send the token in a HTTP-only cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User logged in successfully",
      token,
      newUser: {
        id: user._id,
        isVerified: user.isVerified,
        termsAccepted: user.termsAccepted,
        name: user.name01,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.user?._id;
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User found successfully",
      user: foundUser,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const editUser = async (req, res) => {
  try {
    // const { id } = req.params;
    const {
      profile_img,
      img1,
      img2,
      img3,
      no_profile_pic,
      no_img1,
      no_img2,
      no_img3,
      ...otherUserData
    } = req.body;

    const imgUrls = await Promise.all([
      profile_img &&
        uploadBase64ImageToS3(
          profile_img,
          bucketName,
          `profile_img-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img1 &&
        uploadBase64ImageToS3(
          img1,
          bucketName,
          `img1-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img2 &&
        uploadBase64ImageToS3(
          img2,
          bucketName,
          `img2-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img3 &&
        uploadBase64ImageToS3(
          img3,
          bucketName,
          `img3-${crypto.randomBytes(8).toString("hex")}.png`
        ),
    ]);

    console.log(imgUrls, "imgUrls");

    // Find the user first to get the current image URLs
    // const foundUser = await User.findById(id);

    const foundUser = await User.findByIdAndUpdate(
      req.user?._id,
      {
        ...otherUserData,
      },
      {
        new: true,
      }
    );

    if (!foundUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User not found",
      });
    }

    // if (profile_img) {
    //   foundUser.profile_img = imgUrls[0];
    // }
    // if (img1) {
    //   foundUser.img1 = imgUrls[1];
    // }
    // if (img2) {
    //   foundUser.img2 = imgUrls[2];
    // }
    // if (img3) {
    //   foundUser.img3 = imgUrls[3];
    // }

    // Handle profile_img
    if (profile_img) {
      if (foundUser?.profile_img) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.profile_img);
      }
      console.log("profile image reached");
      foundUser.profile_img = imgUrls[0];
    } else if (no_profile_pic === "true") {
      if (foundUser?.profile_img) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.profile_img);
      }
      console.log("profile image reached 2");
      foundUser.profile_img = null;
    }

    // Handle img1
    if (img1) {
      if (foundUser?.img1) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img1);
      }
      console.log(" image1 reached");

      foundUser.img1 = imgUrls[1];
    } else if (no_img1 === "true") {
      if (foundUser?.img1) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img1);
      }
      console.log(" image1 null reached");

      foundUser.img1 = null;
    }

    // Handle img2
    if (img2) {
      if (foundUser?.img2) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img2);
      }
      foundUser.img2 = imgUrls[2];
    } else if (no_img2 === "true") {
      if (foundUser?.img2) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img2);
      }
      foundUser.img2 = null;
    }

    // Handle img3
    if (img3) {
      if (foundUser.img3) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img3);
      }
      foundUser.img3 = imgUrls[3];
    } else if (no_img3 === "true") {
      if (foundUser.img3) {
        // Delete old image from S3 if it exists
        await deleteImageFromS3(foundUser.img3);
      }
      foundUser.img3 = null;
    }

    // Update other user data
    Object.assign(foundUser, otherUserData);

    await foundUser.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User updated successfully",
      user: foundUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.query;
    console.log("*******reacged!");
    if (!token) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: "false",
        message: "No token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: "false",
        message: "No user found",
      });
    }
    user.isVerified = true;
    let response = await user.save();

    return res.status(StatusCodes.OK).json({
      success: "true",
      message: "User verified successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: "false",
      message: error,
    });
  }
};

// export const requestPasswordReset = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: "false",
//         message: "No email provided",
//       });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: "false",
//         message: "No user found",
//       });
//     }
//     const resetToken = "8b279e8e50aee5148aba6c3f77e8a1f88bb27bf8";

//     user.passwordResetToken = resetToken;

//     await user.save();
//     const resetPasswordLink = `${process.env.FRONT_END_URL}/reset-confirmation?token=${resetToken}`;
//     let emailHtml = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <title>パスワード再設定方法のご案内 </title>
//           <style>
//             /* Add your styles here */
//           </style>
//         </head>
//         <body>
//           <p>[CUSTOMER_NAME] [CUSTOMER_CHARGE] 様,</p>
//           <p>製造業プラットフォームASNAROでございます。</p>
//           <p>パスワードの再設定のご依頼を受け付けました。</p>
//           <p>下記URLへアクセスし、パスワードの再設定をお願いいたします。</p>
//           <p><a href="[URL]">[URL]</a></p>
//           <p>上記URLへアクセスしていただき、パスワードの再設定が完了いたしましたら、改めてご確認メールをお送りいたします。</p>
//           <div style="">
//               <p>┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓<br>
//               ※本メールは、Asnaroよりパスワード再設定を希望された方にお送りしております。<br>
//               もしお心当たりが無い場合は、その旨 info_asnaro@asnaro.co.jpまでご連絡いただければ幸いです。<br>
//               ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛<br>
//               ※本メールは自動配信メールです。<br>
//               等幅フォント(MSゴシック12ポイント、Osaka-等幅など)で最適にご覧になれます。</p>
//           </div>
//       </body>
//       </html>
//       `;
//     emailHtml = emailHtml
//       .replace("[CUSTOMER_NAME]", user.name01)
//       .replace("[CUSTOMER_CHARGE]", "Your Customer Charge Here")
//       .replace(/\[URL\]/g, resetPasswordLink)
//       .replace("[CONTACT_MAIL]", "info_asnaro@asnaro.co.jp");

//     const emailParams = {
//       Destination: { ToAddresses: [email] },
//       Message: {
//         Body: {
//           Html: {
//             Charset: "UTF-8",
//             Data: emailHtml,
//           },
//         },
//         Subject: { Charset: "UTF-8", Data: "Email Verification" },
//       },
//       Source: process.env.AWS_SES_VERIFIED_EMAIL,
//     };
//     await sendEmail(emailParams);
//     return res.status(StatusCodes.OK).json({
//       success: "true",
//       message: "Password reset link sent successfully",
//     });
//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       success: "false",
//       message: error.message,
//     });
//   }
// };

export const passwordReset = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    console.log(resetToken, "****************");
    if (!resetToken) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "No token provided",
      });
    }

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    console.log(hashedResetToken, "*******xxxxxx*********");
    const user = await User.findOne({
      passwordResetToken: hashedResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    // Update the user document and hash the new password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Save the updated user document (this will trigger the 'pre' hook)
    await user.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    console.log(error, "eeeerrror");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
export const termsAccepted = async (req, res) => {
  try {
    const userId = req.user?._id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: "false",
        message: "No user found",
      });
    }
    user.termsAccepted = true;
    await user.save();
    return res.status(StatusCodes.OK).json({
      success: "true",
      message: "User terms accepted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: "false",
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  // try {
  //   const userId = req.user?._id;

  //   const deletedUser = await User.findOneAndDelete({ _id: userId });
  //   console.log(deletedUser, "deletedUser");
  //   const deletedProcesses = await Dtb_process.find({ user: deletedUser._id });

  //   console.log(deletedProcesses, "deletedProcesses");
  //   if (!deletedUser) {
  //     return res.status(StatusCodes.BAD_REQUEST).json({
  //       success: false,
  //       message: "No user found",
  //     });
  //   }

  try {
    const userId = req.user?._id;

    // Find and delete the user
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    // If no user found, return error response
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "No user found with the provided ID",
      });
    }
    const deletedProcesses = await Dtb_process.find({ user: deletedUser._id });
    console.log(deletedProcesses, "deletedProcesses");

    for (const process of deletedProcesses) {
      await deleteImagesFromawsS3(process);
    }

    let result = await Dtb_process.deleteMany({ user: userId });
    console.log(result, "res");
    return res.json({
      success: true,
      message:
        "User, associated processes, and their images deleted successfully",
      deletedUser,
      deletedProcesses,
    });
  } catch (error) {
    console.log(error, "error");
  }
};

// Function to delete images associated with a process from S3
const deleteImagesFromawsS3 = async (process) => {
  try {
    // Extract image paths from the process object
    const imagePaths = [process.img1, process.img2, process.img3].filter(
      Boolean
    );

    // Iterate through each image path and delete it from S3
    console.log(imagePaths, "imagePaths");
    for (const imagePath of imagePaths) {
      await deleteImageFromS3(imagePath);
    }
  } catch (error) {
    console.error(
      `Error deleting images from S3 for process ${process._id}: ${error}`
    );
    throw error; // Rethrow the error for handling at a higher level (if needed)
  }
};

export const insertBulkData = async (req, res) => {
  try {
    const data = req.body; // Assuming the JSON array is sent in the request body

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "No data provided or data is not in array format.",
      });
    }

    await Location.insertMany(data);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Data inserted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const FindLocation = async (req, res) => {
  try {
    let { zipcode: newZip } = req.body;
    if (newZip.startsWith("0")) {
      newZip = newZip.slice(1);
    }
    console.log(newZip);
    const data = await Location.findOne({
      zipcode: newZip,
    });
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "No email provided",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "No user found",
      });
    }

    // Generate a reset token
    const resetToken = user.generateResetPasswordToken();
    await user.save();

    const mailTemplateHtml = await MailTemplate.findOne({
      template: "resetPassword",
    });
    // Generate reset password link
    const resetPasswordLink = `${process.env.FRONT_END_URL}/reset-confirmation?token=${resetToken}`;

    let emailHtml = passwordResetTemplateHtml(
      user?.name01,
      user?.charge_name01,
      resetPasswordLink,
      mailTemplateHtml?.detail,
      mailTemplateHtml?.footer
    );

    // Email sending parameters
    const emailParams = {
      Destination: { ToAddresses: [email] },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailHtml,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: cleanSubject(mailTemplateHtml?.subject),
        },
      },
      Source: process.env.AWS_SES_VERIFIED_EMAIL, // Sender's email address
    };

    // Send the email
    await sendEmail(emailParams);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const applyForPartner = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    console.log("Applied for partner status:", user.name01);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "No user found",
      });
    }
    if (user.partner_flg) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "User is already a partner",
      });
    }
    // user.partner_flg = true;
    user.partner_request_time = new Date();
    await user.save();
    res.status(200).json({
      user,
      message: "Application for partner status submitted successfully",
    });
  } catch (error) {
    console.log("Error applying for partner status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutCustomer = (req, res) => {
  try {
    // If using token-based authentication (JWT), you may need to clear the client-side token
    res.clearCookie("access_token");

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user._id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the notification
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Check if the notification belongs to the user
    if (notification.user_id.toString() !== userId.toString()) {
      console.log("Unauthorized Access");
      return res
        .status(403)
        .json({ error: "Unauthorized access to notification" });
    }

    // Update the read status
    if (!notification.read) {
      notification.read = true;
      notification.labels = ["重要"];
      await notification.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Notification updated successfully" });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const ContactAdmin = async (req, res) => {
  try {
    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;
      await uploadContactAttachmentToS3(
        originalname,
        process.env.AWS_BUCKET_NAME,
        buffer,
        mimetype
      );
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("ja", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const { name, company, email, phone, subject, message } = req.body;
    // console.log("file", req.file);
    const file = req.file ? req.file.location : "No file attached";
    const contactTemplate = await MailTemplate.findOne({
      template: "contact",
    });
    const adminEmail = process.env.AWS_SES_VERIFIED_EMAIL;
    const emailHtml = contactEmailTemplate(
      name,
      company,
      email,
      subject,
      phone,
      message,
      formattedDate,
      file,
      contactTemplate?.detail,
      contactTemplate?.footer
    );
    const emailParams = {
      Destination: { ToAddresses: [adminEmail] },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailHtml,
          },
        },
        Subject: { Charset: "UTF-8", Data: subject },
      },
      Source: process.env.AWS_SES_VERIFIED_EMAIL,
    };
    await sendEmail(emailParams);
    const enquiry = await Enquiry.create({ ...req.body });
    return res.status(200).json({
      message: "Contact form submitted successfully",
      enquiry: { ...enquiry, file_path: file },
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//bulk insert and update
export const changeAllUserPartnerStatuses = async (req, res) => {
  try {
    const users = await User.find();
    await Promise.all(
      users.map((user) => {
        if (user.partner_flg === true) {
          user.partner_status = "パートナー会員";
          return user.save();
        } else {
          user.partner_status = "一般会員";
          return user.save();
        }
      })
    );
    return res.status(200).json({
      message: "All user partner statuses changed successfully",
    });
  } catch (error) {
    console.error("Error changing all user partner statuses:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsageHistory = async (req, res) => {
  try {
    const customerId = req.user._id;
    const transactions = await Transaction.find(
      { customer_id: customerId },
      "process_id"
    );
    const transactionCount = transactions.length;
    const processIds = [
      ...new Set(
        transactions.map((transaction) => transaction.process_id.toString())
      ),
    ];
    const processes = await Dtb_process.find(
      { _id: { $in: processIds } },
      "name maker_name totalRatingSum totalReviews img1 img2 img3"
    );
    res.status(200).json({
      transactionCount,
      processes,
    });
  } catch (error) {
    console.error("Error fetching usage history:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
