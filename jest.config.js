module.exports = {
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    // tell Jest to handle `*.vue` files
    'vue'
  ],
  transform: {
    // process `*.ts` files with `babel-jest`
    '.*\\.(ts)$': 'babel-jest',
    // process `*.js` files with `babel-jest`
    '.*\\.(js)$': 'babel-jest',
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
