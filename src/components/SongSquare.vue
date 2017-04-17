<template>
  <div class='song-square-container'>
    <div class='song-square-text'>
      {{ text }}
    </div>
    <div class='song-square-background'
      v-if="text"
    >
      <div v-for="(instrument, index) in beat" class='ss-beat-row'
        v-if="index != 'perMeasure'"
      >
        <div v-for="(col, colIndex) in beat[index]"
          class='ss-beat-square'
          v-bind:class="{ selected: beat[index][colIndex].enabled }"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'song-square',
  props: ['text'],
  data: function () {
    return {
      beat: [[]]
    }
  }
}

</script>

<style>
  .song-square-container {
    position: relative;
  }
  .song-square-text {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%); 
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    font-weight: bold;
    text-shadow: 0 0 3px white;
  }
  .song-square-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .ss-beat-row {
    display: flex;
  }
  .ss-beat-square {
    width: 8px;
    height: 3px;
  }
  .ss-beat-square.selected {
    background: rgba(255, 0, 0, 0.4);
  }
</style>
