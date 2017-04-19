import Vue from 'vue'
import SongMaker from 'src/components/SongMaker'
import defLoader from 'src/assets/instrumentDefs/defLoader'

describe('SongMaker.vue', () => {
  var vm
  var component

  beforeEach(function() {
    vm = setupVm(Vue, SongMaker, {visible: 'songmaker'}, 
                 '<test :visible="visible"></test>')
    component = getComponent(vm)
    component.defs = defLoader.load(0)
    component.songData = {0: {0: 0, 1: 1, 2: 0, 3: 1}, 1: {}}
    defLoader.clearCookies()
  })

  it('has defs', () => {
    expect(component.defs.mediumSynth.name).to.equal('mediumSynth')
    expect(component.numCols).to.equal(16)
  })

  it('starts with 0, 0 selected and then can move', () => {
    expect(component.$el.querySelectorAll('.song-square')[0].classList.contains('selected')).to.equal(true)
    component.moveRight()
    expect(component.selected[0]).to.equal(1)
    component.moveLeft()
    expect(component.selected[0]).to.equal(0)
    component.moveDown()
    expect(component.selected[1]).to.equal(1)
    expect(component.selected[0]).to.equal(0)
    expect(Object.keys(component.songData).length).to.equal(2)
    component.moveDown()
    expect(Object.keys(component.songData).length).to.equal(3)
  })

  it('can choose beats', done => {
    component.selected = [0, 0]
    component.changeBank(5)
    expect(component.songData[0][0]).to.equal(5)
    component.moveRight()
    component.changeBank(1)
    component.moveDown()
    component.changeBank(2)
    component.moveLeft()
    check(Vue, false, () => {
      let r = component.songData[1][0]
      expect(r).to.equal(2)
      component.moveRight()
      component.changeBank(3)
      check(Vue, false, () => {
        component.changeBank(1)
        check(Vue, false, () => {
          expect(component.songData[1][1]).to.equal(1)
          component.moveLeft()
          component.backspace()
          check(Vue, done, () => {
            expect(component.songData[1][0]).to.equal(1)
            expect(Object.values(component.songData[1]).length).to.equal(1)
          })
        })
      })
    })
  })
})
