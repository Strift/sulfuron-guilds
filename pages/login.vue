<template>
  <div>login</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

const AUTH_TOKEN_QUERY = 'auth_token'

export default {
  layout: 'FactionLayout',
  data: () => ({
    error: false
  }),
  mounted () {
    const token = this.$router.currentRoute.query[AUTH_TOKEN_QUERY]
    if (!token) {
      this.error = true
    }

    console.log('Token', token)

    firebase.auth().signInWithCustomToken(token)
      .then((user) => {
        // Signed in
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
  }
}
</script>

<style>

</style>
