var basicLineLength = 280

var lineVal = function (start, val) {
  return start + val * basicLineLength
}

export default {
  defaultEnvelopeVal: function (propName) {
    return {
      attack: 0.88,
      decay: 0.22,
      sustain: 0.6,
      release: 0.2
    }[propName]
  },
  lineCoords: function (propName, storedVal, vals, curCoords) {
    let val = storedVal === undefined ? vals[propName] : storedVal
    let x1, y1, x2, y2
    switch (propName) {
      case 'attack':
        x1 = 0
        y1 = 150
        x2 = lineVal(0, val)
        y2 = 50
        break
      case 'decay':
        x1 = curCoords.attack.x2
        y1 = curCoords.attack.y2
        x2 = lineVal(x1, val)
        y2 = 150 - vals.sustain * 100
        break
      case 'sustain':
        x1 = curCoords.decay.x2
        y1 = 150 - val * 100
        x2 = x1 + 100
        y2 = y1
        break
      case 'release':
        x1 = curCoords.sustain.x2
        y1 = curCoords.sustain.y2
        x2 = lineVal(x1, val)
        y2 = 150
        break
    }
    let coords = {x1: x1, y1: y1, x2: x2, y2: y2}
    return coords
  },
  coordsToString: function (coords) {
    return coords.x1 + ',' + coords.y1 + ' ' + coords.x2 + ',' + coords.y2
  }
}
