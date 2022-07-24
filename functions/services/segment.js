const Analytics = require('analytics-node')
const config = require('../config')
const logger = require('./logger')

let segment

if (config.segment.enabled) {
  segment = new Analytics('jE5I9VUBfqBx4RRgI7k7dte7gBzy2AFB')
} else {
  segment = {
    identify (args) {
      logger.debug('Segment: identify', args)
    },
    track (args) {
      logger.debug('Segment: track', args)
    }
  }
}

module.exports = segment
