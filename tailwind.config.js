/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Open Sans',
          ...defaultTheme.fontFamily.sans
        ]
      },
      transitionProperty: {
        background: 'background background-opacity'
      },
      opacity: {
        90: '0.9' // Apparently this overrides background opacity too
      },
      height: {
        hd: '744px'
      },
      width: {
        72: '18rem',
        84: '21rem',
        96: '24rem'
      }
    }
  },
  variants: {
    borderColor: ({ after }) => after(['focus-within']),
    borderOpacity: ({ after }) => after(['focus-within']),
    backgroundColor: ['responsive', 'hover', 'focus', 'group-focus', 'group-hover'],
    backgroundOpacity: ['responsive', 'hover', 'focus', 'group-focus', 'group-hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-focus', 'group-hover'],
    height: ({ after }) => after(['group-hover'])
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
