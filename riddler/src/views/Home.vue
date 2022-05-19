<template>
  <div class="background">
    <div class="home" v-if="isLoggedIn">
      <MoveTest class="game" />
      <button @click="updateData()">Update</button>
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
    MoveTest,
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
        console.log(data)
        if (Object.prototype.hasOwnProperty.call(data, "leftValue")) { //checks if user already logged in 
          this.$store.commit('updateState', data);
        } else {
          this.updateData();
          this.$store.commit('updateState', data);
        }
        this.isLoggedIn = true;
      } catch (error) {
        console.log(error);
      }
    },
    async updateData() {
      const userId = this.userdata.sub.replace("auth0|", "");
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
      } catch (error) {
        console.log(error);
      }
    },
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