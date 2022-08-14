import { ampli } from './ampli'

ampli.load({
  environment: 'development'
})

export default {
  signIn (userId: string) {
    ampli.identify(userId)
    ampli.signIn(userId)
  }
}
