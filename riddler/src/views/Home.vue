<template>
  <div class="home">
    <img src="@/assets/ground.png" class="ground" alt="">
    <MoveTest class="player"/>
  </div>
</template>

<script>

import MoveTest from "@/components/MoveTest.vue";

export default {
  name: "Home",
  components: {
    MoveTest
  },
  data() {

  },
};
</script>

<style scoped>
  .home {
    position: relative;
    display: inline-block;
    width: 70rem;
    height: 40rem;
    border: .3rem solid;
    overflow: hidden;
  }

.player {
    position: relative;
    top: 40%;
}
.ground {
  z-index: 2;
  position: absolute;
  left: 0%;
  bottom: 0%;
  height: 15%;
}

</style>