import firebaseBridge from '../../../assets/instrumentDefs/firebaseBridge'
import soundsynthUtils from '../../../assets/soundsynthUtils'

module.exports = {
  methods: {
    doFBBinding: function (sbnum, cb) {
      this.loading = true
      firebaseBridge.idefRef(this.user, this.workspace, sbnum).once('value', snapshot => {
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
    }
  }
}
