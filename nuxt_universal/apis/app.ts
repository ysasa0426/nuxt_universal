import request from '@/utils/api';

// システム定数データ取得
export const getAppConfig = (): any =>
  request({
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'get'
  });

// ユーザーデータ取得
export const getUsers = (): any =>
  request({
    url: 'localhost:3000/usres.json',
    method: 'get'
  });
