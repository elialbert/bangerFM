<template>
    <div class="innerBox" 
      @mouseleave="selected = false"
      :class="{ selected: selected, enabled: state > 0, ['enabled' + state]: true}" 
      @mouseover="hoverClick" @click="click" @mousedown="mouseDown"
    >
  </div>
</template>

<script>
// handles inner square states
export default {
  name: 'inner-box',
  props: ['n', 'm', 'drawMode'],
  components: {
  },
  data: function () {
    return {
      selected: false,
      state: 0
    }
  },
  methods: {
    mouseDown: function (event) {
      let newDrawMode = parseInt(this.state || 0) > 0
      this.$emit('innerClick', this.m, this.n, this.state || 0, newDrawMode)
    },
    click: function (event) {
      let newDrawMode = null
      if (event) {
        newDrawMode = parseInt(this.state || 0) > 0
        this.state = ((this.state || 0) + 1) % 10
      } else {
        if (this.drawMode) {
          this.state = ((this.state || 0) + 1) % 10
        } else {
          this.state = 0
        }
      }
      this.$emit('innerClick', this.m, this.n, this.state, newDrawMode)
    },
    hoverClick: function (event) {
      this.selected = true
      if (event.buttons === 1 || event.which === 1) {
        this.click(false)
      }
    }
  }
}
</script>

<style>
.innerBox {
  width: 33.33333333%; 
  height: 33.33333333%;
  border: black 1px solid; 
  box-sizing: border-box;  
}
.innerBox .selected {
  background-color: yellow;
  opacity: 0.1;
}
.innerBox div.enabled.selected {
  opacity: 0.6;
}
.enabled1 {
  background-color: #FF0000;
}
.enabled2 {
  background-color: #E2571E;
}
.enabled3 {
  background-color: #FF7F00;
}
.enabled4 {
  background-color: #FFFF00;
}
.enabled5 {
  background-color: #00FF00;
}
.enabled6 {
  background-color: #96bf33;
}
.enabled7 {
  background-color: #0000FF;
}
.enabled8 {
  background-color: #4B0082;
}
.enabled9 {
  background-color: #8B00FF;
}
</style>
