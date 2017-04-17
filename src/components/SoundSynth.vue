<template>
  <div id="sound-synth" :class="{ active: visible == 'soundsynth'}"
    @click="$emit('switchView', 'soundsynth')"
  >
    <div id="ss-control">
      <bank-choice
        v-bind:bankChoiceNum="soundBankChoice"
        v-bind:bankType="bankType"
        v-on:changeBank="changeBank"
        v-bind:ref="'soundBankChoice'"
      ></bank-choice>
      <span>
        <button id="reset-soundbank"     class="ss-button" type="button" v-on:click="resetSoundbank()">Reset</button>
        <button id="randomize-soundbank" class="ss-button" type="button" v-on:click="randomize()">Randomize</button>
      </span>
      <span v-if="this.user && this.user.includes('HVbN2g7VmZgkaPaXckqejq2Xs')">
        <button class="ss-button" type="button" v-on:click="writeToDef()">write(admin)</button>
        <button class="ss-button" type="button" v-on:click="arbWrite()">arb(admin)</button>
      </span>
    </div>
    <div class="sound-synth-table"
      v-bind:class="{ visible: deep == 0, hidden: deep == 1}"
      v-bind:visible="deep == 0"
    >
      <div v-if="loading">Loading...</div>
      <div class="instrumentBox" v-bind:class="{ selected: selected == defs1[key].index}"
        v-for="(key, index) in sortedDefKeys"
        v-if="!loading && key != '.key'"
        v-on:mouseover="hoverSelect(index)"
      >
        <div v-if="key != '.key'">
          <instrument 
            v-bind:ref="'instrument' + defs1[key].index"
            v-bind:def="defs1[key]"
            v-on:needsToSaveDef="saveDef"
          >
          </instrument>
        </div>
      </div>
    </div>
    <sound-synth-deep ref='soundsynthdeep'
      v-bind:class="{ visible: deep == 1, hidden: deep == 0}"
      v-bind:visible="deep == 1"
      v-bind:selected="selected"
      v-bind:defs="defs1"
      v-bind:soundBankChoice="soundBankChoice"
      v-bind:user="user"
      v-if="!loading"
    >  
    </sound-synth-deep>
  </div>
</template>

<script>
import Vue from 'vue'
import { focus } from 'vue-focus'
import Instrument from './Instrument'
import Slider from './Slider'
import BankChoice from './BankChoice'
import defLoader from '../assets/instrumentDefs/defLoader'
import soundBridge from '../assets/soundBridge'
import SoundSynthDeep from './SoundSynthDeep'
import firebaseBridge from '../assets/instrumentDefs/firebaseBridge'
import soundsynthUtils from '../assets/soundsynthUtils'
import Network from './mixins/Network'
import SoundSynthFBBinding from './mixins/fbbinding/SoundSynthFBBinding'
import SoundSynthChangeBank from './mixins/changebank/SoundSynthChangeBank'

export default {
  name: 'sound-synth',
  components: {
    Instrument,
    Slider,
    BankChoice,
    SoundSynthDeep
  },
  props: ['visible', 'user', 'workspace', 'cbcb'],
  mixins: [Network, SoundSynthFBBinding, SoundSynthChangeBank],
  directives: { focus: focus },
  data: function () {
    return {
      soundBankChoice: 0,
      selected: 0,
      deep: 0,
      playing: false,
      bankType: 'soundBank',
      watcherList: [],
      loading: false,
      idefLookup: {},
      defs: defLoader.load(false, 0, 0, false, (data) => {
        this.defs = data
        this.saveDef(0)
      })
    }
  },
  watch: {
    user: function (val1, val2) {
      if (val1 && !val2) {
        // freshly signed in
        this.clearWatchers()
        this.doFBBinding(this.soundBankChoice)
      }
    }
  },
  mounted: function () {
    soundBridge.constructInstruments()
    this.clearWatchers()
    this.reconstructWatchers()
    this.idefLookup = soundsynthUtils.createIDefLookup(this.defs1)
  },
  computed: {
    defs1: function () {
      return soundsynthUtils.checkDefs(this.defs)
    },
    sortedDefKeys: function () {
      return soundsynthUtils.sortDefs(this.defs)
    }
  },
  methods: {
    redoDefs: function () {
      this.clearWatchers()
      if (this.user) {
        this.doFBBinding(this.soundBankChoice)
      } else {
        this.reconstructWatchers()
      }
    },
    reconstructWatchers: function () {
      var watchers = soundBridge.constructWatchers(this.defs1, true)
      for (let key in watchers) {
        this.watcherList.push(this.$watch(key, watchers[key]))
      }
    },
    clearWatchers: function () {
      this.watcherList.forEach(function (unwatcher) { unwatcher() })
    },
    instrumentIndex: function () {
      return this.idefLookup[this.selected]
    },
    spaceDown: function () {
      if (!this.playing) {
        this.playing = true
        soundBridge.startSound(this.instrumentIndex(), this.selected)
      }
    },
    spaceUp: function () {
      this.playing = false
      soundBridge.stopSound(this.instrumentIndex(), this.selected)
    },
    moveDown: function () {
      return
    },
    moveUp: function () {
      return
    },
    moveLeft: function () {
      this.selected = Math.max(0, this.selected - 1)
    },
    moveRight: function () {
      this.selected = Math.min(Object.keys(firebaseBridge.removeKey(this.defs1)).length - 1, this.selected + 1)
    },
    hoverSelect: function (index) {
      this.selected = index
    },
    sendKey: function (num, direction) {
      let instrObj
      if (this.deep) {
        instrObj = this.$refs['soundsynthdeep'].$refs['instrumentDeep' + String(this.selected)]
      } else {
        instrObj = this.$refs['instrument' + String(this.selected)][0]
      }
      instrObj.changeSliderValue(num, direction)
    },
    saveDef: function (explicitNum, skipHistory = false) {
      Vue.nextTick(() => {
        this.networkWait('sssave', () => {
          let a = () => {
            defLoader.save(this.user, this.workspace, this.defs1, explicitNum || this.soundBankChoice, skipHistory)
          }
          a()
        })
      })
    },
    resetSoundbank: function () {
      if (!this.deep) {
        this.changeBank(this.soundBankChoice, 'soundBank', false, true)
      } else {
        firebaseBridge.fbdb.ref('defs/' + this.soundBankChoice).once('value', snapshot => {
          var name = Object.keys(this.defs1)[this.selected]
          this.defs[name] = snapshot.val()[name]
          this.saveDef()
        })
      }
    },
    randomize: function () {
      this.$emit('updateMessage', 'Randomizing!')
      this.defs = soundBridge.randomize(this.defs, this.deep, this.selected)
      this.reconstructWatchers()
      this.saveDef(this.soundBankChoice)
    },
    enterUp: function () {
      this.deep = !this.deep
    },
    handleRestore: function (toRestore) {
      if (toRestore.key !== this.soundBankChoice) {
        this.$emit('updateMessage', 'Cannot undo across sound banks - please switch back to bank ' + (parseInt(toRestore.key) + 1))
        return
      }
      this.defs = toRestore.obj
      this.saveDef(toRestore.key, true)
    },
    writeToDef: function () {
      console.log('writing current defs for ' + this.soundBankChoice + ' to firebase!')
      firebaseBridge.fbdb.ref('defs/' + this.soundBankChoice).set(firebaseBridge.removeKey(this.defs))
    },
    arbWrite: function () {
      console.log('arbwrite')
      console.log(soundsynthUtils.sortDefs(this.defs))
      for (let key of soundsynthUtils.sortDefs(this.defs)) {
        if (key === '.key') {
          continue
        }
        if (key === 'highSynth') {
          this.defs[key].index = 0
          continue
        }
        if (key === 'noise') {
          this.defs[key].properties.bffrequency.name = 'bass cutoff'
        }
        this.defs[key].index += 1
      }
      console.log(this.defs)
      // do something arbitrary like add filter defs to every instrument in defs
      // this.writeToDef()
    }
  }
}
</script>

<style>  
  #sound-synth {
    overflow-x: scroll;
    overflow-y: hidden;
    border: 2px solid black;
    width: 98.5%;
    margin: 2px;
    padding: 4px;
  }
  #sound-synth.active {
    border: 2px solid red;
  }  
  button.selected {
    background-color: #a9f26a;
  }
  .instrumentBox.selected {
    background-color: #a9f26a;
  }
  .sound-synth-table {
    padding-top: 10px;
    display: flex;
    height: auto;
    align-items: center;
  }
  .loading {
    background-color: #666;
    opacity: 0.5;
  }
  .sound-bank-button {
    padding: 4px;
    margin: 4px;
  }
  #ss-control {
    display: flex;
  }
  .ss-button {
    margin-left: 30px;  
    padding: 4px;
    margin-top: 6px;
  }
  .hidden {
    display: none;
  }
</style>
