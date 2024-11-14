const Status = {
  NOT_DELIVERED: 0,
  DELIVERED_BY_SELLER: 1,
  DELIVERY_SENT_BACK: 2,
  DELIVERY_RECEIVED: 3,
};

const deliveryStatus = {
  type: Number,
  default: Status.NOT_DELIVERED,
};

export default deliveryStatus;
