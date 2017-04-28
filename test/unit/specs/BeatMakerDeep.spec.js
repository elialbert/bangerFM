import Vue from 'vue'
import BeatMaker from 'src/components/BeatMaker'
import firebaseBridge from 'src/assets/instrumentDefs/firebaseBridge'
import defLoader from 'src/assets/instrumentDefs/defLoader'
import VTooltip from 'v-tooltip'

var testInner = function (component) {
  let data = component.dataArray[0]
  expect(component.deep).to.be.true
  let found = []
  let msFound = []
  let pitches = []
  for (let i = 0; i < Object.keys(data).length; i++) {
    if (data[i] && data[i].enabled) {
      found.push(i)
      pitches.push(data[i].pitch)
    }
    if (data[i] && data[i].measureSub) {
      msFound.push(data[i].measureSub)
    }
  }
  return {found: found, msFound: msFound, pitches: pitches}
}

// still testing from beatmaker as they do not exist much separately
describe('BeatMakerDeep.vue', () => {
  var vm
  var component

  beforeEach(function() {
    defLoader.clearCookies()
    stubFBBridge(firebaseBridge)
    vm = setupVm(Vue, BeatMaker, {visible: 'beatmaker'}, 
                 '<test :visible="visible"></test>', VTooltip)
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

  it('can randomize and clear in deep timing mode', done => {
    expect(component.deep).to.equal(0)
    component.randomize()
    component.enterUp()
    check(Vue, false, () => {
      expect(component.deep).to.be.true
      let inner = testInner(component)
      expect(inner.found.length).to.be.above(1)
      expect(inner.msFound.length).to.equal(0)
      expect(inner.pitches.length).to.be.above(1)
      check(Vue, false, () => {
        component.select()
        check(Vue, false, () => {
          inner = testInner(component)
          expect(inner.found.length).to.be.above(1)
          expect(inner.msFound.length).to.be.above(1)
          let oldInnerEnabled = inner.found.slice(0)
          let oldInnerSM = inner.msFound.slice(0)
          let oldInnerPitches = inner.pitches.slice(0)
          component.randomize()
          check(Vue, false, () => {
            inner = testInner(component)
            expect(inner.found).to.eql(oldInnerEnabled)
            expect(inner.pitches).to.eql(oldInnerPitches)
            expect(inner.msFound).not.to.eql(oldInnerSM)
            expect(inner.msFound.length).to.be.above(1)
            oldInnerEnabled = inner.found.slice(0)
            oldInnerSM = inner.msFound.slice(0)
            oldInnerPitches = inner.pitches.slice(0)
            component.clearInstrumentRow()
            check(Vue, false, () => {
              inner = testInner(component)
              expect(inner.found).to.eql(oldInnerEnabled)
              expect(inner.pitches).to.eql(oldInnerPitches)
              expect(inner.msFound).not.to.eql(oldInnerSM)
              expect(inner.msFound.length).to.equal(0)
              oldInnerSM = inner.msFound.slice(0)
              oldInnerPitches = inner.pitches.slice(0)
              // quick check to make sure pitch and timing interact well
              // timing should not change, pitches should
              component.$refs.beatmakerdeep.active = 'Pitch'
              check(Vue, false, () => {
                component.clearInstrumentRow() // reset pitches
                component.randomize() // randomize pitches
                check(Vue, done, () => {
                  inner = testInner(component)
                  expect(inner.msFound).to.eql(oldInnerSM)
                  expect(inner.pitches).not.to.eql(oldInnerPitches)
                })
              })
            })
          })
        })
      })
    })
  })

  it('can randomize and clear in deep pitch mode', done => {
    expect(component.deep).to.equal(0)
    component.randomize()
    component.enterUp()
    check(Vue, false, () => {
      component.$refs.beatmakerdeep.active = 'Pitch'
      expect(component.deep).to.be.true
      let inner = testInner(component)
      expect(inner.found.length).to.be.above(1)
      expect(inner.msFound.length).to.equal(0)
      expect(inner.pitches.length).to.be.above(1)
      check(Vue, false, () => {
        let data = component.dataArray[0]
        if (data[0].enabled) {
          component.select()
        }
        component.select()
        check(Vue, false, () => {
          expect(component.dataArray[0][0].enabled).to.be.true
          expect(component.dataArray[0][0].pitch).to.equal('C5') // for highsynth
          inner = testInner(component)
          expect(inner.found.length).to.be.above(1)
          expect(inner.msFound.length).to.equal(0)
          let oldInnerEnabled = inner.found.slice(0)
          let oldInnerSM = inner.msFound.slice(0)
          let oldInnerPitches = inner.pitches.slice(0)
          component.randomize()
          check(Vue, false, () => {
            inner = testInner(component)
            expect(inner.found).to.eql(oldInnerEnabled)
            expect(inner.pitches).not.to.eql(oldInnerPitches)
            expect(inner.msFound).to.eql(oldInnerSM)
            expect(inner.msFound.length).to.equal(0)
            expect(inner.pitches.length).to.be.above(0)

            oldInnerEnabled = inner.found.slice(0)
            oldInnerSM = inner.msFound.slice(0)
            oldInnerPitches = inner.pitches.slice(0)
            component.clearInstrumentRow()
            check(Vue, done, () => {
              inner = testInner(component)
              expect(inner.found).to.eql(oldInnerEnabled)
              expect(inner.pitches).not.to.eql(oldInnerPitches)
              expect(component.dataArray[0][0].pitch).to.equal('C5')
              expect(inner.msFound).to.eql(oldInnerSM)
              expect(inner.msFound.length).to.equal(0)
            })
          })
        })
      })
    })
  })
})