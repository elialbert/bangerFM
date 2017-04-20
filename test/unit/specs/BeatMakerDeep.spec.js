import Vue from 'vue'
import BeatMaker from 'src/components/BeatMaker'
import firebaseBridge from 'src/assets/instrumentDefs/firebaseBridge'
import defLoader from 'src/assets/instrumentDefs/defLoader'

// still testing from beatmaker as they do not exist much separately
describe('BeatMakerDeep.vue', () => {
  var vm
  var component

  beforeEach(function() {
    defLoader.clearCookies()
    stubFBBridge(firebaseBridge)
    vm = setupVm(Vue, BeatMaker, {visible: 'beatmaker'}, 
                 '<test :visible="visible"></test>')
    component = getComponent(vm)
  })

  it('has defs', () => {
    expect(component.defs.mediumSynth.name).to.equal('mediumSynth')
  })

  it('can go deep', done => {
    component.enterUp()
    check(Vue, false, () => {
      expect(component.$refs.beatmakerdeep).to.exist
      expect(component.deep).to.equal(true)
      component.enterUp()
      check(Vue, done, () => {
        expect(component.$refs.beatmakerdeep).not.to.exist
        expect(component.deep).to.equal(false)
      })
    })
  })

  it('can randomize non deep', done => {
    component.randomize()
    check(Vue, false, () => {
      let data = component.dataArray[0]
      let found = []
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (data[i] && data[i].enabled) {
          found.push(data[i])
        }
      }
      expect(found.length).to.be.above(1)
      found = false
      component.clearInstrumentRow()
      check(Vue, done, () => {
        let data = component.dataArray[0]
        let found = false
        for (let i = 0; i < Object.keys(data).length; i++) {
          if (data[i] && data[i].enabled) {
            found = data[i]
          }
        }
        expect(found).to.be.false
      })
    })
  })

  it('can change timing in deep timing mode', done => {
    component.randomize()
    component.enterUp()
    check(Vue, false, () => {
      expect(component.deep).to.be.true
      component.select()
      check(Vue, false, () => {
        let data = component.dataArray[0]
        expect(data[0].measureSub).to.equal('8t')
        expect(data[1].measureSub).to.equal('8t')
        expect(data[2].measureSub).to.equal('8t')
        expect(data[3].measureSub).to.equal('8t')
        expect(data[4].measureSub).to.equal(false)

        component.moveRight()
        component.moveRight()
        component.moveRight()
        component.moveRight()
        component.moveRight()
        check(Vue, false, () => {
          component.select()
          check(Vue, false, () => {
            data = component.dataArray[0]
            expect(data[4].measureSub).to.equal('8t')
            expect(data[5].measureSub).to.equal('8t')
            component.moveLeft()
            component.moveLeft()
            component.moveLeft()
            component.moveLeft()
            check(Vue, false, () => {
              component.select()
              check(Vue, done, () => {
                expect(component.dataArray[0][0].measureSub).to.be.false
              })
            })
          })
        })
      })
    })
  })
})