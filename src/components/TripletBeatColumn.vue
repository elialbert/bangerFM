<template>
<div class='triplet-beat-column'>
  <div class='tbc-1'></div>
  <div class='tbc-2'></div>
  <div class='tbc-3'></div>
</div>
</template>

<style>
.triplet-beat-column {
  position: absolute;
  width: 20px;
  height: 20px;
  display: flex;
  margin: 4px;
  flex-grow: 0;
  flex-shrink: 0;
  border: 1px solid black;
  pointer-events: none;
}
.tbc-1 {
  width: 33.33%;
  width: calc(100% / 3);
  left: 0%;
  height: 100%;
  border: 1px solid lightgrey;
  pointer-events: none;
}
.tbc-2 {
  width: 33.33%;
  width: calc(100% / 3);
  left: 33.33%;
  left: calc(100% / 3);
  height: 100%;
  border: 1px solid lightgrey;
  pointer-events: none;
}
.tbc-3 {
  width: 33.33%;
  width: calc(100% / 3);
  left: 66.33%;  
  left: calc(100% / 3 * 2);
  height: 100%;
  border: 1px solid lightgrey;  
  pointer-events: none;
}
</style>