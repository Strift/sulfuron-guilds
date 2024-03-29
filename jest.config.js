module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    // tell Jest to handle `*.vue` files
    'vue'
  ],
  transform: {
    // process `*.js` and `*.ts files with `babel-jest`
    '.*\\.[jt]s$': 'babel-jest',
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!epic-spinners)'
  ],
  moduleNameMapper: {
    // support the same ~/ -> rootdir/ alias mapping in source code
    '^~/(.*)$': '<rootDir>/$1'
  },
  testRegex: './test/.*.test.js$',
  setupFiles: [
    './jest.setup.js'
  ]
}
