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
        background: 'background'
      }
    }
  },
  variants: {
    borderColor: ['focus-within'],
    textColor: ['responsive', 'hover', 'focus', 'group-focus']
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
    ],
    options: {
      whitelist: ['bg-red-900', 'border-red-500', 'text-red-500', 'hover:text-red-400']
    }
  }
}
