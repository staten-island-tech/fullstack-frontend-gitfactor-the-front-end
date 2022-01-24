<template>
  <div class="home">
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
};
</script>

<style scoped>
  .home {
    position: relative;
    display: inline-block;
    width: 80rem;
    height: 48rem;
    border: .3rem solid;
    overflow: hidden;
    background-color: rgb(34, 13, 129);
  }

.player {
    position: relative;
    top: 0%;
}
.ground {
  z-index: 2;
  position: absolute;
  left: 0%;
  bottom: 0%;
  height: 15%;
}

</style>