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
    width: 50rem;
    height: 30rem;
    border: .3rem solid;
  }
</style>