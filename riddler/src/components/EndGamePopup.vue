<template>
  <div class="endgame-popup" 
    tabindex="-1">
    <h3>Congratulations, you have bested the Riddler's Tower!</h3>
    <h4>Enjoy this special photo to commemorate the occasion.</h4>
    <img src="../assets/victory.png" class="victory-cg" alt="victory image of Riddler and Player Character taking a picture outside of the burning tower.">
      <h3>Replay from a previous level?</h3>
      <div class="btn-group">
         <button @click="warpLevel(1)" class="reset-btn">Start from Lv1</button>
         <button @click="warpLevel(2)" class="reset-btn">Start from Lv2</button>
         <button @click="warpLevel(3)" class="reset-btn">Start from Lv3</button>
         <button @click="warpLevel(4)" class="reset-btn">Start from Roof</button>
         <button @click="warpLevel(5)" class="reset-btn">Start from Epilogue</button>
      </div>

  </div>
</template>

<script>
export default {
  name: "EndGamePopup",
  methods: {
    warpLevel(chosenLevel) {
      this.$store.state.userData.level = chosenLevel;
      this.$store.state.userData.section = 2;
      this.$store.state.userData.leftValue = 45;
      this.$store.state.userData.lifeCount = 3;
      this.$store.state.userData.currentItem = null;
      this.$store.state.userData.inventory = [];
      this.$store.state.userData.battery = 100;
      this.$store.state.userData.isIntro = true;
      this.$store.state.userData.solvedPuzzles = [];
      this.$store.state.userData.gameFinished = false;
      this.$parent.$emit("gameEvent");
    },
  },
};
</script>

<style scoped>
@import "../assets/global.css";

.endgame-popup {
  overflow: scroll;
  position: absolute;
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 5rem;
  border-radius: 1.5rem;
  border: solid var(--highlight-color) 0.3rem;
  background-color: var(--background-color);
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 3;
}

.endgame-popup::-webkit-scrollbar {
  display: none;
}

.victory-cg {
  height: 50%;
  margin: 2rem;
}

.reset-btn {
  background-color: var(--highlight-color);
  font-size: var(--h4);
  font-weight: 700;
  margin: 1rem;
  padding: 1.5rem 2rem;
  border: none;
  border-radius: 1rem;
  color: var(--background-color);
}
</style>