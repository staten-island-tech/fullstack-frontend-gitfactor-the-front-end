<template>
  <div id="nav">
   
    <div v-if="!$auth.loading.value">
      
      <div v-if="!$auth.isAuthenticated.value"  class="login-page" @click="login">
       <h1>Riddler on the Roof</h1>
       <button @click="login()" class="btn btn-primary">
         Enter the Tower <font-awesome-icon icon="caret-right" /><font-awesome-icon icon="caret-right" />
       </button>
      </div>
      <div v-if="$auth.isAuthenticated.value" @click="logout">
        <p class="welcome">
          Muahaha! Welcome to the Riddler's Tower, <strong>{{ $store.state.userData.username }}</strong>!
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
<style scoped>
@import "../assets/global.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #deceff;
}
h1 {
  font-size: 7rem;
  font-weight: 400;
  color: var(--highlight-color);
}
.login-page {
  height: 100vh;
  padding-top: 5%;
  text-align: center;
  background-image: url("../assets/tower_CG.png");
  background-size: cover;
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
  padding: 0.8rem 2rem;
  margin-top: 2rem;
  font-size: var(--h4);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: .05rem;
  border: none;
  border-radius: 0.4rem;
}
.btn svg {
  font-size: var(--h5);
}

.btn-primary {
  background: #d0326f;
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