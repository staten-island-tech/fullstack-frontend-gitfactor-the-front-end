<template>
  <div class="home">
    <img src="../assets/stick.png" alt="" class="stick">
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
  },
  data() {

  },
};
</script>

<style scoped>
  .home {
    display: inline-block;
    width: 50rem;
    height: 30rem;
    border: .3rem solid;
    overflow: hidden;
  }

  .stick {
    width: 15%;
    position: relative;
    top: 40%;
  }
</style>