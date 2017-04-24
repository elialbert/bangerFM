<template>
  <div class='auth-container-container'>
    <div class='signin-instruction-text' v-if="!loading && !signedIn">
      Sign in to save in the cloud and share:
    </div>

    <div id='firebaseui-auth-container'>
      <div id="loaded" v-if="!loading">
        <span v-if="signedIn">
          <span id='workspace-picker'
            @click="wsToggle"
          ><a href="javascript:void(0)">Current Workspace: {{workspace}}</a></span>
          <span id="email">{{userInfo.email}}</span>    
          <button id="sign-out"
            v-on:click="signOut"
          >Sign Out</button>
        </span>
        <div id="user-signed-out" class="hidden"></div>
      </div>
      <div id="sign-in-with-redirect"></div>
      <span v-if="loading">Loading...</span>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import firebaseBridge from '../assets/instrumentDefs/firebaseBridge'

export default {
  name: 'auth',
  props: ['user', 'workspace', 'wsToggle'],
  data: function () {
    return {
      loading: true,
      loadingAuth: false,
      signedIn: false,
      userInfo: {}
    }
  },
  mounted: function () {
    this.initApp()
  },
  methods: {
    handleSignedInUser: function (user) {
      this.signedIn = true
      this.userInfo = user
      this.$emit('signedIn', user.uid)
      this.loading = false
    },
    handleSignedOutUser: function () {
      this.signedIn = false
      firebaseBridge.ui.start('#sign-in-with-redirect', this.getUIConfig())
      this.$emit('signedOut')
      this.loading = true
      let self = this
      setTimeout(function () {
        self.loading = false
      }, 4000)
    },
    initApp: function () {
      this.loading = true
      Firebase.auth().onAuthStateChanged((user) => {
        this.loading = true
        if (user) {
          if (this && this.handleSignedInUser) {
            this.handleSignedInUser(user)
          }
        } else {
          this.handleSignedOutUser()
        }
      })
    },
    signOut: function () {
      this.signedIn = false
      this.loading = true
      Firebase.auth().signOut()
      this.$emit('signedOut')
    },
    getUIConfig: function () {
      let self = this
      return {
        signInSuccessUrl: '/',
        signInFlow: 'redirect',
        signInOptions: [
          Firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          Firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          'signInSuccess': function (user, credential, redirectUrl) {
            self.handleSignedInUser(user)
          }
        }
      }
    }
  }
}
</script>

<style>
  .auth-container-container {
    display: flex;
    margin-left: auto;
    padding-left: 20px;
    min-width: 420px;
  }
  div.firebaseui-card-content {
    padding: 0px;
  }
/*  div.firebaseui-container {
    max-width: 800px;
  }*/
  ul.firebaseui-idp-list>.firebaseui-list-item {
    float: left;
    margin-left: 10px;
  }
  div#firebaseui-auth-container {
    float: right;
    margin-left: auto;
  }
  div.mdl-card {
    min-height: 50px;
  }
  div.firebaseui-callback-indicator-container {
    height: 50px;
  }
  ul.firebaseui-idp-list {
    margin: 0px;
  }
  ul.firebaseui-id-list li.firebaseui-list-item {
    margin: 0px;
  }
  li.firebaseui-list-item {
    margin-bottom: 0px;
  }
  button.firebaseui-idp-button {
    padding-left: 4px;
    padding-right: 4px;
    height: 26px;
    padding: 4px;
    line-height: 12px;
  }
  button#sign-out {
    margin-left: 8px;
  }
  p.firebaseui-text {
    color: black;
  }
  h1.firebaseui-title {
    color: black;
  }
  #workspace-picker {
    margin-right: 10px;
  }
  span.firebaseui-idp-text {
    visibility: hidden;
    padding: 0px;
  }
  button.mdl-button {
    min-width: 20px;
    width: 26px;
  }
</style>
