// Babel is only used for Jest
// But it messes up with nuxt composition api

const plugins = [
  // Added because of https://github.com/znck/prop-types
  '@znck/prop-types/remove',
  // Added because of warning in Storybook, not useful for Jest
  ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  // Added because of warning in Jest
  ['@babel/plugin-proposal-private-methods', { loose: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }]
]

module.exports = (api) => {
  const isTest = api.env('test')

  if (isTest) {
    return {
      presets: [
        ['@babel/preset-env', {
          targets: { esmodules: true }
        }],
        '@babel/preset-typescript'
      ],
      plugins
    }
  }
  return {
    presets: [
      ['@babel/preset-env', {
        targets: { esmodules: true }
      }]
    ],
    plugins
  }
}
