import express from 'express'
import { query, validationResult } from 'express-validator'
import config from '../config'
import logger from '../services/logger'
import firebase from '../services/firebase'

const FirestoreFieldValue = firebase.firestore.FieldValue

const PAGE_NOT_FOUND_URL = `${config.hosting.app}/404.html`

const server = express()

server.get('/redirect',
  [
    query('guild')
      .isAlphanumeric().withMessage('must be alpha-numeric')
      .notEmpty().withMessage('must be a valid, non empty guild ID'),
    query('type')
      .isIn(['contact', 'website']).withMessage('must be one of `contact` or `website`')
      .notEmpty().withMessage('must not be empty')
  ],
  async function (request, response) {
    logger.debug('Incoming request', request.query)
    try {
      // 1. Handle validation of query parameters
      const validationErrors = validationResult(request)
      if (!validationErrors.isEmpty()) {
        logger.error('Invalid redirect query parameters', validationErrors.array())
        response.redirect(PAGE_NOT_FOUND_URL)
      }
      const guildId = request.query.guild
      const type = request.query.type

      // 2. Fetch the URL in database
      const guildRef = firebase.firestore().collection('guilds').doc(guildId)
      const guild = (await guildRef.get()).data()

      if (guild === undefined) {
        logger.error(`No guild found for ID ${guildId}`)
        response.redirect(PAGE_NOT_FOUND_URL)
      }

      // 3. Update the "redirections" counter in database
      guildRef.collection('redirects').add({
        type,
        createdAt: FirestoreFieldValue.serverTimestamp()
      })

      // 4. Send the redirect response
      const url = type === 'contact'
        ? guild.contactUrl
        : guild.websiteUrl
      response.redirect(url)
    } catch (error) {
      logger.error(error)
      response.json({ error: error.message })
    }
  })

export default server
