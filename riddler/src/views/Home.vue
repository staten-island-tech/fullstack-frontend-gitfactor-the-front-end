<template>
  <div class="background">
    <div class="home" v-if="isLoggedIn">
      <MoveTest class="game" />
      <div class="solid"></div>
    </div>
  </div>
</template>

<script>

import MoveTest from "@/components/MoveTest.vue";

export default {
  name: "Home",
  components: {
    MoveTest,
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
@import "../assets/global.css";

.player {
    position: relative;
    top: 0%;
}
.background {
  position: absolute;
  z-index: -10;
  width: 100%;
  height: 100%;
  background-color: var(--darkest-purple);
}
</style>