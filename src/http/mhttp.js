import axios from "axios";
// import qs from "qs";
import router from "../router";
let instance = axios.create({
  headers: {
    // baseURL: api,
    "content-type": "application/x-www-form-urlencoded",
    // "content-type": "application/json"
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // if (api) {
    //   config.url = api + config.url;
    // }
    // if (token) {
    //   // 判断是否存在token，如果存在的话，则每个http header都加上token
    //   // config.headers.Authorization = headerToken; //请求头加上token
    // }
    if (config.method == "post") {
      // 判断参数类型是否为formData，如果不是的话，则参数用qs
      if (Object.prototype.toString.call(config.data) != "[object FormData]") {
        config.data = {
          ...config.data
        };
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {

    return response;
  },
  //接口错误状态处理，也就是说无响应时的处理
  (error) => {
    if (error.response) {
      if (error.response.status == "401") {
        router.replace({
          path: "mine",
          query: {
            redirect: router.currentRoute.fullPath,
          },
        });
      }
    }
    return Promise.reject(error); // 返回接口返回的错误信息
  }
);
const apiURL = "http://119.28.128.52:8888"
export function get(url, params, loadingFlag = true) {
  url = apiURL + url;
  let loading
  if (loadingFlag) {
      loading = window.vm && window.vm.$createToast({
          time: 0,
          type: 'loading',
          mask: true
      }).show()
  }
  return new Promise((resolve, reject) => {
      axios.get(url, {
          params: params
      }).then(res => {
          loading && loading.hide()
          resolve(res.data);
      }).catch(err => {
          reject(err.data);
      })
  });
}
export default instance;
