<template>
<div class="gameContainer" v-on:keydown.right="rightMove();" v-on:keydown.left="leftMove();" v-on:keyup="reset();" v-on:keydown.z="onEnter();">
  <div class="player" :style="cssProps"  tabindex="-1">    
    <img :src="require(`@/assets/sprites/${playerAvatar}`)" alt="" class="playerAvatar" >
  </div>

  <img v-for="item in gameItems" :src="item.img" :style="{ left: item.margin, filter: item.filter }" :alt="item" :key="item.key">
  </div>
  
</template>

<script>
export default {
  name:"MoveTest",
  data() {
    return {
      player: {
          idle: "idle-left.gif",
          left: "walk-left.gif",
          right: "walk-right.gif",
      },
      playerAvatar: "idle-left.gif",
      leftValue: 50,
      offset: null,
      currentItem: null,
      gameItems: [
        {
          name: "riddler",
          id: "0",
          position: 10,
          margin: "10%",
          img: require("../assets/riddl.png"),
          isInteractable: false,
          prompt: "the riddler",
          filter: null,
          // isStorable
        }, 
        {
          name: "avatar",
          id: "0",
          position: 70,
          margin: "70%",
          img: require("../assets/prt.png"),
          isInteractable: false,
          prompt: "the vampire she tells you not to worry about",
          filter: null,
        }, 
      ],
    }
  },
  created() {

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
      this.player.idle = "idle-left.gif";
      setTimeout(() => {
      if (this.leftValue > 0) {
        this.leftValue -= 1.5;
      };  
        this.playerAvatar = this.player.left;
        this.itemInteract();
      }, 250);
      },

    rightMove: function() {
      this.player.idle = "idle-right.gif";
      setTimeout(() => {
      if (this.leftValue <= 85) {
        this.leftValue += 1.5;
      };  
        this.playerAvatar = this.player.right;
        this.itemInteract();
      }, 250);
      
    },
    reset: function() {
      setTimeout(() => {
      this.playerAvatar = this.player.idle;
      }, 250);
      this.itemInteract();

    },
    itemInteract() {
            this.currentItem = null;
            this.gameItems.forEach(item => {
                const offset = item.position - this.leftValue;
                if (Math.abs(offset) <= 10 || (offset >= -10 && offset < 10)) {
                    this.offset = offset;
                    item.isInteractable = true;
                    this.currentItem = item;
                    item.filter = "sepia(55%)";
                } else {
                    item.isInteractable = false;
                    item.filter = null;
                };

            });
        },
        onEnter() {
            if (this.currentItem) {              
              console.log(this.currentItem.prompt);
            }
        },
  },

}
</script>

<style scoped>

.player {
  width: 100%;
  height: 100%;
}

 .playerAvatar {
    width: 17.5%;
    display: flex;
    position: absolute;
    left: var(--leftVar);
  }

  .hide {
    display: none;
  }


h1 {
  font-size: 2rem;
    }

    img {
        position: absolute;
        bottom: 0%;
        /* left: 25%; this is represented in the item.position property*/
        width: 20%;
        border-radius: 3rem;
    }
</style>
