<template>
  <div id="nav">
   
    <div v-if="!$auth.loading.value">
      
      <div v-if="!$auth.isAuthenticated.value"  class="login-page" @click="login">
       <h1>Enter The Tower</h1>
       <button @click="login()" class="btn btn-primary">Login</button>
      </div>
      <div v-if="$auth.isAuthenticated.value" @click="logout">
        <p class="welcome">
          Muahaha! Welcome to the Riddler's Tower, <strong>{{ userdata.nickname }}</strong>!
        </p>
      </div>
    </div>

    <div v-if="$auth.isAuthenticated.value">
      <router-link to="/"></router-link>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userdata: this.$auth.user,
    };
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
  },
};
</script>
<style>
*,
html,
body {
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
  color: #deceff;
}
h1 {
  font-size: 5rem;
  padding-top: 2rem;
}
button {
  cursor: pointer;
}
.login-page {
  height: 100vh;
  background-image: url("../assets/tower_CG.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
.welcome,
.welcome strong {
  display: inline;
  font-size: 2rem;
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
}

.btn-primary {
  background: #b84169;
  color: white;
}

.btn-secondary {
  background: #aaa;
  color: white;
}

@media only screen and (max-width: 768px) {
  *,
  html,
  body {
    font-size: 45%;
  }
}
</style>