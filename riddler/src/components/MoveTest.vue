<template>
  <div
    class="game-container"
    id="game-viewport"
    @keydown.right="rightMove()"
    @keydown.left="leftMove()"
    @keyup="reset()"
    @keydown.z="onEnter()"
  >
    <div class="mobile-button-container">
      <button @mousedown="leftMove()" @mouseup="reset()" class="mobile-button">&lt;</button>
      <button @click="onEnter()" class="mobile-button">Z</button>
      <button @mousedown="rightMove()" @mouseup="reset()" class="mobile-button">&gt;</button>
    </div>

    <img
      :src="require(`@/assets/environment/lv1/${currentLocation.img}`)"
      class="bg-img"
    />
    <div class="player" :style="cssProps" tabindex="-1">
      <img
        :src="require(`@/assets/sprites/${playerAvatar}`)"
        class="player-avatar"
      />
    </div>

    <img
      v-for="item in gameItems"
      :src="require(`@/assets/${item.img}`)"
      :style="{ left: item.margin, filter: item.filter }"
      :alt="item"
      :key="item.key"
      :id="item.section"
      class="item hide"
    />

    <div :class="{ AC: mainAnt }" v-show="txtbx" class="textbox">
      <img
        :src="require(`@/assets/sprites/${player.dialogueSprite}`)"
        class="player-avatar-dialogue"
      />
      <img
        :src="require(`@/assets/sprites/${npcDialogueSprite}`)"
        class="npc-avatar-dialogue"
        id="npc-dialogue-sprite"
      />
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

  </div>
</template>

<script>
import { gsap } from "gsap";
gsap.config;

import ItemPopup from "./ItemPopup.vue";

export default {
  name: "MoveTest",
  components: {
    ItemPopup
  },
  created() {
    this.getUserData();
    this.sectionChange();
  },
  mounted() {
    this.unhideItem();
  },
  data() {
    return {
      player: {
        idle: "idle-left.gif",
        left: "walk-left.gif",
        right: "walk-right.gif",
        dialogueSprite: "sprite_dialogue_player.png",
      },
      playerAvatar: "idle-left.gif",
      npcDialogueSprite: "sprite_dialogue_riddl.png",
      leftValue: null,
      currentLevel: null,
      playerLocation: [
        {
          level: [
            { id: 1, img: "bg_1_a.png" },
            { id: 2, img: "bg_1_b.png" },
            { id: 3, img: "bg_1_c.png" },
          ],
        },
      ],
      currentLocation: {
        section: null,
        img: "",
      },
      gameItems: null,
      currentItem: null,
      itemPopup: false,
      txtbx: false,
      textCount: 0,
      mainAnt: false,
    };
  },
  computed: {
    cssProps() {
      return {
        '--leftVar': (this.leftValue) + "%",
      }
    },
  },
  methods: {  
    getUserData() {
      this.leftValue = this.$store.state.userData.leftValue;
      this.currentLevel = this.$store.state.userData.level;
      this.currentLocation.section = this.$store.state.userData.section;
      this.currentLocation.img = this.playerLocation[this.currentLevel - 1].level[this.currentLocation.section - 1].img;
      this.gameItems = this.$store.state.gameItems.gameItems[this.$store.state.userData.level - 1];
      // NEXT STEP: for each item in this.$store.userData.inventory, filter currentLevelItems for item.id, if true then pop item from gameItems
    },
    leftMove() {
      this.player.idle = "idle-left.gif";
      setTimeout(() => {

        if (this.leftValue <= 1.5) {
          if (this.currentLocation.section > 1) {
            this.sectionChangeAnim();                      
          }
        };

        if (this.leftValue > 0) {
          this.leftValue -= 1.5;
        } else {
          if (this.currentLocation.section > 1) {
            this.leftValue = 1;
            this.sectionChange();
            this.currentLocation.section = this.currentLocation.section - 1;
            setTimeout(() => {
             this.leftValue = 84;
            }, 25);
          }
        }
        this.playerAvatar = this.player.left;
        this.itemInteract();
      }, 250);
     
    },
    rightMove() {
      this.player.idle = "idle-right.gif";
      setTimeout(() => {
        if (this.leftValue >= 83.5) {
          if (this.currentLocation.section < 3) {
            this.sectionChangeAnim();                      
          }
        };
        if (this.leftValue <= 85) {
          this.leftValue += 1.5;
        } else {
          if (this.currentLocation.section < 3) {
            this.leftValue = 1;
            this.currentLocation.section = this.currentLocation.section + 1;
            setTimeout(() => {
            this.sectionChange();
             this.leftValue = 1;
            }, 250);
                        
          }
        }
        this.playerAvatar = this.player.right;
        this.itemInteract();

        this.playerAvatar = this.player.right;
        this.itemInteract();
      }, 250);
    },
    reset() {
      setTimeout(() => {
        this.playerAvatar = this.player.idle;
      }, 250);
      this.itemInteract();
    },
    sectionChange() {
      setTimeout(() => {
        console.log(this.currentLocation);
        this.currentLocation.img = this.playerLocation[this.currentLevel - 1].level[this.currentLocation.section - 1].img;
        this.unhideItem();
      }, 300);
        var gsapTes = gsap.to(".game-container", {
          delay: .2, 
          backgroundColor: "rgba(16, 1, 22, 0)",
          ease: "power2.inOut"
        });
        console.log(gsapTes);
    },
    sectionChangeAnim() {
      var gsapTest = gsap.to(".game-container", {
       backgroundColor: "rgba(16, 1, 22, 1)",
       duration:0.25});
      console.log(gsapTest);
    },
    unhideItem() {
      const overworldItems = document.getElementsByClassName("item");
      for (let item of overworldItems) {
        if (this.currentLocation.section == item.id) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      }
    },
    itemInteract() {
      this.currentItem = null;
      this.gameItems.forEach((item) => {
        const offset = item.position - this.leftValue;
        if ((item.section === this.currentLocation.section) && (Math.abs(offset) <= 10 || (offset >= -10 && offset < 10))) { //checks distance from left and right of the item
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
        if (this.currentItem.itemType === "object") {              
        this.itemPopup = true;
        } else if (this.currentItem.itemType === "character") {              
          this.txtbxShow();
        }
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
        this.textCount += 1;
        const charLabel = document.querySelector(".textbox-title");
        const textOutput = document.querySelector(".textbox-test");
        const num = this.textCount - 1;
        textOutput.innerHTML = this.currentItem.dialogue[num].text;
        charLabel.innerHTML = this.currentItem.dialogue[num].name;
        if (this.currentItem.dialogue[num].isAntagonist) {
          this.mainAnt = true;
        } else {
          this.mainAnt = false;
        }
        this.npcDialogueSprite = this.currentItem.dialogueSprite;
      } else {
        this.txtbx = false;
        this.textCount = 0;
      }
    },
  },
};
</script>

<style scoped>

.game-container {
  overflow: hidden;
  position: relative;
  width: 60vw;
  height: 45vw;
  margin: 2.5rem;
  border: .3rem solid;
  border-radius: 1.5rem;
  transition: all .2s;
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

.mobile-button-container {
  width: 100%;
  height: fit-content;
  margin: 2rem;
}
.mobile-button {
  font-size: 4rem;
  background-color: #766696;
  color: #deceff;
  border-radius: 50%;
  border: #deceff solid 0.3rem ;
  height: 7.5rem;
  width: 7.5rem;
  margin: 1rem;
}
.textbox {
  border: rgb(166, 11, 187) 1rem solid;
  background-color: rgb(14, 11, 43);
  width: 100%;
  min-height: 15rem;
  position: absolute;
  bottom: 0;
  padding: 2rem;
  padding-top: 1rem;
}
.textbox-test,
.textbox-title {
  color: rgb(244, 235, 255);
  font-size: 2rem;
  text-align: left;
  margin-top: 0.5rem;
}
.textbox-title {
  font-size: 2.5rem;
}
.AC {
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
