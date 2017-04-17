<template>
<div class='nav-footer'>
  a <a href="http://zap.sexy" target='_blank'>zap.sexy</a> production
  <div id='help-overlay-button' 
    v-on:click.stop="helpOverlay(undefined, true, false)"
  >
    <span>?</span>
  </div>

</div>
</template>
<script>
export default {
  name: 'nav-footer',
  props: ['helpOverlay']
}
</script>
<style>
.nav-footer {
  height: 20px;
  background-color: gray;
  color: white;
  margin-top: 20px;
  padding: 4px;
  margin-bottom: 4px;
}
.hidden {
  display: none;
}
#help-overlay-button {
  background-color: yellow;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid black;
  box-shadow: 1px 1px 1px black;
  padding: 3px 3px 0 3px;
  text-align: center;
  cursor: pointer; cursor: hand;
  float: right;
  margin-bottom: -2%;
}
#help-overlay-button span {
  display: inline-block;
  font-size: 20px;
  font-weight: bolder;
  vertical-align: middle;
  color: black;
}
a:visited {
  color: yellow;
}
a {
  color: yellow;
}

</style>
