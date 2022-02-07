<template>
  <div class="home">
    <MoveTest />
    <Inventory />
  </div>
</template>

<script>

import MoveTest from "@/components/MoveTest.vue";
import Inventory from "@/components/Inventory.vue";

export default {
  name: "Home",
  components: {
    MoveTest,
    Inventory
  },
};
</script>

<style scoped>
  .home {
    display: flex;
  }
  .ground {
    z-index: 2;
    position: absolute;
    left: 0%;
    bottom: 0%;
    height: 15%;
  }

</style>