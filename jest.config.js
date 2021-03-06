module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    // tell Jest to handle `*.vue` files
    'vue'
  ],
  transform: {
    // process `*.js` files with `babel-jest`
    '.*\\.(js)$': 'babel-jest',
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': 'vue-jest'
  },
  moduleNameMapper: {
    // support the same ~/ -> rootdir/ alias mapping in source code
    '^~/(.*)$': '<rootDir>/$1'
  },
  testRegex: './test/.*.test.js$'
}
