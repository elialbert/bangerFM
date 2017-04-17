import Vue from 'vue'
import firebaseBridge from '../../../assets/instrumentDefs/firebaseBridge'
import defLoader from '../../../assets/instrumentDefs/defLoader'
import mutils from '../../../assets/movementUtils'

module.exports = {
  methods: {
    doFBBinding: function () {
      this.loading = true
      firebaseBridge.smdefRef(this.user).on('value', snapshot => {
        this.loading = false
        let v = snapshot.val()
        if (!v || !Object.keys(v).length) {
          defLoader.loadSong(this.user)
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
