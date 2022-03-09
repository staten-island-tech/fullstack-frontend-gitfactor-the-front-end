<template>
  <div>
    <div class="home" v-if="isLoggedIn">
      <MoveTest class="game" />
      <div class="solid"></div>
    </div>
    <div class="pagebg"></div>
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
        this.isLoggedIn = true;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>

.player {
    position: relative;
    top: 0%;
}

.solid {
  position: absolute;
  z-index: -10;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: #0d0752;
}
.pagebg {
  position: absolute;
  z-index: -10;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: #1f1227;
}

</style>