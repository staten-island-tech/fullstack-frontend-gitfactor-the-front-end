<template>
  <div class="background">
    <div class="home" v-if="isLoggedIn">
      <MoveTest @gameEvent="updateData()" class="game" />
      <div class="solid"></div>
    </div>
  </div>
  <div class="pagebg"></div>
</template>

<script>
import MoveTest from "@/components/MoveTest.vue";

export default {
  name: "Home",
  components: {
    MoveTest
  },
  data() {
    return {
      isLoggedIn: false,
      userdata: this.$auth.user,
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
        if (Object.prototype.hasOwnProperty.call(data, "battery")) { //checks if user already logged in 
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
        window.location.reload(); //reloads the page after saving (needed to load new level)
        alert("Your progress has been saved.");
      } catch (error) {
        console.log(error);
      }
    },
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
