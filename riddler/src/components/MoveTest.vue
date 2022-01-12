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
      player: {
          idle: "../assets/stick.png",
          left: "../assets/stick_l.png",
          right: "../assets/stick_r.png",
      },
      test: "../assets/stick.png",
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
</style>
