import Tone from '../tone.js'
import waveform from './waveform'

export default class BaseInstrument {
  constructor (startNote, noteLength) {
    this.startNote = startNote
    this.noteLength = noteLength
  }

  start () {
    if (!window.location.href.includes('landing')) {
      this.waveLoop()
      this.instrument.connect(waveform.analyser)
    }
    if (!this.startNote) {
      this.instrument.triggerAttack('+0.05')
    } else {
      this.instrument.triggerAttack(this.startNote, '+0.05')
    }
  }

  stop () {
    this.instrument.triggerRelease()
    waveform.analyser.dispose()
    waveform.analyser = waveform.newAnalyser()
  }

  waveLoop () {
    var that = this
    window.requestAnimationFrame(function () {
      that.waveLoop()
    })
    var waveformValues = waveform.analyser.analyse()
    waveform.drawWaveForm(waveformValues)
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
