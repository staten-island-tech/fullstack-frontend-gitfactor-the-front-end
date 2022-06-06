<template>
<div>
  <div class="background">
  <PageLoader v-show="isLoading"/>
  <EventPopup @closeEventClick="nextLevel()" :eventText="eventMessage" v-if="eventMessage"/>
    <div class="home" v-if="isLoggedIn">
      <MoveTest @gameEvent="updateData()" @doneLoading="isLoading = false" class="game" />
      <div class="solid"></div>
    </div>
  </div>
  <div class="pagebg"></div>
  </div>
</template>

<script>
import MoveTest from "@/components/MoveTest.vue";
import PageLoader from "@/components/PageLoader.vue";
import EventPopup from '../components/EventPopup.vue';

export default {
  name: "Home",
  components: {
    MoveTest, PageLoader, EventPopup
  },
  data() {
    return {
      isLoading: true,
      isLoggedIn: false,
      userdata: this.$auth.user,
      eventMessage: null,
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const userId = this.userdata.sub.replace("auth0|", "");
      try {
        const token = await this.$auth.getTokenSilently();
        const response = await fetch(`http://localhost:3000/api/index/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (Object.prototype.hasOwnProperty.call(data, "gameFinished")) { //checks if user already logged in 
          this.$store.commit('updateState', data);
          console.log("logging in")
        } else {
          this.updateData();
          console.log("registering")
        }
        this.isLoggedIn = true;
      } catch (error) {
        console.log(error);
      }
    },
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
        this.$store.commit('updateState', data);
        this.eventMessage = "Your progress has been saved.";
      } catch (error) {
        console.log(error);
      }
    },
    nextLevel() {
      window.location.reload();
    }
  }
};
</script>

<style scoped>
@import "../assets/global.css";

.player {
  position: relative;
  top: 0%;
}
.background {
  position: absolute;
  z-index: -10;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  background-color: var(--background-color);
}
</style>
