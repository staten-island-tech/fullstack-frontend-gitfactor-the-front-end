<template>
  <section>
    <font-awesome-icon v-for="life in $store.state.userData.lifeCount" class="no-click" icon="heart" :key="life"></font-awesome-icon>
  </section>
</template>

<script>
export default {
  name: "HeartBar"
}
</script>

<style scoped>
@import "../assets/global.css";

  section {
    text-align: left;
    margin-bottom: 1rem;
  }
  section svg {
    font-size: 2.25rem;
    margin-right: .5rem;
    color: #ff0000;
  }
  section svg:hover {
    filter: brightness(1);
  }
</style>