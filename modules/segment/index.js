import { resolve } from 'path'

export default function segmentModule (moduleOptions) {
  const options = Object.assign({}, this.options.segment, moduleOptions)

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-segment.js',
    ssr: false,
    options
  })
}
