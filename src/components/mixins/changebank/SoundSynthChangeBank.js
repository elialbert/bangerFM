import defLoader from '../../../assets/instrumentDefs/defLoader'
import soundsynthUtils from '../../../assets/soundsynthUtils'

module.exports = {
  methods: {
    changeBank: function (soundBankNum, bankType, shifted, reset, fbcb, noBind = false) {
      if (bankType !== this.bankType) { return }
      var nonUserResetCB = this.setupResetCB(soundBankNum, shifted)
      if (!shifted) {
        this.changeBankInner(soundBankNum, reset, nonUserResetCB, fbcb, noBind)
      }
      this.finalizeBankChange(soundBankNum, reset)
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
    changeBankInner: function (soundBankNum, reset, nonUserResetCB, fbcb, noBind = false) {
      this.clearWatchers()
      var stored = defLoader.load(this.user, this.workspace, soundBankNum, reset, nonUserResetCB, fbcb)
      if (!this.user) {
        this.defs = stored
        this.reconstructWatchers()
      } else {
        if ((noBind || (soundBankNum === this.soundBankChoice)) && !reset) { return }
        this.doFBBinding(soundBankNum, fbcb)
      }
    },
    finalizeBankChange: function (soundBankNum, reset) {
      this.$refs.soundBankChoice.selected = soundBankNum
      this.soundBankChoice = soundBankNum
      if (!reset) {
        this.saveDef(soundBankNum)
      }
    }
  }
}
