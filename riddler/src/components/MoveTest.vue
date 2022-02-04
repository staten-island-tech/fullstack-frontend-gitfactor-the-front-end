<template>
<div class="gameContainer" @keydown.right="rightMove();" @keydown.left="leftMove();" @keyup="reset();" @keydown.z="onEnter();">
  <div class="player" :style="cssProps" tabindex="-1">    
    <img :src="require(`@/assets/sprites/${playerAvatar}`)" alt="" class="playerAvatar" >
  </div>

  <img v-for="item in gameItems" :src="item.img" :style="{ left: item.margin, filter: item.filter }" :alt="item" :key="item.key">
  <div :class="{ AC: mainAnt }" v-show="txtbx" class="textbox">
          <p class="textbox-title"></p> 
          <p class="textbox-test typing-class"></p>
  </div>
      <button @click="txtbxShow();" class="textbox-button">Z</button>
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
      currentItem: null,
      gameItems: [
        {
          name: "Riddler",
          id: "0",
          position: 10,
          margin: "10%",
          img: require("../assets/riddl.png"),
          isInteractable: false,
          filter: null,
          itemType: "character", //could also be puzzle, object, etc.
          dialogue: [
            {
              text: "Mwahaha welcome to my tower~",
              name: "???",
              isAntagonist: true,
            }, 
            {
              text: "I didn't come here by choice...what is this?",
              name: "Me"
            },
            {
              text: "This...huh. I don't actually know what this is either! I just said that cause I thought it was spooky :D",
              name: "???",
              isAntagonist: true,
            }
        ],
        }, 
        {
          name: "Protagonist",
          id: "0",
          position: 70,
          margin: "70%",
          img: require("../assets/prt.png"),
          isInteractable: false,
          filter: null,
          itemType: "character", 
          dialogue: [
            {
              text: "What? Am I talking to myself",
              name: "Me?",
              isAntagonist: true,
            }, 
            {
              text: "Wat",
              name: "Me"
            },
            {
              text: "This...huh. I don't actually know what this is either! I just said that cause I thought it was spooky :D",
              name: "Me?",
              isAntagonist: true,
            }
        ],
        }, 
      ],
      txtbx: false,
      textCount: 0,
      mainAnt: false,
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
      if (this.currentItem.itemType === "item") {              
        alert(this.currentItem.prompt);
      } else if (this.currentItem.itemType === "character") {              
        this.txtbxShow();
      }
    },
    txtbxShow() {
      this.txtbx = true;
      this.textCount +=1;
      const charLabel = document.querySelector(".textbox-title");
      const textOutput = document.querySelector(".textbox-test");
      const num = this.textCount - 1;
      if (this.textCount <= this.currentItem.dialogue.length) {
        textOutput.innerHTML = this.currentItem.dialogue[num].text;
        charLabel.innerHTML = this.currentItem.dialogue[num].name;
        if (this.currentItem.dialogue[num].isAntagonist) {
          this.mainAnt = true;
        } else {
          this.mainAnt = false;
        }
      } else {
        this.txtbx = false;
        this.textCount = 0;
      }
    },
  },
}
</script>

<style scoped>
.gameContainer {
  width: 100%;
  height: 100%;
}
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

.textbox-button{
  font-size: 4rem;
  background-color: #766696;
  color: #DECEFF;
  position: absolute;
  top: 30%;
  left: 40%;
  border-radius: 50%;
  border:#DECEFF solid 0.3rem ;
 height: 7.5rem;
 width: 7.5rem;
}
.textbox{
  border: purple 1rem solid;
  background-color: black;
  width: 100%;
  height: 20rem;
position: absolute;
bottom: 0;
padding: 2rem;
padding-top: 1rem;
}
.textbox-test, .textbox-title{
  color: white;
  font-size: 2rem;
  text-align: left;
  margin-top: 0.5rem;
}
.textbox-title{
  font-size: 2.5rem;
}
.AC{
  border: green 1rem solid;
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
