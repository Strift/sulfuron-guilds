const errorOnlyInProd = process.env.NODE_ENV === 'production' ? 2 : 0

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    // '@nuxtjs',
    '@nuxtjs/eslint-config-typescript'
    // 'plugin:nuxt/recommended',
    // 'plugin:import/recommended'
  ],
  ignorePatterns: [
    'functions'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-unused-vars': errorOnlyInProd,
    'vue/no-unused-components': errorOnlyInProd,
    // Disabled because of issue
    // https://github.com/babel/babel/issues/10904#issuecomment-730391306
    'template-curly-spacing': 'off',
    'vue/static-class-names-order': 0
  },
  settings: {
    'import/resolver': 'nuxt'
  }
}
