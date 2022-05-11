<template>
<div>
  <div class="home" v-if="isLoggedIn">
    <MoveTest class="game" />
    <div class="solid"></div>
  </div>
  <!-- <div class="pagebg"></div>
    <button @click="addNewUser()">New user</button>
    <button @click="authorize()">poop</button>
    <button @click="updateData(userdata.sub)">Update</button> -->
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
  mounted() {
    // this.callApi();
    this.getData();
  },
  
  methods: {
    // async callApi() {
    //     const token = await this.$auth.getTokenSilently();
    //   try {
    //     const response = await fetch("http://localhost:3000/authorized", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getData() {
      // const id = this.userdata.sub.replace("auth0|", "");
      try {
        const token = await this.$auth.getTokenSilently();

        const response = await fetch(`http://localhost:3000/api/index`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify(this.$store.state.userData),
        });
        const data = await response.json();
        console.log(data);
        // this.$store.commit('updateState', data);
        this.isLoggedIn = true;
      } catch (error) {
        console.log(error);
      }
    },
    // async updateData(id) {
    //   try {
    //     console.log(id);
    //     console.log(this.$store.state.userData);
    //     const response = await fetch(`http://localhost:3000/update/${id}`, {
    //       method: 'PATCH',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(this.$store.state.userData),
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
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