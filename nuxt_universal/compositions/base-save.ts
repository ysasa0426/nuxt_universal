/**
 * データ登録で利用
 *
 * APIの実行
 * 登録時の画面ロック及び成功・エラーメッセージ表示等
 * @module compositions/base-save
 *
 */
import { reactive, toRefs } from '@nuxtjs/composition-api';
import { requestApi } from '@/apis';
import { ISavetResponse } from '@/types';
import { useMyStore } from '~/compositions/base-store';

interface State {
  url: string;
  method: string;
  useResponseMessage: boolean;
  success: string;
  error: string;
  errors: any;
  doToast: boolean;
  successWithMessage: boolean;
  loaded: boolean;
  saveError: boolean;
  valid: boolean;
}

/**
 * 登録処理
 *
 * @return {*}  {*}
 */
const Save = (): any => {
  const state = reactive<State>({
    url: '',
    method: 'post',
    useResponseMessage: false,
    success: '登録が完了しました',
    error: 'データの登録に失敗しました',
    errors: {},
    doToast: false,
    successWithMessage: false,
    loaded: false,
    saveError: false,
    valid: true
  });
  const { setOverlay, addToastMessage } = useMyStore();

  /**
   * 登録処理API設定
   *
   * @param {string} url
   * @param {{
   *       method: string; APIのmethod
   *       useResponseMessage: boolean; エラー時レスポンスのメッセージをエラーメッセージとするか
   *       success: string; 登録成功メッセージ
   *       error: string; 登録失敗メッセージ
   *       doToast: boolean; 完了及びエラーをtoastで表示するか
   *       successWithMessage: boolean 登録成功時にmessageが返却される場合はtrueを設定する
   *       getFromBam?: boolean, APIのエンドポイントがBAMか
   *     }} [option]
   * @return {*}  {void}
   */
  const setSaveConfig = (
    url: string,
    option?: {
      method: string;
      useResponseMessage: boolean;
      success: string;
      error: string;
      doToast: boolean;
      successWithMessage: boolean;
      getFromBam: boolean;
    }
  ): void => {
    state.url = url;

    if (option) {
      if (option.method) {
        state.method = option.method;
      }

      if (option.useResponseMessage) {
        state.useResponseMessage = option.useResponseMessage;
      }

      if (option.doToast) {
        state.doToast = option.doToast;
      }

      if (option.success) {
        state.success = option.success;
      }

      if (option.error) {
        state.error = option.error;
      }

      if (option.successWithMessage) {
        state.successWithMessage = option.successWithMessage;
      }

      if (option.getFromBam) {
        state.url = process.env.BAM_BASE_URL + state.url;
      }
    }
  };

  /**
   * APIの実行
   *
   * @template T
   * @param {T} [paramaters] postデータ
   * @param {string} [url] 登録APIのURL
   * @return {*}  {Promise<any>}
   */
  const saveData = async <T extends {}>(paramaters: {
    data: T;
    url?: string;
  }): Promise<any> => {
    setOverlay(true);
    state.saveError = false;

    if (paramaters && paramaters.url) {
      state.url = paramaters.url;
    }
    let result;
    // API実行
    await requestApi(state.url, paramaters.data, state.method)
      .then((data: ISavetResponse) => {
        if (data && data.status === 'success') {
          state.saveError = false;
          // 成功時にはresultにnullが返って来る(成功の時でもnullじゃないときがあるのでその時はsuccessWithMessageをtrueに)
          if (!data.result || state.successWithMessage) {
            if (state.doToast) {
              if (state.useResponseMessage && data && data.message) {
                state.success = data.message;
              }
              addToastMessage(state.success);
            }
            state.loaded = true;
            setOverlay(false);
            result = data.result;
          } else {
            if (state.useResponseMessage) {
              if (data.error_message) {
                state.error = data.error_message;
                if (state.doToast) {
                  addToastMessage(state.error, 'error');
                  state.saveError = true;
                }
              } else if (data.message) {
                state.success = data.message;
                if (state.doToast) {
                  addToastMessage(state.success, 'success');
                }
              }
            }
            state.loaded = true;
            setOverlay(false);
            result = data;
          }
        } else {
          if (state.useResponseMessage) {
            if (data && 'message' in data && data.message) {
              state.error = data.message;
            } else if (data && 'error_message' in data && data.error_message) {
              state.error = data.error_message;
            } else if (data && data.result) {
              // result内にエラー内容が入ってくる場合がある BAX-1552
              if (
                'error_messages' in data.result &&
                data.result.error_messages
              ) {
                state.errors = data.result.error_messages;
              }
            }
          }
          // 予期せぬエラー発生
          if (state.doToast) {
            addToastMessage(state.error, 'error');
          }
          state.saveError = true;
          state.loaded = true;
          setOverlay(false);
          return false;
        }
      })
      .catch((e: any) => {
        if (state.doToast) {
          addToastMessage(state.error, 'error');
        }
        console.error('データ登録APIエラー', e);
        state.saveError = true;
        state.loaded = true;
        setOverlay(false);
        return false;
      });
    return result;
  };

  /**
   * 必須入力チェック
   *
   * @param {*} value
   * @return {*}  {(string | boolean)}
   */
  const isRequired = (value: any): string | boolean => {
    return !!value || '必須入力項目です';
  };

  /**
   * 必須入力チェック
   *
   * @param {*} value
   * @return {*}  {(string | boolean)}
   */
  const isNumberRequired = (value: any): string | boolean => {
    if (!String(value).match(/^[0-9]+$/)) {
      return '必須入力項目です';
    }
    return true;
  };

  /**
   * メールフォーマットチェック
   *
   * @param {*} value
   * @return {*}  {(string | boolean)}
   */
  const isEmail = (value: any): string | boolean => {
    if (!value) {
      return true;
    }
    if (
      !String(value).match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      return 'メールアドレスが正しくありません';
    }
    return true;
  };

  /**
   * 半角数字(小数点を含む)チェック
   *
   * @param {*} value
   * @return {*}  {(string | boolean)}
   */
  const isDecimal = (value: any): string | boolean => {
    if (!value) {
      return true;
    }
    if (!String(value).match(/^[-]?([1-9]\d*|0)(\.\d+)?$/)) {
      return '半角数字で入力してください';
    }
    return true;
  };

  /**
   * 半角数字・半角ハイフンチェック
   *
   * @param {*} value
   * @return {*}  {(string | boolean)}
   */
  const isNumberHyphen = (value: any): string | boolean => {
    if (!value) {
      return true;
    }
    if (!String(value).match(/^[0-9-]+$/)) {
      return '半角数字と半角ハイフンで入力してください';
    }
    return true;
  };

  /**
   * カナチェック
   *
   * @param {*} value
   * @return {*}  {(string | boolean)}
   */
  const isKana = (value: any): string | boolean => {
    if (!value) {
      return true;
    }
    if (!value.match(/^[ァ-ヶー]*$/)) {
      return 'カナを入力してください';
    }
    return true;
  };

  /**
   * 半角数字チェック
   *
   * @param {*} value
   * @return {*}  {(string | boolean)}
   */
  const isNumber = (value: any): string | boolean => {
    if (!value) {
      return true;
    }
    if (!String(value).match(/^[0-9]+$/)) {
      return '半角数字で入力してください';
    }
    return true;
  };

  return {
    isRequired,
    isNumberRequired,
    isEmail,
    isDecimal,
    isNumberHyphen,
    isKana,
    isNumber,
    setSaveConfig,
    saveData,
    ...toRefs(state)
  };
};

export { Save };
