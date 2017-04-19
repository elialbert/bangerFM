<template>
<div id="control-panel">
  <div class='control-span'>BPM: {{ bpm }} 
    <div id='slider-container'>
      <input
        type="range" 
        min="10"
        max="200"
        step="1"
        :value="bpm"
        @input="changeBPM($event)"
      />
    </div>
  </div>
  <div class='control-span'>Swing: {{ swing }}</div>
  <div class='control-span'>
    <button id="pm-up" type="button" v-on:click="swingUp()">UP</button> || 
    <button id="pm-down" type="button" v-on:click="swingDown()">DOWN</button>
  </div>
  <div class='control-span'>EQ:</div>
  <equalizer
    :eqProps="eqProps"
    :global="true"
    v-on:needsToSaveDef="saveData"
  ></equalizer>
</div>
</template>

<script>
import Tone from '../assets/tone.js'
import Equalizer from './Equalizer'
import Effects from '../assets/instruments/effects.js'
import defLoader from '../assets/instrumentDefs/defLoader'
import firebaseBridge from '../assets/instrumentDefs/firebaseBridge'
import Network from './mixins/Network'

export default {
  name: 'control-panel',
  props: ['user', 'workspace'],
  mixins: [Network],
  components: { Equalizer },
  data: function () {
    return {
      bpm: 140,
      swing: 0.05,
      eqProps: {
        low: {
          val: 0,
          start: -30,
          end: 20,
          step: 2,
          name: 'low'
        },
        mid: {
          val: 0,
          start: -30,
          end: 20,
          step: 2,
          name: 'mid'
        },
        high: {
          val: 0,
          start: -30,
          end: 20,
          step: 2,
          name: 'high'
        }
      }
    }
  },
  mounted: function () {
    this.loadData()
    Tone.Transport.bpm.value = this.bpm
    Tone.Transport.swing = this.swing
    this.doSetEQ()
  },
  watch: {
    user: function (val1, val2) {
      if (val1 && !val2) {
        this.doFBBinding()
      }
    }
  },
  methods: {
    doSetEQ: function () {
      Effects.setEQ(this.eqProps.low.val, this.eqProps.mid.val, this.eqProps.high.val)
    },
    doFBBinding: function () {
      firebaseBridge.cpdefRef(this.user, this.workspace).on('value', snapshot => {
        this.restoreState = true
        let v = snapshot.val()
        this.loadData(v)
      })
    },
    changeBPM: function (event) {
      this.bpm = event.srcElement.value
      Tone.Transport.bpm.value = this.bpm
      this.saveData()
    },
    swingUp: function () {
      this.swing = Math.min(1, parseFloat((this.swing + 0.05).toFixed(2)))
      Tone.Transport.swing = this.swing
      this.saveData()
    },
    swingDown: function () {
      this.swing = Math.max(0, parseFloat((this.swing - 0.05).toFixed(2)))
      Tone.Transport.swing = this.swing
      this.saveData()
    },
    loadData: function (data) {
      if (!data) {
        data = defLoader.loadGeneric('CPDef')
      }
      if (!data) {
        return
      }
      this.bpm = data.bpm
      this.swing = data.swing
      if (data.eqProps.low.val !== this.eqProps.low.val || data.eqProps.mid.val !== this.eqProps.mid.val || data.eqProps.high.val !== this.eqProps.high.val) {
        this.eqProps = data.eqProps
        this.doSetEQ()
      }
    },
    handleRestore: function (toRestore) {
      if (toRestore.objType !== 'generic_CPDef') {
        this.$emit('updateMessage', 'Nothing to undo/redo right now.')
        return
      }
      this.restoreState = true
      this.loadData(toRestore.obj)
    },
    saveData: function () {
      let data = {
        bpm: this.bpm,
        swing: this.swing,
        eqProps: this.eqProps
      }
      defLoader.saveGeneric('CPDef', data, this.restoreState)
      if (this.user) {
        this.networkWait('cpdef', () => {
          firebaseBridge.cpdefRef(this.user, this.workspace).set(data)
        })
      }
      this.restoreState = false
    }
  }
}
</script>

<style>
#control-panel {
  border: 2px solid black;
  padding: 15px;
  left: 60%;
  top: 40%;
  position: absolute;
  background-color: #63676d;
  color: white;
  height: 30%;
  width: 30%;
  z-index: 39;
}
#control-panel div.equalizer {
}
#bpm-up {
  margin-left: 10px;
}
.button {
  background-color: #d5dae2;
  border: none;
  color: black;
  padding: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
}
.sliders {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: -3px;
  margin-top: -3px;
  margin-bottom: -3px;

}
.effectName {
  padding-right: 20px;
  padding-left: 10px;
}
div.control-span {
  padding-left: 6px;
  margin-top: 6px;
}
</style>
