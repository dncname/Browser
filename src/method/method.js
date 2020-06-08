// import { post } from "../http/mhttp";
// import cookie from "js-cookie";

export default {
  //獲取cookies值

  getCookie(name) {
    let strcookie = document.cookie;
    let arrcookie = strcookie.split("; ");
    for (let i = 0; i < arrcookie.length; i++) {
      let arr = arrcookie[i].split("=");
      if (arr[0] == name) return unescape(arr[1]);
    }
    return null;
  },
  //獲取客戶端
  client() {
    return this.getCookie("odrplatform") || "";
  },
  //退出h5頁面
  exit() {
    // let client = this.getCookie('odrplatform');//客户端
    if (this.client() == "android") {
      window.apps.finish();
    } else if (this.client() == "ios") {
      window.webkit.messageHandlers.iosAction.postMessage("exit");
    } else {
      // console.log('Unable come back');
    }
  },
  //返回或者退出h5頁面
  goback() {
    // let client = this.getCookie('odrplatform');//客户端
    if (this.client() == "android") {
      window.apps.goback();
    } else if (this.client() == "ios") {
      window.webkit.messageHandlers.iosAction.postMessage("goBack");
    } else {
      // console.log('Unable come back');
    }
  },
  //去登錄
  toLogin() {
    // let client = this.getCookie('odrplatform');//客户端
    if (this.client() == "android") {
      window.apps.gologin("gologin");
    } else if (this.client() == "ios") {
      window.webkit.messageHandlers.iosAction.postMessage("login");
    } else {
      // post("api/Account/login", {
      //   username: "18579133660",
      //   password: "qq111111",
      //   platform: "android",
      //   uuid: 1
      // }).then(res => {
      //   cookie.set("odrtoken", res.result.token);
      //   cookie.set("odruserId", res.result.user_id);
      // });
    }
  },
  //倒计时方法
  CountdownFunc(time) {
    if (time <= 0) return 0;
    var secondTime = parseInt(time) || 0; // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小时
    if (secondTime >= 60) {
      //如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if (minuteTime >= 60) {
        //获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        //获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    var result =
      secondTime <= 9 ? "0" + parseInt(secondTime) : "" + parseInt(secondTime);
    if (minuteTime >= 0) {
      result =
        minuteTime <= 9
          ? "0" + parseInt(minuteTime) + ":" + result
          : "" + parseInt(minuteTime) + ":" + result;
    }
    if (hourTime >= 0) {
      result = "" + parseInt(hourTime) + ":" + result;
    }
    return result;
  },
  //浮点数加
  accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  },
  //浮点数减
  accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  // 浮点数乘
  accMul(arg1, arg2) {
    var m = 0;
    var s1 = arg1.toString();
    var s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {
      e;
    }
    try {
      m += s2.split(".")[1].length;
    } catch (e) {
      e;
    }

    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
  },
  // 浮点数除
  accDiv(arg1, arg2, digit) {
    var t1 = 0,
      t2 = 0,
      r1,
      r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      e;
    }
    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      e;
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    //获取小数点后的计算值
    var result = ((r1 / r2) * Math.pow(10, t2 - t1)).toString();
    var result2 = result.split(".")[1];
    if (result2) {
      result2 = result2.substring(
        0,
        digit > result2.length ? result2.length : digit
      );
      return Number(result.split(".")[0] + "." + result2);
    }

    return Number(result);
  }
};
