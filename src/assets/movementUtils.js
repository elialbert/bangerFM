import iutils from './instrumentUtils'

export default {
  moveRight: function (selected, numCols) {
    return [Math.min(numCols - 1, selected[0] + 1), selected[1]]
  },
  moveLeft: function (selected) {
    return [Math.max(0, selected[0] - 1), selected[1]]
  },
  moveDown: function (selected, numRows) {
    return [selected[0], Math.min(numRows, selected[1] + 1)]
  },
  moveUp: function (selected) {
    return [selected[0], Math.max(0, selected[1] - 1)]
  },
  autoFill: function (direction, selected, data, history, pitchKey, instrumentIndex) {
    let historyKey = `${selected[0]}-${selected[1]}-${direction}`
    let idirection = direction === 'moveRight' ? 1 : -1
    let final = idirection === 1 ? Object.keys(data[0]).length - selected[0] : selected[0] + 1
    history = history[historyKey] || 1
    for (var i = 0; i < final; i++) {
      if (i % history === 0) {
        data[selected[1]][selected[0] + i * idirection].enabled = true
        data[selected[1]][selected[0] + i * idirection].pitch = iutils.newPitch(pitchKey, instrumentIndex)
      } else {
        data[selected[1]][selected[0] + i * idirection].enabled = false
        data[selected[1]][selected[0] + i * idirection].pitch = false
      }
    }
    var newHistory = {}
    newHistory[historyKey] = history + 1
    return {
      data: data,
      history: newHistory
    }
  },
  switchView: function (visible, direction) {
    if (visible === 'soundsynth' && direction === 'moveUp') {
      return 'soundsynth'
    }
    if (visible === 'soundsynth' && direction === 'moveDown') {
      return 'beatmaker'
    }
    if (visible === 'beatmaker' && direction === 'moveUp') {
      return 'soundsynth'
    }
    if (visible === 'beatmaker' && direction === 'moveDown') {
      return 'songmaker'
    }
    if (visible === 'songmaker' && direction === 'moveUp') {
      return 'beatmaker'
    }
    if (visible === 'songmaker' && direction === 'moveDown') {
      return 'songmaker'
    }
  },
  fixNullSong: function (songData) {
    for (let i = 0; i < 5; i++) {
      if (songData[i] === undefined) {
        songData[i] = []
      }
    }
    return songData
  },
  sdKeys: function (songData, selected) {
    return Object.values(songData[selected[1]])
  },
  perMeasureOffsets: function (selected, perMeasure) {
    return [selected % perMeasure, perMeasure - selected % perMeasure]
  }
}
