import Vue from 'vue';

/**
 * APIレスポンスのぺージング情報
 *
 * @export
 * @interface IPaigingData
 */
export interface IPaigingData {
  total_rows: number;
  total_pages: number;
  page: number;
  rows: number | string; // nolimitもある
  is_first_page: boolean;
  prev_page: number | null;
  is_last_page: boolean;
  next_page: number | null;
}

/**
 * 登録APIレスポンス
 *
 * @export
 * @interface ISavetResponse
 */
export interface ISavetResponse {
  status: string;
  message: any;
  error_code: number | null;
  error_message: string | null;
  result: string | any | null;
}

/**
 * アップロードファイル
 *
 * @export
 * @interface IUploadFile
 */
export interface IUploadFile {
  file_id: number;
  file_created_at: string;
  file_memo: string;
  file_mime: string;
  file_original_name: string;
  file_purpose: string;
  file_size: number;
  file_unique_code: string;
  is_image: number;
  user_first_name: string;
  user_id: number;
  user_last_name: string;
}

/**
 *  v-formの型
 */
export type VForm = Vue & {
  validate: () => boolean;
  resetValidation: () => boolean;
  reset: () => void;
};

/**
 * オブジェクトのKeyValueの定義
 *
 * @export
 * @interface StringKeyObject
 */
export interface StringKeyObject {
  [key: string]: any;
}

/**
 * HTMLイベントオブジェクトのターゲット内のファイルの型定義
 *
 * @export
 * @interface HTMLInputEvent
 */
export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

/**
 * ID_TOKEN
 *
 * @export
 * @interface IIdToken
 */
export interface IIdToken {
  aud: string,
  ba_company_disable_create_shares_case: string,
  ba_company_enable_ba: string,
  ba_company_enable_baportal: string,
  ba_company_name: string,
  ba_company_type: string,
  ba_company_unique_code: string,
  ba_user_email: string,
  ba_user_name: string,
  ba_user_type: string,
  ba_user_unique_code: string,
  broker_code: string,
  broker_user_sub: string
  exp: number,
  iat: number
  iss: string,
  jwk: string,
  oit_code: string,
  realm: string,
  sub: string,
  user_switch_from: string
}

export interface IUser {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IMember {
  id: number;
  first_name: string;
  last_name: string;
  contact: { email: string; phone: string };
  gender: string;
  ip_address: string;
  avatar: string;
  address: {
    city: string;
    country: string;
    postalCode: string;
    state: string;
    street: string;
  };
}
