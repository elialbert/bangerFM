<template>
<div id='workspace-manager'>
  <div class='loading-workspace'
    v-if="loading"
  >Loading...</div>
  <div class='notloading' v-if="!loading">
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
    <p>
    Or save as a separate workspace with a name so you can manage sharing:
    <br/>
    <input class='workspace-name-picker'
      v-bind:placeholder="publicWorkspaceName"
      v-model='customName'
    ></input>
    <button
      @click="changeWorkspace(null, $event)"
    >Save</button>
    </p>
    <p>
    Or choose from your previously saved workspaces:
    <br/>
    <select @change="changeWSDropdown">
      <option v-for="wskey in workspaceOptions" v-bind:value="wskey.value"
        selected="isSelected(wsKey.value)"
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
  props: ['user', 'workspace', 'publicWorkspace'],
  components: { BankChoice },
  data: function () {
    return {
      loading: false,
      customName: undefined,
      workspaces: {}
    }
  },
  computed: {
    publicWorkspaceName: function () {
      return 'Your workspace name here'
    },
    workspaceOptions: function () {
      let r = []
      for (let key of Object.keys(this.workspaces).filter(key => !['.key'].includes(key))) {
        r.push({value: key})
      }
      return r
    }
  },
  watch: {
    user: function (val1, val2) {
      if (val1 && !val2) {
        this.$bindAsObject('workspaces', firebaseBridge.wsdefRef(this.user), null, () => {
        })
      }
    }
  },
  methods: {
    changeWSDropdown: function ($event) {
      return this.changeWorkspace($event.target.value)
    },
    changeWorkspace: function (newWorkspace) {
      // first arg should be null if workspace passed in is custom
      if (!newWorkspace) {
        this.loading = true
        workspaceBridge.saveWorkspace(this.user, this.customName, (err) => {
          console.log('done ' + err)
        })
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
  width: 30%;
  z-index: 39;
}
.workspace-name-picker {
  width: 50%;
  margin-right: 10px;
}
</style>