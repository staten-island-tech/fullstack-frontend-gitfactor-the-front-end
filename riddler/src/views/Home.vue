<template>
  <div class="home">
    <HeartBar />
    <MoveTest class="game" />
    <div class="solid" >a</div>
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
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await fetch("http://localhost:3000/");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      } 
    }
  }
};
</script>

<style scoped>
  .home {
    display: flex;
    /* flex-direction: column; */
  }
  button {
    font-size: 3rem;
  }

.player {
    position: relative;
    top: 0%;
}

.game {
  display: flex;
}

.solid {
  position: absolute;
  z-index: -10;
  top: 0%;
  width: 100%;
  height: 100%;
background-color: rgb(13, 7, 82);
}

</style>