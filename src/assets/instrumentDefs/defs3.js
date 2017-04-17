export default {
  mediumSynth: {
    name: 'mediumSynth',
    index: 0,
    instrumentIndex: 0,
    properties: {
      volume: {
        val: 10,
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
        start: -10,
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
        val: 10,
        start: -5,
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
        val: 5.94,
        start: 4,
        end: 10,
        step: 0.5,
        name: 'octaves'
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
    sampler: 'kick.mp3',
    instrumentIndex: 8,
    properties: {
      volume: {
        val: 15,
        start: 0,
        end: 20,
        step: 1,
        name: 'volume'
      }
    }
  },
  hh: {
    name: 'highHat',
    index: 6,
    sampler: 'hh.mp3',
    instrumentIndex: 8,
    properties: {
      volume: {
        val: 10,
        start: 0,
        end: 20,
        step: 1,
        name: 'volume'
      }
    }
  },
  lowDrum2: {
    name: 'lowDrum',
    index: 7,
    instrumentIndex: 5,
    properties: {
      volume: {
        val: 10,
        start: -10,
        end: 15,
        step: 1,
        name: 'volume'
      },
      pitchDecay: {
        val: 0.011,
        start: 0.001,
        end: 1,
        step: 0.05,
        name: 'pitchDecay'
      },
      octaves: {
        val: 0.3,
        start: 0.2,
        end: 3,
        step: 0.2,
        name: 'octaves'
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
  }
}
