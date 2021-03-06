import Vue from 'vue'
import firebaseBridge from '../../../assets/instrumentDefs/firebaseBridge'
import defLoader from '../../../assets/instrumentDefs/defLoader'
import mutils from '../../../assets/movementUtils'

module.exports = {
  methods: {
    doFBBinding: function () {
      this.loading = true
      if (this.smRef) {
        firebaseBridge.smdefRef(this.user, this.workspace).off('value', this.smRef)
      }
      this.smRef = firebaseBridge.smdefRef(this.user, this.workspace).on('value', snapshot => {
        this.loading = false
        let v = snapshot.val()
        if (!v || !Object.keys(v).length) {
          defLoader.loadSong(this.user, this.workspace)
        } else {
          if (v[0] === undefined) {
            v[0] = []
          }
          this.songData = v
          this.songData = mutils.fixNullSong(this.songData)
          Vue.nextTick(() => {
            this.redrawBackgrounds()
          })
        }
      })
    }
  }
}
