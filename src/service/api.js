import axios from 'axios';
import qs from 'qs';
import NProgress from 'nprogress';

axios.interceptors.request.use(
  config => {
    NProgress.start();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response,
  error => Promise.resolve(error.response)
);

function checkStatus(response) {
  NProgress.done();
  if (response.status === 200 || response.status === 304) {
    return response;
  }
  return {
    data: {
      code: -404,
      message: response.statusText,
      data: response.statusText
    }
  };
}

function checkCode(res) {
  if (res.data.data.data.code !== 200) {
    alert(res.data.data.message);
  }
  return res.data.data.data;
}

export default {
  post(url, data, data2) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: data2
    })
      .then(checkStatus)
      .then(checkCode);
  },
  get(url, params, data2) {
    return axios({
      method: 'get',
      url,
      params,
      timeout: 30000,
      headers: data2
    })
      .then(checkStatus)
      .then(checkCode);
  }
};
