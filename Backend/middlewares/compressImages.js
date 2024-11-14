import sharp from "sharp"; // Import sharp for image compression
import { Buffer } from "buffer";

// Middleware function for image compression
export const compressImages = async (req, res, next) => {
  try {
    // Function to compress base64 image
    const compressBase64Image = async (base64Image) => {
      const imgBuffer = Buffer.from(base64Image.split(",")[1], "base64"); // Convert base64 string to buffer
      const compressedImgBuffer = await sharp(imgBuffer)
        .jpeg({ quality: 60 }) // Convert to JPEG format with 70% quality
        .toBuffer();
      return `data:image/jpeg;base64,${compressedImgBuffer.toString("base64")}`; // Return compressed base64 image
    };

    // Check if img1 exists in request body
    if (req.body && req.body.img1) {
      console.log("running!");
      req.body.img1 = await compressBase64Image(req.body.img1);
    }

    // Repeat the process for img2
    if (req.body && req.body.img2) {
      req.body.img2 = await compressBase64Image(req.body.img2);
    }

    // Repeat the process for img3
    if (req.body && req.body.img3) {
      req.body.img3 = await compressBase64Image(req.body.img3);
    }

    next();
  } catch (error) {
    // Handle any errors
    console.error("Error compressing images:", error);
    res.status(500).json({ error: "Error compressing images" });
  }
};
