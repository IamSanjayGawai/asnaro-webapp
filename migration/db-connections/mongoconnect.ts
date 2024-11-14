import mongoose from "mongoose";

const db_connect_mongo = (url: string) => {
  mongoose
    .connect(url, {
      compressors: "zlib",
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err.message));
};

export default db_connect_mongo;
