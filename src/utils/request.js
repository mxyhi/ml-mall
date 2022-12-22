import axios from 'axios';
import { showNotify } from 'vant';
import { getToken } from './auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const request = axios.create({
  /**
   * 服务基本网址
   */
  baseURL: 'http://124.220.178.79:8199',
  /**
   * 超时
   */
  timeout: 15000,
});

//添加请求拦截器
// request.interceptors.request.use(
//   config => {
//     config.headers.token = getToken();
//     return config;
//   },
//   error => {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   }
// );

// 添加响应拦截器
request.interceptors.response.use(
  res => res.data,
  error => Promise.reject(error)
);

// // 添加响应拦截器
// request.interceptors.response.use(
//   response => {
//     // 对响应数据做点什么
//     let data = response.data;
//     if (data.resultCode !== 1) {
//       if (data.resultCode === 0) {
//         // 代表未登录
//         // 如果当前路径就是/login 又去使用push 就会报重复跳转的错误
//         if (router.currentRoute.value.path != '/login') {
//           router.push('/login');
//         }
//       }
//       // 证明后台给的不是我们要的数据
//       showNotify({ type: 'danger', message: data.message || '系统繁忙' });
//       return Promise.reject(data);
//     }
//     return response.data;
//   },
//   error => {
//     // 对响应错误做点什么
//     showNotify({ type: 'danger', message: '系统繁忙' });
//     return Promise.reject(error);
//   }
// );

export default request;
