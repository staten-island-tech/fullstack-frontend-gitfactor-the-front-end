<template>
<div>
  <div class="home" v-if="isLoggedIn">
    <MoveTest class="game" />
    <div class="solid"></div>
  </div>
  <div class="pagebg"></div>
    <button @click="updateData()">Update</button>
</div>
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

.player {
    position: relative;
    top: 0%;
}

.solid {
  position: absolute;
  z-index: -10;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: #0d0752;
}
.pagebg {
  position: absolute;
  z-index: -10;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: #1f1227;
}

</style>