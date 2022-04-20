<template>
  <div id="app">
    <div v-if="!AuthState.loading">
      <div v-if="!AuthState.isAuthenticated" class="login-page">
        <h1>Enter the Tower</h1>
        <button @click="login()" class="btn btn-primary">Login</button>
      </div>

      <div v-else>
        <p class="welcome">
          Welcome to the Riddler's Tower, <strong>{{ AuthState.user.name }}.</strong>
        </p>
        <button @click="logout()" class="btn btn-secondary">Save & Quit</button>
      </div>
    </div>

    <div v-else>Loading ...</div>

    <router-link to="/" v-if="AuthState.isAuthenticated"></router-link>
    <router-view v-if="AuthState.isAuthenticated"/>
  </div>
</template>

<script setup>
import { useAuth0, AuthState } from "/utils/useAuth0.js";
const { login, logout, initAuth } = useAuth0(AuthState);

initAuth();
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
