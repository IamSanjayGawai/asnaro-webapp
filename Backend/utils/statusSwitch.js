export const statusSwitchToText = (status) => {
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