import Tone from './tone.js'
import soundBridge from './soundBridge.js'
import utils from './instrumentUtils.js'

var startTransport = function () {
  Tone.Transport.start()
}

var stopTransport = function () {
  Tone.Transport.cancel(0)
  Tone.Transport.stop()
}

var changePitch = function (cur, direction) {
  var curPitchIndex = utils.PITCHES.indexOf(cur)
  if ((curPitchIndex + direction) >= 0 && (curPitchIndex + direction) < utils.PITCHES.length) {
    return utils.PITCHES[curPitchIndex + direction]
  }
  return cur
}

var tripletTime = new Tone.Time('32t').toSeconds()
var doubledTripletTime = tripletTime + tripletTime

var dataFunc = function (vm, animateFunc, defs, endcb, songIndex) {
  return function (time, col) {
    for (var i = 0; i < vm.defsLength; i++) {
      var square = (vm.dataArray[i] || {})[col]
      if (!square) { break }
      let idef = vm.idefLookup[i]
      if (square.enabled) {
        soundBridge.startBeat(idef, square.pitch, time, i)
      }
      if (square.triplet.enabled) {
        soundBridge.startBeat(idef, square.pitch, time + tripletTime, i)
        soundBridge.startBeat(idef, square.pitch, time + doubledTripletTime, i)
      }
    }
    Tone.Draw.schedule(function () {
      animateFunc(col, !endcb, songIndex)
    }, time)

    if (endcb && col === (getLength(vm.dataArray[0]) - 1)) {
      endcb(songIndex)
    }
  }
}

var getLength = function (obj) {
  return obj.length || Object.keys(obj).length
}

var makeLoop = function (dataFunc, numCols) {
  var la = []
  for (var i = 0; i < numCols; i++) {
    la.push(i)
  }
  return new Tone.Sequence(dataFunc, la, '16n')
}

export default {
  makeLoop: makeLoop,
  dataFunc: dataFunc,
  startTransport: startTransport,
  changePitch: changePitch,
  stopTransport: stopTransport
}
