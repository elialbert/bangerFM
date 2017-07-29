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
      this.bmRef = firebaseBridge.bmdefRef(this.user, this.workspace, this.beatBankChoice).on('value', snapshot => {
        this.doneLoading = true
        let v = snapshot.val()
        if (!v) { return }
        this.perMeasure = v.perMeasure
        this.pitchKey = v.pitchKey || 'C Minor Blues'
        this.dataArray = v
      })
    }
  }
}
