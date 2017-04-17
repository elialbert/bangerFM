<template>
  <div id='help-overlay'
  >
    <div class='header bold'>Keyboard Shortcuts and Instructions</div>
    <div class='body'>
      <div>Instructions:</div>
      <div>Use the Sound Synthesis screen to play with individual instrument sounds. Press <span class='bold'>enter</span> with any instrument selected to switch to a deeper sound synthesis view.</div>
      <div>Use the Beatmaker screen to construct beats, and below that the Songmaker to construct songs.</div>
      <div>Press <span class='bold'>Shift+Up</span> and <span class='bold'>Shift+Down</span> to switch between soundsynth, beatmaker and songmaker.</div>
      <br/>
      <div>Keyboard shortcuts for Sound Synthesis:</div>
      <ul>
        <li><span class='bold'>q/a, w/s, e/d, etc</span>: Move slider values up and down on screen for the selected instrument.</li>
        <li><span class='bold'>Space</span>: Play the sound.</li>
        <li><span class='bold'>Arrow keys</span>: Move between instruments.</li>
        <li><span class='bold'>Number keys</span>: Change between sound banks (same as the number buttons). Hold <span class='bold'>Shift + Number</span> to copy the current bank into the new numbered bank.
        <li><span class='bold'>Shift + R</span>: Randomize the current instruments (or instrument, if you are in deep mode).</li>
      </ul>
      <br/>
      <div>Keyboard shortcuts for Beat and Song Making:</div>
      <ul>
        <li><span class='bold'>Space</span>: start/stop play.</li>
        <li><span class='bold'>Arrow keys</span>: Change selected beat or song square</li>
        <li><span class='bold'>x</span>: Enable or disable selected beat square</li>
        <li><span class='bold'>c</span>: Show and hide the DJ control panel</li>
        <li><span class='bold'>t</span>: In Beatmaker, make selected enabled square a triplet.</li>
        <li><span class='bold'>Ctrl + Left/Right</span>: In Beatmaker, autofill patterns for beats. Press direction key multiple times for different patterns.</li>
        <li><span class='bold'>\</span>: In Beatmaker, sample the selected instrument as seen on the right.</li>
        <li><span class='bold'>Number Keys</span>: In Songmaker, enable that numbered beat for the selected square. In Beatmaker, switch between numbered beats. Hold shift to copy the current beat to the new numbered beat.</li>
        <li><span class='bold'>q/a</span>: In Beatmaker, change the pitch of the enabled selected square.</li>
        <li><span class='bold'>Backspace or Shift + D</span>: In Songmaker, remove the beat from the song.</li>
        <li><span class='bold'>Shift + R</span>: Randomize the current instrument row.</li>
        <li><span class='bold'>Shift + R</span>: Clear the current instrument row.</li>
      </ul>

      <div>Undo/Redo works with <span class='bold'>Meta (ctrl or cmd) + Z / Meta + Shift + Z</span></div>
      <p>
      <div>Is stuff not quite working? Maybe the app has changed and you need to <a v-on:click.stop="resetCookies" href="#">Reset Your Local Data</a></div>
    </div>
  </div>
</template>

<script>
import defLoader from '../assets/instrumentDefs/defLoader'

export default {
  name: 'help-overlay',
  props: [],
  methods: {
    resetCookies: function () {
      defLoader.clearCookies()
    }
  }
}
</script>

<style>
#help-overlay {
  position: absolute;
  height: auto;
  width: 90%;
  background-color: #63676d;
  opacity: 0.92;
  z-index: 40;
}
.header {
  padding: 40px;
  font-size: 20px;
  opacity: 1;
  color: white;
  text-align: center;
}
.body {
  padding: 25px;
  opacity: 1;
  color: white;
}
.bold {
  font-weight: bolder;
}
a:visited {
  color: yellow;
}
</style>
