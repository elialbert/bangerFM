import firebaseBridge from '../../../assets/instrumentDefs/firebaseBridge'
import soundsynthUtils from '../../../assets/soundsynthUtils'

module.exports = {
  methods: {
    doFBBinding: function (sbnum, cb) {
      this.loading = true
      firebaseBridge.idefRef(this.user, this.workspace, sbnum).on('value', snapshot => {
        this.loading = false
        let v = snapshot.val()
        if (!v || !Object.keys(v).length) {
          this.changeBank(sbnum, 'soundBank', false, false, cb, true)
        } else {
          this.defs = v
          this.reconstructWatchers()
          if (cb) {
            cb()
          }
          if (this.cbcb) { this.cbcb() }
          this.idefLookup = soundsynthUtils.createIDefLookup(this.defs1)
        }
      })
    }
  }
}
