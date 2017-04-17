import Tone from '../tone.js'
import BaseInstrument from './base_instrument'

export default class HighDrum extends BaseInstrument {
  constructor () {
    super('C5', '16n')
    this.echo = this.makeEcho()
    this.compressor = this.makeCompresser()

    // this.noiseEnv = new Tone.AmplitudeEnvelope({
    //   'attack': 0.001,
    //   'decay': 0.41,
    //   'sustain': 0.1,
    //   'release': 0.6
    // })
    // this.noise = new Tone.Noise('white')
    // this.noise.chain(this.noiseEnv, this.distortion)
    // this.noise.volume.value = -65
    // this.noise.start()

    this.instrument = new Tone.MembraneSynth({
      'pitchDecay': 0.01,
      'octaves': 5,
      'oscillator': {
        'type': 'square4'
      },
      'envelope': {
        'attack': 0.011,
        'decay': 0.2325,
        'sustain': 0.05
      },
      'volume': -10
    }).chain(this.compressor, this.echo)
  }
}
