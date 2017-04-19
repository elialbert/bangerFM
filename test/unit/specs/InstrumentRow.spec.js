import Vue from 'vue'
import InstrumentRow from 'src/components/InstrumentRow'
import utils from 'src/assets/instrumentUtils'

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

describe('InstrumentRow.vue', () => {
  var vm
  var component

  beforeEach(function() {
    vm = setupVm(Vue, InstrumentRow, 
                 { def: defData, 
                   selected: [0, 0],
                   numCols: 32,
                   enabledArray: utils.createDataArray(4)[0],
                   perMeasure: 4,
                   visible: 'beatmaker'
                 }, 
                 '<test :def="def" :selected="selected" :numCols="numCols" :enabledArray="enabledArray" :perMeasure="perMeasure" :visible="visible"></test>')
    component = getComponent(vm)
  })

  it('has nothing enabled at start', () => {
    expect(Object.keys(component.enabledArray).length).to.equal(32)
    expect(component.$el.querySelectorAll('.enabled').length).to.equal(0)
    expect(component.$el.querySelectorAll('.beat-column').length).to.equal(32)
    expect(component.$el.querySelectorAll('.beat-column.selected').length).to.equal(1)
    expect(component.$el.querySelectorAll('.beat-column')[0].classList.contains('selected')).to.equal(true)
  })

  it('shows enabled squares', done => {
    var enabledArray = utils.createDataArray(32)[0]
    enabledArray[0].enabled = true
    enabledArray[1].enabled = true
    enabledArray[18].enabled = true
    vm = setupVm(Vue, InstrumentRow, 
                 { def: defData, 
                   selected: [0, 0],
                   numCols: 32,
                   enabledArray: enabledArray
                 }, 
                 '<test :def="def" :selected="selected" :numCols="numCols" :enabledArray="enabledArray"></test>')
    component = getComponent(vm)
    check(Vue, done, () => {
      expect(component.$el.querySelectorAll('.enabled').length).to.equal(3)
    })
  })
})
