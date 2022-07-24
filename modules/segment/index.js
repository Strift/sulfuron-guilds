import { resolve } from 'path'

export default function segmentModule (moduleOptions) {
  const options = Object.assign({}, this.options.segment, moduleOptions)

  if (options.disabled) {
    // eslint-disable-next-line
    console.info('Segment analytics disabled ("disabled" options has been set)')
  } else {
    this.addPlugin({
      src: resolve(__dirname, 'plugin.js'),
      fileName: 'nuxt-segment.js',
      ssr: false,
      options
    })
  }
}
