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
    .filter(key => !['.key', '.value'].includes(key))
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

var bmOneDefRef = function (user, workspace, beatBankNum, instr, col, triplet) {
  return db.ref('userDefs/' + user + '/' + workspace + '/beats/' + beatBankNum + '/' + instr + '/' + col + '/triplet/' + triplet)
}
var idefOneRef = function (user, workspace, soundBankNum, instr, prop) {
  return db.ref('userDefs/' + user + '/' + workspace + '/sounds/' + soundBankNum + '/' + instr + '/properties/' + prop + '/val')
}

var smdefRef = function (user, workspace) {
  return db.ref('userDefs/' + user + '/' + workspace + '/song')
}

var cpdefRef = function (user, workspace) {
  return db.ref('userDefs/' + user + '/' + workspace + '/cp')
}

var wsdefRef = function (user, workspace) {
  if (!workspace) {
    return db.ref('workspaceDefs/' + user)
  }
  return db.ref('workspaceDefs/' + user + '/' + workspace)
}
export default {
  fbvm: fbvm,
  fbdb: db,
  removeKey: removeKey,
  idefRef: idefRef,
  idefOneRef: idefOneRef,
  bmdefRef: bmdefRef,
  bmOneDefRef: bmOneDefRef,
  smdefRef: smdefRef,
  cpdefRef: cpdefRef,
  wsdefRef: wsdefRef,
  ui: ui,
  firebase: Firebase,
  fbObjLength: fbObjLength
}
