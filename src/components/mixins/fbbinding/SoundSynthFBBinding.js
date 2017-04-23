import firebaseBridge from '../../../assets/instrumentDefs/firebaseBridge'
import soundsynthUtils from '../../../assets/soundsynthUtils'

module.exports = {
  methods: {
    doFBBinding: function (sbnum, cb) {
      this.loading = true
      console.log('doing fbbinding with ' + this.user + ' ' + this.workspace + ' ' + sbnum)
      firebaseBridge.idefRef(this.user, this.workspace, sbnum).on('value', snapshot => {
        this.loading = false
        let v = snapshot.val()
        console.log('got v')
        console.log(v)
        if (!v || !Object.keys(v).length) {
          console.log('going to change bank')
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
