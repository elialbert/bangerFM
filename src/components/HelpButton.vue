<template>
 <button class='help-button' v-tooltip="helpText">?</button>
</template>

<script>
export default {
  name: 'help-button',
  props: ['helpText']
}
</script>

<style>
.tooltip {
  display: none;
  opacity: 0;
  transition: opacity .15s;
  pointer-events: none;
  padding: 4px;
  z-index: 10000;
}

.tooltip .tooltip-content {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip.tooltip-open-transitionend {
  display: block;
}

.tooltip.tooltip-after-open {
  opacity: 1;
}
button.help-button {
  margin-left: 10px;
  background: yellow;
  border: 1px solid black;
  border-radius: 50%;
  text-align: center;
  cursor: pointer; cursor: hand;
  color: black;
  font-weight: bolder;
  font-size: 12px;
  transition: background .3s;
  appearance: none;
  box-shadow: none;
  margin-top: 2px;
}
button.help-button:hover {
  background-color: white;
}
</style>