<template>
  <EventPopup @closeEventClick="nextLevel()" :eventText="eventMessage" v-if="eventMessage"/>
  <div class="pause-menu">
    <div class="icon-div">
      <font-awesome-icon @click="$emit('closePause')" icon="x" class="x-icon"/>
    </div>
    <h2 class="pause-title">Menu</h2>
    <div class="pause-button-box">
      <button @click="$emit('instruction')">Instruction Manual</button>
      <button @click="updateData()">Save Progress</button>
      <button @click="logout()">Save and Quit</button>
      <button @click="$emit('setting')">Audio Settings</button>
      <button @click="$emit('about')">About</button>
    </div>
  </div>
</template>

<script>
import EventPopup from './EventPopup.vue';

export default {
  name: "PauseMenu",
  props: ["isPauseOpen"],
  components: { EventPopup },
  data() {
    return {
      userdata: this.$auth.user,
      eventMessage: null,
    };
  },
  methods: {
    async updateData() {
      const userId = this.userdata.sub.replace("auth0|", "");
      try {
        const token = await this.$auth.getTokenSilently();
        const response = await fetch(`http://localhost:3000/api/index/update/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(this.$store.state.userData),
        });
        const data = await response.json();
        console.log(data);
        this.$store.commit('updateState', data);
        this.eventMessage = "Your progress has been saved.";
      } catch (error) {
        console.log(error);
      }
    },
    nextLevel() {
      window.location.reload();
    },
    logout() {
      this.updateData();
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>

<style scoped>
@import "../assets/global.css";

.pause-menu {
  overflow: scroll;
  position: absolute;
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: var(--purple);
  z-index: 3;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.pause-menu::-webkit-scrollbar {
  display: none;
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