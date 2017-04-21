<template>
<div id='workspace-manager'>
  <div class='loading-workspace'
    v-if="loading"
  >Loading...</div>
  <div class='notloading' v-if="!loading">
    <p>
    Choose from your private workspaces:
    <BankChoice
      :bankChoiceNum="workspace"
      :bankType="'workspace'"
      @changeBank="changeWorkspace"
    >
    </BankChoice>
    </p>
  </div>
<!--   <p>
  Or create a public space:
  <br/>
  <input class='workspace-name-picker'
    v-bind:placeholder="publicWorkspaceName"
    v-model='customName'
  ></input>
  <button
    @click="changeWorkspace"
  >Go</button>
  </p>
 --></div>
</template>

<script>
import BankChoice from './BankChoice'

export default {
  name: 'workspace-manager',
  props: ['user', 'workspace', 'publicWorkspace'],
  components: { BankChoice },
  data: function () {
    return {
      loading: false,
      customName: undefined
    }
  },
  computed: {
    publicWorkspaceName: function () {
      if (this.publicWorkspace) {
        return this.workspace
      }
      return 'Your workspace name here'
    }
  },
  methods: {
    changeWorkspace: function (workspaceName) {
      this.loading = true
      this.$emit('rerouteWorkspace', workspaceName)
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
  height: 10%;
  width: 30%;
  z-index: 39;
}
.workspace-name-picker {
  width: 50%;
  margin-right: 10px;
}
</style>