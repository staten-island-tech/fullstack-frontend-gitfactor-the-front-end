<template>
  <div class="home">
    <ObjectTest />
    <PuzzlePopup/>
  
    <ItemTest />
  </div>
</template>

<script>

import ObjectTest from "@/components/ObjectTest.vue";
import PuzzlePopup from '@/components/PuzzlePopup.vue';
import ItemTest from "@/components/ItemTest.vue";

export default {
  name: "Home",
  components: {
    ObjectTest,
    PuzzlePopup
    ItemTest
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
  }
</style>