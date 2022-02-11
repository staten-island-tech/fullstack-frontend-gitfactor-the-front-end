<template>
  <div class="home">
 
    <!-- <MoveTest class="player"/> -->
    <HeartBar />
    <MoveTest />
    <Inventory />
  </div>
  <button @click="$store.commit('incrementLives')">Add life</button>
  <button @click="$store.commit('decrementLives')">Die</button>
</template>

<script>

import MoveTest from "@/components/MoveTest.vue";
import Inventory from "@/components/Inventory.vue";
import HeartBar from "@/components/HeartBar.vue";

export default {
  name: "Home",
  components: {
    MoveTest,
    Inventory,
    HeartBar
  },
};
</script>

<style scoped>
  .home {
    position: relative;
    display: inline-block;
    width: 80rem;
    height: 48rem;
    border: .3rem solid;
    display: flex;
  }
  button {
    font-size: 3rem;
  }
</style>