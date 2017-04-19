import Tonal from 'tonal'

var getOscillatorType = function (val) {
  return {
    1: 'square2',
    2: 'sine2',
    3: 'triangle2',
    4: 'sawtooth2',
    5: 'square4',
    6: 'sine4',
    7: 'triangle4',
    8: 'sawtooth4',
    9: 'square8',
    10: 'sine8',
    11: 'triangle8',
    12: 'sawtooth8',
    13: 'square12',
    14: 'sine12',
    15: 'sawtooth12',
    16: 'triangle12'
  }[val]
}

var getNoiseType = function (val) {
  return {
    1: 'white',
    2: 'white',
    3: 'pink',
    4: 'pink',
    5: 'brown',
    6: 'brown'
  }[val]
}

// TODO!
var innerDataArrayObj = function () {
  var pitch = 'C3'

  return {
    enabled: false,
    pitch: pitch,
    triplet: {enabled: false},
    measureSub: false,
    e1: false,
    e2: false
  }
}

var qTimeLookup = function (perMeasure) {
  return {
    '3 Beats': '8t',
    '4 Beats': undefined,
    '5 Beats': undefined
  }[perMeasure]
}

var pitchKeys = ['C Major', 'G Major', 'C Minor Blues', 'G Minor Blues']

var makePitchKeyOptions = function () {
  var r = []
  for (let pkey of pitchKeys) {
    r.push({value: pkey})
  }
  return r
}

var createDataArray = function (perMeasure = 4, numInstruments = 12, pitchKey = 'C Major') {
  var numCols = calcNumCols(perMeasure)
  var a = {}
  for (var i = 0; i < numInstruments; i++) {
    var inner = {}
    for (var j = 0; j < numCols; j++) {
      inner[j] = innerDataArrayObj()
    }
    a[i] = inner
  }
  a.perMeasure = perMeasure
  a.pitchKey = pitchKey
  return a
}

var createSongArray = function () {
  return {0: {0: 0, 1: 1, 2: 0, 3: 1}, 1: {}, 2: {}, 3: {}, 4: {}}
}

var calcNumCols = function (perMeasure) {
  return (perMeasure * 8 <= 32) ? perMeasure * 8 : perMeasure * 4
}

var getInstrumentByIndex = function (defs, index) {
  return Object.keys(defs).find(function (key) {
    return defs[key].index === index
  })
}

var transposeNote = function (note, direction) {
  let intervals
  if (direction === 'up') {
    intervals = ['P16', 'P8', 'P1']
  } else {
    intervals = ['P-16', 'P-8', 'P1']
  }
  for (let interval of intervals) {
    let attempt = Tonal.transpose(note, interval)
    if (attempt) { return attempt }
  }
  return note
}

var randomPitchForKey = function (pitchKey, selected) {
  let notes = Tonal.scale(pitchKey.toLowerCase())
  let choice = notes[Math.floor(Math.random() * notes.length)]
  let octave = [2, 3, 4][Math.floor(Math.random() * 3)]
  let note = choice + octave
  if (selected === 1 || selected === 5) {
    note = transposeNote(note, 'down')
  } else if (selected === 3 || selected === 9) {
    note = transposeNote(note, 'up')
  }
  return note
}

var createRandomIBeat = function (perMeasure, randomize = true, pitchKey, instrumentIndex) {
  let numCols = calcNumCols(perMeasure)
  var inner = {}
  for (var j = 0; j < numCols; j++) {
    inner[j] = innerDataArrayObj()
    if (randomize) {
      inner[j].enabled = !!(Math.random() < 0.3)
      inner[j].pitch = randomPitchForKey(pitchKey, instrumentIndex)
    }
  }
  return inner
}

var createRandomIPitch = function (selectedArray, pitchKey, instrumentIndex) {
  for (var j = 0; j < Object.keys(selectedArray).length; j++) {
    let obj = selectedArray[j]
    if (obj.enabled) {
      obj.pitch = randomPitchForKey(pitchKey, instrumentIndex)
    }
  }
  return selectedArray
}

export default {
  getOscillatorType: getOscillatorType,
  getNoiseType: getNoiseType,
  createDataArray: createDataArray,
  createSongArray: createSongArray,
  innerDataArrayObj: innerDataArrayObj,
  calcNumCols: calcNumCols,
  getInstrumentByIndex: getInstrumentByIndex,
  createRandomIBeat: createRandomIBeat,
  createRandomIPitch: createRandomIPitch,
  qTimeLookup: qTimeLookup,
  pitchKeys: pitchKeys,
  pitchKeyOptions: makePitchKeyOptions,
  transposeNote: transposeNote
}
