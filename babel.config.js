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
    // Added because of warning in Storybook, not useful for Jest
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    // Added because of warning in Jest
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
}
