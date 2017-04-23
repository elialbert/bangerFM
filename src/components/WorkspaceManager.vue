<template>
<div id='workspace-manager'>
  <div class='loading-workspace'
    v-if="loading"
  >Loading...</div>
  <div class='notloading' v-if="!loading">
    <p>Current Workspace: <b>{{ workspace }}</b></p>
    <div class='ws-sharing' v-if="publicWorkspace && workspaces[workspace]">
      <div class='wsshare-label'>Who can see and play: </div>
      <input type="radio" class="wsshare-read-private" value="private" v-model="workspaces[workspace].permissions.read">
      <label for="read-private">Private</label>
      <input type="radio" class="wsshare-read-public" value="public" v-model="workspaces[workspace].permissions.read">
      <label for="wsshare-read-public">Public</label>
      <br>
      <div v-if="workspaces[workspace].permissions.read == 'public'">
        <div class='wsshare-label'>Who can change things: </div>
        <input type="radio" class="wsshare-write-private" value="private" v-model="workspaces[workspace].permissions.write">
        <label for="wsshare-write-private">Private</label>
        <input type="radio" class="wsshare-write-public" value="public" v-model="workspaces[workspace].permissions.write">
        <label for="wsshare-write-public">Public</label>
        <div class='wsshare-label'>Individual access control coming soon!</div>
        <div class='wsshare-label'>For now, share this workspace by sharing the following url with friends: </div>
        <div class='wsshare-url'>banger.fm/#/app/{{ user }}/workspace</div>
      </div>
      <br>
    </div>
    <hr/>
    <p>
    Choose from your private workspaces:
    <BankChoice
      :disabled="publicWorkspace"
      :bankChoiceNum="workspace"
      :bankType="'workspace'"
      @changeBank="changeWorkspace"
    >
    </BankChoice>
    </p>
    <hr/>
    <p>
    Or save as a separate workspace with a name so you can manage sharing:
    <br/>
    <input class='workspace-name-picker'
      v-bind:placeholder="'Your workspace name here'"
      v-model='customName'
    ></input>
    <button
      @click="changeWorkspace(null, $event)"
    >Save</button>
    </p>
    <hr/>
    <p>
    Or choose from your previously saved workspaces:
    <br/>
    <select @change="changeWSDropdown">
      <option v-for="wskey in workspaceOptions" v-bind:value="wskey.value"
      >
        {{ wskey.value }}
      </option>
    </select>
    </p>
  </div>
</div>
</template>

<script>
import BankChoice from './BankChoice'
import workspaceBridge from '../assets/workspaceBridge'
import firebaseBridge from '../assets/instrumentDefs/firebaseBridge'

export default {
  name: 'workspace-manager',
  props: ['user', 'workspace', 'publicWorkspace', 'otherUser'],
  components: { BankChoice },
  data: function () {
    return {
      loading: false,
      customName: undefined,
      workspaces: {},
      otherWorkspaces: {}
    }
  },
  computed: {
    workspaceOptions: function () {
      let r = []
      r.push({value: ''})
      for (let key of Object.keys(this.workspaces).filter(key => !['.key'].includes(key))) {
        r.push({value: key})
      }
      return r
    },
    readOnly: function () {
      return this.otherUser && (this.otherWorkspaces[this.workspace].permissions.write === 'private')
    }
  },
  watch: {
    user: function (val1, val2) {
      if (val1 && !val2) {
        this.$bindAsObject('workspaces', firebaseBridge.wsdefRef(this.user), null, () => {
        })
      }
    },
    otherUser: function (val1, val2) {
      if (val1 && !val2) {
        this.$bindAsObject('otherWorkspaces', firebaseBridge.wsdefRef(this.otherUser), null, () => {
          this.$emit('readOnly', this.otherWorkspaces[this.workspace].permissions.write === 'private')
        })
      }
    },
    workspaces: {
      handler: function (val) {
        let wsData = firebaseBridge.removeKey(val)
        if (!wsData || Object.keys(wsData).length === 0) {
          return
        }
        workspaceBridge.updateWorkspaces(this.user, wsData)
      },
      deep: true
    }
  },
  methods: {
    changeWSDropdown: function ($event) {
      if (!$event.target.value) { return }
      return this.changeWorkspace($event.target.value)
    },
    changeWorkspace: function (newWorkspace) {
      // first arg should be null if workspace passed in is custom
      if (!newWorkspace) {
        this.loading = true
        workspaceBridge.saveWorkspace(this.user, this.customName)
      } else {
        this.customName = null
      }
      this.$emit('rerouteWorkspace', newWorkspace || this.customName)
    },
    isSelected (key) {
      return key === this.workspace ? 'selected' : false
    }
  }
}
</script>

<style>
#workspace-manager {
  border: 2px solid black;
  padding: 15px;
  left: 50%;
  top: 4.4%;
  position: absolute;
  background-color: #63676d;
  color: white;
  height: auto;
  z-index: 39;
}
.workspace-name-picker {
  width: 50%;
  margin-right: 10px;
}
.wsshare-write-public {
  margin-left: 7px;
}
.wsshare-label {
  margin-top: 10px;
}
div.wsshare-url {
  user-select: text;
  cursor: text;
}
</style>