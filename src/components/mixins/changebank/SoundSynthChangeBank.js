import defLoader from '../../../assets/instrumentDefs/defLoader'
import soundsynthUtils from '../../../assets/soundsynthUtils'

module.exports = {
  methods: {
    changeBank: function (soundBankNum, bankType, shifted, reset, fbcb) {
      if (bankType !== this.bankType) { return }
      var nonUserResetCB = this.setupResetCB(soundBankNum, shifted)
      if (!shifted) {
        this.changeBankInner(soundBankNum, reset, nonUserResetCB, fbcb)
      }
      this.finalizeBankChange(soundBankNum)
    },
    setupResetCB: function (soundBankNum, shifted) {
      let nonUserResetCB
      if (!shifted && !this.user) {
        nonUserResetCB = (data) => {
          this.defs = data
          this.saveDef(soundBankNum)
          this.idefLookup = soundsynthUtils.createIDefLookup(this.defs)
        }
      }
      return nonUserResetCB
    },
    changeBankInner: function (soundBankNum, reset, nonUserResetCB, fbcb) {
      this.clearWatchers()
      var stored = defLoader.load(this.user, this.workspace, soundBankNum, reset, nonUserResetCB, fbcb)
      if (!this.user) {
        this.defs = stored
        this.reconstructWatchers()
      } else {
        this.doFBBinding(soundBankNum, fbcb)
      }
    },
    finalizeBankChange: function (soundBankNum) {
      this.$refs.soundBankChoice.selected = soundBankNum
      this.soundBankChoice = soundBankNum
      this.saveDef(soundBankNum)
    }
  }
}
