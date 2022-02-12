module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended'
  ],
  ignorePatterns: ['.nuxt/*', 'dist/*'],
  plugins: [],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': ['error'],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true }
    ],
    '@typescript-eslint/no-explicit-any': 0,
    'space-before-function-paren': ['off'],
    'arrow-parens': ['off'],
    camelcase: ['off'],
    'no-console': ['off'],
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true
      }
    ],
    'vue/no-v-html': ['off'],
    'no-template-curly-in-string': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ]
  }
};
