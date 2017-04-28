import Vue from 'vue'
import SoundSynth from 'src/components/SoundSynth'
import defLoader from 'src/assets/instrumentDefs/defLoader'
import firebaseBridge from 'src/assets/instrumentDefs/firebaseBridge'
import VTooltip from 'v-tooltip'

// stub out firebase
describe('SoundSynthFB.vue', () => {
  var vm
  var component

  beforeEach(function() {
    defLoader.clearCookies()
    stubFBBridge(firebaseBridge)
    let user = false
    vm = setupVm(Vue, SoundSynth, {visible: 'soundsynth', user: user}, 
                 '<test :visible="visible" :user="user"></test>', VTooltip)
    component = getComponent(vm)
    component.defs = defLoader.load(0)
    component.$unbind = sinon.stub()
  })

  it('has sanity', function () {
    expect(component.defs1.mediumSynth.name).to.equal('mediumSynth')
  })

  it('can go deep', done => {
    component.enterUp()
    check(Vue, false, () => {
      expect(component.deep).to.be.true
      let envelope = component.$refs.soundsynthdeep.$refs.envelope0
      let event = {srcElement: {valueAsNumber: 50}}
      envelope.changeSlider('volume', event)
      check(Vue, done, () => {
        component.enterUp()
        expect(component.deep).to.be.false
      })
    })
  })
})