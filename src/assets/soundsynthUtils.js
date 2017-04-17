var sortDefs = function (d) {
  if (Object.keys(d).length < 3) {
    return {}
  }
  return Object.keys(d).sort((a, b) => {
    return d[a].index - d[b].index
  })
}
export default {
  checkDefs: function (d) {
    if (Object.keys(d).length < 3) {
      return {}
    }
    return d
  },
  sortDefs: sortDefs,
  createIDefLookup: function (d) {
    let keys = sortDefs(d)
    var r = {}
    let index = 0
    for (var i = 0; i < keys.length; i++) {
      let key = keys[i]
      r[index] = d[key].instrumentIndex
      index++
    }
    return r
  }
}
