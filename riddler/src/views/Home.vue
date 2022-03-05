<template>
  <div class="home" v-if="isLoggedIn">
    <HeartBar />
    <MoveTest class="game" />
    <div class="solid" >a</div>
    <Inventory />
  </div>
  <button @click="getData()" v-if="!isLoggedIn">Log in</button>
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
  data() {
    return {
      isLoggedIn: false,
    }
  },
  methods: {
    getData() {
      this.isLoggedIn = true;
      const data = [
        {
          level: 1,
          section: 1,
          leftValue: 50,
          lifeCount: 7,
          inventory: [],
        }
      ];
      this.$store.commit('updateState', data);
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