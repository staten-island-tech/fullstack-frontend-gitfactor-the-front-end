<template>
  <div>
    <div class="avatar" :style="cssProps" v-on:keyup.left="leftMove();" v-on:keyup.right="rightMove();" tabindex="-1">
      <img v-bind:src="test" alt="" class="stickAvatar">
      <img src="../assets/stick.png" alt="" class="stick" id="stickAvatar" >
      <input class="tempInput" >
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
      leftValue: "80",
    }
  },
  computed: {
    cssProps() { 
      return {
        '--leftVar': (this.leftValue) + "%",
      }
    }
  },
  methods: {
    leftMove: function() {
      console.log("left");
      this.leftValue -= 10;
    },
    rightMove: function() {
      console.log("right")
      this.leftValue += 10;
    }
  },

}
</script>

<style>

.avatar {
  width:100%;
  height: 100%;;
}

 .stick {
    width: 15%;
    display: flex;
    position:relative;
    left: var(--leftVar);
    transition: all .35s;

  }

  .hide {
    display: none;
  }

  .tempInput {
    font-size: 10rem;
  }
</style>
