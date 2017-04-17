<template>
  <div class="slider"
    :style="{'flex-direction': flexSliderStyle}"
  >
    <div v-for="n in 5"
      class="rectangle"
      :style="{'cursor': getCursor}"
      v-bind:class="{ white: n > getNumRectangles, hover: hover == n}"
      v-on:click="soundSliderClick(n)"
      v-on:mouseover="soundSliderHover(n, $event)"
      v-on:mouseleave="stopSliderHover(n, $event)"
    ></div>
  </div>
</template>

<script>
  export default {
    name: 'slider',
    props: ['sdata', 'propIndex', 'instrumentIndex', 'allowMouse', 'horizontal'],
    data: function () {
      return {
        hover: -1
      }
    },
    computed: {
      getNumRectangles: function () {
        return Math.round(((this.sdata.val - this.sdata.start) / (this.sdata.end - this.sdata.start)) * 5)
      },
      getCursor: function () {
        if (this.allowMouse && !this.horizontal) { return 'ns-resize' }
        return 'default'
      },
      flexSliderStyle: function () {
        if (this.horizontal) {
          return 'row'
        } else {
          return 'column-reverse'
        }
      }
    },
    methods: {
      animate: function () {
        this.$el.classList.add('activesl')
        this.$emit('sliderHover', this.sdata.name)
        var self = this
        setTimeout(function () {
          self.$el.classList.remove('activesl')
        }, 200)
      },
      getNewVal: function (n) {
        var newVal = (n / 5.0) * (this.sdata.end - this.sdata.start) + this.sdata.start
        if (parseInt(this.sdata.step) === this.sdata.step) {
          newVal = parseInt(newVal)
        }
        return newVal
      },
      soundSliderClick: function (n) {
        if (!this.allowMouse) {
          return
        }
        this.$emit('soundSliderClick', this.instrumentIndex, this.propIndex, this.getNewVal(n))
      },
      soundSliderHover: function (n, event) {
        if (!this.allowMouse) {
          return
        }
        if (event.buttons === 1) {
          return this.soundSliderClick(n)
        }
        this.hover = n
        this.$emit('sliderHover', this.sdata.name)
      },
      stopSliderHover: function (n, event) {
        this.hover = -1
        if (event.buttons === 1 && n === 1) {
          // make sure we are leaving from the bottom
          if (event.clientY > event.fromElement.offsetTop) {
            this.soundSliderClick(0)
          }
        }
      }
    }
  }
</script>

<style>
  .slider {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    flex-direction: column-reverse;
    -webkit-flex-direction: column-reverse; 
  }
  .rectangle {
    width:14px;
    height:10px;
    background:blue;
    margin: 2px;
    border: 1px solid black;
  }
  
  .white {
    background: white;
  }

  div.slider.volume div.rectangle.hover {
    background: yellow;
  }

  div.slider.volume div.rectangle.white.hover {
    background: yellow;
  }

  div.rectangle.hover {
    background: yellow;
  }

  div.slider.volume div.rectangle.white {
    background:white;
  }

  div.slider.volume div.rectangle {
    background: red;
  }

  .activesl {
    background: yellow;
  }
</style>
