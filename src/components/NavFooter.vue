<template>
<div class='nav-footer'>
  a <a href="http://zap.sexy" target='_blank'>zap.sexy</a> production
  <div id='help-overlay-button' 
    v-on:click.stop="helpOverlay(undefined, true, false)"
  >
    <span>?</span>
  </div>
  <div id='help-overlay-pointer'>
    Press ? or click here for help:
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
#help-overlay-pointer {
  float: right;
  font-weight: bolder;
}
#help-overlay-button {
  margin-left: 10px;
  background-color: yellow;
  width: 30px;
  border-radius: 50%;
  box-shadow: 1px 1px 1px black;
  text-align: center;
  cursor: pointer; cursor: hand;
  float: right;
}
#help-overlay-button span {
  display: inline-block;
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
