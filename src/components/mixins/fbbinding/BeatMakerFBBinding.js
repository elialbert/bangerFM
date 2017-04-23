import firebaseBridge from '../../../assets/instrumentDefs/firebaseBridge'
import defLoader from '../../../assets/instrumentDefs/defLoader'

module.exports = {
  methods: {
    doFBBinding: function (beatBankNum, cb) {
      this.loading = true
      firebaseBridge.bmdefRef(this.user, this.workspace, this.beatBankChoice).on('value', snapshot => {
        this.loading = false
        let v = snapshot.val()
        if (!v || !Object.keys(v).length) {
          this.loadBeat(this.beatBankChoice)
        } else {
          this.perMeasure = v.perMeasure
          this.pitchKey = v.pitchKey || 'C Minor Blues'
          this.dataArray = v
          if (cb) {
            cb()
          }
        }
      })
    },
    // need to stick fb beats into local cookie for sm to work from fresh load
    postLoad: function () {
      for (let i = 0; i < 9; i++) {
        firebaseBridge.bmdefRef(this.user, this.workspace, this.beatBankChoice).once('value', snapshot => {
          let v = snapshot.val()
          if (v && Object.keys(v).length) {
            defLoader.saveBeat(this.user, this.workspace, v, i, true, true)
          }
        })
      }
    }
  }
}
