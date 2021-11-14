module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
      }
    ]
  ],
  plugins: [
    // Added because of https://github.com/znck/prop-types
    '@znck/prop-types/remove',
    // Added because of warning in Storybook
    // Not useful for Jest
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
  ]
}
