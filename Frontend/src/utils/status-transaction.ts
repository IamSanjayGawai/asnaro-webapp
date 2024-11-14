// status.js
export const Status = {
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

export const orderStatusDescriptions = {
  [Status.CHECKING]: "CHECKING",
  [Status.UNDER_DISCUSSION]: "商談中",
  [Status.AWAITING_ORDER]: " 受発注待ち ",
  [Status.AWAITING_DELIVERY]: "納品待ち ",
  [Status.ACCEPTANCE]: "検収中 ",
  [Status.REFUND]: "差戻し",
  [Status.TRANSACTION_COMPLETED]: "取引完了",
  [Status.TRANSACTION_CANCELLED]: "キャンセル",
  [Status.ADMIN_CANCELLED]: "キャンセル",
  [Status.SETTLEMENT_COMPLETED]: "決済完了",
};

export default Status;
