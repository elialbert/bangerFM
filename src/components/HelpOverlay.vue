<template>
  <div id='help-overlay'
  >
    <div class='header bold'>Instructions and Keyboard Shortcuts</div>
    <div class='body'>
      <div>Instructions:</div>
      <div>Use the Sound Synthesis screen to play with individual instrument sounds. Press <span class='bold'>enter</span> with any instrument selected to switch to a deeper sound synthesis view.</div>
      <div>Use the Beatmaker screen to construct beats, and below that the Songmaker to string together layers of beats into songs.</div>
      <div>Press <span class='bold'>Shift+Up</span> and <span class='bold'>Shift+Down</span> to switch between soundsynth, beatmaker and songmaker.</div>
      <div>Press <span class='bold'>c</span> to toggle the global DJ settings control panel - for things like BPM.</div>
      <br/>
      <div>Keyboard shortcuts for Sound Synthesis</div>
      <hr/>
      <table>
        <tr><td>q/a, w/s, e/d, etc</td><td> Move slider values up and down on screen for the selected instrument.</td></tr>
        <tr><td>Space</td><td> Play the sound.</td></tr>
        <tr><td>Arrow keys</td><td> Move between instruments.</td></tr>
        <tr><td>Number keys</td><td> Change between sound banks (same as the number buttons). Hold Shift + Number to copy the current bank into the new numbered bank.</td></tr>
        <tr><td>Shift + R</td><td> Randomize the current instruments (or selected instrument, if you are in deep mode).</td></tr>
      </table>
      <br/>
      <div>Keyboard shortcuts for Beat Maker</div>
      <hr/>
      <table>
        <tr><td>Space</td><td> Play/Pause</td></tr>
        <tr><td>Arrow keys</td><td> Change selected beat or song square</td></tr>
        <tr><td>x</td><td> Enable or disable selected beat square</td></tr>
        <tr><td>c</td><td> Show and hide the DJ control panel</td></tr>
        <tr><td>t</td><td> In Beatmaker, make selected enabled square a triplet.</td></tr>
        <tr><td>Shift + Left/Right</td><td> Autofill patterns for beats. Press direction key multiple times for different patterns.</td></tr>
        <tr><td>Number Keys</td><td> Switch between numbered beats. Hold shift to copy the current beat to the new numbered beat.</td></tr>
        <tr><td>q/a</td><td> Change the pitch of the enabled selected square.</td></tr>
        <tr><td>Shift + R</td><td> Randomize the current instrument row.</td></tr>
        <tr><td>Shift + C</td><td> Clear the current instrument row.</td></tr>
      </table>
      <br/>
      <div>Keyboard shortcuts for Song Maker</div>
      <hr/>
      <table>
        <tr><td>Number Keys</td><td> In Songmaker, enable the numbered beat for the selected square.</td></tr>
        <tr><td>Shift + D</td><td> Remove the highlighted beat from the song.</td></tr>
      </table>

      <hr/>
      <div>Undo/Redo works with <span class='bold'>Meta (ctrl or cmd) + Z / Meta + Shift + Z</span></div>
      <p>
      <div>Is stuff not quite working? Maybe the app has changed and you need to <a v-on:click.stop="resetCookies" href="javascript:void(0)">Reset Your Local Data</a>. Or feel free to reach out on <a href='https://github.com/elialbert/bangerFM/issues'>Github Issues</a> to make a bug report.</div>
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
  left: 5%;
  background-color: #63676d;
  z-index: 40;
}
#help-overlay div.body table td:first-child {
  font-weight: bolder;
  width: 20%;
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
