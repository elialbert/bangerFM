import Tone from '../tone.js'

Tone.context.latencyHint = 'fastest' // does not switch beats as fast

var waveContext = null
// var waveformGradient
var drawWaveForm = function (values) {
  if (!waveContext) {
    waveContext = $('#waveform')[0].getContext('2d')
  }
  let canvasWidth = 500
  let canvasHeight = 300
  waveContext.clearRect(0, 0, canvasWidth, canvasHeight)
  waveContext.beginPath()
  waveContext.lineJoin = 'round'
  waveContext.lineWidth = 2
  // waveContext.strokeStyle = waveformGradient
  waveContext.moveTo(0, (values[0] / 255) * canvasHeight)
  var len = values.length
  for (var i = 1; i < len; i++) {
    var val = values[i] / 255
    var x = canvasWidth * (i / len)
    var y = val * canvasHeight
    waveContext.lineTo(x, y)
  }
  waveContext.stroke()
}

var newAnalyser = function () {
  return new Tone.Analyser({
    type: 'waveform',
    size: 1024,
    smoothing: 0.4,
    maxDecibels: 10,
    minDecibels: -100
  })
}
var waveform = newAnalyser()

export default {
  analyser: waveform,
  newAnalyser: newAnalyser,
  drawWaveForm: drawWaveForm
}
