<template>
  <div class='draw-automation'>
    <div class='draw-box'>
      <div class='draw-row'
        v-for="i in colAxis"
      >
        <div class='draw-square'
          v-on:mouseover="hoverSelect(i, j - 1, $event)" v-on:click="select"
          v-for="j in Object.keys(dataArray).length"
          :class="{ enabled: isEnabled(i, j - 1) }"
        >
        </div>
        <div class='note-name'>
        {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import iutils from '../assets/instrumentUtils'
import Tonal from 'tonal'

export default {
  name: 'draw-automation',
  props: ['active', 'dataArray', 'pitchKey', 'visible', 'def'],
  data: function () {
    return {
      selected: [0, 0]
    }
  },
  computed: {
    colAxis: function () {
      if (this.active === 'Pitch') {
        return this.pitchKeyNotes
      } else if (this.active === 'Volume') {
        return this.volumeValues
      } else if (this.active === 'Probability') {
        return [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
      }
    },
    pitchKeyNotes: function () {
      let p = Tonal.scale(this.pitchKey.toLowerCase())
      let i = p.indexOf('C')
      if (i === -1) { i = p.indexOf('Db') }
      return p.slice(i).concat(p.slice(0, i)).reverse()
    },
    volumeValues: function () {
      let start = this.def.properties.volume.start
      let end = this.def.properties.volume.end
      return [end].concat(Array.from({length: (end - start)},
        (v, k) => k + start).reverse())
    }
  },
  methods: {
    isEnabled: function (i, j) {
      let curSquare = this.dataArray[j]
      if (this.active === 'Pitch') {
        let pc = Tonal.note.pc(curSquare.pitch)
        if (!pc) { return false }
        return (pc === i) ||
          (this.pitchKeyNotes.indexOf(pc) < this.pitchKeyNotes.indexOf(i))
      } else if (this.active === 'Volume') {
        if (!curSquare.enabled) { return false }
        if (curSquare.e1) {
          return parseInt(i) <= parseInt(curSquare.e1)
        } else {
          return parseInt(i) <= parseInt(this.def.properties.volume.val)
        }
      } else if (this.active === 'Probability') {
        if (!curSquare.enabled) { return false }
        if (curSquare.e2) {
          return parseInt(i) <= parseInt(curSquare.e2)
        } else {
          return 10
        }
      }
    },
    hoverSelect: function (i, j, event) {
      if (this.visible !== 'beatmaker') {
        return
      }
      this.selected = [i, j]
      if (event.buttons === 1) {
        this.select()
      }
    },
    select: function () {
      this.$emit('drawSelect', this.selected)
    }
  }
}
</script>

<style>
.draw-automation {
  margin-bottom: 8px;
}
.draw-row {
  display: flex;
}
.draw-square {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 2px;
  border: 1px solid black;
  cursor: crosshair;
}
.draw-square:hover {
  background-color: yellow;
}
.draw-square.enabled {
  background-color: red;
}
.draw-square.enabled:hover {
  background-color: orange;
}
.note-name {
  padding-left: 10px;
}
</style>