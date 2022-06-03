<template>
 <Login></Login>
</template>

<script>
import Login from "../src/components/LoginComponent.vue";

export default {
  components: {
    Login,
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--background-color);
  color: var(--highlight-color);
}
</style>
