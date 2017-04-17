export default {
  mediumSynth: {
    name: 'mediumSynth',
    index: 0,
    instrumentIndex: 0,
    properties: {
      volume: {
        val: 0,
        start: -10,
        end: 10,
        step: 1,
        name: 'volume'
      },
      modulationIndex: {
        val: 0,
        start: 1,
        end: 100,
        step: 5,
        name: 'modulationIndex'
      },
      harmonicity: {
        val: 1,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'harmonicity'
      },
      oscillatorType: {
        val: 14,
        start: 1,
        end: 16,
        step: 1,
        name: 'oscillatorType',
        propType: 'oscillator',
        propKey: '_carrier'
      },
      modOscillatorType: {
        val: 14,
        start: 1,
        end: 16,
        step: 1,
        name: 'modOscillatorType',
        propType: 'oscillator',
        propKey: '_modulator'
      }
    }
  },
  lowSynth: {
    name: 'lowSynth',
    index: 1,
    instrumentIndex: 1,
    properties: {
      volume: {
        val: 5,
        start: 5,
        end: 20,
        step: 1,
        name: 'volume'
      },
      oscillatorType: {
        val: 1,
        start: 1,
        end: 16,
        step: 1,
        propType: 'oscillator',
        name: 'oscillatorType'
      },
      distortion: {
        val: 1,
        start: 1,
        end: 100,
        step: 5,
        name: 'distortion',
        instrumentSubName: 'distortion',
        propName: 'order'
      }
    }
  },
  noise: {
    name: 'noise',
    index: 2,
    instrumentIndex: 2,
    properties: {
      volume: {
        val: 5,
        start: -10,
        end: 20,
        step: 1,
        name: 'volume',
        instrumentSubName: 'vol'
      },
      bffrequency: {
        val: 20000,
        name: 'bass frequency cutoff',
        start: 1,
        end: 20000,
        step: 2000,
        instrumentSubName: 'noiseFilter',
        propName: 'frequency'
      },
      noiseType: {
        val: 1,
        start: 1,
        end: 6,
        step: 1,
        instrumentSubName: 'noise',
        propType: 'noiseType',
        name: 'noiseType'
      }
    }
  },
  highDrum: {
    name: 'highDrum',
    index: 3,
    instrumentIndex: 3,
    properties: {
      volume: {
        val: 10,
        start: 0,
        end: 20,
        step: 1,
        name: 'volume'
      },
      modulationIndex: {
        val: 0,
        start: 1,
        end: 100,
        step: 5,
        name: 'modulationIndex'
      },
      harmonicity: {
        val: 1,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'harmonicity'
      },
      oscillatorType: {
        val: 5,
        start: 1,
        end: 16,
        step: 1,
        propType: 'oscillator',
        name: 'oscillatorType'
      }
    }
  },
  mediumDrum: {
    name: 'mediumDrum',
    index: 4,
    instrumentIndex: 4,
    properties: {
      volume: {
        val: 0,
        start: -10,
        end: 10,
        step: 1,
        name: 'volume'
      },
      pitchDecay: {
        val: 0.16,
        start: 0.001,
        end: 1,
        step: 0.05,
        name: 'pitchDecay'
      },
      octaves: {
        val: 1.01,
        start: 0.001,
        end: 4,
        step: 0.2,
        name: 'octaves'
      },
      oscillatorType: {
        val: 9,
        start: 1,
        end: 16,
        step: 1,
        propType: 'oscillator',
        name: 'oscillatorType'
      },
      echo: {
        val: 0,
        start: 0,
        end: 1,
        step: 0.1,
        instrumentSubName: 'echo',
        name: 'echo',
        propName: 'delayTime'
      }
    }
  },
  lowDrum: {
    name: 'lowDrum',
    index: 5,
    instrumentIndex: 5,
    properties: {
      volume: {
        val: 10,
        start: 0,
        end: 15,
        step: 1,
        name: 'volume'
      },
      pitchDecay: {
        val: 0.4509,
        start: 0.001,
        end: 1,
        step: 0.05,
        name: 'pitchDecay'
      },
      octaves: {
        val: 2.6,
        start: 0.2,
        end: 3,
        step: 0.2,
        name: 'octaves'
      },
      oscillatorType: {
        val: 3,
        start: 1,
        end: 16,
        step: 1,
        propType: 'oscillator',
        name: 'oscillatorType'
      }
    }
  },
  metal: {
    name: 'metal',
    index: 6,
    instrumentIndex: 6,
    properties: {
      volume: {
        val: -10,
        start: -20,
        end: 5,
        step: 1,
        name: 'volume'
      },
      frequency: {
        val: 448,
        start: 100,
        end: 800,
        step: 90,
        name: 'frequency'
      },
      harmonicity: {
        val: 13.45,
        start: 2,
        end: 20,
        step: 1,
        name: 'harmonicity'
      },
      octaves: {
        val: 0.59,
        start: 0.001,
        end: 5,
        step: 0.1,
        name: 'octaves'
      },
      feedback: {
        val: 0.59,
        start: 0.001,
        end: 1,
        step: 0.1,
        instrumentSubName: 'feedback',
        name: 'feedback',
        propName: 'frequency'
      }
    }
  },
  pluck: {
    name: 'pluck',
    index: 7,
    instrumentIndex: 7,
    properties: {
      volume: {
        val: 0,
        start: -10,
        end: 10,
        step: 1,
        name: 'volume'
      },
      dampening: {
        val: 1585,
        start: 500,
        end: 2000,
        step: 100,
        name: 'dampening'
      },
      resonance: {
        val: 0.88,
        start: 0.24,
        end: 0.99,
        step: 0.1,
        name: 'resonance'
      },
      attackNoise: {
        val: 0.95,
        start: 0.1,
        end: 20,
        step: 1,
        name: 'attackNoise'
      },
      phaser: {
        val: 5,
        start: 1,
        end: 60,
        step: 5,
        instrumentSubName: 'phaser',
        name: 'phaser',
        propName: 'frequency'
      }
    }
  }
}
