import http from "http";
import { Server } from "socket.io";
import "dotenv/config";
import express from "express";
import {
  sendMessage,
  sendMessageQuote,
  sendMessageAgreeQuote,
  sendMessageReQuote,
  sendMessageContractSign,
  sendMessagePaymentCompleted,
  sendMessageDeliveryCompleted,
  sendMessageDeliverySentBack,
  sendMessageDeliveryAccepted,
  sendMessageCancellationRequest,
  sendMessageCancellationAgree,
  sendMessageRequestRefund,
  sendMessageRefundTermsAgree,
  sendMessageRefundCancellation,
} from "./controllers/transaction.js";
import News from "./models/News.js";
import Transaction from "./models/Transaction.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("chatMessage", (message) => {
    console.log("Message from client: ", message);
  });

  socket.on("join", (room) => {
    console.log("User joining room: ", room);
    socket.join(room);
  });

  socket.on("news", async (data, callback) => {
    try {
      await new Promise(async (resolve, reject) => {
        try {
          console.log("news received", data);
          socket.broadcast.emit("newNews", data);
          resolve();
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
      if (callback) callback();
    } catch (error_1) {
      console.error(error_1);
      if (callback) callback(error_1);
    }
  });

  socket.on("newsToggle", async (data, callback) => {
    try {
      await new Promise(async (resolve, reject) => {
        try {
          const { newsId } = data;
          const foundNews = await News.findById(newsId);
          if (!foundNews) {
            throw new Error("News not found");
          }
          if (foundNews.delivery_flag) {
            socket.broadcast.emit("newNewsToggle", { flag: true, newsId });
          } else if (!foundNews.delivery_flag) {
            socket.broadcast.emit("newNewsToggle", { flag: false, newsId });
          }
          resolve();
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
      if (callback) callback();
    } catch (error_1) {
      console.error(error_1);
      if (callback) callback(error_1);
    }
  });

  socket.on("sendMessage", (data, callback) => {
    sendMessage(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("sendQuote", (data, callback) => {
    sendMessageQuote(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("sendReQuote", (data, callback) => {
    sendMessageReQuote(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("agreeQuote", (data, callback) => {
    sendMessageAgreeQuote(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("contractSign", (data, callback) => {
    sendMessageContractSign(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("adminPaymentChange", async (data, callback) => {
    try {
      await new Promise(async (resolve, reject) => {
        try {
          const { id } = data;
          const foundTransaction =
            await Transaction.findById(id).select("customer_id");
          if (!foundTransaction) {
            throw new Error("Transaction not found");
          }
          socket.to(data.id).emit("adminPaymentStatusChangeRefresh", {
            buyerId: foundTransaction.customer_id
              ? foundTransaction.customer_id
              : "",
          });
          resolve();
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
      if (callback) callback();
    } catch (error_1) {
      console.error(error_1);
      if (callback) callback(error_1);
    }
  });
  socket.on("paymentCompleted", (data, callback) => {
    sendMessagePaymentCompleted(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("deliveryCompleted", (data, callback) => {
    sendMessageDeliveryCompleted(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("deliverySentBack", (data, callback) => {
    sendMessageDeliverySentBack(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("adminDeliveryStatusChange", (data) => {
    console.log("adminDeliveryStatusChange", data);
    socket.to(data.id).emit("adminDeliveryStatusChangeRefresh", data);
  });
  socket.on("deliveryAccepted", (data, callback) => {
    sendMessageDeliveryAccepted(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("cancelRequest", (data, callback) => {
    sendMessageCancellationRequest(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("cancelRefundRequest", (data, callback) => {
    sendMessageRefundCancellation(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("cancelAgree", (data, callback) => {
    sendMessageCancellationAgree(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("requestRefund", (data, callback) => {
    sendMessageRequestRefund(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("refundTermsAgree", (data, callback) => {
    sendMessageRefundTermsAgree(socket, data)
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        if (callback) callback(error);
      });
  });
  socket.on("buyerRating", async (data, callback) => {
    try {
      await new Promise(async (resolve, reject) => {
        try {
          const { id } = data;
          const foundTransaction =
            await Transaction.findById(id).select("seller_id");
          if (!foundTransaction) {
            throw new Error("Transaction not found");
          }
          if (foundTransaction.seller_id) {
            console.log(
              "foundTransaction.seller_id",
              foundTransaction.seller_id.toString()
            );
            socket
              .to(foundTransaction.seller_id.toString())
              .emit("newRatingNotification", {
                id: foundTransaction.seller_id.toString(),
              });
          }
          resolve();
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
      if (callback) callback();
    } catch (error_1) {
      console.error(error_1);
      if (callback) callback(error_1);
    }
  });
  socket.on("sellerRating", async (data, callback) => {
    try {
      await new Promise(async (resolve, reject) => {
        try {
          const { id } = data;
          const foundTransaction =
            await Transaction.findById(id).select("customer_id");
          if (!foundTransaction) {
            throw new Error("Transaction not found");
          }
          if (foundTransaction.customer_id) {
            socket
              .to(foundTransaction.customer_id.toString())
              .emit("newRatingNotification", {
                id: foundTransaction.customer_id.toString(),
              });
          }
          resolve();
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
      if (callback) callback();
    } catch (error_1) {
      console.error(error_1);
      if (callback) callback(error_1);
    }
  });
  socket.on("adminTransactionCancel", (data) => {
    console.log("adminTransactionCancel", data);
    socket.to(data.id).emit("adminTransactionCancelRefresh", data);
  });

  socket.emit("welcome", "Hello from the server!");

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

export { app, io, server };
