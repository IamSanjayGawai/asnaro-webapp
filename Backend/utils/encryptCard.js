import crypto from "crypto";
import fs from "fs";

export const tokenizeCardUtils = (
  cardNumber,
  cardholderName,
  expiryMonth,
  expiryYear,
  securityCode
) => {
  const cardInfo = {
    card: {
      cardNumber,
      cardholderName,
      expiryMonth,
      expiryYear,
      securityCode,
    },
  };

  // Convert the card information to JSON format
  const cardInfoJson = JSON.stringify(cardInfo);
  console.log("Card Info JSON:", cardInfoJson);

  // Load the public key from the .pub file
  const publicKey = fs.readFileSync("mptoken_pubkey.pub", "utf8");

  // Encrypt the card information JSON string using RSA with PKCS1 padding
  const buffer = Buffer.from(cardInfoJson, "utf8");
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );

  // Encode the encrypted data in Base64
  const encryptedBase64 = encrypted.toString("base64");

  return encryptedBase64;
};
