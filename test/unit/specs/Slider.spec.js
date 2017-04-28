import Vue from 'vue'
import Slider from 'src/components/Slider'
import VTooltip from 'v-tooltip'

describe('Slider.vue', () => {
  it('should render correct contents', () => {
    const testData = {
      val: 0.904,
      start: 0.001,
      end: 1,
      step: 0.001,
      name: 'harmonicity'
    }
    var vm = setupVm(Vue, Slider, { sdata: testData }, '<test :sdata="sdata"></test>', VTooltip)
    var component = getComponent(vm)
    expect(component.getNumRectangles).to.equal(vm.$el.querySelector('div.slider').querySelectorAll('.rectangle').length)
  })
})
