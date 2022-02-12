<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      404 Not Found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    console.log(props);
  }
});
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
