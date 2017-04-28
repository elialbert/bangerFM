import Vue from 'vue'
import VTooltip from 'v-tooltip'
import Instrument from 'src/components/Instrument'

var defData = {
  name: 'lowSynth',
  index: 0,
  properties: {
    harmonicity: {
      val: 0.504,
      start: 0.001,
      end: 1,
      step: 0.1,
      name: 'harmonicity'
    },
    modulationIndex: {
      val: 990,
      start: 1,
      end: 1000,
      step: 10,
      name: 'modulationIndex'
    },
    something: {
      val: 850,
      start: 1,
      end: 1000,
      step: 1,
      name: 'something'
    }
  }
}

describe('Instrument.vue', () => {
  it('should change data with slider change', () => {
    var vm = setupVm(Vue, Instrument, { def: defData }, '<test :def="def"></test>', VTooltip)
    var component = getComponent(vm)
    expect(component.def.index).to.equal(0)
    expect(component.$children[0].sdata.val).to.equal(.504)
    component.changeSliderValue(0,1)
    expect(component.$children[0].sdata.val).to.equal(.604)
  })

  it('should not change data out of bounds', () => {
    var vm = setupVm(Vue, Instrument, { def: defData }, '<test :def="def"></test>', VTooltip)
    var component = getComponent(vm)
    expect(component.$children[1].sdata.val).to.equal(990)
    component.changeSliderValue(1,1)
    expect(component.$children[1].sdata.val).to.equal(1000)
    component.changeSliderValue(1,1)
    expect(component.$children[1].sdata.val).to.equal(1000)
  })  
})
