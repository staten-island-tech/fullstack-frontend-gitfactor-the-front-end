<template>
  <div id="app">
    <div v-if="!AuthState.loading">
      <div v-if="!AuthState.isAuthenticated" class="login-page">
        <h1>Enter the Tower</h1>
        <button @click="login()" class="btn btn-primary">Login</button>
      </div>

      <div v-else>
        <p>
          Welcome to VueAuth <strong>{{ AuthState.user.name }}</strong>
        </p>
        <button @click="logout()" class="btn btn-secondary">Logout</button>
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
*, html, body {
  font-size: 62.5%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a591da;
}
.login-page {
  height: 100vh;
  background-color: rgb(31, 18, 39);
}
h1 {
  font-size: 5rem;
  padding: 2rem;
}
.btn {
  padding: 8px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  border: none;
  cursor: pointer;
  min-width: 100px;
  border-radius: 4px;
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
