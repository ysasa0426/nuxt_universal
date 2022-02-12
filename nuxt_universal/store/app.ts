import type { ActionTree, MutationTree } from 'vuex';
import { getAppConfig, getUsers } from '@/apis/app';
import { IUser, IMember } from '@/types';

export const namespace = 'app';

export interface AppState {
  darkMode: boolean;
  users: IUser[];
  members: IMember[];
}

// state
export const state = (): AppState => ({
  darkMode: false,
  users: [
    {
      userId: 0,
      id: 0,
      title: '',
      completed: false
    }
  ],
  members: [
    {
      id: 0,
      first_name: '',
      last_name: '',
      contact: { email: '', phone: '' },
      gender: '',
      ip_address: '',
      avatar: '',
      address: {
        city: '',
        country: '',
        postalCode: '',
        state: '',
        street: ''
      }
    }
  ]
});

// MutationType
export const MutationType = {
  CHANGE_DARK_MODE: 'changeDarkMode',
  LOAD: 'load',
  LOAD_MEMBERS: 'load_members'
};

export const mutations: MutationTree<AppState> = {
  [MutationType.CHANGE_DARK_MODE]: (state, newMode: boolean) => {
    state.darkMode = newMode;
  },

  [MutationType.LOAD]: (state, item: any) => {
    state.users = item;
  },

  [MutationType.LOAD_MEMBERS]: (state, item: any) => {
    state.users = item;
  }
};

// ActionType
export const actionType = {
  TOGGLE_DARK_MODE: 'toggleDarkMode',
  LOAD: 'load',
  LOAD_MEMBERS: 'load_members'
};

export const actions: ActionTree<AppState, AppState> = {
  [actionType.TOGGLE_DARK_MODE]({ commit, state }) {
    commit(MutationType.CHANGE_DARK_MODE, !state.darkMode);
  },

  async [actionType.LOAD]({ commit }): Promise<any> {
    const data = await getAppConfig();
    if (data) {
      commit(actionType.LOAD, data);
    }
    return true;
  },

  async [actionType.LOAD_MEMBERS]({ commit }): Promise<any> {
    const data = await getUsers();
    if (data) {
      commit(actionType.LOAD_MEMBERS, data);
    }
    return true;
  }
};
