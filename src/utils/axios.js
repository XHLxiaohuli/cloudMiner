// "use strict";

import axios from "axios";
import qs from "qs";
// 将接口在这里引入
import api from "./api";
// axios.defaults.withCredentials = true;

axios.create({
  withCredentials: true
})
// 请求时的拦截,在请求时,显示 ElementUI 的加载组件
axios.interceptors.request.use(
  config => {
    // loading
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应时的拦截,请求结束后，关闭加载组件
axios.interceptors.response.use(
  response => {
    // loading.close();
    return response;
  },
  error => {
    return Promise.resolve(error.response);
  }
);

function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400)
  ) {
    return response;
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }

  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: "后端错误或请求地址参数错误！"
  };
}

// function checkCode(res) {
//   // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
//   console.log(res);
//   if (res.status === -404) {
//     alert(res.msg);
//   }
//   return res;
// }

export default {
  post(url, data,headerVule) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        // baseURL: "http://192.168.1.169:8098",
        baseURL:"/api",
        url: api[url],
        data: data,
        timeout: 10000,
        headers:headerVule,
        // {
        //   "X-Requested-With": "XMLHttpRequest",
        //   "Content-Type": "application/json; charset=UTF-8"
        // },
      })
        .then(response => {
          // 检查状态
          /* console.log(response); */
          const res = checkStatus(response);
          if (res.status === -404) {
            reject(res);
          } else {
            // 直接将数据返回出去就是了
            resolve(res.data);
          }

          /**
           * 上面的判断只是请求失败或者网络错误的 。 
           * 如果后端返回的数据格式规范的话
           * 在这里可以再加一个判断 ，判断是否参数传错了。 或者接口错误。 
           */
          /**
           * 假如后端返回的格式
           * {
           *  code ： 0 ， // 0 是成功 
           *  data：{},
           *  message: ""
           * }
           */
          // const data = res.data;
          // if (data.code == 0) {
          //   // 接口请求正确 数据成功返回的
          //   resolve(data);
          // } else {
          //   // 接口请求失败的。 比如 参数传错了。 或者没有这条信息之类的。 请求能成功到达后端的
          //   reject(data);
          // }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  
  get(url, params) {
    return new Promise((resolve,reject)=>{
      axios({
        method: "get",
        // baseURL: "http://192.168.1.169:8098",
        baseURL:"/api",
        url: api[url],
        params:params, // get 请求时带的参数
        timeout: 10000,
        headers: {
           "X-Requested-With": "XMLHttpRequest",
           "Content-Type": "application/json; charset=UTF-8"
          //  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(response => {
        // 检查状态
        const res = checkStatus(response);
        if (res.status === -404) {
          reject(res);
        } else {
          // 直接将数据返回出去就是了
          resolve(res.data);
        }
      }).catch(err => {
        console.log(err, "err")
        reject(err);
      });
    })
  }
};
