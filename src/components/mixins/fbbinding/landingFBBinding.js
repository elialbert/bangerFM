import firebaseBridge from '../../../assets/instrumentDefs/firebaseBridge'
import iutils from '../../../assets/instrumentUtils'

module.exports = {
  methods: {
    doFBBinding: function () {
      firebaseBridge.idefRef(this.user, 0, 0).once('value', snapshot => {
        this.defs = iutils.simpleInstruments(snapshot.val())
        this.finishLoading()
      })
      let sbnum = 0
      if (this.ssRef) {
        firebaseBridge.idefRef(this.user, this.workspace, sbnum).off('value', this.ssRef)
      }
      this.ssRef = firebaseBridge.idefRef(this.user, this.workspace, sbnum).on('value', snapshot => {
        let v = snapshot.val()
        if (v && Object.keys(v).length) {
          for (let key in v) {
            for (let propKey in v[key].properties) {
              this.defs[key].properties[propKey].val = v[key].properties[propKey].val
            }
          }
        }
      })
    },

    doBeat: function () {
      this.doneLoading = false
      if (this.bmRef) {
        firebaseBridge.bmdefRef(this.user, this.workspace, this.beatBankChoice).off('value', this.bmRef)
      }
      for (let instr of [1, 2, 3, 4]) {
        for (let col of [...Array(16).keys()]) {
          this.bmRef = firebaseBridge.bmOneDefRef(this.user, this.workspace, this.beatBankChoice, instr, col).on('value', snapshot => {
            let v = snapshot.val()
            if (!v) { return }
            this.dataArray[instr][col] = v
            this.$refs.mainbox.setState(instr, col, v)
            if (instr === 4 && col === 15) {
              this.doneLoading = true
            }
          })
        }
      }
    }
  }
}
