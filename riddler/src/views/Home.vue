<template>
  <div class="home">
    <MoveTest class="game" />
    <div class="solid" >a</div>
  </div>
</template>

<script>

import MoveTest from "@/components/MoveTest.vue";

export default {
  name: "Home",
  components: {
    MoveTest,
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
  }

.player {
    position: relative;
    top: 0%;
}

.game {
  display: flex;
}

.solid {
  width: 100%;
  height: 100%;
background-color: rgb(28, 18, 175);
}

</style>