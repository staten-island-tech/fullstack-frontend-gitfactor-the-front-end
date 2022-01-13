<template>
  <div class="avatar" :style="cssProps" v-on:keydown.left="leftMove();" v-on:keydown.right="rightMove();" v-on:keyup.left="resetMove();" v-on:keyup.right="resetMove();" tabindex="-1">
    <div>
      <img :src="require(`@/assets/${playerAvatar}`)" alt="" class="stick" id="stickAvatar" >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player: {
          idle: "stick.png",
          left: "stick_l.png",
          right: "stick_r.png",
      },
      playerAvatar: "stick.png",
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
      setTimeout(() => {
        this.leftValue -= 2;
        this.playerAvatar = this.player.left;
      }, 250);

    },
    rightMove: function() {
      console.log("right");
      setTimeout(() => {
        this.leftValue += 2;
        this.playerAvatar = this.player.right;
      }, 250);
    },
    resetMove: function() {
      setTimeout(() => {
      console.log("reset");
      this.playerAvatar = this.player.idle;
      }, 350);

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


  }

  .hide {
    display: none;
  }

  .tempInput {
    font-size: 10rem;
  }
</style>
