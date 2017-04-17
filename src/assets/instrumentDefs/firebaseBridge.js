import Vue from 'vue'
import VueFire from '../vuefire'
import Firebase from 'firebase'
import firebaseui from 'firebaseui'

Vue.use(VueFire)

var config = {
  apiKey: 'AIzaSyA99Uy2EcAx3DzT7tFhWEdLJKvGit5yIw8',
  authDomain: 'beatboxes-2ebe9.firebaseapp.com',
  databaseURL: 'https://beatboxes-2ebe9.firebaseio.com',
  storageBucket: 'beatboxes-2ebe9.appspot.com',
  messagingSenderId: '226375578975'
}

var firebaseApp = Firebase.initializeApp(config)
var db = firebaseApp.database()

var ui = new firebaseui.auth.AuthUI(Firebase.auth())

var fbvm = new Vue({
  firebase: function () {
    return {
      test: {
        source: db.ref('test/test1'),
        asObject: true
      }
    }
  }
})

var removeKey = function (toSave) {
  return Object.keys(toSave)
    .filter(key => !['.key'].includes(key))
    .reduce((obj, key) => {
      obj[key] = toSave[key]
      return obj
    }, {})
}

var fbObjLength = function (obj) {
  if (!obj) { return 0 }
  return Object.keys(obj).filter(key => !['.key'].includes(key)).length
}

var idefRef = function (user, soundBankNum) {
  return db.ref('userDefs/' + user + '/' + soundBankNum)
}

var bmdefRef = function (user, beatBankNum) {
  return db.ref('userDefs/' + user + '/beats/' + beatBankNum)
}

var smdefRef = function (user) {
  return db.ref('userDefs/' + user + '/song')
}

var cpdefRef = function (user) {
  return db.ref('userDefs/' + user + '/cp')
}

export default {
  fbvm: fbvm,
  fbdb: db,
  removeKey: removeKey,
  idefRef: idefRef,
  bmdefRef: bmdefRef,
  smdefRef: smdefRef,
  cpdefRef: cpdefRef,
  ui: ui,
  firebase: Firebase,
  fbObjLength: fbObjLength
}
