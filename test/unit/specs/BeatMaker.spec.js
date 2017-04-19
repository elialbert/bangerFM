import Vue from 'vue'
import BeatMaker from 'src/components/BeatMaker'
import firebaseBridge from 'src/assets/instrumentDefs/firebaseBridge'
import defLoader from 'src/assets/instrumentDefs/defLoader'

describe('BeatMaker.vue', () => {
  var vm
  var component

  beforeEach(function() {
    stubFBBridge(firebaseBridge)
    vm = setupVm(Vue, BeatMaker, {visible: 'beatmaker'}, 
                 '<test :visible="visible"></test>')
    component = getComponent(vm)
    defLoader.clearCookies()
  })

  it('has defs', () => {
    expect(component.defs.mediumSynth.name).to.equal('mediumSynth')
  })

  it('starts with 0, 0 selected', () => {
    expect(component.$el.querySelectorAll('.beat-column')[0].classList.contains('selected')).to.equal(true)
  })

  it('starts with 0, 0 selected and then can move', () => {
    expect(component.$el.querySelectorAll('.beat-column')[0].classList.contains('selected')).to.equal(true)
    component.moveDown()
    expect(component.selected[1]).to.equal(1)
    expect(component.selected[0]).to.equal(0)
    component.moveRight()
    component.moveRight()
    component.moveUp()
    component.moveUp()
    expect(component.selected[0]).to.equal(2)
    expect(component.selected[1]).to.equal(0)
  })

  it('can enable squares', done => {
    component.moveDown()
    component.select()
    component.moveRight()
    component.select()
    check(Vue, done, () => {
      expect(component.$el.querySelectorAll('.beat-column.enabled').length).to.equal(2)
    })
  })

  it('changes pitch on selected square', done => {
    component.select()
    check(Vue, false, () => {
      component.sendKey(0, 1)
      check(Vue, done, () => {
        expect(component.dataArray[0][0].pitch).to.equal('C#3')
        expect(component.dataArray[0][0].enabled).to.equal(true)
        expect(component.$refs['instrumentrow0'][0].$el.querySelectorAll('.beat-column')[0].querySelector('span').innerHTML).to.equal('C#3')
      })
    })
  })

  it ('can switch beat banks', done => {
    component.moveRight()
    component.select()
    expect(component.soundBankChoice).to.equal(0)
    check(Vue, false, () => {
      setTimeout(() => {
        expect(component.dataArray[0][1].enabled).to.equal(true)
        component.changeBank(1, 'beatBank')
        check(Vue, false, () => {
          expect(component.dataArray[0][1].enabled).to.equal(false)
          expect(component.beatBankChoice).to.equal(1)
          component.changeBank(0, 'beatBank')
          check(Vue, done, () => {
            expect(component.beatBankChoice).to.equal(0)
            expect(component.dataArray[0][1].enabled).to.equal(true)
            done()
          })
        })
      }, 500)
    })
  })

  it ('can autofill', done => {
    component.moveDown()
    component.moveDown()
    check(Vue, false, () => {
      component.autoFill('moveRight')
      check(Vue, false, () => {
        expect(component.dataArray[2][15].enabled).to.equal(true)
        expect(component.dataArray[2][16].enabled).to.equal(true)
        expect(component.dataArray[2][0].enabled).to.equal(true)
        expect(component.dataArray[2][1].enabled).to.equal(true)
        component.autoFill('moveRight')
        check(Vue, done, () => {
          expect(component.dataArray[2][0].enabled).to.equal(true)
          expect(component.dataArray[2][1].enabled).to.equal(false)
          expect(component.dataArray[2][2].enabled).to.equal(true)
          expect(component.dataArray[2][3].enabled).to.equal(false)
          done()
        })
      })
    })
  })

  it ('has separate permeasure for each beat', done => {
    component.changePerMeasure(1)
    component.select()
    check(Vue, false, () => {
      expect(component.dataArray[0][0].enabled).to.equal(true)
      expect(Object.keys(component.dataArray[0]).length).to.equal(20)
      component.changeBank(1, 'beatBank')
      check(Vue, false, () => {
        expect(component.dataArray[0][0].enabled).to.equal(false)
        component.select()
        check(Vue, false, () => {
          expect(component.dataArray[0][0].enabled).to.equal(true)
          expect(Object.keys(component.dataArray[0]).length).to.equal(32)
          component.changeBank(0, 'beatBank')
          check(Vue, done, () => {
            expect(component.dataArray[0][0].enabled).to.equal(true)
            expect(Object.keys(component.dataArray[0]).length).to.equal(20)
            done()
          })
        })
      })
    })
  })

  it ('can have 3beat measures in 4 time and move left/right', done => {
    for (let i = 0; i < 4; i++) {
      component.dataArray[0][i].measureSub = '8t'
    }
    expect(component.selected[0]).to.equal(0)
    component.moveRight()
    component.moveRight()
    component.moveRight()
    check(Vue, false, () => {
      expect(component.selected[0]).to.equal(4)
      component.moveLeft()
      check(Vue, done, () => {
        expect(component.selected[0]).to.equal(2)
      })
    })
  })

  it ('can have 3beat measures in 4 time and move at row end', done => {
    for (let i = 28; i < 32; i++) {
      component.dataArray[1][i].measureSub = '8t'
    }
    component.selected[0] = 28
    component.selected[1] = 1
    component.moveRight()
    component.moveRight()
    component.moveRight()
    component.moveRight()
    component.moveRight()
    check(Vue, false, () => {
      expect(component.selected[1]).to.equal(1)
      expect(component.selected[0]).to.equal(30)
      component.moveUp()
      component.moveRight()
      component.moveDown()
      check(Vue, done, () => {
        expect(component.selected[1]).to.equal(1)
        expect(component.selected[0]).to.equal(30)
      })
    })
  })
})
