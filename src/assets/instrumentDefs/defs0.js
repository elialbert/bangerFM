export default {
  mediumSynth: {
    name: 'mediumSynth',
    index: 1,
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
        val: 100,
        start: 0,
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
      },
      attack: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'attack',
        instrumentSubName: 'envelope'
      },
      decay: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'decay',
        instrumentSubName: 'envelope'
      },
      sustain: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'sustain',
        instrumentSubName: 'envelope'
      },
      release: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'release',
        instrumentSubName: 'envelope'
      },
      low: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'low',
        propType: 'eq'
      },
      mid: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'mid',
        propType: 'eq'
      },
      high: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'high',
        propType: 'eq'
      },
      distortion: {
        val: 0,
        start: 0,
        end: 1,
        step: 0.1,
        name: 'distortion',
        instrumentSubName: 'distortion',
        propName: 'wet'
      },
      tremelo: {
        val: 0,
        start: 0,
        end: 1,
        step: 0.1,
        name: 'tremelo',
        instrumentSubName: 'tremelo',
        propName: 'wet'
      }
    }
  },
  lowSynth: {
    name: 'lowSynth',
    index: 2,
    instrumentIndex: 1,
    properties: {
      volume: {
        val: 5,
        start: -10,
        end: 10,
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
      },
      attack: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'attack',
        instrumentSubName: 'envelope'
      },
      decay: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'decay',
        instrumentSubName: 'envelope'
      },
      sustain: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'sustain',
        instrumentSubName: 'envelope'
      },
      release: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'release',
        instrumentSubName: 'envelope'
      },
      low: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'low',
        propType: 'eq'
      },
      mid: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'mid',
        propType: 'eq'
      },
      high: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'high',
        propType: 'eq'
      }
    }
  },
  noise: {
    name: 'noise',
    index: 3,
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
        name: 'bass cutoff',
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
      },
      attack: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'attack',
        instrumentSubName: 'envelope'
      },
      decay: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'decay',
        instrumentSubName: 'envelope'
      },
      sustain: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'sustain',
        instrumentSubName: 'envelope'
      },
      release: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'release',
        instrumentSubName: 'envelope'
      },
      low: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'low',
        propType: 'eq'
      },
      mid: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'mid',
        propType: 'eq'
      },
      high: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'high',
        propType: 'eq'
      }
    }
  },
  highDrum: {
    name: 'highDrum',
    index: 4,
    instrumentIndex: 3,
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
        val: 5,
        start: 1,
        end: 16,
        step: 1,
        propType: 'oscillator',
        name: 'oscillatorType'
      },
      attack: {
        val: 0.001,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'attack',
        instrumentSubName: 'envelope'
      },
      decay: {
        val: 0.0089,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'decay',
        instrumentSubName: 'envelope'
      },
      sustain: {
        val: 0.4,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'sustain',
        instrumentSubName: 'envelope'
      },
      release: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'release',
        instrumentSubName: 'envelope'
      },
      low: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'low',
        propType: 'eq'
      },
      mid: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'mid',
        propType: 'eq'
      },
      high: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'high',
        propType: 'eq'
      }
    }
  },
  mediumDrum: {
    name: 'mediumDrum',
    index: 5,
    instrumentIndex: 4,
    properties: {
      volume: {
        val: 0,
        start: -10,
        end: 20,
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
      },
      attack: {
        val: 0.001,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'attack',
        instrumentSubName: 'envelope'
      },
      decay: {
        val: 0.0382,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'decay',
        instrumentSubName: 'envelope'
      },
      sustain: {
        val: 0,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'sustain',
        instrumentSubName: 'envelope'
      },
      release: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'release',
        instrumentSubName: 'envelope'
      },
      low: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'low',
        propType: 'eq'
      },
      mid: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'mid',
        propType: 'eq'
      },
      high: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'high',
        propType: 'eq'
      }
    }
  },
  lowDrum: {
    name: 'lowDrum',
    index: 6,
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
      },
      attack: {
        val: 0.011,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'attack',
        instrumentSubName: 'envelope'
      },
      decay: {
        val: 0.2325,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'decay',
        instrumentSubName: 'envelope'
      },
      sustain: {
        val: 0.05,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'sustain',
        instrumentSubName: 'envelope'
      },
      release: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'release',
        instrumentSubName: 'envelope'
      },
      low: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'low',
        propType: 'eq'
      },
      mid: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'mid',
        propType: 'eq'
      },
      high: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'high',
        propType: 'eq'
      }
    }
  },
  metal: {
    name: 'metal',
    index: 7,
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
        val: 12,
        start: 2,
        end: 20,
        step: 1,
        name: 'harmonicity'
      },
      attack: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'attack',
        instrumentSubName: 'envelope'
      },
      decay: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'decay',
        instrumentSubName: 'envelope'
      },
      sustain: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'sustain',
        instrumentSubName: 'envelope'
      },
      release: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'release',
        instrumentSubName: 'envelope'
      },
      low: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'low',
        propType: 'eq'
      },
      mid: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'mid',
        propType: 'eq'
      },
      high: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'high',
        propType: 'eq'
      }
    }
  },
  highSynth: {
    name: 'highSynth',
    index: 0,
    instrumentIndex: 9,
    properties: {
      volume: {
        val: 0,
        start: -10,
        end: 10,
        step: 1,
        name: 'volume'
      },
      modulationIndex: {
        val: 100,
        start: 0,
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
      },
      attack: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'attack',
        instrumentSubName: 'envelope'
      },
      decay: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'decay',
        instrumentSubName: 'envelope'
      },
      sustain: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'sustain',
        instrumentSubName: 'envelope'
      },
      release: {
        val: 0.88,
        start: 0,
        end: 1,
        step: 0.05,
        name: 'release',
        instrumentSubName: 'envelope'
      },
      low: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'low',
        propType: 'eq'
      },
      mid: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'mid',
        propType: 'eq'
      },
      high: {
        val: 0,
        start: -30,
        end: 20,
        step: 2,
        name: 'high',
        propType: 'eq'
      },
      distortion: {
        val: 0,
        start: 0,
        end: 1,
        step: 0.1,
        name: 'distortion',
        instrumentSubName: 'distortion',
        propName: 'wet'
      },
      tremelo: {
        val: 0,
        start: 0,
        end: 1,
        step: 0.1,
        name: 'tremelo',
        instrumentSubName: 'tremelo',
        propName: 'wet'
      }
    }
  }
}
