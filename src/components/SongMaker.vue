<template>
  <div id='song-maker'
    v-bind:class="{ active: visible == 'songmaker'}"
    @click="$emit('switchView', 'songmaker')"
  >
    <div v-if="loading">Loading...</div>
    <song-maker-row v-for="(songArray, songIndex) in songData" v-if="!loading"
      v-on:hoverSelectSM="hoverSelect" v-on:hoverClickSM="changeBMBank"
      v-bind:numCols="numCols"
      v-bind:selected="selected"
      v-bind:playing="playing[songIndex]"
      v-bind:songArray="songArray"
      v-bind:songIndex="songIndex"
      v-bind:visible="visible"
      v-bind:ref="'songMakerRow' + songIndex"
    >
    </song-maker-row>
  </div>
</template>

<script>
import SongMakerRow from './SongMakerRow'
import mutils from '../assets/movementUtils'
import iutils from '../assets/instrumentUtils'
import beatBridge from '../assets/beatBridge'
import defLoader from '../assets/instrumentDefs/defLoader'
import firebaseBridge from '../assets/instrumentDefs/firebaseBridge'
import Tone from '../assets/tone.js'
import soundsynthUtils from '../assets/soundsynthUtils'
import SongMakerFBBinding from './mixins/fbbinding/SongMakerFBBinding'
import SongMakerChangeBank from './mixins/changebank/SongMakerChangeBank'

export default {
  name: 'song-maker',
  mixins: [SongMakerFBBinding, SongMakerChangeBank],
  props: ['visible', 'user', 'cbcb', 'workspace'],
  components: {
    SongMakerRow
  },
  watch: {
    user: function (val1, val2) {
      if (val1 && !val2) {
        this.doFBBinding()
      }
    }
  },
  data: function () {
    return {
      numCols: 16,
      songData: defLoader.loadGeneric('songData') || iutils.createSongArray(),
      selected: [0, 0],
      playing: this.initPlaying(),
      running: false,
      totalTime: {0: 0},
      defs: {},
      loading: false,
      defsLength: 12,
      idefLookup: {}
    }
  },
  mounted: function () {
    this.redrawBackgrounds()
    mutils.fixNullSong(this.songData)
  },
  computed: {
    defs1: function () {
      return soundsynthUtils.sortDefs(this.defs)
    }
  },
  methods: {
    initPlaying: function () {
      var p = {}
      for (var i = 0; i < 5; i++) {
        p[i] = 0
      }
      return p
    },
    moveRight: function () {
      this.selected = mutils.moveRight(this.selected, this.numCols)
    },
    moveLeft: function () {
      this.selected = mutils.moveLeft(this.selected)
    },
    moveUp: function () {
      this.selected = mutils.moveUp(this.selected)
    },
    moveDown: function () {
      this.selected = mutils.moveDown(this.selected, Math.min(Object.keys(this.songData).length + 1, 4))
      if (this.selected[1] >= Object.keys(this.songData).length) {
        this.songData[this.selected[1]] = {}
      }
    },
    hoverSelect: function (x, y) {
      if (this.visible === 'beatmaker') {
        return
      }
      this.selected = [x, y]
    },
    changeBMBank: function () {
      if (this.visible && this.visible === 'songmaker') {
        this.defsLength = firebaseBridge.fbObjLength(this.defs)
        this.idefLookup = soundsynthUtils.createIDefLookup(this.defs)
        if (this.songData[this.selected[1]][this.selected[0]] !== undefined) {
          this.$emit('changeBMBank', this.songData[this.selected[1]][this.selected[0]])
        } else {
          this.$emit('selectSMBank')
        }
      }
    },
    spaceDown: function () { return },
    spaceUp: function () {
      this.defsLength = firebaseBridge.fbObjLength(this.defs)
      this.idefLookup = soundsynthUtils.createIDefLookup(this.defs)
      this.running ? this.stopPlaying() : this.startPlaying()
      this.$emit('updateMessage', 'Playing: ' + this.running)
    },
    stopPlaying: function () {
      if (this.loop) {
        beatBridge.stopTransport()
        this.loop = undefined
      }
      this.running = false
      this.playing = this.initPlaying()
      this.totalTime = {0: 0}
      this.loop = undefined
    },
    startPlaying: function () {
      if (!Object.keys(this.defs1).length) {
        this.cbcb()
      }
      if (!Object.keys(this.defs1).length) {
        console.log('error: please refresh')
        return
      }
      this.stopPlaying()
      this.fixNullSong()

      this.running = true
      beatBridge.startTransport()
      let songIndex = 0
      while (songIndex < Object.keys(this.songData).length) {
        let songArray = this.songData[songIndex]
        let beatChoice = songArray[this.playing[songIndex]]
        while (Number.isNaN(beatChoice) || beatChoice === -1 || beatChoice === undefined) {
          this.playing[songIndex] += 1
          beatChoice = songArray[this.playing[songIndex]]
          if ((this.playing[songIndex] > this.numCols) || Number.isNaN(this.playing[songIndex])) {
            return
          }
        }
        this.doBeat(beatChoice, songIndex)
        this.totalTime[songIndex] = new Tone.TransportTime(this.loop.loopEnd)
        songIndex += 1
      }
    },
    nextBeat: function (songIndex) {
      this.playing[songIndex] = this.playing[songIndex] === this.numCols ? 0 : this.playing[songIndex] + 1
      let beatChoice = this.songData[songIndex][this.playing[songIndex]]
      if (Number.isNaN(beatChoice) || beatChoice === -1 || beatChoice === undefined) {
        return this.nextBeat(songIndex)
      }
      this.doBeat(beatChoice, songIndex)
      this.totalTime[songIndex] = this.totalTime[songIndex].add(this.loop.loopEnd)
    },
    doBeat: function (beatChoice, songIndex) {
      let dataArray = defLoader.loadBeat(this.user, this.workspace, beatChoice)
      if (!this.defs1) {
        console.log('no defs!')
      }
      this.loop = beatBridge.makeLoop(beatBridge.dataFunc({dataArray: dataArray, defsLength: this.defsLength, idefLookup: this.idefLookup}, this.animate, this.defs1, this.nextBeat, songIndex), dataArray[0].length || Object.keys(dataArray[0]).length)
      this.loop.loop = 1
      this.loop.start(this.totalTime[songIndex])
    },
    animate: function (col, bm, songIndex) {
      this.$emit('animateSong', col, this.songData[songIndex][this.playing[songIndex]])
    },
    backspace: function () {
      // do not delete if currently playing
      if (this.running && this.canNotDelete()) {
        return
      }
      this.changeBank(-1)
      this.redrawBackgrounds()
    },
    handleRestore: function (toRestore) {
      this.songData = toRestore.obj
      defLoader.saveSong(this.user, this.workspace, this.songData, true)
    },
    redrawBackgrounds: function () { // take this out entirely? seems expensive
      for (var i = 0; i < 10; i++) { // for each possible beat
        let beat = defLoader.loadBeat(this.user, this.workspace, i, null, true)
        if (beat) {
          for (var j = 0; j < 5; j++) { // for each row
            if (this.songData[j] && this.$refs['songMakerRow' + j]) {
              if (this.$refs['songMakerRow' + j][0]) {
                this.$refs['songMakerRow' + j][0].updatePicture(beat, i)
              }
            }
          }
        }
      }
    },
    randomize: function () {
      // todo
    },
    clearInstrumentRow: function () {
      // todo
    }
  }
}

</script>

<style>
#song-maker {
  border: 2px solid black;
  width: 98.5%;
  margin-bottom: 4px;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 10px;
  padding: 4px;
  overflow-x: scroll;
  overflow-y: hidden;
}
#song-maker.active {
  border: 2px solid red;
}
</style>
