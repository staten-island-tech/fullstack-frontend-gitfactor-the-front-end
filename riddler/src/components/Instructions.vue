<template>
  <div class="pause-menu">
    <div class="icon-div">
      <font-awesome-icon @click="$emit('closeInstruc')" icon="x" class="x-icon"/>
    </div>
    <h2 class="pause-title instruction-title">Instructions</h2>
    <div class="instructions-content">
      <p>
        Muahaha! It is I, the Riddler, with some tips and tricks for you!
      </p>
      <p>
        1. Each floor has a tantalizing riddle for you to solve. Once you are confident in your answer, head to the door so you can move on to the next level. Maybe one day, you'll be able to escape (don't count on it). If you think you're a smart cookie, it's possible to solve the Door of Truth's riddle without looking around the floor for clues first. <strong>But if you guess wrong, you lose 1 soul. You can see your remaining souls on the screen, and when you lose all of them, well, you don't want to know.</strong>
      </p>
      <p>
        2. Use your <strong>arrow keys</strong> to move left or right. If you are on a mobile device, use click the corresponding buttons on the screen instead.
      </p>
      <p>
        3. Use the <strong>'Z' key</strong>, or the corresponding 'Z' button, to interact with items, puzzles, and characters you may find around each floor. You will then have the option to pick up the item and add it to your inventory, allowing you to access them easily. Who know, perhaps a puzzle will require a certain item in your inventory! Items may also have hints in their descriptions that will allow you to solve puzzles! Some may be completely useless, though (of course, I won't tell you which are which).
      </p>
      <p>
        4. Finally, make sure to <strong>Save Progress</strong> every now and then so you don't have to start from scratch. Although, I would find that very entertaing!
      </p>
      <p>
        Welcome to my Tower! Muahahahaha!
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
@import "../assets/global.css";

.pause-menu {
  overflow: scroll;
  padding: 1rem;
}
.instruction-title {
  margin-bottom: 1rem;
  font-size: 3rem;
}
.instructions-content p, 
.instructions-content strong {
  font-size: var(--h4);
  color: var(--highlight-color);
  text-align: left;
  margin-top: 1rem;
}
</style>