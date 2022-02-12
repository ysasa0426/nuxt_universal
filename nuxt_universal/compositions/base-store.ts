// injectとprovideによる状態共有を行う
// 各コンポーネント間で値を保持する必要がある変数を登録して使う
import { provide, inject, reactive, toRefs } from '@nuxtjs/composition-api';

export const key = Symbol('key');

interface State {
  windowWidth: number | null;
  windowHeight: number | null;
  globalNavi: boolean;
  isAdmin: boolean;
  overlay: boolean;
  breadcrumb: any;
  searchCondition: { url: string; values: any };
  paginationInfo: {
    totalPages: number;
    totalRows: number;
    currentPage: number;
  };
  toastMessages: any;
  isMobile: boolean;
  mobileNavi: boolean;
  showFooter: boolean;
  checkedIds: string[]; // チェックボックスデータ
}

export const createStore = (): any => {
  const state = reactive<State>({
    windowWidth: 0,
    windowHeight: 0,
    globalNavi: false,
    isAdmin: false,
    overlay: false,
    breadcrumb: {
      pathname: '',
      title: '',
      subTitle: '',
      links: [{ text: '', href: '' }]
    },
    searchCondition: {
      url: '',
      values: {}
    },
    paginationInfo: {
      totalPages: 0,
      totalRows: 0,
      currentPage: 1
    },
    toastMessages: {
      success: {
        is_show: false,
        message: ''
      },
      error: {
        is_show: false,
        message: ''
      }
    },
    isMobile: false,
    mobileNavi: false,
    showFooter: true,
    checkedIds: []
  });

  const onResize = (): void => {
    // xs
    state.isMobile = window.innerWidth < 600;
    state.windowWidth = window.innerWidth;
    state.windowHeight = window.innerHeight;
  };

  // フッター表示設定
  const setFooter = (show: boolean): void => {
    state.showFooter = show;
  };

  // 管理者設定
  const setAdmin = (isAdmin: boolean): void => {
    state.isAdmin = isAdmin;
  };

  // オーバーレイ設定
  const setOverlay = (overlay: boolean): void => {
    state.overlay = overlay;
  };

  // グローバルメニューの表示切替
  const showGlobalNavi = (show: boolean): void => {
    state.globalNavi = show;
  };

  // 一覧の検索条件を保持
  const setConditions = <T extends {}>(url: string, form: T): void => {
    state.searchCondition.url = url;
    state.searchCondition.values = form;
  };

  // 一覧のページ情報
  const setPagenationInfo = (
    totalPages: number,
    totalRows: number,
    currentPage: number
  ): void => {
    state.paginationInfo.totalPages = totalPages;
    state.paginationInfo.totalRows = totalRows;
    state.paginationInfo.currentPage = currentPage;
  };

  // チェックボックスの値設定
  const setCheckedId = (id: string, add: boolean): void => {
    if (add) {
      state.checkedIds.push(id);
    } else {
      state.checkedIds = state.checkedIds.filter((val) => val !== id);
    }
  };

  // チェックボックスの値クリア
  const resetCheckedId = (): void => {
    state.checkedIds = [];
  };

  // トーストメッセージ設定
  const addToastMessage = (message: any, type?: string): void => {
    const t = type ?? 'success';
    const obj: any = { ...state.toastMessages[t] };
    let msg = 'エラーが発生しました';
    if (typeof message === 'object' && message.body) {
      msg = message.body;
    }
    if (typeof message === 'string') {
      msg = message;
    }
    obj[msg] = true;
    state.toastMessages[t] = obj;
  };

  return {
    onResize,
    showGlobalNavi,
    setConditions,
    setPagenationInfo,
    setFooter,
    setAdmin,
    setOverlay,
    setCheckedId,
    resetCheckedId,
    addToastMessage,
    ...toRefs(state)
  };
};

export const provideStore = (): any => {
  provide('key', createStore());
};

export const useMyStore = (): any => {
  return inject('key', createStore());
};
