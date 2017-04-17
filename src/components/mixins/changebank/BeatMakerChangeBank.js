import Vue from 'vue'

module.exports = {
  methods: {
    changeBank: function (num, bankType, shifted) {
      if (bankType !== this.bankType) { return }
      this.beatBankChoice = num

      if (!shifted) {
        let stored = this.loadBeat(num)
        if (this.user) {
          let fbcb = this.prepareFBCB()
          this.doFBBinding(num, fbcb)
        } else {
          this.dataArray = stored
          this.perMeasure = stored.perMeasure
          this.restartFromChange()
          this.saveBeat()
        }
      }
      this.$refs.beatBankChoice.selected = num
    },
    prepareFBCB: function () {
      let fbcb
      if (this.running) {
        fbcb = () => {
          this.startPlaying()
          this.saveBeat(true)
        }
      } else {
        fbcb = () => {
          this.saveBeat(true)
        }
      }
      return fbcb
    },
    restartFromChange: function () {
      Vue.nextTick(() => {
        if (this.running) {
          this.startPlaying()
        }
      })
    }
  }
}
