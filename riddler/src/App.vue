<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
.welcome,
.welcome strong {
  display: inline;
  font-size: 2rem;
}
.welcome strong {
  font-weight: 700;
}
.btn {
  padding: 0.8rem 1.2rem;
  margin-top: 2rem;
  margin-left: 2rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  border: none;
  cursor: pointer;
  min-width: 10rem;
  border-radius: 0.4rem;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
