<template>
  <div>
    <div class="home" v-if="isLoggedIn">
      <HeartBar />
      <MoveTest class="game" />
      <div class="solid"></div>
      <Inventory />
    </div>
    <div class="pagebg"></div>
  </div>
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
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await fetch("http://localhost:3000/");
        const data = await response.json();
        console.log(data);
        this.$store.commit('updateState', data);
        this.isLoggedIn = true;
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
.pagebg {
  position: absolute;
  z-index: -10;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: rgb(31, 18, 39);
}

</style>