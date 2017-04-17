import Tone from '../tone.js'

var meter = new Tone.Meter('level')
var meterSlider = {
  val: 0,
  start: 0,
  end: 20,
  step: 0.5
}
var newMeter = function () {
  meter = new Tone.Meter('level')
}

var setEQ = function (low, mid, high) {
  setTimeout(() => {
    var eq = new Tone.EQ3({
      low: low,
      mid: mid,
      high: high,
      lowFrequency: 700,
      highFrequency: 1500
    })
    var comp = new Tone.Compressor(-30, 10)
    Tone.Master.chain(eq, comp, meter)
  }, 0)
}

export default {
  setEQ: setEQ,
  meter: meter,
  newMeter: newMeter,
  meterSlider: meterSlider
}
