<template>
<div class="game-container" @keydown.right="rightMove()" @keydown.left="leftMove()" @keyup="reset()" @keydown.z="onEnter()">
  <img :src="require(`@/assets/environment/lv1/${currentLocation}`)" class="bg-img" >
  <div class="player" :style="cssProps" tabindex="-1">    
    <img :src="require(`@/assets/sprites/${playerAvatar}`)" class="player-avatar" >
  </div>

  <img v-for="item in gameItems" :src="item.img" :style="{ left: item.margin, filter: item.filter }" :alt="item" :key="item.key">
  <div :class="{ AC: mainAnt }" v-show="txtbx" class="textbox">
         <img :src="require(`@/assets/sprites/${player.dialogueSprite}`)" class="player-avatar-dialogue" >
         <img :src="require(`@/assets/sprites/${npcDialogueSprite}`)" class="npc-avatar-dialogue hide" id=
         "npc-dialogue-sprite">
          <p class="textbox-title"></p> 
          <p class="textbox-test typing-class"></p>
  </div>
      <button @click="onEnter()" class="textbox-button">Z</button>
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
          dialogueSprite: "sprite_dialogue_player.png"
      },
      playerAvatar: "idle-left.gif",
      npcDialogueSprite: "sprite_dialogue_riddl.png",
      leftValue: 50,
      currentItem: null,
      currentLocation: "bg_1_c.png",
      gameItems: [
        {
          name: "Mushroom",
          id: "0",
          position: 40,
          margin: "40%",
          img: require("../assets/mushroom.png"),
          isInteractable: false,
          filter: null,
          itemType: "object", 
          prompt: "An amazing mushroom house!!"
        },
        {
          name: "Riddler",
          id: "0",
          position: 10,
          margin: "10%",
          img: require("../assets/riddl.png"),
          isInteractable: false,
          filter: null,
          itemType: "character", //could also be puzzle, object, etc.
          dialogueSprite: "sprite_dialogue_riddl.png",
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
          dialogueSprite: "sprite_dialogue_player.png", 
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
      if (this.currentItem.itemType === "object") {              
        alert(this.currentItem.prompt);
      } else if (this.currentItem.itemType === "character") {              
        this.txtbxShow();
      }
    },
    txtbxShow() {
      if (this.textCount < this.currentItem.dialogue.length) {
        this.txtbx = true;
        this.textCount +=1;
        const charLabel = document.querySelector(".textbox-title");
        const textOutput = document.querySelector(".textbox-test");
        const num = this.textCount - 1;
        textOutput.innerHTML = this.currentItem.dialogue[num].text;
        charLabel.innerHTML = this.currentItem.dialogue[num].name;
          if (this.currentItem.dialogue[num].isAntagonist) {
            this.mainAnt = true;
          } else {
            this.mainAnt = false;
          };
         const npcSprite = document.getElementById("npc-dialogue-sprite");
          npcSprite.classList.remove("hide");
      } else {
        this.txtbx = false;
        this.textCount = 0;
      }
    },
  },
}
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 100%;

}
.player {
  
  width: 100%;
  height: 100%;
}

 .player-avatar {
    width: 17.5%;
    display: flex;
    position: absolute;
    bottom: 10%;
    left: var(--leftVar);
  }

  .player-avatar-dialogue {
    width: 70%;
    right: -20%;
    bottom: -350%;
  }

  .npc-avatar-dialogue {
    width: 70%;
    left: -17%;
    bottom: -350%;
  }

  .hide {
    display: none;
  }

.textbox-button{
  font-size: 4rem;
  background-color: #766696;
  color: #DECEFF;
  position: absolute;
  bottom: 10%;
  left: 40%;
  border-radius: 50%;
  border:#DECEFF solid 0.3rem ;
 height: 7.5rem;
 width: 7.5rem;
}
.textbox{
  border: rgb(166, 11, 187) 1rem solid;
  background-color: rgb(14, 11, 43);
  width: 100%;
  min-height: 15rem;
position: absolute;
bottom: 0;
padding: 2rem;
padding-top: 1rem;
}
.textbox-test, .textbox-title{
  color: rgb(244, 235, 255);
  font-size: 2rem;
  text-align: left;
  margin-top: 0.5rem;
}
.textbox-title{
  font-size: 2.5rem;
}
.AC{
  border: rgb(55, 11, 218) 1rem solid;
}

.bg-img {
  width: 130%;
  z-index: -5;
  position: absolute;
  bottom: 5%;
  left: -20%;
}

h1 {
  font-size: 2rem;
}

img {
    z-index: -2;
    position: absolute;
    bottom: 10%;
    /* left: 25%; this is represented in the item.position property*/
    width: 20%;
    border-radius: 3rem;
}
</style>
