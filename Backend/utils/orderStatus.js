const Status = {
  CHECKING: 0,
  UNDER_DISCUSSION: 1,
  AWAITING_ORDER: 2,
  AWAITING_DELIVERY: 3,
  ACCEPTANCE: 4,
  REFUND: 5,
  TRANSACTION_COMPLETED: 6,
  TRANSACTION_CANCELLED: 7,
  SETTLEMENT_COMPLETED: 8,
  ADMIN_CANCELLED: 9,
};

const orderStatus = {
  type: Number,
  default: Status.CHECKING,
};

export default orderStatus;
