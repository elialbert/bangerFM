import Vue from 'vue'
import SoundSynthDeep from 'src/components/SoundSynthDeep'
import defLoader from 'src/assets/instrumentDefs/defLoader'
import firebaseBridge from 'src/assets/instrumentDefs/firebaseBridge'

describe('SoundSynthDeep.vue', () => {
  var vm
  var component

  beforeEach(function() {
    defLoader.clearCookies()
    let defs = defLoader.load(0)
    vm = setupVm(Vue, SoundSynthDeep, {visible: 'soundsynth', selected: 0, defs: defs, soundBankChoice: 0}, 
                 '<test :visible="visible" :user=false :defs="defs" :selected="selected" :soundBankChoice="soundBankChoice"></test>')
    component = getComponent(vm)
  })

  it('has def', function () {
    expect(component.def.name).to.equal('highSynth')
  })

  it('changes slider values by sending a key', function() {
    var startVal = component.$refs['instrumentDeep0'].$children[0].sdata.val
    var instrument = component.$refs['instrumentDeep0']
    instrument.changeSliderValue(0, 1)
    var newVal = component.$refs['instrumentDeep0'].$children[0].sdata.val
    expect(newVal).to.be.above(startVal)
  })
})
