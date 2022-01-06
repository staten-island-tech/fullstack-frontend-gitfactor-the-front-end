<template>
  <div>
    <div class="avatar">
      <img v-bind:src="test" alt="" class="stickAvatar">
      <img src="../assets/stick.png" alt="" class="stick" id="stickAvatar">
      <input class="tempInput" v-on:keyup.left="leftMove();" v-on:keyup.right="rightMove();">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: "../assets/stick.png",
      pos: `80%`,
    }
  },
  methods: {
    leftMove: function() {
      console.log("left");
      const avatar = document.getElementById("stickAvatar");
      this.pos = "20%"
      avatar.style.left = this.pos;
    },
    rightMove: function() {
      console.log("right")
      const avatar = document.getElementById("stickAvatar");
      this.pos = "80%"
      avatar.style.left = this.pos;
    }
  },

}
</script>

<style>
  .stick {
    width: 15%;
    display: flex;
    position:relative;
    left: 80%;

  }

  .hide {
    display: none;
  }

  .tempInput {
    font-size: 10rem;
  }
</style>