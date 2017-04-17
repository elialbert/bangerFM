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

export default class BaseInstrument {
  constructor (startNote, noteLength) {
    this.startNote = startNote
    this.noteLength = noteLength
  }

  start () {
    this.waveLoop()
    this.instrument.connect(waveform)

    if (!this.startNote) {
      this.instrument.triggerAttack('+0.05')
    } else {
      this.instrument.triggerAttack(this.startNote, '+0.05')
    }
    // if (this.hasOwnProperty('noiseEnv')) {
    //   this.noiseEnv.triggerAttack('+0.05')
    // }
  }

  stop () {
    this.instrument.triggerRelease()
    // if (this.hasOwnProperty('noiseEnv')) {
    //   this.noiseEnv.triggerRelease()
    // }
    waveform.dispose()
    waveform = newAnalyser()
  }

  waveLoop () {
    var that = this
    window.requestAnimationFrame(function () {
      that.waveLoop()
    })
    var waveformValues = waveform.analyse()
    drawWaveForm(waveformValues)
  }

  beat (note, time) {
    if (!this.startNote) {
      this.instrument.triggerAttackRelease(this.noteLength, time)
    } else {
      this.instrument.triggerAttackRelease(note, this.noteLength, time)
    }
    if (this.hasOwnProperty('noiseEnv')) {
      this.noiseEnv.triggerAttackRelease(this.noteLength, time)
    }
  }

  newEQ (low, mid, high) {
    return new Tone.EQ3({
      low: low,
      mid: mid,
      high: high,
      lowFrequency: 700,
      highFrequency: 1500
    })
  }

  setEQ (low, mid, high) {
    if (this.eq) {
      this.eq.disconnect()
      this.eq.dispose()
    }
    this.eq = this.newEQ(low, mid, high).toMaster()
    this.instrument.connect(this.eq)
  }

  makeTremelo (freq) {
    return new Tone.Tremolo({
      frequency: 100,
      type: 'sine',
      depth: 1,
      spread: 15,
      wet: 0
    }).toMaster().start()
  }

  makeEcho (wet = 0.1) {
    return new Tone.FeedbackDelay({
      delayTime: 0,
      maxDelayTime: 1,
      feedback: 0.35,
      wet: wet
    }).toMaster()
  }

  makeCompresser () {
    return new Tone.Compressor({
      threshold: -30,
      ratio: 6,
      attack: 0.01,
      release: 0.4
    }).toMaster()
  }

  makeDistortion (val = 0.6) {
    return new Tone.Distortion({
      distortion: val,
      oversample: '2x',
      wet: 0
    }).toMaster()
  }

  makeFilter (ftype = 'sine') {
    return new Tone.AutoFilter({
      wet: 1,
      frequency: 200,
      type: 'sine',
      depth: 1,
      baseFrequency: 200,
      octaves: 6,
      filter: {
        type: 'lowpass',
        rolloff: -12,
        Q: 1
      }
    }).toMaster().start()
  }
}
