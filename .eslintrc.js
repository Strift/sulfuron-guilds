const errorOnlyInProd = process.env.NODE_ENV === 'production' ? 2 : 1

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-unused-vars': errorOnlyInProd,
    'vue/no-unused-components': errorOnlyInProd
  }
}
