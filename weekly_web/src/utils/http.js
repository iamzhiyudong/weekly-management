import axios from "axios";

let instance = axios.create({
  baseURL: "http://127.0.0.1:3006",
  timeout: 30000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.authorization = `token ${window.sessionStorage.getItem("token")}`;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

function get(url, params, opt) {
  return instance.get(url, {
    params,
    ...opt
  });
}

function post(url, data, opt) {
  return instance.post(url, data, {
    ...opt
  });
}

function del(url, params, opt) {
  return instance.delete(url, {
    params,
    ...opt
  });
}

function put(url, data, opt) {
  return instance.put(url, data, {
    ...opt
  });
}

export default {
  get,
  post,
  del,
  put
};
