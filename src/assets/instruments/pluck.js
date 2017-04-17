import Tone from '../tone.js'
import BaseInstrument from './base_instrument'

export default class Pluck extends BaseInstrument {
  constructor () {
    super('C3', '32n')
    this.echo = this.makeEcho()
    this.distortion = this.makeDistortion()
    this.phaser = new Tone.Phaser({
      'frequency': 5,
      'octaves': 5
    })

    this.instrument = new Tone.PluckSynth({
      'dampening': 1585,
      'resonance': 0.88,
      'attackNoise': 0.95,
      'envelope': {
        'attack': 0.511,
        'decay': 0.0289,
        'sustain': 0
      },
      'volume': -10
    }).chain(this.phaser, this.echo, this.distortion)
  }
}
