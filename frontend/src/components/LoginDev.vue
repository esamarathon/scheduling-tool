<template>
  <div>
    <p>Development purposes only</p>
    <p>Currently logged in user: {{loggedIn}}</p>
    <div>
      Select User ID: <input type=text v-model="userid"/>
    </div>
    <div><input type="button" @click="setCookie" value="Set Cookie"/><input type="button" @click="clearCookie" value="Clear Cookie"/></div>
  </div>
</template>

<script>
import settings from '../settings'
import { deleteCookie, setCookie, getJwt } from '../auth'

export default {
  name: 'Login',
  data () {
    return {
      userid: getJwt() ? getJwt().user.id : ''
    }
  },
  methods: {
    setCookie () {
      setCookie({ auth: {}, user: { id: this.userid } })
      window.location.href = settings.frontend.baseurl
    },
    clearCookie () {
      deleteCookie(settings.auth.cookie)
      window.location.reload(true)
    }
  },
  computed: {
    loggedIn () {
      if (getJwt()) {
        return getJwt().user.id
      } else {
        return 'Noone'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
