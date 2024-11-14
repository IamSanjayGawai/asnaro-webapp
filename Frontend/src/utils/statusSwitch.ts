export const statusSwitchToText = (status: number) => {
  switch (status) {
    case 1:
      return "商談中";
    case 2:
      return "受発注待ち";
    case 3:
      return "納品待ち";
    case 4:
      return "検収中";
    case 5:
      return "差戻し";
    case 6:
      return "取引完了";
    case 7:
      return "キャンセル";
    case 8:
      return "決済完了";
    case 9:
      return "キャンセル";
    default:
      return "no status found";
  }
};

export const statusSwitchToNumber = (status: string) => {
  switch (status) {
    case "商談中":
      return 1;
    case "受発注待ち":
      return 2;
    case "納品待ち":
      return 3;
    case "検収中":
      return 4;
    case "差戻し":
      return 5;
    case "取引完了":
      return 6;
    case "キャンセル":
      return 9;
    case "決済完了":
      return 8;
    default:
      return 0;
  }
};

export const allowedStatusSwitchForAdmin = (status: string) => {
  switch (status) {
    case "受発注待ち":
      return ["受発注待ち", "納品待ち", "キャンセル"];
    case "検収中":
      return ["検収中", "納品待ち", "キャンセル"];
    case "キャンセル":
      return ["キャンセル"];
    default:
      return [status, "キャンセル"];
  }
};
