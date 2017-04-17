import Tone from '../tone.js'
import BaseInstrument from './base_instrument'

export default class LowDrum extends BaseInstrument {
  constructor () {
    super('C1', '8n')
    this.compressor = this.makeCompresser()
    this.instrument = new Tone.MembraneSynth({
      'pitchDecay': 0.011,
      'octaves': 0.3,
      'oscillator': {
        'type': 'square4'
      },
      'envelope': {
        'attack': 0.011,
        'decay': 0.2325,
        'sustain': 0.05
      },
      'volume': -10
    }).connect(this.compressor)
  }
}
