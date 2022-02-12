import colors from 'vuetify/es5/util/colors';
require('dotenv').config();
const envPath = `.env.${process.env.NODE_ENV || 'local'}`;
require('dotenv').config({ path: envPath });

export default {
  publicRuntimeConfig: {
    apiURL: process.env.API_URL
  },
  head: {
    titleTemplate: '%s - nuxt_universal',
    title: 'nuxt_universal',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'robots',
        name: 'robots',
        content: `${process.env.ROBOTS_CONTENT}`
      }
    ],
    // script: [{ src: 'https://yappli.io/v1/sdk.js', async: true }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#0c64c1' },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '@mdi/font/css/materialdesignicons.css'
  ],
  plugins: [{ src: '@/plugins/day', mode: 'client' }],
  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  buildModules: [
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],
  modules: ['@nuxtjs/axios'],
  webfontloader: {
    google: {
      families: ['Noto+Sans+JP:400,700']
    }
  },
  typescript: {
    typeCheck: {
      typescript: {
        enable: true,
        mode: 'write-tsbuildinfo'
      },
      eslint: {
        files: './**/*.{ts, vue}'
      }
    }
  },
  axios: {},
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    icons: {
      iconfont:
        'mdiSvg' || 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    }
  },
  build: {
    extend(config) {
      config.devtool = 'source-map';
    },
    hardSource: false
  }
};
