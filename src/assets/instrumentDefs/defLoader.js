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

var quickDefLoad = function () {
  return clone(instrumentDefs0)
}

var load = function (user, workspace, num, reset, nonUserResetCB, fbcb) {
  let foundFromBefore = false
  // if (num === undefined || user === undefined) { return }
  let storedDefs = loaderVm.$localStorage.get('instrumentDefs' + String(num))
  if (!storedDefs || !Object.keys(storedDefs).length) {
    storedDefs = clone(instrumentDefs0)
    if (user === false) { reset = true }
  } else {
    foundFromBefore = true
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
      firebaseBridge.idefRef(user, workspace, num).once('value', snapshot => {
        if (!snapshot.val() && !foundFromBefore) {
          firebaseBridge.fbdb.ref('defs/' + num).once('value', snapshot2 => {
            firebaseBridge.idefRef(user, workspace, num).set(firebaseBridge.removeKey(snapshot2.val()))
            if (fbcb) { fbcb() }
          })
        }
      })
    }
  }
  return storedDefs
}

var clone = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

var save = function (user, workspace, obj, num, skipHistory = false, skipLocal = false) {
  if (Object.keys(obj).length === 0) {
    return
  }
  if (user) {
    firebaseBridge.idefRef(user, workspace, num).set(firebaseBridge.removeKey(obj))
      .then(function () {
      })
      .catch(function (error) {
        console.log('Synchronization failed ' + error)
      })
  }
  if (!skipLocal) {
    loaderVm.$localStorage.set('instrumentDefs' + String(num), obj)
  }
  if (!skipHistory) {
    actionHistory.push('ss', num, clone(obj))
  }
}

var loadBeat = function (user, workspace, num, perMeasure = 4, pitchKey = 'C Major', skipFB = false, numInstruments = 8) {
  // grab beat from cookie (cheap & synchronous)
  let storedBeat = loaderVm.$localStorage.get('beatDef' + String(num))
  if (typeof (storedBeat) === 'string') {
    storedBeat = JSON.parse(storedBeat)
  }
  // create fresh if DNE
  if (!storedBeat || !Object.keys(storedBeat).length) {
    storedBeat = iutils.createDataArray(perMeasure, numInstruments, pitchKey)
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
      .then(function () {
      })
      .catch(function (error) {
        console.log('bm Synchronization failed ' + error)
      })
  }
  loaderVm.$localStorage.set('beatDef' + String(num), JSON.stringify(obj))
  if (!skipHistory) {
    actionHistory.push('bm', num, clone(obj))
  }
}

var saveOneBeat = function (user, workspace, obj, num, instr, col, triplet) {
  firebaseBridge.bmOneDefRef(user, workspace, num, instr, col, triplet).set(firebaseBridge.removeKey(obj))
    .then(function () {
    })
    .catch(function (error) {
      console.log('bm Synchronization failed ' + error)
    })
}

var saveOneSound = function (user, workspace, num, key, propKey, val) {
  firebaseBridge.idefOneRef(user, workspace, 0, key, propKey).set(val)
    .then(function () {
    })
    .catch(function (error) {
      console.log('bm Synchronization failed ' + error)
    })
}

var loadSong = function (user, workspace) {
  let data = loadGeneric('songData') || iutils.createSongArray()
  if (user) {
    firebaseBridge.smdefRef(user, workspace).once('value', snapshot => {
      if (!snapshot.val()) {
        firebaseBridge.smdefRef(user, workspace).set(firebaseBridge.removeKey(data))
          .then(function () {
          })
          .catch(function (error) {
            console.log('Synchronization failed ' + error)
          })
      }
    })
  }
}

var saveSong = function (user, workspace, obj, skipHistory = false) {
  if (user) {
    firebaseBridge.smdefRef(user, workspace).set(firebaseBridge.removeKey(obj))
      .then(function () {
      })
      .catch(function (error) {
        console.log('Synchronization failed ' + error)
      })
  }
  saveGeneric('songData', workspace, obj, skipHistory)
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
  quickDefLoad: quickDefLoad,
  loadBeat: loadBeat,
  save: save,
  saveOneSound: saveOneSound,
  saveBeat: saveBeat,
  saveOneBeat: saveOneBeat,
  saveGeneric: saveGeneric,
  loadGeneric: loadGeneric,
  saveSong: saveSong,
  loadSong: loadSong,
  clearCookies: clearCookies
}
