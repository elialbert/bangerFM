import soundBridge from './soundBridge'

var getInstrument = function (m) {
  return {
    0: [0],
    1: [1, 2],
    2: [1, 2],
    3: [1, 2],
    4: [3],
    5: [3],
    6: [3],
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
    '4.3': 9
  }[String(instr) + '.' + String(t + 1)]
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
  }
}
