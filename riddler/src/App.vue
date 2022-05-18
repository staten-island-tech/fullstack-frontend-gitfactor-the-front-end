<template>
 <Login></Login>
</template>

<script>
import Login from "../src/components/LoginComponent.vue"

export default {
  components: {
    Login,
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--background-color);
  color: var(--highlight-color);
}
.login-page {
  height: 100vh;
  background-color: #1f1227;
}
.welcome, .welcome strong {
  display: inline;
  font-size: 2rem;
}
.welcome strong {
  font-weight: 700;
}
.btn {
  padding: .8rem 1.2rem;
  margin-top: 2rem;
  margin-left: 2rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  border: none;
  cursor: pointer;
  min-width: 10rem;
  border-radius: .4rem;
  font-weight: bold;
}

.btn-primary {
  background: #b84169;
  color: white;
}

.btn-secondary {
  background: #aaa;
  color: white;
}
</style>
