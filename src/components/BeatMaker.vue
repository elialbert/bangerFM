<template>
  <div id="beat-maker"
    v-bind:class="{ active: visible == 'beatmaker'}"
    @click="$emit('switchView', 'beatmaker')"
  >
    <div class="bank-choice-wrapper">
      <span class="bank-choice-name">Beat: </span>
      <bank-choice
        v-bind:bankChoiceNum="beatBankChoice"
        v-bind:bankType="bankType"
        v-on:changeBank="changeBank"
        v-bind:ref="'beatBankChoice'"
      ></bank-choice>
      <span class='control-span'>
        <span class='control-span-container'>
          <button id="reset-beat" type="button" v-on:click="resetBeat()">Reset Beat</button>
        </span>
        <span class='control-span-container'>
        Per Measure (erases beat): {{ perMeasure }}
        <button id="pm-up" type="button" v-on:click="changePerMeasure(1)">UP</button> || 
        <button id="pm-down" type="button" v-on:click="changePerMeasure(-1)">DOWN</button>
        </span>
        <span class='control-span-container'>
          Pitch Key (tranposes current pitches):
          <select v-model="pitchKey">
            <option v-for="key in pitchKeyOptions" v-bind:value="key.value">
              {{ key.value }}
            </option>
          </select>          
        </span>
      </span>
    </div>
    <div v-if="loading">Loading...</div>
    <div class='bm-wrapper' v-if="!loading && defs && dataArray && Object.keys(dataArray).length">
      <div class='bmd-nav' v-if="!deep">
        <div class='bmd-nav-item selectedNav'>Beat Maker</div>
        <div class='bmd-nav-item' @click='enterUp'>Advanced</div>
      </div>

      <div class='bm-container' v-if="!deep">
        <instrument-row v-for="(key, index) in sortedDefKeys"
          v-if="(key != '.key') && !loading && dataArray[index] && !deep"
          v-on:hoverSelect="hoverSelect" v-on:hoverClick="select"
          v-bind:ref="'instrumentrow' + defs[key].index"
          v-bind:def="defs[key]"
          v-bind:selected="selected"
          v-bind:numCols="numCols"
          v-bind:enabledArray="dataArray[index]"
          v-bind:perMeasure="perMeasure"
          v-bind:visible="visible"
          v-bind:bmDeep="false"
          v-on:toggleDeep="enterUp"
          v-on:mouseOverName="mouseOverName"
        >
        </instrument-row>
      </div>
      <beat-maker-deep ref='beatmakerdeep' v-if="deep == 1"
        v-bind:class="{ visible: deep == 1, hidden: deep == 0}"
        v-bind:visible="visible"
        v-bind:selected="selected"
        v-bind:selectedRow="selected[1]"
        v-bind:dataArray="dataArray[selected[1]]"
        v-bind:def="defs[sortedDefKeys[selected[1]]]"
        v-bind:numCols="numCols"
        v-bind:perMeasure="perMeasure"
        v-bind:pitchKey="pitchKey"
        v-on:changeSelect="changeSelect"
        v-on:resetBeatRow="resetBeatRow"
        v-on:needsToSave="saveBeat"
        v-on:toggleDeep="enterUp"
        v-on:randomizeRow="randomize"
      >  
      </beat-maker-deep>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import InstrumentRow from './InstrumentRow'
import BankChoice from './BankChoice'
import defLoader from '../assets/instrumentDefs/defLoader'
import Instrument from '../components/Instrument'
import beatBridge from '../assets/beatBridge'
import soundBridge from '../assets/soundBridge'
import firebaseBridge from '../assets/instrumentDefs/firebaseBridge'
import iutils from '../assets/instrumentUtils'
import soundsynthUtils from '../assets/soundsynthUtils'
import mutils from '../assets/movementUtils'
import Network from './mixins/Network'
import BeatMakerFBBinding from './mixins/fbbinding/BeatMakerFBBinding'
import BeatMakerChangeBank from './mixins/changebank/BeatMakerChangeBank'
import BeatMakerDeep from '../components/BeatMakerDeep'

export default {
  name: 'beat-maker',
  props: ['visible', 'workspace', 'user'],
  mixins: [Network, BeatMakerFBBinding, BeatMakerChangeBank],
  components: {
    InstrumentRow,
    Instrument,
    BankChoice,
    BeatMakerDeep
  },
  data: function () {
    return {
      perMeasure: 4,
      defs: defLoader.load(0),
      selected: [0, 0],
      running: false,
      beatBankChoice: 0,
      soundBankChoice: 0,
      dataArray: this.loadBeat(0),
      bankType: 'beatBank',
      autoFillHistory: {},
      loading: false,
      defsLength: 8,
      idefLookup: {},
      deep: 0,
      deepPlaying: 0,
      pitchKey: 'C Minor Blues',
      pitchKeyOptions: iutils.pitchKeyOptions()
    }
  },
  beforeCreate: function () {
    this.perMeasure = this.dataArray && this.dataArray.perMeasure || 4
    this.pitchKey = this.dataArray && this.dataArray.pitchKey || 'C Minor Blues'
  },
  mounted: function () {
    this.pitchKey = this.dataArray.pitchKey || 'C Minor Blues'
    this.idefLookup = soundsynthUtils.createIDefLookup(this.defs)
  },
  watch: {
    user: function (val1, val2) {
      if (val1 && !val2) {
        this.doFBBinding(this.beatBankChoice)
      }
    },
    pitchKey: function (newKey) {
      this.dataArray = iutils.transposeBeat(this.dataArray, newKey, this.dataArray.pitchKey || 'C Major')
      this.dataArray.pitchKey = newKey
      this.saveBeat()
    }
  },
  computed: {
    numCols: function () {
      if (this.dataArray && this.dataArray.perMeasure) {
        return iutils.calcNumCols(this.dataArray.perMeasure)
      }
      return iutils.calcNumCols(this.perMeasure) || 32
    },
    currentInstrument: function () {
      return this.defs[soundsynthUtils.sortDefs(this.defs)[this.selected[1]]]
    },
    sortedDefKeys: function () {
      return soundsynthUtils.sortDefs(this.defs)
    }
  },
  methods: {
    changePerMeasure: function (dir) {
      if ((dir === 1 && this.perMeasure === 7) || (dir === -1 && this.perMeasure === 3)) { return }
      this.perMeasure += dir
      this.resetBeat()
    },
    curSquare: function () {
      return this.dataArray[this.selected[1]][this.selected[0]]
    },
    hoverSelect: function (x, y, event) {
      if (this.visible === 'songmaker') {
        return
      }
      this.selected = [x, y]
      if (event.buttons === 1) {
        this.select()
      }
    },
    changeSelect: function (x, y) {
      this.selected = [x, y]
    },
    doFBObjLength: function () {
      this.defsLength = firebaseBridge.fbObjLength(this.defs) || 8
      return this.defsLength
    },
    moveRight: function () {
      this.selected = mutils.moveRight(this.selected, this.numCols)
      if (this.isHiddenSquare()) {
        if (this.selected[0] === this.numCols - 1) {
          return this.moveLeft()
        }
        return this.moveRight()
      }
    },
    moveLeft: function () {
      this.selected = mutils.moveLeft(this.selected)
      if (this.isHiddenSquare()) { return this.moveLeft() }
    },
    isHiddenSquare: function () {
      if (!this.curSquare().measureSub) { return false }
      return this.selected[0] % this.perMeasure === this.perMeasure - 1
    },
    moveDown: function () {
      if (this.deep) {
        if (this.$refs.beatmakerdeep.active === 'Pitch') {
          return this.sendKey(0, -1)
        } else {
          return this.$refs.beatmakerdeep.moveVolProb(-1)
        }
      }
      this.selected = mutils.moveDown(this.selected, this.doFBObjLength() - 1)
      if (this.isHiddenSquare()) { return this.moveLeft() }
    },
    moveUp: function () {
      if (this.deep) {
        if (this.$refs.beatmakerdeep.active === 'Pitch') {
          return this.sendKey(0, 1)
        } else {
          return this.$refs.beatmakerdeep.moveVolProb(1)
        }
      }
      this.selected = mutils.moveUp(this.selected)
      if (this.isHiddenSquare()) { return this.moveLeft() }
    },
    autoFill: function (direction) {
      let result = mutils.autoFill(direction, this.selected, this.dataArray, this.autoFillHistory, this.pitchKey, this.idefLookup[this.selected[1]].iindex)
      this.dataArray = result.data
      this.autoFillHistory = result.history
      this.networkWait('autofill', () => {
        this.saveBeat()
      })
    },
    select: function () {
      if (this.visible === 'songmaker') {
        return
      }
      if (this.deep) {
        return this.$refs.beatmakerdeep.select()
      }
      let curSquare = this.curSquare()
      if (!curSquare.enabled) {
        curSquare.enabled = true
        curSquare.pitch = iutils.newPitch(this.pitchKey, this.idefLookup[this.selected[1]].iindex)
      } else {
        let prevMeasureSub = this.curSquare().measureSub
        this.dataArray[this.selected[1]][this.selected[0]] = iutils.innerDataArrayObj()
        this.curSquare().measureSub = prevMeasureSub
      }
      this.networkWait('select', () => {
        this.saveBeat()
      })
    },
    enterUp: function () {
      this.deep = !this.deep
    },
    mouseOverName: function (rowIndex) {
      this.selected = [this.selected[0], rowIndex]
    },
    animate: function (col, clear) {
      for (var i = 0; i < this.defsLength; i++) {
        if (this.deep) {
          i = this.selected[1]
          this.$refs.beatmakerdeep.$refs.instrumentrow.playing = col
        } else {
          if (this.$refs['instrumentrow' + String(i)][0] === undefined) {
            return
          }
          this.$refs['instrumentrow' + String(i)][0].playing = col
        }
        if (col === 29 && clear && !this.deep) {
          var self = this
          setTimeout(function (ii) {
            self.$refs['instrumentrow' + String(ii)][0].playing = -1
          }, 100, i)
        }
        if (this.deep) {
          break
        }
      }
    },
    spaceDown: function () { return },
    spaceUp: function () {
      this.doFBObjLength()
      this.idefLookup = soundsynthUtils.createIDefLookup(this.defs)
      this.running ? this.stopPlaying() : this.startPlaying()
    },
    stopPlaying: function () {
      if (this.loop) {
        beatBridge.stopTransport()
      }
      this.deepPlaying = false
      this.running = false
      this.$emit('updateMessage', 'Playing: ' + this.running)
    },
    startPlaying: function () {
      this.stopPlaying()
      beatBridge.startTransport()
      if (this.deep) {
        this.deepPlaying = true
      }
      this.loop = beatBridge.makeLoop(beatBridge.dataFunc(this, this.animate, this.defs), this.numCols)
      this.loop.start(0)
      this.running = true
      this.$emit('updateMessage', 'Playing: ' + this.running)
    },
    instrumentIndex: function () {
      return this.idefLookup[this.selected[1]].iindex
    },
    pipeDown: function () {
      soundBridge.startSound(this.instrumentIndex(), this.selected[1])
    },
    pipeUp: function () {
      soundBridge.stopSound(this.instrumentIndex(), this.selected[1])
    },
    sendKey: function (propIndex, direction) {
      if (propIndex === 4) {
        this.curSquare().triplet.enabled = !this.curSquare().triplet.enabled
        this.saveBeat()
        return
      }
      if (!this.curSquare().enabled) { return }
      this.curSquare().pitch = beatBridge.changePitch(this.curSquare().pitch, direction, this.pitchKey)
      this.networkWait('pitch', () => {
        this.saveBeat()
      })
    },
    saveBeat: function (skipFB = false, explicitNum = null, skipHistory = false) {
      if (explicitNum === null) {
        explicitNum = this.beatBankChoice
      }
      Vue.nextTick(() => {
        defLoader.saveBeat(this.user, this.workspace, this.dataArray, explicitNum, skipFB, skipHistory)
      })
    },
    loadBeat: function (num) {
      return defLoader.loadBeat(this.user, this.workspace, num, this.perMeasure, this.pitchKey, false, this.doFBObjLength())
    },
    resetBeat: function () {
      this.dataArray = iutils.createDataArray(this.perMeasure, this.doFBObjLength())
      if (this.running) { this.stopPlaying() }
      this.saveBeat()
    },
    resetBeatRow: function () {
      this.dataArray[this.selected[1]] = iutils.createNewIBeat(false, this)
      this.saveBeat()
    },
    handleRestore: function (toRestore) {
      if ((toRestore.key !== this.beatBankChoice) || (toRestore.objType !== 'bm')) {
        this.$emit('updateMessage', 'Nothing to undo/redo right now.')
        return
      }
      this.dataArray = toRestore.obj
      this.saveBeat(false, toRestore.key, true)
    },
    randomize: function () {
      this.$emit('updateMessage', 'Randomizing!')
      this.dataArray[this.selected[1]] = iutils.createNewIBeat(true, this)
      this.saveBeat()
    },
    clearInstrumentRow: function () {
      this.$emit('updateMessage', 'Clearing row.')
      this.dataArray[this.selected[1]] = iutils.createNewIBeat(false, this)
    }
  }
}
</script>

<style>
#beat-maker {
  width: 98.5%;
  min-width: 1200px;
  overflow-x: scroll;
  overflow-y: hidden;
  border: 2px solid black;
  margin: 2px;
  padding: 4px;
  margin-top: 10px;
}
.bm-wrapper {
  margin-top: 10px;
}
.bm-container {
  border: 1px solid black;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 96%;
}
#beat-maker.active {
  border: 2px solid red;
}
#current-instrument {
  float: right;
}
.bank-choice-wrapper {
  display: inline-flex;
}
.bank-choice-name {
  padding-right: 5px;
  padding-left: 10px;
  margin-top: 6px;
}
span.control-span {
  padding-left: 4px;
  margin: 4px;
}
span.control-span-container {
  margin-left: 20px;
}
</style>
