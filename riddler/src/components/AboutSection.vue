<template>
  <div class="pause-menu">
    <div class="icon-div">
      <font-awesome-icon @click="$emit('closeAbout')" icon="x" class="x-icon"/>
    </div>
    <h2 class="pause-title instruction-title">Instructions</h2>
    <div class="instructions-content">
      <p>
        Welcome to Riddler on the Roof! We wanted to create a fun puzzle/escape room game with an engaging and endearing storyline. Hopefully you feel we achieved those goals well! 
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutSection"  
}
</script>

<style scoped>
@import "../assets/global.css";

.pause-menu {
  overflow: scroll;
  position: absolute;
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: var(--purple);
  z-index: 3;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.x-icon {
  position: absolute;
  top: 3rem;
  right: 3rem;
  font-size: var(--h4);
  color: var(--highlight-color);
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