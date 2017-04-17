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

var idefRef = function (user, workspace, soundBankNum) {
  return db.ref('userDefs/' + user + '/' + workspace + '/sounds/' + soundBankNum)
}

var bmdefRef = function (user, workspace, beatBankNum) {
  return db.ref('userDefs/' + user + '/' + workspace + '/beats/' + beatBankNum)
}

var smdefRef = function (user, workspace) {
  return db.ref('userDefs/' + user + '/' + workspace + '/song')
}

var cpdefRef = function (user, workspace) {
  return db.ref('userDefs/' + user + '/' + workspace + '/cp')
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
