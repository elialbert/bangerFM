var getInstrument = function (m) {
  return {
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
  return {
    0: 'first',
    1: 'second',
    2: 'third'
  }[(m - 1) % 3]
}

export default {
  transformFBBeat: function (dataArray) {
    if (dataArray && dataArray['.value']) {
      return dataArray['.value']
    }
    return dataArray
    // return dataArray.map(function (el) {
    //   if (el['.value']) {
    //     return el['.value']
    //   } else {
    //     return el
    //   }
    // })
  },
  landingClick: function (data, m, n, state) {
    let iindexes = getInstrument(m)
    let beat = n - 1
    let triplet = getTriplet(m)
    console.log(iindexes, beat, triplet)

    for (let iindex of iindexes) {
      console.log('setting', iindex)
      let obj = data[iindex][beat]
      if (state === 0) {
        obj.triplet[triplet] = null
        if (!(obj.triplet.first || obj.triplet.second || obj.triplet.third)) {
          obj.enabled = false
        }
      } else {
        obj.enabled = true
        obj.pitch = 'C3'
        obj.triplet.enabled = true
        obj.triplet[triplet] = true
      }
    }
  },
  getState: function (data, m, n) {
    let iindexes = getInstrument(m)
    let beat = n - 1
    let triplet = getTriplet(m)
    return data[iindexes[0]][beat].triplet && data[iindexes[0]][beat].triplet[triplet] && 1
  }
}
