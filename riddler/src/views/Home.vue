<template>
  <div class="home">
    <!-- <ObjectTest /> -->
    <TextBox />
  </div>
</template>

<script>

// import ObjectTest from "@/components/ObjectTest.vue";
import TextBox from "../components/TextBox.vue";

export default {
  name: "Home",
  components: {
    // ObjectTest
    TextBox,
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