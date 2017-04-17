import Tone from '../tone.js'
import BaseInstrument from './base_instrument'

export default class MediumDrum extends BaseInstrument {
  constructor () {
    super('C1', '32n')
    this.echo = this.makeEcho()
    this.compressor = this.makeCompresser()

    this.instrument = new Tone.MembraneSynth({
      'pitchDecay': 0.16,
      'octaves': 1.01,
      'oscillator': {
        'type': 'square8'
      },
      'envelope': {
        'attack': 0.001,
        'decay': 0.0382,
        'sustain': 0
      },
      'volume': -5
    }).chain(this.compressor, this.echo)
  }
}
