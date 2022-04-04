<template>
  <div>
    <div class="home" v-if="isLoggedIn">
      <MoveTest class="game" />
      <div class="solid"></div>
    </div>
    <div class="pagebg"></div>
      <button @click="addNewUser()">New user</button>
      <button @click="updateData($store.state.userData.id)">Update</button>
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
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await fetch("http://localhost:3000/");
        const data = await response.json();
        console.log(data);
        this.$store.commit('updateState', data);
        this.isLoggedIn = true;
      } catch (error) {
        console.log(error);
      }
    },
    async updateData(id) {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.$store.state.userData),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async addNewUser() {
      try {
        const response = await fetch("http://localhost:3000/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.$store.state.userData),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
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