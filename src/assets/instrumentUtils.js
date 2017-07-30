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

var innerDataArrayObj = function () {
  return {
    enabled: false,
    pitch: false,
    triplet: {enabled: false},
    measureSub: false,
    e1: false,
    e2: false
  }
}

var simpleInstruments = function (defs) {
  let result = {}
  for (let def of Object.keys(defs)) {
    if (['highDrum', 'lowDrum', 'mediumDrum', 'noise', 'lowSynth'].indexOf(def) > -1) {
      result[def] = defs[def]
    }
  }
  return result
}

var qTimeLookup = function (perMeasure) {
  return {
    '3 Beats': '8t',
    '4 Beats': false,
    '5 Beats': false
  }[perMeasure]
}

function getRandomArrayElements (arr, count) {
  var shuffled = arr.slice(0)
  var i = arr.length
  var min = i - count
  var temp
  var index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}

var onlyUnique = function (value, index, self) {
  return self.indexOf(value) === index
}

var pitchKeys = [
  'C Major', 'G Major', 'C Minor Blues', 'G Minor Blues',
  'C Melodic Minor', 'G Melodic Minor', 'C Chromatic',
  'C in-sen', 'G Altered', 'F Hirajoshi'
]

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
  if (window.LANDINGMODE) {
    return 16
  }
  return (perMeasure * 8 <= 32) ? perMeasure * 8 : perMeasure * 4
}

var getInstrumentByIndex = function (defs, index) {
  return Object.keys(defs).find(function (key) {
    return defs[key].index === index
  })
}

var transposeBeat = function (data, newKey, oldKey) {
  let newScale = Tonal.scale(newKey.toLowerCase())
  let oldScale = Tonal.scale(oldKey.toLowerCase())
  let intervals = {}
  for (let index in oldScale) {
    intervals[oldScale[index]] = Tonal.interval(oldScale[index], newScale[index] || newScale[newScale.length - 1])
  }
  // note the - 2 here: bug waiting to happen
  for (var i = 0; i < Object.keys(data).length - 2; i++) {
    for (var j = 0; j < Object.keys(data[i]).length; j++) {
      let square = data[i][j]
      if (square.enabled) {
        let octave = Tonal.note.oct(square.pitch)
        let newNote = Tonal.transpose(Tonal.note.pc(square.pitch), intervals[Tonal.note.pc(square.pitch)])
        if (newNote) { square.pitch = (newNote + octave) }
      }
    }
  }

  return data
}

var transposeNote = function (note, direction) {
  let intervals
  if (direction === 'up') {
    intervals = ['P15', 'P8', 'P1']
  } else {
    intervals = ['P-15', 'P-8', 'P1']
  }
  for (let interval of intervals) {
    let attempt = Tonal.transpose(note, interval)
    if (attempt) { return attempt }
  }
  return note
}

var doTransposeForInstrument = function (note, selected) {
  if (selected === 1 || selected === 5) {
    note = transposeNote(note, 'down')
  } else if (selected === 3 || selected === 9) {
    note = transposeNote(note, 'up')
  }
  return note
}

var newPitch = function (pitchKey, selected) {
  return doTransposeForInstrument(Tonal.scale(pitchKey.toLowerCase())[0] + '3', selected)
}

var randomPitchForKey = function (pitchKey, selected) {
  let notes = Tonal.scale(pitchKey.toLowerCase())
  let choice = notes[Math.floor(Math.random() * notes.length)]
  let octave = 3 // [3][Math.floor(Math.random() * 3)] // maybe do more here?
  let note = choice + octave
  note = doTransposeForInstrument(note, selected)
  return note
}

var noteFromScale = function (noteNum) {
  let notes = Tonal.scale('c minor blues')
  let choice = notes[noteNum % notes.length]
  let note = choice + 3
  return doTransposeForInstrument(note, 1)
}

var chooseRandomMeasureSubs = function (vm, data) {
  let toChange = getRandomArrayElements(Object.keys(data), parseInt(Object.keys(data).length / 5))
  let toChangeAll = []
  for (let i of toChange) {
    toChangeAll.push(vm.$refs.beatmakerdeep.getTimingChange(i))
  }
  toChangeAll = Array.prototype.concat(...toChangeAll).filter(onlyUnique)
  for (let i of toChangeAll) {
    if (data[i].measureSub) {
      data[i].measureSub = false
    } else {
      data[i].measureSub = '8t'
    }
  }
  return data
}

var createNewIBeat = function (randomize, vm) {
  let pitchKey = vm.pitchKey
  let perMeasure = vm.perMeasure
  let data = vm.dataArray[vm.selected[1]]
  let instrumentIndex = vm.idefLookup[vm.selected[1]].iindex
  let numCols = calcNumCols(perMeasure)
  let activeDeep = vm.deep && vm.$refs.beatmakerdeep.active
  var inner = {}

  // maintain or randomize measuresub in normal randomize mode?
  let maintainMeasureSub = activeDeep && activeDeep !== 'Timing'
  let maintainPitch = activeDeep && activeDeep !== 'Pitch'
  let maintainVolume = activeDeep !== 'Volume' // leave vol alone in main randomize
  let maintainProbability = activeDeep !== 'Probability' // no probability in main randomize
  let maintainEnabled = activeDeep

  for (var j = 0; j < numCols; j++) {
    let curSquare = data[j]
    inner[j] = innerDataArrayObj()
    let newSquare = inner[j]
    if (randomize) {
      newSquare.enabled = maintainEnabled ? curSquare.enabled : !!(Math.random() < 0.3)
      newSquare.pitch = maintainPitch ? curSquare.pitch : newSquare.enabled && randomPitchForKey(pitchKey, instrumentIndex)
      newSquare.measureSub = maintainMeasureSub ? curSquare.measureSub : false // will randomize after loop
      newSquare.triplet.enabled = maintainMeasureSub ? newSquare.triplet.enabled : !!(Math.random() < 0.3)
      newSquare.e2 = maintainProbability ? curSquare.e2 : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10][Math.floor(Math.random() * 10)]
    } else {
      newSquare.enabled = maintainEnabled ? curSquare.enabled : newSquare.enabled
      newSquare.pitch = maintainPitch ? curSquare.pitch : newSquare.enabled && newPitch(pitchKey, instrumentIndex)
      newSquare.measureSub = maintainMeasureSub ? curSquare.measureSub : false
      newSquare.e1 = activeDeep && maintainVolume ? curSquare.e1 : false // always clear vol except in bmdeep vol
      newSquare.e2 = activeDeep && maintainProbability ? curSquare.e2 : false // always clear probability except in bmdeep prob
    }
  }
  if (randomize && activeDeep === 'Timing') {
    inner = chooseRandomMeasureSubs(vm, inner)
  }
  return inner
}

export default {
  getOscillatorType: getOscillatorType,
  getNoiseType: getNoiseType,
  createDataArray: createDataArray,
  createSongArray: createSongArray,
  innerDataArrayObj: innerDataArrayObj,
  calcNumCols: calcNumCols,
  getInstrumentByIndex: getInstrumentByIndex,
  createNewIBeat: createNewIBeat,
  qTimeLookup: qTimeLookup,
  pitchKeys: pitchKeys,
  pitchKeyOptions: makePitchKeyOptions,
  newPitch: newPitch,
  noteFromScale: noteFromScale,
  transposeBeat: transposeBeat,
  doTransposeForInstrument: doTransposeForInstrument,
  onlyUnique: onlyUnique,
  simpleInstruments: simpleInstruments
}
