<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          API:{{ $config.apiURL }}
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">
                    id
                  </th>
                  <th class="text-left">
                    title
                  </th>
                  <th class="text-left">
                    userId
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in store.state.app.users"
                  :key="item.id"
                >
                  <td>{{ item.id }}</td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.userId }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  reactive,
  toRefs
} from '@nuxtjs/composition-api';
import Logo from '@/components/Logo.vue';
import { useMyStore } from '@/compositions/base-store';

export default defineComponent({
  components: {
    Logo
  },
  setup() {
    const store = useContext().store;
    const state = reactive<any>({
      loaded: false
    });

    const {
      isAdmin
    } = useMyStore();

    if (process.client) {
      console.log(isAdmin.value);
    }

    return { ...toRefs(state), store };
  },
  head: {
    title: 'トップ'
  }
});
</script>
