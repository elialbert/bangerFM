import Vue from 'vue'
import SoundSynth from 'src/components/SoundSynth'
import defLoader from 'src/assets/instrumentDefs/defLoader'
import firebaseBridge from 'src/assets/instrumentDefs/firebaseBridge'
import actionHistory from 'src/assets/actionHistory'

describe('SoundSynth.vue', () => {
  var vm
  var component

  beforeEach(function() {
    stubFBBridge(firebaseBridge)
    vm = setupVm(Vue, SoundSynth, {visible: 'soundsynth'}, 
                 '<test :visible="visible" :user=false></test>')
    component = getComponent(vm)
    component.defs = defLoader.load(0)
    defLoader.clearCookies()
  })

  it('has defs', function () {
    expect(component.defs1.mediumSynth.name).to.equal('mediumSynth')
  })

  it('has the first instrument selected', function () {
    expect(component.selected).to.equal(0)
  })

  it('changes selection when you move around', function () {
    component.moveRight()
    expect(component.selected).to.equal(1)
    component.moveRight()
    expect(component.selected).to.equal(2)
    component.moveLeft()
    expect(component.selected).to.equal(1)
    component.moveLeft()
    expect(component.selected).to.equal(0)
    component.moveLeft()
    expect(component.selected).to.equal(0)
  })

  it('changes slider values by sending a key', function() {
    var startVal = component.$refs['instrument0'][0].$children[0].sdata.val
    component.sendKey(0, 1)
    var newVal = component.$refs['instrument0'][0].$children[0].sdata.val
    expect(newVal).to.be.above(startVal)
    component.sendKey(0, 1)
    var newVal = component.$refs['instrument0'][0].$children[0].sdata.val
    expect(newVal).to.be.above(startVal)
    component.sendKey(0, -1)
    var newNewVal = component.$refs['instrument0'][0].$children[0].sdata.val
    expect(newVal).to.be.above(newNewVal)
  })

  it('can reset defs', done => {
    component.resetSoundbank()
    check(Vue, false, () => {
      var v1 = component.$refs['instrument0'][0].$children[0].sdata.val
      component.sendKey(0, 1)
      var v2 = component.$refs['instrument0'][0].$children[0].sdata.val
      expect(v2).to.be.above(v1)
      component.resetSoundbank()
      check(Vue, done, () => {
        var v3 = component.$refs['instrument0'][0].$children[0].sdata.val
        expect(v3).to.equal(v1)
      })
    })
  })

  it('can undo and redo a slider change', done => {
    setTimeout(() => {
      // reset the history
      actionHistory.historyArray = []
      actionHistory.historyIndex = 0

      var startVal = component.$refs['instrument0'][0].$children[0].sdata.val
      component.sendKey(0, 1)
      setTimeout(() => {
        var newVal = component.$refs['instrument0'][0].$children[0].sdata.val
        expect(newVal).to.be.above(startVal)
        component.sendKey(0, 1)
        setTimeout(() => {
          check(Vue, false, () => {
            let toRestore = actionHistory.undo()
            expect(toRestore.key).to.equal(0)
            component.handleRestore(toRestore)
            check(Vue, false, () => {
              var newVal2 = component.$refs['instrument0'][0].$children[0].sdata.val
              expect(newVal2).to.equal(newVal)
              let toRestore2 = actionHistory.redo()
              component.handleRestore(toRestore2)
              check(Vue, done, () => {
                var newVal3 = component.$refs['instrument0'][0].$children[0].sdata.val      
                expect(newVal3).to.be.above(newVal2)
              })
            })
          })
        }, 500)
      }, 500)
    }, 500)
  })
})
