import Vue from 'vue'
import SoundSynth from 'src/components/SoundSynth'
import defLoader from 'src/assets/instrumentDefs/defLoader'
import firebaseBridge from 'src/assets/instrumentDefs/firebaseBridge'

// stub out firebase
describe('SoundSynthFB.vue', () => {
  var vm
  var component

  beforeEach(function() {
    stubFBBridge(firebaseBridge)
    let user = false
    vm = setupVm(Vue, SoundSynth, {visible: 'soundsynth', user: user}, 
                 '<test :visible="visible" :user="user"></test>')
    component = getComponent(vm)
    component.defs = defLoader.load(0)
    component.$unbind = sinon.stub()
    defLoader.clearCookies()
  })

  it('has sanity', function () {
    expect(component.defs1.mediumSynth.name).to.equal('mediumSynth')
  })

  it('can be logged in', done => {
    sinon.stub(component, '$bindAsObject').withArgs('defs', 'path', null, sinon.match.any)

    // spy(component.$bindAsObject)
    expect(firebaseBridge.idefRef(true, 1)).to.equal('path')
    vm.user = 'fakeuserid'
    check(Vue, done, () => {
      expect(component.$bindAsObject.called).to.be.true
    })
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