const OPTIONS = '<%= serialize(options) %>'
const options = JSON.parse(OPTIONS)

const localAnalytics = {
  identify (arg) {
    console.info('Segment: identify', arg)
  },
  track (arg) {
    console.info('Segment: track', arg)
  }
}

export default function ({ app: { router } }, inject) {
  if (options.disabled) {
    // eslint-disable-next-line
    console.info('Segment analytics disabled, injecting local analytics plugin')
    inject('segment', localAnalytics)
    return
  }

  if ((!options.writeKey || options.writeKey.length === 0)) {
    console.warn('Missing Segment Write Key')
    return
  }

  const analytics = window.analytics = window.analytics || []

  if (analytics.initialize) {
    return
  }

  if (analytics.invoked) {
    if (window.console && console.error) {
      console.error('Segment snippet included twice.')
    }
    return
  }

  analytics.invoked = true

  analytics.methods = [
    'trackSubmit',
    'trackClick',
    'trackLink',
    'trackForm',
    'pageview',
    'identify',
    'reset',
    'group',
    'track',
    'ready',
    'alias',
    'debug',
    'page',
    'once',
    'off',
    'on'
  ]

  analytics.factory = function (method) {
    return function () {
      const args = Array.prototype.slice.call(arguments)
      args.unshift(method)
      analytics.push(args)
      return analytics
    }
  }

  for (let i = 0; i < analytics.methods.length; i++) {
    const key = analytics.methods[i]
    analytics[key] = analytics.factory(key)
  }

  analytics.SNIPPET_VERSION = '4.1.0'

  analytics.load = function (key, options) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = 'https://cdn.segment.com/analytics.js/v1/' +
        key + '/analytics.min.js'

    const first = document.getElementsByTagName('script')[0]
    first.parentNode.insertBefore(script, first)
    analytics._loadOptions = options
  }

  analytics.load(options.writeKey, options.settings)

  router.afterEach(function (to, from) {
    window.analytics.page(options.pageCategory || '', to.name || '', {
      path: to.fullPath
    })
  })

  inject('segment', analytics)
}
