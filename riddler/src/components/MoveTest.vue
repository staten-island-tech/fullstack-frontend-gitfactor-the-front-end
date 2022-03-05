<template>
  <div class="game-container" @keydown.right="rightMove()" @keydown.left="leftMove()" @keyup="reset()" @keydown.z="onEnter()">
    <img :src="require(`@/assets/environment/lv1/${currentLocation}`)" class="bg-img" >
    <div class="player" :style="cssProps" tabindex="-1">    
      <img :src="require(`@/assets/sprites/${playerAvatar}`)" class="player-avatar" >
    </div>

    <img v-for="item in gameItems" :src="require(`@/assets/${item.img}`)" :style="{ left: item.margin, filter: item.filter }" :alt="item" :key="item.key">
    <div :class="{ AC: mainAnt }" v-show="txtbx" class="textbox">
          <img :src="require(`@/assets/sprites/${player.dialogueSprite}`)" class="player-avatar-dialogue" >
          <img :src="require(`@/assets/sprites/${npcDialogueSprite}`)" class="npc-avatar-dialogue hide" id=
          "npc-dialogue-sprite">
            <p class="textbox-title"></p> 
            <p class="textbox-test typing-class"></p>
    </div>

    <item-popup @itemAdded="addToInventory()" v-if="itemPopup" @closePopup="closeItemPopup()" :item="currentItem">
      <template v-slot:item-img>
        <img class="itempopup-img" :src="require(`@/assets/${currentItem.img}`)" :alt="currentItem.name"/>
      </template>
      <template v-slot:item-text>
        {{ currentItem.prompt }}
      </template>
    </item-popup>
    <button @click="onEnter()" class="textbox-button">Z</button>
  </div>      
</template>

<script>
import ItemPopup from './ItemPopup.vue';

export default {
  name: "MoveTest",
  components: { 
    ItemPopup 
  },
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
      // currentLevel: this.$store.userData.level,
      itemPopup: false,
      txtbx: false,
      textCount: 0,
      mainAnt: false,
      gameItems: null,
    }
  },
  computed: {
    cssProps() { 
      return {
        '--leftVar': (this.leftValue) + "%",
      }
    },
  },
  mounted() {
    this.getGameItems();
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
    getGameItems() {
      this.gameItems = this.$store.state.gameItems.gameItems[this.$store.state.userData.level - 1];
      // this.gameItems = this.$store.state.gameItems[this.$store.state.userData.level - 1];
      console.log(this.gameItems);
    },
    itemInteract() {
      this.currentItem = null;
      this.gameItems.forEach(item => {
        const offset = item.position - this.leftValue;
        if (Math.abs(offset) <= 10 || (offset >= -10 && offset < 10)) { //checks distance from left and right of the item
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
        this.itemPopup = true;
      } else if (this.currentItem.itemType === "character") {              
        this.txtbxShow();
      }
    },
    addToInventory() {
      this.gameItems.splice(this.currentItem.id, 1);
      this.$store.state.userData.inventory.push(this.currentItem);
      this.closeItemPopup();
    },
    closeItemPopup() {
      this.itemPopup = false;
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
  position: relative;
  width: 60vw;
  height: 45vw;
  border: .3rem solid;
  overflow: hidden;
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
  left: 0;
  border-radius: 50%;
  border: #DECEFF solid 0.3rem ;
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
.item-popup img {
  position: unset;
  margin-bottom: 5rem;
}
</style>
