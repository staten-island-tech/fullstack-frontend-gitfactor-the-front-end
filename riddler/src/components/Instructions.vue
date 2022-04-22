<template>
  <div class="pause-menu">
     <div class="icon-div">
<font-awesome-icon @click="$emit('closeInstruc')" icon="x" class="x-icon"/>
</div>

<h2 class="pause-title instruction-title">Instructions</h2>
<div class="instructions-content">
<p>
Welcome to my tower…
</p>
<p>
Press/click the arrow buttons on the screen to move left or right. You can also click the corresponding buttons on your keyboard (&lt; and >) to move. 
</p>
<p>
Use Z to take a closer look at items scattered around the floors. You can then choose to pick up the item. When an item is in your inventory, you can use it to solve puzzles…although your suffering will delight me infinitely more.
</p>
<p>
You can use items in conjunction with other items to find hints. For instance, select the key in your inventory to open a hidden door. 
</p>
<p>
Each floor has a riddle and a hint. The hints are hidden somewhere in the room. While the hints aren’t essential to solving the riddler, they’re certainly helpful.
</p>
<p>
My Tower awaits, and we are hungry...
</p>
</div>
  </div>
</template>

<script>
export default {
name: "Instructions"
}
</script>

<style>
.instruction-title{
  margin-bottom: 1rem;
  font-size: 3rem;
}
.instructions-content p{
  font-size: 2rem;
  color: black;
  text-align: left;
  margin-bottom: 1rem;
  padding-left: 1rem;
}
</style>