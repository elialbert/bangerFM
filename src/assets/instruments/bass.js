import Tone from '../tone.js'
import BaseInstrument from './base_instrument'

export default class Bass extends BaseInstrument {
  constructor () {
    super('C1', '8n')
    this.tremelo = this.makeTremelo(100)
    this.distortion = this.makeDistortion()
    this.filter = this.makeFilter()
    this.instrument = new Tone.MonoSynth({
      volume: -5,
      frequency: 'C2',
      oscillator: {
        type: 'square4'
      },
      envelope: {
        attack: 0.005,
        decay: 0.9,
        sustain: 0.9,
        release: 1
      }
    }).chain(this.filter, this.tremelo, this.distortion)
  }
}
