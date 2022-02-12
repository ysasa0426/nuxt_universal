<template>
  <v-row>
    <v-col class="text-center">
      <v-data-table
        v-if="loaded"
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
      />

      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  reactive,
  toRefs
} from '@nuxtjs/composition-api';
import { Search } from '@/compositions/base-search';
import { useMyStore } from '@/compositions/base-store';

export default defineComponent({
  setup() {
    const store = useStore();
    const state = reactive<any>({
      loaded: false
    });

    const {
      isAdmin,
      setAdmin
    } = useMyStore();

    // 一覧共通モジュールを利用
    const {
      items,
      setSearchConfig,
      loadData,
      loaded
    } = Search();

    const headers = [
      { text: 'id', value: 'id' },
      { text: 'first_name', value: 'first_name' },
      { text: 'last_name', value: 'last_name' },
      { text: 'gender', value: 'gender' },
      { text: 'ip_address', value: 'ip_address' }];

    setSearchConfig('http://localhost:3000/usres.json', {
      method: 'get'
    });

    if (process.client) {
      loadData();
      console.log(isAdmin.value);
      setAdmin(true);
      console.log(isAdmin.value);
    }
    return { ...toRefs(state), store, items, loaded, headers };
  },
  head: {
    title: 'トップ'
  }
});
</script>
