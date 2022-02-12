/**
 * データ検索で利用
 *
 * APIの実行
 * ページング処理（無限スクロール含む）
 * @module compositions/base-search
 *
 */
import { reactive, toRefs } from '@nuxtjs/composition-api';
import { requestApi } from '@/apis';
import { IPaigingData } from '@/types';
import { useMyStore } from '@/compositions/base-store';

/**
 *
 * @interface State
 *
 * url: string; APIのパス
 * onlyOne: boolean; // 詳細表示用（１件限定）
 * ignorePageing: boolean; // ページングの条件を設定しない
 * pagingParams: { rows: number; page: number }; 検索条件
 * loaded: boolean;
 * items: any; apiのResponseのデータ情報
 * doToast: boolean; トースト表示
 * pagingData: IPaigingData; apiのResponseのページング情報
 */
interface State {
  method: string;
  url: string;
  doSaveCondition: boolean;
  onlyOne: boolean;
  ignorePageing: boolean;
  pagingParams: { rows: number | string; page: number };
  loaded: boolean;
  items: any;
  item: {};
  doToast: boolean;
  pagingData: IPaigingData;
}

/**
 * 検索処理
 *
 * @return {*}  {*}
 */
const Search = (): any => {
  const state = reactive<State>({
    method: 'post',
    url: '',
    doSaveCondition: false,
    onlyOne: false,
    ignorePageing: false,
    pagingParams: { rows: 100, page: 1 },
    loaded: false,
    items: [],
    item: {},
    doToast: true,
    pagingData: {
      total_rows: 0,
      total_pages: 0,
      page: 1,
      rows: 0,
      is_first_page: true,
      prev_page: null,
      is_last_page: false,
      next_page: null
    }
  });

  const baseStore = useMyStore();

  /**
   * 検索APIの設定
   *
   * @param {string} url APIのURL
   * @param {{
   *       method:string, APIのmethod
   *       onlyOne: boolean, APIのレスポンスのデータが1件ではない時にエラーを返す
   *       ignorePageing: boolean, ページングの条件を設定しない
   *       page: { rows: number | string; page: number },
   *       doSaveCondition: boolean 検索条件を保持するか（APIのURLをキーに条件を保存する）
   *       getFromBam?: boolean, APIのエンドポイントがBAMか
   *       doToast?: boolean, トースト表示をするか
   *     }} [option]
   */
  const setSearchConfig = (
    url: string,
    option?: {
      method: string;
      onlyOne: boolean;
      ignorePageing: boolean;
      page: { rows: number | string; page: number };
      doSaveCondition: boolean;
      getFromBam: boolean;
      doToast: boolean;
    }
  ): void => {
    state.url = url;
    if (option) {
      if (option.method) {
        state.method = option.method;
      }
      if (option.onlyOne !== undefined) {
        state.onlyOne = option.onlyOne;
      }
      if (option.ignorePageing !== undefined) {
        state.ignorePageing = option.ignorePageing;
      }
      if (option.page) {
        state.pagingParams = option.page;
      }
      if (option.doSaveCondition !== undefined) {
        state.doSaveCondition = option.doSaveCondition;
      }

      if (option.getFromBam) {
        state.url = process.env.BAM_BASE_URL + state.url;
      }

      if (option.doToast !== undefined) {
        state.doToast = option.doToast;
      }
    }
  };

  /**
   * APIの実行
   *
   * @template T
   * @param {{
   *     conditions?: T; リクエストパラメーター
   *     url?: string; APIのURL
   *   }} [paramaters]
   * @return {*}  {Promise<any>}
   */
  const loadData = async <T extends {}>(paramaters?: {
    conditions?: T;
    url?: string;
  }): Promise<any> => {
    if (paramaters && paramaters.url) {
      state.url = paramaters.url;
    }

    let params = state.ignorePageing ? {} : state.pagingParams;
    if (paramaters && paramaters.conditions) {
      params = {
        ...params,
        ...paramaters.conditions
      };
    }

    // 検索条件を保持する
    if (state.doSaveCondition) {
      baseStore.setConditions(state.url, params);
    }

    let result = {};
    // API実行
    await requestApi(state.url, params, state.method)
      .then((data: any) => {
        if (data && data.status === 'success') {
          if (!data.result.list) {
            if (data.error_message) {
              throw new Error(data.result.error_message);
            }
            result = data.result;
            return result;
          }
          if (state.onlyOne) {
            if (data.result.list) {
              if (data.result.list.length !== 1) {
                if (state.doToast) {
                  baseStore.addToastMessage(
                    'データが確定できませんでした',
                    'error'
                  );
                }
              } else {
                state.item = data.result.list[0];
                state.items = data.result.list;
              }
            }
          } else {
            if (state.ignorePageing) {
              state.items = data.result.list;
            } else if (state.items) {
              state.items.push(...data.result.list);
            } else {
              state.items = data.result.list;
            }
            if (data.result.paging_data) {
              state.pagingData = data.result.paging_data;
            }
          }
          result = data.result;
        } else if (state.doToast) {
          // 予期せぬエラー発生
          baseStore.addToastMessage('データ取得に失敗しました', 'error');
        }
      })
      .catch((e: any) => {
        console.error('データ取得APIエラー', e);
        if (state.doToast) {
          baseStore.addToastMessage('データ取得に失敗しました', 'error');
        }
      });
    state.loaded = true;
    // 呼び元でページング処理を使わない場合はstate.itemsではなくこのresultを使う
    return result;
  };

  /**
   * APIの実行(State保持しない)
   *
   * @template T
   * @param {string} url APIのURL
   * @param {T} conditions リクエストパラメーター
   * @param {string} method
   * @param {boolean} getFromBam APIのエンドポイントがBAMか
   * @param {boolean} getFullResponse APIのレスポンスをすべて返すか
   * @return {*}  {Promise<any>}
   */
  const loadDataWoState = async <T extends {}>(
    url: string,
    conditions?: T,
    method?: string,
    getFromBam?: boolean,
    getFullResponse?: boolean
  ): Promise<any> => {
    let result = {};

    const params = conditions || {};
    const apiMethod = method || 'post';

    if (getFromBam) {
      url = process.env.BAM_BASE_URL + url;
    }

    await requestApi(url, params, apiMethod)
      .then((data: any) => {
        // if (data && data.result && data.status === 'success') {
        if (data && data.status === 'success') {
          if (data.result) {
            if (getFullResponse) {
              result = data;
            } else {
              result = data.result;
            }
          }
        }
      })
      .catch((e: any) => {
        console.error('データ取得APIエラー', e);
        baseStore.addToastMessage('データ取得に失敗しました', 'error');
      });
    return result;
  };

  /**
   * 次のページのデータを取得
   * (２回ページングがされてしますので)
   */
  const NextPage = (): void => {
    if (!state.ignorePageing) {
      state.pagingParams.page++;
      if (state.pagingParams.page <= state.pagingData.total_pages) {
        loadData();
      }
    }
  };

  const resetItems = (): void => {
    state.items = [];
  };

  return {
    setSearchConfig,
    loadData,
    NextPage,
    loadDataWoState,
    resetItems,
    ...toRefs(state)
  };
};

export { Search };
