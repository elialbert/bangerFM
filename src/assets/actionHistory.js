var historyArray = []
var historyIndex = 0

var getMessage = function (objType, key) {
  let message
  switch (objType) {
    case 'ss':
      message = 'Change to Sound Synth bank ' + (key + 1)
      break
    case 'bm':
      message = 'Change to Beat bank ' + (key + 1)
      break
    case 'generic_songData':
      message = 'Change to Song order'
      break
    case 'generic_CPDef':
      message = 'Change to control panel'
      break
  }
  return message
}

var push = function (objType, key, obj) {
  let toStore = {
    objType: objType,
    obj: obj,
    key: key,
    message: getMessage(objType, key)
  }
  historyArray.push(toStore)
  if (historyArray.length > 10) {
    historyArray = historyArray.slice(historyArray.length - 10, historyArray.length)
  }
  historyIndex = historyArray.length
}

var redo = function () {
  if (historyIndex < historyArray.length) {
    historyIndex += 1
  } else {
    return
  }
  let toRestore = historyArray[historyIndex - 1]
  if (!toRestore) { return }
  toRestore.message = 'Redoing ' + toRestore.message
  return toRestore
}

var undo = function () {
  if (historyIndex === 0) { return }
  historyIndex -= 1
  let toRestore = historyArray[historyIndex - 1]
  if (!toRestore) { return }
  toRestore.message = 'Undoing ' + toRestore.message
  return toRestore
}

export default {
  historyArray: historyArray,
  push: push,
  redo: redo,
  undo: undo
}
