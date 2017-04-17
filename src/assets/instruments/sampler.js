import Tone from '../tone.js'

var samplers = {}

var makeSampler = function (filename, index) {
  var distortion = new Tone.Chebyshev(1)
  var reverb = new Tone.Phaser()

  samplers[index] = {
    instrument: new Tone.Sampler('../../../static/samples/' + filename).chain(reverb, distortion).toMaster(),
    distortion: reverb,
    reverb: reverb
  }
}

var getSampler = function (iindex) {
  return samplers[iindex]
}

var start = function (index) {
  getSampler(index).instrument.triggerAttack()
}
var stop = function (index) {
  getSampler(index).instrument.triggerRelease()
}

var beat = function (note, time, index) {
  getSampler(index).instrument.triggerAttackRelease(note, '8n', time)
}

export default {
  getSampler: getSampler,
  samplers: samplers,
  start: start,
  stop: stop,
  beat: beat,
  makeSampler: makeSampler
}
