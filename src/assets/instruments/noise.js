import Tone from '../tone.js'
import BaseInstrument from './base_instrument'

export default class Noise extends BaseInstrument {
  constructor () {
    super(null, '8n')
    this.instrument = new Tone.AmplitudeEnvelope({
      'attack': 0.001,
      'decay': 0.071,
      'sustain': 0
    })
    this.compressor = new Tone.Compressor({
      threshold: -30,
      ratio: 6,
      attack: 0.01,
      release: 0.4
    })

    this.noise = new Tone.Noise('pink')

    this.noiseFilter = new Tone.Filter({
      'frequency': 20000,
      'Q': 8
    })

    this.noise.chain(this.compressor, this.noiseFilter, this.instrument)
    this.noise.start()
  }
}
