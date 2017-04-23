import firebaseBridge from './instrumentDefs/firebaseBridge'

var saveWorkspace = function (user, name, cb) {
  firebaseBridge.wsdefRef(user, name).update(
    {
      permissions: {
        read: 'private',
        write: 'private'
      }
    }, function (error) {
    console.log('in cb with ' + error)
    cb(error)
  })
}

var updateWorkspaces = function (user, data) {
  console.log('updating with data ')
  console.log(data)
  firebaseBridge.wsdefRef(user).set(data)
}

export default {
  saveWorkspace: saveWorkspace,
  updateWorkspaces: updateWorkspaces
}
