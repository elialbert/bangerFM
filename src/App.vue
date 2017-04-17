<template>
  <div id="app" tabindex="0" ref='app' class='unselectable'
    @keydown.down="noArg('moveDown', $event)" 
    @keydown.up="noArg('moveUp', $event)"
    @keydown.right="noArg('moveRight', $event)"
    @keydown.left="noArg('moveLeft', $event)"
    @keydown.space.prevent="noArg('spaceDown')" 
    @keyup.space="noArg('spaceUp')"
    @keyup.8="noArg('backspace')"
    @keydown.220="noArg('pipeDown')"
    @keyup.220="noArg('pipeUp')"
    @keydown.81="twoArg('sendKey', 0, 1, $event)"
    @keydown.65="twoArg('sendKey', 0, -1, $event)"
    @keydown.87="twoArg('sendKey', 1, 1, $event)"
    @keydown.83="twoArg('sendKey', 1, -1, $event)"
    @keydown.69="twoArg('sendKey', 2, 1, $event)"
    @keydown.68="twoArg('sendKey', 2, -1, $event)"
    @keydown.82="twoArg('sendKey', 3, 1, $event)"
    @keydown.70="twoArg('sendKey', 3, -1, $event)"
    @keydown.84="twoArg('sendKey', 4, 1, $event)"
    @keydown.71="twoArg('sendKey', 4, -1, $event)"
    @keydown.89="twoArg('sendKey', 5, 1, $event)"
    @keydown.72="twoArg('sendKey', 5, -1, $event)"
    @keydown.85="twoArg('sendKey', 6, 1, $event)"
    @keydown.74="twoArg('sendKey', 6, -1, $event)"
    @keydown.73="twoArg('sendKey', 7, 1, $event)"
    @keydown.75="twoArg('sendKey', 7, -1, $event)"
    @keyup.49="changeBank(1, $event)"
    @keyup.50="changeBank(2, $event)"
    @keyup.51="changeBank(3, $event)"
    @keyup.52="changeBank(4, $event)"
    @keyup.53="changeBank(5, $event)"
    @keyup.54="changeBank(6, $event)"
    @keyup.55="changeBank(7, $event)"
    @keyup.56="changeBank(8, $event)"
    @keyup.57="changeBank(9, $event)"
    @keyup.191="helpOverlay($event)"
    @keyup.enter="noArg('enterUp')"
    @keyup.88="noArg('select')"
    @keyup.67="toggleCP($event)"
    @keydown.90="undoRedo($event)"
    @keyup.27="runEscape($event)"
    @blur="forceFocus"
    @click="runEscape($event)"
  >
    <nav-header ref='navheader'
      :user="user"
      :authCB="doAuth"
      :signedOutCB="doSignout"
      :message="message"
      :crashEvent="crashEvent"
    ></nav-header>
    <help-overlay
      v-bind:class="{ visible: helpOverlayEnabled == 1, hidden: helpOverlayEnabled == 0}"
    >
    </help-overlay>
    <control-panel ref='controlpanel'
      :user="user"
      v-bind:class="{ visible: cpEnabled == 1, hidden: cpEnabled == 0}"
    ></control-panel>
    <sound-synth ref='soundsynth'
      v-bind:visible="visible"
      v-bind:user="user"
      v-on:updateMessage="updateMessage"
      v-on:switchView="switchView"
    ></sound-synth>
    <beat-maker ref='beatmaker'
      v-bind:visible="visible"
      v-bind:user="user"
      v-bind:cbcb="cbcb"
      v-on:updateMessage="updateMessage"
      v-on:switchView="switchView"
    ></beat-maker>
    <song-maker ref='songmaker'
      v-bind:visible="visible"
      v-on:animateSong="animateSong"
      v-bind:user="user"
      v-bind:cbcb="cbcb"
      v-on:updateMessage="updateMessage"
      v-on:changeBMBank="changeBMBank"
      v-on:selectSMBank="selectSMBank"
      v-on:switchView="switchView"
    ></song-maker>
    <nav-footer
      v-bind:helpOverlay="helpOverlay"
    >
    </nav-footer>
  </div>
</template>

<script>
import SoundSynth from './components/SoundSynth'
import BeatMaker from './components/BeatMaker'
import ControlPanel from './components/ControlPanel'
import SongMaker from './components/SongMaker'
import HelpOverlay from './components/HelpOverlay'
import NavHeader from './components/NavHeader'
import NavFooter from './components/NavFooter'
import mutils from './assets/movementUtils'
import firebaseBridge from './assets/instrumentDefs/firebaseBridge'
import Tone from './assets/tone.js'
import StartAudioContext from 'startaudiocontext'
import HistoryModifier from './components/mixins/HistoryModifier'

export default {
  name: 'app',
  mixins: [HistoryModifier],
  components: {
    SoundSynth,
    BeatMaker,
    ControlPanel,
    SongMaker,
    HelpOverlay,
    NavHeader,
    NavFooter
  },
  data: function () {
    return {
      visible: 'beatmaker',
      helpOverlayEnabled: 0,
      cpEnabled: 0,
      user: false,
      message: '',
      windowWidth: 0,
      windowHeight: 0
    }
  },
  mounted: function () {
    document.getElementsByClassName('loading-app')[0].remove() // get rid of pre vue loading info
    this.cbcb()
    StartAudioContext(Tone.context)
    var self = this
    this.$nextTick(function () {
      window.addEventListener('resize', function () {
        self.windowWidth = document.documentElement.clientWidth
        self.windowHeight = document.documentElement.clientHeight
      })
      this.windowWidth = document.documentElement.clientWidth
      this.windowHeight = document.documentElement.clientHeight
    })
  },
  watch: {
    user: function (val1, val2) {
      if (val2 && !val1) {
        firebaseBridge.fbdb.ref('userDefs/' + val2).off()
      }
    }
  },
  methods: {
    updateMessage: function (message) {
      this.message = message
      setTimeout(() => {
        this.message = 'Hi! If (when) anything goes wrong, just refresh!'
      }, 1500)
    },
    doAuth: function (user) {
      this.user = user
    },
    crashEvent: function () {
      console.log('crash event!')
      this.message = 'Web Audio has crashed, refreshing now. :( All your musics have been saved.'
      window.location.reload()
    },
    doSignout: function () {
      this.user = false
    },
    forceFocus: function () {
      this.$refs.app.focus()
    },
    toggleCP: function (event) {
      if (event.shiftKey || event.metaKey) {
        if (this.visible === 'beatmaker') {
          let dest = this.getDest()
          dest.clearInstrumentRow()
        }
        return
      }
      this.cpEnabled = !this.cpEnabled
    },
    getDest: function () {
      return this.$refs[this.visible]
    },
    switchView: function (component) {
      this.visible = component
    },
    noArg: function (functionName, event) {
      var dest = this.getDest()
      if (event && (event.ctrlKey || event.shiftKey)) {
        if (this.visible === 'beatmaker' && ['moveLeft', 'moveRight'].includes(functionName)) {
          return dest.autoFill(functionName)
        } else if (['moveUp', 'moveDown'].includes(functionName)) {
          this.$refs['songmaker'].defs = this.$refs['soundsynth'].defs
          this.visible = mutils.switchView(this.visible, functionName)
          return
        }
      }
      if (functionName === 'spaceUp') {
        if (this.$refs['songmaker'].running && this.visible === 'beatmaker') {
          return
        } else if (this.$refs['beatmaker'].running && this.visible === 'songmaker') {
          return this.$refs['beatmaker'].stopPlaying() // for now
        }
      }
      dest[functionName]()
    },
    cbcb: function () {
      this.$refs['beatmaker'].defs = this.$refs['soundsynth'].defs1
      this.$refs['songmaker'].defs = this.$refs['soundsynth'].defs1
    },
    changeBank: function (num, event) {
      var dest = this.getDest()
      var cb
      if (this.visible === 'soundsynth') {
        var self = this
        cb = self.cbcb
      }
      dest.changeBank(num - 1, dest.bankType, event.shiftKey, false, cb)
      if (this.visible === 'soundsynth') {
        cb()
      }
    },
    oneArg: function (functionName, argument, event) {
      var dest = this.getDest()
      dest[functionName](argument)
    },
    twoArg: function (functionName, arg1, arg2, event) {
      var dest = this.getDest()
      if (event && event.metaKey) {
        return
      }
      if (event.key === 'R' && event.shiftKey) {
        return dest['randomize']()
      }
      if (event.key === 'D') {
        return this.noArg('backspace')
      }
      if (dest[functionName]) {
        dest[functionName](arg1, arg2)
      }
    },
    animateSong: function (col, curBeat) {
      if (curBeat === this.$refs.beatmaker.beatBankChoice) {
        this.$refs.beatmaker.animate(col, true)
      }
    },
    changeBMBank: function (bankNum) {
      this.$refs.beatmaker.changeBank(bankNum, 'beatBank')
    },
    selectSMBank: function () {
      this.$refs.songmaker.changeBank(this.$refs.beatmaker.beatBankChoice)
    },
    playSelected: function () {
      StartAudioContext(Tone.context)
      if (this.visible === 'soundsynth') {
        this.$refs.soundsynth.spaceDown()
        setTimeout(() => {
          this.$refs.soundsynth.spaceUp()
        }, 1000)
      } else {
        if (this.visible === 'beatmaker') {
          this.$refs.beatmaker.spaceUp()
        } else {
          this.$refs.songmaker.spaceUp()
        }
      }
    },
    helpOverlay: function (event, click, click2) {
      if (click || event.key === '?') {
        this.helpOverlayEnabled = !this.helpOverlayEnabled
        return
      }
      if (click2 && this.helpOverlayEnabled) {
        this.helpOverlayEnabled = !this.helpOverlayEnabled
      }
    },
    runEscape: function (event) {
      // todo: escape other possible popup tools as well
      return this.helpOverlay(event, false, true)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 1px;
  width: auto;
/*  height: 96.5vh;*/
  border: 4px solid black;
  padding: 2px;
  outline: none;
  margin-bottom: 10px;
  flex: 1;
}

#app div.hidden {
  display: none;
}
.view-choice-wrapper {
  display: inline-flex;
}
.view-button {
  padding: 4px;
  margin: 4px;
}
</style>
