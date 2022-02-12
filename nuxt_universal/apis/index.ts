import request from '@/utils/api';

/**
 * リクエスト実行
 *
 * @template T
 * @param {string} url リクエストURL
 * @param {string} method method
 * @param {T} paramaters リクエストパラメータ
 * @return {*} レスポンス
 */
export const requestApi = <T extends {}>(
  url: string,
  paramaters: T,
  method: string,
  options?: {}
): any => {
  options = options || {};
  switch (method) {
    case 'post':
      return postData(url, paramaters, options);
    case 'get':
      return getData(url, paramaters, options);
    case 'put':
      return putData(url, paramaters, options);
    case 'delete':
      return deleteData(url, paramaters, options);
  }
};

/**
 * GETリクエスト実行
 *
 * @template T
 * @param {string} url リクエストURL
 * @param {T} paramaters リクエストパラメータ
 * @param {Object} options headers等その他追加設定
 * @return {*} レスポンス
 */
export const getData = <T extends {}>(
  url: string,
  paramaters: T,
  options?: {}
): any => {
  return request({
    url,
    method: 'get',
    params: paramaters,
    ...options
  });
};

/**
 * POSTリクエスト実行
 *
 * @template T
 * @param {string} url リクエストURL
 * @param {T} paramaters リクエストパラメータ
 * @return {*} レスポンス
 */
export const postData = <T extends {}>(
  url: string,
  paramaters: T,
  options: {}
): any => {
  return request({
    url,
    method: 'post',
    data: paramaters,
    ...options
  });
};

/**
 * DELETEリクエスト実行
 *
 * @template T
 * @param {string} url リクエストURL
 * @param {T} paramaters リクエストパラメータ
 * @return {*} レスポンス
 */
export const deleteData = <T extends {}>(
  url: string,
  paramaters: T,
  options: {}
): any => {
  return request({
    url,
    method: 'delete',
    data: paramaters,
    ...options
  });
};

/**
 * PUTリクエスト実行
 *
 * @template T
 * @param {string} url リクエストURL
 * @param {T} paramaters リクエストパラメータ
 * @return {*} レスポンス
 */
export const putData = <T extends {}>(
  url: string,
  paramaters: T,
  options: {}
): any => {
  return request({
    url,
    method: 'put',
    data: paramaters,
    ...options
  });
};
