<template>
<div class='nav-header'>
  <span class='nav-logo'>BANGER.FM</span>
  <sound-meter
    v-on:crashEvent="crashEvent" ref='soundmeter'
  ></sound-meter>
  <div id='help-overlay-button' 
    v-on:click.stop="helpOverlay(undefined, true, false)"
  >
    <span>?</span>
  </div>
  <div class='status-message-container'>
    <span class='status-message'
      v-tooltip="message"
    >{{ message }}</span>
  </div>
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
import SoundMeter from './SoundMeter'
import Auth from './Auth'

export default {
  name: 'control-panel',
  props: ['user', 'authCB', 'signedOutCB', 'crashEvent', 'message', 'workspace', 'wsToggle', 'helpOverlay'],
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
.status-message-container {
  margin-left: 20px;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  padding-left: 20px;
}
span.status-message {
  display: inline-block;
}
#workspace-display {
  float: right;
}
.nav-logo {
  font-weight: bolder;
}
</style>
