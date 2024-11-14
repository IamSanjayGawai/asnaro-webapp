import mongoose from "mongoose";

// Connect to MongoDB
const db_connect = (url) => {
  mongoose
    .connect(url, {
      compressors: "zlib",
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err.message));
};

export default db_connect;
