<template>
  <easel-canvas>
    <div class="avatar">
      <img src="../assets/stick.png" alt="" class="stick" id="stickAvatar">
      <easel-bitmap image="/assets/stick.png"
      :x="0"
      :y="0"
      :align="['left','top']">
      <input class="tempInput" v-on:keyup.left="leftMove();" v-on:keyup.right="rightMove();">
    </div>

  </easel-canvas>
</template>

<script>
export default {
  data() {
    return {
      test: "../assets/stick.png",
      pos: `80%`,
    }
  },
  created() {
    this.createRPG()
  },
  methods: {
    createRPG: function() {

    },
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