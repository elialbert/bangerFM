<template>
<div class='nav-header'>
  <span>BANGER.FM</span>
  <sound-meter
    v-on:crashEvent="crashEvent" ref='soundmeter'
  ></sound-meter>
  <div id='message'>{{ message }}</div>
  <Auth
    :user="user"
    :workspace="workspace"
    :wsToggle="wsToggle"
    v-on:signedIn="authCB"
    v-on:signedOut="signedOutCB"
  ></Auth>
</div>
</template>
<script>
import SoundMeter from './soundMeter'
import Auth from './Auth'

export default {
  name: 'control-panel',
  props: ['user', 'authCB', 'signedOutCB', 'crashEvent', 'message', 'workspace', 'wsToggle'],
  components: { SoundMeter, Auth }
}
</script>
<style>
.nav-header {
  height: 20px;
  background-color: gray;
  color: white;
  padding: 4px;
  margin-bottom: 20px;
  display: flex;
}
#message {
  margin-left: 20px;
}
#workspace-display {
  float: right;
}
</style>
