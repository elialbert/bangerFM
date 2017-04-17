import instrumentDefs0 from './defs0'
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import firebaseBridge from './firebaseBridge'
import iutils from '../instrumentUtils'
import actionHistory from '../actionHistory'

Vue.use(VueLocalStorage)

var initStorage = function () {
  var sd = {}
  for (var i = 0; i < 9; i++) {
    sd['instrumentDefs' + String(i)] = {
      type: Object,
      default: {}
    }
    sd['beatDef' + String(i)] = {
      type: String
    }
    sd['beatDefPM' + String(i)] = {
      type: String
    }
  }
  sd['songData'] = {
    type: String
  }
  sd['CPDef'] = {
    type: String
  }
  return sd
}

var loaderVm = new Vue({
  localStorage: initStorage()
})

var clearCookies = function () {
  for (var i = 0; i < 9; i++) {
    loaderVm.$localStorage.remove('instrumentDefs' + String(i))
    loaderVm.$localStorage.remove('beatDef' + String(i))
    loaderVm.$localStorage.remove('beatDefPM' + String(i))
  }
  loaderVm.$localStorage.remove('songData')
  loaderVm.$localStorage.remove('CPDef')
}

var load = function (user, workspace, num, reset, nonUserResetCB) {
  // grab from local storage
  let storedDefs = loaderVm.$localStorage.get('instrumentDefs' + String(num))
  if (!storedDefs || !Object.keys(storedDefs).length) {
    storedDefs = clone(instrumentDefs0)
    if (!user) { reset = true }
  }

  if (reset) {
    firebaseBridge.fbdb.ref('defs/' + num).once('value', snapshot => { // if in reset mode, put it in idefs
      if (nonUserResetCB && !user) {
        nonUserResetCB(snapshot.val())
      } else if (user) {
        firebaseBridge.idefRef(user, workspace, num).set(firebaseBridge.removeKey(snapshot.val() || storedDefs))
      }
    })
  } else { // if it's not there at all, put it there
    if (user) { // if logged in
      firebaseBridge.idefRef(user, num).once('value', snapshot => {
        if (!snapshot.val()) {
          firebaseBridge.idefRef(user, workspace, num).set(firebaseBridge.removeKey(storedDefs))
        }
      })
    }
  }
  return storedDefs
}

var clone = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

var save = function (user, workspace, obj, num, skipHistory = false) {
  if (Object.keys(obj).length === 0) {
    return
  }
  if (user) {
    firebaseBridge.idefRef(user, workspace, num).set(firebaseBridge.removeKey(obj))
  }
  loaderVm.$localStorage.set('instrumentDefs' + String(num), obj)
  if (!skipHistory) {
    actionHistory.push('ss', num, clone(obj))
  }
}

var loadBeat = function (user, workspace, num, perMeasure = 4, skipFB = false, numInstruments = 8) {
  // grab beat from cookie (cheap & synchronous)
  let storedBeat = loaderVm.$localStorage.get('beatDef' + String(num))
  if (typeof (storedBeat) === 'string') {
    storedBeat = JSON.parse(storedBeat)
  }
  // create fresh if DNE
  if (!storedBeat || !Object.keys(storedBeat).length) {
    storedBeat = iutils.createDataArray(perMeasure, numInstruments)
  }

  if (user && !skipFB) { // if logged in and no fb beat, save the cookie/new beat to fb
    firebaseBridge.bmdefRef(user, workspace, num).once('value', snapshot => {
      if (!snapshot.val()) {
        firebaseBridge.bmdefRef(user, workspace, num).set(firebaseBridge.removeKey(storedBeat))
      }
    })
  }
  if (storedBeat && Object.keys(storedBeat).length) {
    return storedBeat
  }
}

var saveBeat = function (user, workspace, obj, num, skipFB, skipHistory = false) {
  if (user && !skipFB) {
    firebaseBridge.bmdefRef(user, workspace, num).set(firebaseBridge.removeKey(obj))
  }
  loaderVm.$localStorage.set('beatDef' + String(num), JSON.stringify(obj))
  if (!skipHistory) {
    actionHistory.push('bm', num, clone(obj))
  }
}

var loadSong = function (user, workspace) {
  let data = loadGeneric('songData') || iutils.createSongArray()
  if (user) {
    firebaseBridge.smdefRef(user, workspace).once('value', snapshot => {
      if (!snapshot.val()) {
        firebaseBridge.smdefRef(user, workspace).set(firebaseBridge.removeKey(data))
      }
    })
  }
}

var saveSong = function (user, workspace, obj, skipHistory = false) {
  if (user) {
    firebaseBridge.smdefRef(user, workspace).set(firebaseBridge.removeKey(obj))
  }
  saveGeneric('songData', obj, skipHistory)
}

var saveGeneric = function (key, workspace, obj, skipHistory = false) {
  loaderVm.$localStorage.set(key, JSON.stringify(obj))
  if (!skipHistory) {
    actionHistory.push('generic_' + key, key, clone(obj))
  }
}

var loadGeneric = function (key, workspace) {
  var data = loaderVm.$localStorage.get(key)
  data = JSON.parse(data)
  if (data && Object.keys(data).length) {
    return data
  }
}

export default {
  load: load,
  loadBeat: loadBeat,
  save: save,
  saveBeat: saveBeat,
  saveGeneric: saveGeneric,
  loadGeneric: loadGeneric,
  saveSong: saveSong,
  loadSong: loadSong,
  clearCookies: clearCookies
}
