import Tone from '../tone.js'
import BaseInstrument from './base_instrument'

export default class HighSynth extends BaseInstrument {
  constructor () {
    super('C5', '8n')
    this.distortion = this.makeDistortion()
    this.tremelo = this.makeTremelo(700)

    this.instrument = new Tone.FMSynth({
      'harmonicity': 1,
      'modulationIndex': 1,
      'carrier': {
        'oscillator': {
          'type': 'sawtooth4'
        },
        'envelope': {
          'attack': 0.88,
          'decay': 0.02,
          'sustain': 1
        }
      },
      'modulator': {
        'oscillator': {
          'type': 'sine8'
        },
        'envelope': {
          'attack': 0.1,
          'decay': 0.2,
          'sustain': 0.3,
          'release': 0.01
        }
      }
    }).chain(this.tremelo, this.distortion)
  }
}

