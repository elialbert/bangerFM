import Tone from '../tone.js'
import BaseInstrument from './base_instrument'

export default class Metal extends BaseInstrument {
  constructor () {
    super(null, '32n')
    this.feedback = new Tone.Chorus(4, 2.5, 0.5)
    this.distortion = this.makeDistortion()
    this.tremelo2 = this.makeTremelo(800)
    this.instrument = new Tone.MetalSynth({
      'frequency': 448,
      'harmonicity': 12,
      'modulationIndex': 20,
      'resonance': 800,
      'octaves': 0.59,
      'envelope': {
        'attack': 0.001,
        'decay': 0.371,
        'sustain': 0.21
      },
      'volume': -10
    }).chain(this.tremelo2, this.feedback, this.distortion)
  }
}
