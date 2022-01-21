<template>
<div>
  <div class="player" :style="cssProps" v-on:keydown.left="leftMove();" v-on:keydown.right="rightMove();" v-on:keyup.left="resetLeft();" v-on:keyup.right="resetRight();" v-on:keydown.z="onEnter();" tabindex="-1">    
    <img :src="require(`@/assets/sprites/${playerAvatar}`)" alt="" class="stick" >
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
          idleLeft: "idle-left.gif",
          idleRight: "idle-right.gif",
          left: "walk-left.gif",
          right: "walk-right.gif",
      },
      playerAvatar: "idle-left.gif",
      leftValue: 50,
      offset: null,
      currentItem: null,
      gameItems: [
        {
          name: "mushroom",
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
          name: "mushroom",
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
  computed: {
    cssProps() { 
      return {
        '--leftVar': (this.leftValue) + "%",
      }
    }
  },
  methods: {
    leftMove: function() {
      setTimeout(() => {
      if (this.leftValue > 0) {
        this.leftValue -= 1.5;
      };        
        this.playerAvatar = this.player.left;
        console.log(this.offset);
        this.itemInteract();
      }, 250);     

    },
    rightMove: function() {
      setTimeout(() => {
      if (this.leftValue <= 85) {
        this.leftValue += 1.5;
      };  
        this.playerAvatar = this.player.right;
        this.itemInteract();
      }, 250);
      
    },
    resetLeft: function() {
      setTimeout(() => {
      console.log("reset");
      this.playerAvatar = this.player.idleLeft;
      }, 250);
      this.itemInteract();

    },
      resetRight: function() {
      setTimeout(() => {
      console.log("reset");
      this.playerAvatar = this.player.idleRight;
      }, 250);
      this.itemInteract();

    },
    itemInteract() {
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
                }
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

 .stick {
    width: 17.5%;
    display: flex;
    position:relative;
    left: var(--leftVar);
    z-index: -1;
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
