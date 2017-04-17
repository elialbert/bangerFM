import utils from '../assets/instrumentUtils'
import Bass from '../assets/instruments/bass'
import MediumSynth from '../assets/instruments/mediumSynth'
import HighSynth from '../assets/instruments/highSynth'
import Noise from '../assets/instruments/noise'
import HighDrum from '../assets/instruments/highDrum'
import MediumDrum from '../assets/instruments/mediumDrum'
import LowDrum from '../assets/instruments/lowDrum'
// import Pluck from '../assets/instruments/pluck'
import Bell from '../assets/instruments/bell'
import sampler from '../assets/instruments/sampler'
import Tone from './tone.js'

var ms
var bass
var noise
// var noise2
var highDrum
var mediumDrum
var lowDrum
// var pluck
var bell
var highsynth
// var ride
// var backgroundSynth

var constructInstruments = function () {
  ms = new MediumSynth()
  bass = new Bass()
  noise = new Noise()
  // noise2 = new Noise()
  highDrum = new HighDrum()
  mediumDrum = new MediumDrum()
  lowDrum = new LowDrum()
  // pluck = new Pluck()
  bell = new Bell()
  highsynth = new HighSynth()
  // ride = new MediumDrum()
  // backgroundSynth = new MediumSynth()
}
constructInstruments()

var reconstructInstruments = function (cb) {
  let audioContext = new window.AudioContext()
  Tone.context.close().then(() => {
    Tone.setContext(audioContext)
    constructInstruments()
    cb()
  })
}

var instrumentLookup = function (index) {
  return {
    0: ms,
    1: bass,
    2: noise,
    3: highDrum,
    4: mediumDrum,
    5: lowDrum,
    6: bell,
    7: undefined, // pluck
    8: sampler,
    9: highsynth
    // 10: noise2,
    // 11: ride,
    // 12: backgroundSynth
  }[index]
}

var constructWatchers = function (defs, run) {
  var watchers = {}
  for (let key in defs) {
    let pstringStart = 'defs.' + key + '.properties.'
    let idef = defs[key]
    let instrument = instrumentLookup(idef.instrumentIndex)
    if (!instrument) { continue }
    if (idef.sampler) {
      sampler.makeSampler(idef.sampler, idef.index)
    }
    for (let propKey in idef.properties) {
      let pdef = idef.properties[propKey]
      let secondary = null
      if (!idef.sampler) {
        secondary = instrument[pdef.instrumentSubName] || instrument.instrument[pdef.instrumentSubName] || instrument.instrument
      } else {
        secondary = sampler.getSampler(idef.index)[pdef.instrumentSubName || 'instrument']
      }
      let propName = pdef.propName || propKey
      let pstring = pstringStart + propKey + '.val'
      watchers[pstring] = function (val) {
        if (!pdef.propType) {
          if (idef.sampler && propName === 'volume') {
            secondary.volume._param.value = val
          } else if (idef.name === 'metal' && propName === 'volume') {
            instrument.osc1.volume.value = val
            instrument.osc2.volume.value = val
          } else if (idef.name === 'metal' && propName === 'frequency') {
            instrument.osc1.frequency.value = val
            instrument.osc2.frequency.value = val - 260
          } else {
            secondary.set(propName, val)
          }
        } else if (pdef.propType === 'oscillator') {
          setOscType(val, secondary, pdef.propKey)
        } else if (pdef.propType === 'noiseType') {
          secondary.type = utils.getNoiseType(val)
        } else if (pdef.propType === 'eq') {
          let vals = { 'low': idef.properties.low.val, 'mid': idef.properties.mid.val, 'high': idef.properties.high.val }
          vals[propName] = val
          instrument.setEQ(vals.low, vals.mid, vals.high)
        }
      }
      if (run) {
        watchers[pstring](pdef.val)
      }
    }
  }
  return watchers
}

var startSound = function (selected, index) {
  instrumentLookup(selected).start(index)
}
var stopSound = function (selected, index) {
  instrumentLookup(selected).stop(index)
}
var startBeat = function (selected, note, time, index) {
  if (selected === 8) {
    note = utils.pitchToOffset(note)
  } else if (selected === 1 || selected === 5) {
    note = utils.PITCHES[Math.max(0, utils.PITCHES.indexOf(note) - 12)]
  } else if (selected === 3 || selected === 9) {
    note = utils.PITCHES[Math.min(utils.PITCHES.length - 1, utils.PITCHES.indexOf(note) + 12)]
  }
  try {
    instrumentLookup(selected).beat(note, time, index)
  } catch (err) {
    console.log(err)
  }
}

var setOscType = function (val, instrument, property) {
  var obj
  if (!property) {
    obj = instrument
  } else {
    obj = instrument[property]
  }
  obj.oscillator.set('type', utils.getOscillatorType(val))
}

var randomize = function (defs, deep, selected) {
  let deepKey
  if (deep) {
    deepKey = utils.getInstrumentByIndex(defs, selected)
  }
  for (let key in defs) {
    if (deep) { // in deep mode only randomize that instrument
      if (deepKey !== key) {
        continue
      }
    }
    let idef = defs[key]
    for (let propKey in idef.properties) {
      if (propKey === 'volume') {
        continue
      }
      let propInfo = idef.properties[propKey]
      propInfo.val = Math.random() * (propInfo.end - propInfo.start) + propInfo.start
      propInfo.val = parseFloat(propInfo.val.toFixed(precision(propInfo.step)))
    }
  }
  return defs
}

var precision = function (a) {
  if (!isFinite(a)) return 0
  var e = 1
  var p = 0
  while (Math.round(a * e) / e !== a) {
    e *= 10
    p++
  }
  return p
}

export default {
  constructWatchers: constructWatchers,
  reconstructInstruments: reconstructInstruments,
  startSound: startSound,
  stopSound: stopSound,
  startBeat: startBeat,
  watchers: constructWatchers,
  randomize: randomize
}
