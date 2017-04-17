import actionHistory from '../../assets/actionHistory'

module.exports = {
  methods: {
    undoRedo: function (event) {
      let toRestore
      if (!event.shiftKey && !event.metaKey) { return }
      if (!event.shiftKey && event.metaKey) {
        toRestore = actionHistory.undo()
      } else if (event.shiftKey && event.metaKey) {
        toRestore = actionHistory.redo()
      }
      if (!toRestore) { return }
      this.handleRestore(toRestore)
    },
    handleRestore (toRestore) {
      let dest
      switch (toRestore.objType) {
        case 'ss':
          dest = this.$refs.soundsynth
          break
        case 'bm':
          dest = this.$refs.beatmaker
          break
        case 'generic_songData':
          dest = this.$refs.songmaker
          break
        case 'generic_CPDef':
          dest = this.$refs.controlpanel
          break
      }
      if (!dest) { return }
      this.updateMessage(toRestore.message)
      dest.handleRestore(toRestore)
    }
  }
}
