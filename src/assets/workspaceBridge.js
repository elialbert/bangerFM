import firebaseBridge from './instrumentDefs/firebaseBridge'

var saveWorkspace = function (user, name, cb) {
  firebaseBridge.wsdefRef(user, name).update(
    {
      permissions: {
        read: 'private',
        write: 'private'
      }
    }
  )
}

var updateWorkspaces = function (user, data) {
  firebaseBridge.wsdefRef(user).set(data)
}

export default {
  saveWorkspace: saveWorkspace,
  updateWorkspaces: updateWorkspaces
}
