<template>
  <div class='draw-automation'>
    <div class='draw-box'>
      <div class='draw-row'
        v-for="i in pitchKeyNotes"
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
  props: ['dataArray', 'pitchKey', 'visible'],
  data: function () {
    return {
      selected: [0, 0]
    }
  },
  computed: {
    pitchKeyNotes: function () {
      return Tonal.scale(this.pitchKey.toLowerCase()).reverse()
    }
  },
  methods: {
    isEnabled: function (i, j) {
      let pc = Tonal.note.pc(this.dataArray[j].pitch)
      return (pc === i) ||
        (Tonal.note.chroma(pc) > Tonal.note.chroma(i))
    },
    hoverSelect: function (i, j, event) {
      console.log('in hoverselect with ' + i + ': ' + j)
      console.log(event)
      if (this.visible !== 'beatmaker') {
        return
      }
      this.selected = [i, j]
      if (event.buttons === 1) {
        this.select()
      }
    },
    select: function () {
      console.log('selecting ')
      console.log(this.selected)
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
.note-name {
  padding-left: 10px;
}
</style>