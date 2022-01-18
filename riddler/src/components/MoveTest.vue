<template>
  <div class="avatar" :style="cssProps" v-on:keydown.left="leftMove();" v-on:keydown.right="rightMove();" v-on:keyup.left="resetLeft();" v-on:keyup.right="resetRight();" tabindex="-1">
    <div>
      <img :src="require(`@/assets/sprites/${playerAvatar}`)" alt="" class="stick" id="stickAvatar" >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player: {
          idleLeft: "idle-left.gif",
          idleRight: "idle-right.gif",
          left: "walk-left.gif",
          right: "walk-right.gif",
      },
      playerAvatar: "idle-left.gif",
      leftValue: 50,
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
      if (this.leftValue > 0) {
        this.leftValue -= 1.5;
      };        
        this.playerAvatar = this.player.left;
      }, 250);
      

    },
    rightMove: function() {
      console.log("right");
      setTimeout(() => {
      if (this.leftValue <= 85) {
        this.leftValue += 1.5;
      };  
        this.playerAvatar = this.player.right;
      }, 250);
    },
    resetLeft: function() {
      setTimeout(() => {
      console.log("reset");
      this.playerAvatar = this.player.idleLeft;
      }, 250);

    },
      resetRight: function() {
      setTimeout(() => {
      console.log("reset");
      this.playerAvatar = this.player.idleRight;
      }, 250);

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
