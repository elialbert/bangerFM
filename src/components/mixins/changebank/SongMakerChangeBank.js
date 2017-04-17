import Vue from 'vue'
import defLoader from '../../../assets/instrumentDefs/defLoader'
import mutils from '../../../assets/movementUtils'

module.exports = {
  methods: {
    changeBank: function (num) {
      if (this.beatvsong === 0) { return }
      if (num === undefined) { num = this.songData[this.selected[1]][this.selected[0]] || 0 }

      this.fixNullSong()
      let oldVals = mutils.sdKeys(this.songData, this.selected)

      this.songData[this.selected[1]][this.selected[0]] = num
      this.takeOutEmptyOnChange()
      this.fixNullSong()
      defLoader.saveSong(this.user, this.workspace, this.songData)

      this.selected = [this.selected[0], this.selected[1]] // force redraw
      this.fixNullSong()

      this.moveCursorUpOnEmptyChange(num)
      this.restartFromChange(oldVals)
    },
    moveCursorUpOnEmptyChange: function (num) {
      if (!mutils.sdKeys(this.songData, this.selected).length) {
        if (num === -1 && this.selected[1] > 0) {
          this.selected[1] -= 1
        }
      }
    },
    restartFromChange: function (oldVals) {
      if (oldVals.length === 0 && this.running) {
        this.stopPlaying()
        Vue.nextTick(() => {
          this.startPlaying()
        })
      }
    },
    takeOutEmptyOnChange: function () {
      this.songData[this.selected[1]] = this.beatsInRow()
    },
    beatsInRow: function () {
      return mutils.sdKeys(this.songData, this.selected).filter(function (x) { return x !== -1 && x !== undefined })
    },
    fixNullSong: function () {
      mutils.fixNullSong(this.songData)
    },
    // cannot delete only beat in row while song is playing
    onlyBeatInRow: function () {
      return this.beatsInRow().length === 1
    },
    canNotDelete: function () {
      return ((this.playing[this.selected[1]] === this.selected[0]) || this.onlyBeatInRow())
    }
  }
}
