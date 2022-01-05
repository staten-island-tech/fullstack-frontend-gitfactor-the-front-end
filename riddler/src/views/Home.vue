<template>
  <div class="home">
    <ObjectTest />
  </div>
</template>

<script>

import ObjectTest from "@/components/ObjectTest.vue";

export default {
  name: "Home",
  components: {
    ObjectTest
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