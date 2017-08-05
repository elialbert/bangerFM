import firebaseBridge from '../../../assets/instrumentDefs/firebaseBridge'
import iutils from '../../../assets/instrumentUtils'

module.exports = {
  methods: {
    doFBBinding: function () {
      firebaseBridge.idefRef(this.user, 0, 0).once('value', snapshot => {
        this.defs = iutils.simpleInstruments(snapshot.val())
        this.finishLoading()
        this.setupIndividualBindings()
      })
    },
    setupIndividualBindings: function () {
      for (let key in this.defs) {
        for (let propKey in this.defs[key].properties) {
          firebaseBridge.idefOneRef(this.user, this.workspace, 0, key, propKey).on('value', snapshot => {
            let v = snapshot.val()
            this.defs[key].properties[propKey].val = v
          })
        }
      }
    },

    doBeat: function () {
      this.doneLoading = false
      if (this.bmRef) {
        firebaseBridge.bmdefRef(this.user, this.workspace, this.beatBankChoice).off('value', this.bmRef)
      }
      for (let instr of [0, 1, 2, 3, 4]) {
        for (let col of [...Array(16).keys()]) {
          for (let triplet of [0, 1, 2]) {
            this.bmRef = firebaseBridge.bmOneDefRef(this.user, this.workspace, this.beatBankChoice, instr, col, triplet).on('value', snapshot => {
              let v = snapshot.val()
              if (!v) { return }
              this.dataArray[instr][col].triplet[triplet] = v
              if (this.$refs && this.$refs.mainbox) {
                this.$refs.mainbox.setState(instr, col, v, triplet)
              }
              if (instr === 4 && col === 15) {
                this.doneLoading = true
              }
            })
          }
        }
      }
    }
  }
}
