import type { ActionTree, MutationTree } from 'vuex';
import type { Context } from '@nuxt/types';
import { IUser } from '@/types';
import { getAppConfig } from '@/apis/app';
export interface RootState {
  appConfig: IUser;
}

export const state = (): RootState => ({
  appConfig: {
    userId: 0,
    id: 0,
    title: '',
    completed: false
  }
});

export const MutationType = {
  LOAD: 'load'
};

export const mutations: MutationTree<RootState> = {
  [MutationType.LOAD]: (state, item: any) => {
    state.appConfig = item;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, _context: Context) {
    const data = await getAppConfig();
    if (data) {
      commit(MutationType.LOAD, data[0]);
    }
  }
};
