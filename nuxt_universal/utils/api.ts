import axios from 'axios';

const service = axios.create({
  baseURL: process.env.API_URL
  // timeout: 5000
});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    if (error.response) {
      // 認証エラー
      if (error.response.status === 401) {
        if (self.$nuxt.context.from.name === 'login') {
          return null;
        }
        // location.href = '/login';
        self.$nuxt.context.error({
          statusCode: 401,
          message: '認証エラー'
        });
      }
      if (error.response.status === 403) {
        return null;
      }

      // if (error.response.status !== 404) {
      //   self.$nuxt.context.$sentry.captureException(error);
      // }

      // TODO:暫定
      if (error.response.status === 500) {
        return null;
      }
      if (error.message === 'Network Error') {
        return null;
      }
    }
    console.log('予期せぬエラー発生', error);

    return null;
    // 処理を継続させるので
    // return Promise.reject(error);
  }
);

export default service;
