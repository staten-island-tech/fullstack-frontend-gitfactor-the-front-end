<template>
  <div class="home">
    <MoveTest class="player"/>
    <TextBox />
  </div>
</template>

<script>

import MoveTest from "@/components/MoveTest.vue";
import TextBox from "../components/TextBox.vue";

export default {
  name: "Home",
  components: {
    MoveTest,
    TextBox
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
.ground {
  z-index: 2;
  position: absolute;
  left: 0%;
  bottom: 0%;
  height: 15%;
}

</style>