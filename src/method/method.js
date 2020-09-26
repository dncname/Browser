//获取到的时间加8个小时 
export function timeConversion (time) {
  let getDate = Number(new Date(time)) + 28800000; //获取到的时间加8个小时 得到北京时间
  let currentTimeRub = new Date(getDate);
  let Y = currentTimeRub.getFullYear();
  let M = currentTimeRub.getMonth() + 1;
  let D = currentTimeRub.getDate();
  let h = Number(currentTimeRub.getHours()) < 10 ? "0" + currentTimeRub.getHours() : currentTimeRub.getHours();
  let m = Number(currentTimeRub.getMinutes()) < 10 ? "0" + currentTimeRub.getMinutes() : currentTimeRub.getMinutes();
  let s = Number(currentTimeRub.getSeconds()) < 10 ? "0" + currentTimeRub.getSeconds() : currentTimeRub.getSeconds();
  let beijingTime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
  return beijingTime;
}

