<template>
<div id='workspace-manager'>
  <p>
  Choose from your private workspaces:
  <BankChoice
    :bankChoiceNum="workspace"
    :bankType="'workspace'"
    @changeBank="changeWorkspace"
  >
  </BankChoice>
  </p>
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
      this.$emit('changeWorkspace', workspaceName)
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