<template>
  <div class="pause-menu">
    <div class="icon-div">
      <font-awesome-icon @click="$emit('closePause')" icon="x" class="x-icon"/>
    </div>
    <h2 class="pause-title">Pause Menu</h2>
    <div class="pause-button-box">
      <button @click="$emit('instruction')" >Instruction Manual</button>
      <button @click="updateData()">Save</button>
      <button @click="logout()">Save and Quit</button>
      <button @click="$emit('setting')">Settings</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "PauseMenu", 
  props: ["isPauseOpen"],
  data() {
    return {
      userdata: this.$auth.user,
    }
  },
  methods: {
    async updateData() {
      const userId = this.userdata.sub.replace("auth0|", "");
      console.log(this.$store.state.userData)
      try {
        const response = await fetch(`http://localhost:3000/api/index/update/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.$store.state.userData),
        });
        const data = await response.json();
        console.log(data);
        this.$store.commit('updateState', data);
        window.location.reload();
        alert("Your progress has been saved.");
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      this.updateData();
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
  }
}
</script>

<style>
@import "../assets/global.css";

  .pause-menu {
    position: absolute;
    top: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: var(--purple);
  }
  .pause-title {
    color: var(--highlight-color);
  }
  .icon-div {
    display: flex;
    justify-content: right;
    padding-right: 6rem;
    padding-top: 3rem;
  }
  .x-icon {
    position: absolute;
    top: 3rem;
    right: 3rem;
    font-size: var(--h4);
    color: var(--highlight-color);
  }
  .pause-button-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
  .pause-menu button {
    width: 30%;
    font-size: 2.5rem;
    margin: 1rem;
    padding: 1rem;
    background-color: var(--highlight-color);
    color: black;
    border: black 0.05rem solid;
    border-radius: 0.5rem;
  }
</style>