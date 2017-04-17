import Tone from '../tone.js'
import BaseInstrument from './base_instrument'

export default class Bell extends BaseInstrument {
  constructor () {
    super(null, '8n')
    this.echo = this.makeEcho()
    this.distortion = this.makeDistortion()
    this.filter = this.makeFilter()
    this.instrument = new Tone.AmplitudeEnvelope({
      'attack': 0.001,
      'decay': 0.071,
      'sustain': 0
    })
    this.phaser = new Tone.Phaser({
      'frequency': 500,
      'octaves': 2
    })
    this.osc1 = new Tone.Oscillator(800, 'square').start()
    this.osc2 = new Tone.Oscillator(540, 'square').start()
    this.filter = new Tone.Filter(200, 'bandpass')
    this.gain = new Tone.Gain()
    this.osc1.connect(this.gain)
    this.osc2.connect(this.gain)
    this.gain.chain(this.filter, this.instrument, this.distortion, this.phaser, this.echo)
  }
}

