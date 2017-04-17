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
  }
}
