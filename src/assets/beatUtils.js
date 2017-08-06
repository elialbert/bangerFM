import soundBridge from './soundBridge'

var getInstrument = function (m) {
  return {
    0: [0],
    1: [1, 2],
    2: [1, 2],
    3: [1, 2],
    4: [3, 5],
    5: [3, 5],
    6: [3, 5],
    7: [4],
    8: [4],
    9: [4]
  }[m]
}

var getTriplet = function (m) {
  if (m === 0) { return 0 }
  return (m - 1) % 3
}

var mReverse = function (instr, t) {
  return {
    '1.1': 1,
    '1.2': 2,
    '1.3': 3,
    '2.1': 1,
    '2.2': 2,
    '2.3': 3,
    '3.1': 4,
    '3.2': 5,
    '3.3': 6,
    '4.1': 7,
    '4.2': 8,
    '4.3': 9,
    '5.1': 4,
    '5.2': 5,
    '5.3': 6
  }[String(instr) + '.' + String(t + 1)]
}

var getDefLookup = function (instr, triplet, beat) {
  return {
    '0.1.0': ['lowSynth', 'oscillatorType'],
    '0.2.0': ['lowSynth', 'tremelo'],
    '1.1.0': ['noise', 'noiseType'],
    '1.2.0': ['noise', 'bffrequency'],
    '2.1.0': ['highDrum', 'oscillatorType'],
    '2.2.0': ['highDrum', 'octaves'],
    '3.1.0': ['mediumDrum', 'oscillatorType'],
    '3.2.0': ['mediumDrum', 'octaves'],
    '4.1.0': ['lowDrum', 'oscillatorType'],
    '4.2.0': ['lowDrum', 'octaves'],
    '5.1.0': ['metal', 'phaser'],
    '5.2.0': ['metal', 'echo'],
    '0.1.1': ['lowSynth', 'autoFilter'],
    '0.2.1': ['lowSynth', 'distortion'],
    '1.1.1': ['noise', 'low'],
    '1.2.1': ['noise', 'bffrequency'],
    '2.1.1': ['highDrum', 'pitchDecay'],
    '2.2.1': ['highDrum', 'echo'],
    '3.1.1': ['mediumDrum', 'attack'],
    '3.2.1': ['mediumDrum', 'echo'],
    '4.1.1': ['lowDrum', 'oscillatorType'],
    '4.2.1': ['lowDrum', 'high'],
    '5.1.1': ['metal', 'volume'],
    '5.2.1': ['metal', 'frequency'],
    '0.1.2': ['lowSynth', 'decay'],
    '0.2.2': ['lowSynth', 'attack'],
    '1.1.2': ['noise', 'low'],
    '1.2.2': ['noise', 'high'],
    '2.1.2': ['highDrum', 'decay'],
    '2.2.2': ['highDrum', 'echo'],
    '3.1.2': ['mediumDrum', 'high'],
    '3.2.2': ['mediumDrum', 'octaves'],
    '4.1.2': ['lowDrum', 'oscillatorType'],
    '4.2.2': ['lowDrum', 'octaves'],
    '5.1.2': ['metal', 'phaser'],
    '5.2.2': ['metal', 'frequency'],
    '0.1.3': ['lowSynth', 'oscillatorType'],
    '0.2.3': ['lowSynth', 'distortion'],
    '1.1.3': ['noise', 'noiseType'],
    '1.2.3': ['noise', 'attack'],
    '2.1.3': ['highDrum', 'high'],
    '2.2.3': ['highDrum', 'low'],
    '3.1.3': ['mediumDrum', 'oscillatorType'],
    '3.2.3': ['mediumDrum', 'echo'],
    '4.1.3': ['lowDrum', 'mid'],
    '4.2.3': ['lowDrum', 'octaves'],
    '5.1.3': ['metal', 'high'],
    '5.2.3': ['metal', 'volume']

  }[String(instr) + '.' + String(triplet) + '.' + String(beat % 4)]
}

var sliderVal = function (def, state) {
  var newVal = (state / 10.0) * (def.end - def.start) + def.start
  if (parseInt(def.step) === def.step) {
    newVal = parseInt(newVal)
  }
  return newVal
}

export default {
  // everything else in this file is landing specific
  transformFBBeat: function (dataArray) {
    if (dataArray && dataArray['.value']) {
      return dataArray['.value']
    }
    return dataArray
  },
  landingClick: function (data, m, n, state) {
    let iindexes = getInstrument(m)
    let beat = n - 1
    let triplet = getTriplet(m)
    let objs = []
    for (let iindex of iindexes) {
      let obj = data[iindex][beat]
      if (state === 0) {
        obj.triplet[triplet] = {state: 0}
        obj.triplet.enabled = false
        if (!(obj.triplet[1] || obj.triplet[2] || obj.triplet[3])) {
          obj.enabled = false
        }
      } else {
        obj.enabled = true
        obj.pitch = 'C3'
        obj.triplet.enabled = true
        obj.triplet[triplet] = {state: state, pitch: soundBridge.pitchFromColor(state)}
      }
      objs.push(obj.triplet[triplet])
    }
    return [objs, iindexes, beat, triplet]
  },
  // triggered per square by firebase
  getState: function (data, m, n) {
    let iindexes = getInstrument(m)
    let beat = n - 1
    let triplet = getTriplet(m)
    return (((data[iindexes[0]][beat] || {}).triplet || {})[triplet] || {}).state
  },
  getCoord: function (instr, triplet) {
    return mReverse(instr, triplet)
  },
  mutateDefs: function (defs, instr, triplet, beat, state) {
    if (triplet === 0) {
      return false
    }
    let defLookup = getDefLookup(instr, triplet, beat)
    let def = defs[defLookup[0]].properties[defLookup[1]]
    def.val = sliderVal(def, state)
    return [defLookup[0], defLookup[1], def.val]
  }
}
