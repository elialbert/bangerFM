<template>
  <div class='song-row'>
    <div v-for="n in numCols" 
      class='song-square' v-on:mouseover="hoverSelect(n - 1)" v-on:click="hoverClick"
      v-bind:class="{ selected: selected[0] == n - 1  && selected[1] == songIndex && visible == 'songmaker',
        playing: (playing == n - 1),
        invisible: songArray1[n - 1] == undefined || songArray1[n - 1] == -1
        }"
      :style="{ 'width': getSquareWidth(n - 1)}"
    > 
      <song-square
        v-bind:text="text(n - 1)"
        v-bind:ref="'songSquare' + n"
      >
      </song-square>
    </div>
  </div>
</template>

<script>
import SongSquare from './SongSquare'
import iutils from '../assets/instrumentUtils'

export default {
  name: 'song-maker-row',
  props: ['songArray', 'numCols', 'selected', 'playing', 'songIndex', 'visible'],
  components: {
    SongSquare
  },
  data: function () {
    return {
      perMeasureData: {}
    }
  },
  computed: {
    songArray1: function () {
      return this.songArray ? this.songArray : []
    }
  },
  methods: {
    hoverSelect: function (n) {
      this.$emit('hoverSelectSM', n, this.songIndex)
    },
    hoverClick: function () {
      this.$emit('hoverClickSM')
    },
    getSquareWidth (n) {
      let val = this.songArray1[n]
      let w
      if (val && this.perMeasureData[val]) {
        w = iutils.calcNumCols(this.perMeasureData[val]) * 1.718
      } else {
        w = 32 * 1.718
      }
      return w + 'px'
    },
    text: function (n) {
      let num = this.songArray1[n]
      if (Number.isNaN(num) || num === undefined || num < 0 || num === null) {
        return ''
      }
      return num + 1
    },
    updatePicture: function (beatData, beatNum) {
      if (beatData && beatData.perMeasure) {
        this.perMeasureData[beatNum] = beatData.perMeasure
      }

      for (var n = 0; n < this.numCols; n++) {
        if (this.songArray1[n] === beatNum) {
          this.$refs['songSquare' + (n + 1)][0].beat = beatData
        }
        if (Number.isNaN(this.songArray1[n]) || (this.songArray1[n] === '')) {
          this.$refs['songSquare' + (n + 1)][0].beat = [[]]
        }
      }
    }
  }
}

</script>

<style>
.song-row {
  display: inline-flex;
/*  border: 1px solid black;
*/}
.song-square {
/*  width: 55px; */
  height: 24px;
  background: white;
  margin: 4px;
  border: 1px solid black;
  cursor: crosshair;
  flex-grow: 0;
  flex-shrink: 0;
}
.song-square.playing {
  background: yellow;
}
.song-square.selected {
  background: #a9f26a;
}
.song-square-text {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%); 
}
.invisible.selected {
  opacity: 1;
}
.invisible {
  opacity: 0.5;
}
</style>
