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
        const response = await fetch(`https://riddler-on-the-roof.onrender.com/api/index/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (Object.prototype.hasOwnProperty.call(data, "failedLevel")) { //checks if user already logged in 
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
        const response = await fetch(`https://riddler-on-the-roof.onrender.com/api/index/update/${userId}`, {
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
    }
  }
};
</script>

<style scoped>
@import "../assets/global.css";
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

.btn-secondary {
  background: #aaa;
  color: white;
}
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
