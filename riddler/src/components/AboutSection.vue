<template>
  <div class="pause-menu">
    <div class="icon-div">
      <font-awesome-icon @click="$emit('closeAbout')" icon="x" class="x-icon"/>
    </div>
    <h2 class="pause-title instruction-title">About</h2>
    <div class="instructions-content">
      <p>
        Riddler on the Roof is a puzzle/escape room game created by GitFactor. It is a story-focused game driven by your own desire to learn more about the tower. 
      </p>

      <p class="italic">Somehow, the forest you found refuge in houses a massive tower. You didn't see this tower from outside the forest, but it's definitely way too tall to be hidden. Somethings's strange about this tower, but as you approached the door, everything faded to black... </p>

      <p>Programming by: Daniel, Lucy, Jake, Charley, Nika</p>
      <p>Story by: Charley, Lucy, Daniel, Nika</p>
      <p>Level Design: Daniel, Charley, Nika, Lucy</p>
      <p>Visuals by: Lucy</p>
      <p>Name by: Nika</p>
      <p>Audio by: PeriTune</p>
      <p>Terrible Puns by: Daniel</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutSection",
};
</script>

<style scoped>
@import "../assets/global.css";

.italic {
  font-style: italic;
  text-align: left;
  padding: 2rem 10rem 2rem 10rem;
}

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

.pause-menu::-webkit-scrollbar {
  display: none;
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