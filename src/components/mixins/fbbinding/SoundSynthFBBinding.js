import firebaseBridge from '../../../assets/instrumentDefs/firebaseBridge'
import soundsynthUtils from '../../../assets/soundsynthUtils'

module.exports = {
  methods: {
    doFBBinding: function (sbnum, cb) {
      this.loading = true
      this.$bindAsObject('defs', firebaseBridge.idefRef(this.user, this.workspace, sbnum), null, () => {
        this.loading = false
        this.reconstructWatchers()
        if (cb) { cb() }
        if (this.cbcb) { this.cbcb() }
        this.idefLookup = soundsynthUtils.createIDefLookup(this.defs1)
      })
    }
  }
}
