<template>
  <div class="game-page">

    <div class="level-and-hearts">
      <h1>Lvl. {{ $store.state.userData.level }}</h1>
      <HeartBar />
    </div>

    <div class="game-and-inventory">
    <main class="game-contents" >
      <div class="audio-container">
        <audio id="audio-bgm" :src="require(`@/assets/audio/bgm/${currentOST}.mp3`)"></audio>
        <audio id="footstep-sfx" :src="require(`@/assets/audio/sfx/Footsteps02-1L.mp3`)"></audio>
      </div>

      <div
        class="game-container"
        id="game-viewport"
        @keydown.right="rightMove()"
        @keydown.left="leftMove()"
        @keyup="reset()"
        @keydown.z="onEnter()"
        
      >

        <img
          :src="require(`@/assets/environment/lv1/${currentLocationImg}`)"
          class="bg-img"
        />
        <div class="player" :style="cssProps" tabindex="-1" ref="playerMove">
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
          :class="'section' + item.section"
          class="item hide"
        />

        <div :class="{ AC: mainAnt }" v-if="txtbx" class="textbox">
          <img
            :src="require(`@/assets/sprites/${player.dialogueSprite}`)"
            class="player-avatar-dialogue"
          />
          <img
            :src="require(`@/assets/sprites/${npcDialogueSprite}`)"
            class="npc-avatar-dialogue"
            id="npc-dialogue-sprite"
          />
          <p class="textbox-title">{{ this.$store.state.userData.currentItem.dialogue[this.textCount].name }}</p>
          <p class="textbox-test typing-class">{{ this.$store.state.userData.currentItem.dialogue[this.textCount].text }}</p>
        </div>
        
        <item-popup @itemAdded="addToInventory()" v-if="itemPopup" @closePopup="closeItemPopup()" :item="currentItem" v-on:turnoff="turnOff">
          <template v-slot:item-img>
            <img class="itempopup-img" :src="require(`@/assets/${$store.state.userData.currentItem.img}`)" :alt="$store.state.userData.currentItem.name"/>
          </template>
          <template v-slot:item-text>
            {{ $store.state.userData.currentItem.prompt }}
          </template>
        </item-popup>
      
      </div>

      <div class="mobile-button-container">
        <button @mousedown="leftMove()" @mouseup="reset()" class="mobile-button">&lt;</button>
        <button @click="onEnter()" class="mobile-button">Z</button>
        <button @mousedown="rightMove()" @mouseup="reset()" class="mobile-button">&gt;</button>
      </div>
    </main>

    <Inventory />

  </div>      

  </div>
</template>

<script>
import { gsap } from "gsap";
gsap.config;

import HeartBar from "./HeartBar.vue";
import Inventory from "./Inventory.vue";
import ItemPopup from "./ItemPopup.vue";


export default {
  name: "MoveTest",
  components: {
    HeartBar, Inventory, ItemPopup
  },
  created() {
    this.getUserData();
    this.sectionChange();
  },
  mounted() {
    this.unhideItem();
    this.enablePlayerMovement();
    
  },
  data() {
    return {
      player: {
        idle: "idle-left.gif",
        left: "walk-left.gif",
        right: "walk-right.gif",
        dialogueSprite: "sprite_dialogue_player.png",
      },
      playerAvatar: "idle-right.gif",
      npcDialogueSprite: "sprite_dialogue_riddl.png",
      locations: [
        {
          level: [
            { id: 1, img: "bg_1_a.png", ost:"lv01" },
            { id: 2, img: "bg_1_b.png", ost:"lv01" },
            { id: 3, img: "bg_1_c.png", ost:"lv01" },
          ],
        },
      ],
      currentLocationImg: "",
      gameItems: null,
      currentOST: "DSK",
      itemPopup: false,
      txtbx: false,
      textCount: -1,
      mainAnt: false,
      enteredOnObject: false,
    };
  },
  computed: {
    cssProps() {
      return {
        '--leftVar': (this.$store.state.userData.leftValue) + "%",
      }
    },
  },
  methods: {  
    enablePlayerMovement() {
      this.$refs.playerMove.focus();  
      console.log('done');    
    },
    getUserData() {
      this.currentLocationImg = this.locations[this.$store.state.userData.level - 1].level[this.$store.state.userData.section - 1].img;
      this.gameItems = this.$store.state.gameItems.gameItems[this.$store.state.userData.level - 1];
      // NEXT STEP: for each item in this.$store.userData.inventory, filter currentLevelItems for item.id, if true then pop item from gameItems
    },
    leftMove: function () {
      this.player.idle = "idle-left.gif";
      setTimeout(() => {

        if (this.$store.state.userData.leftValue > 0) {
          this.$store.state.userData.leftValue -= 1.5;
        } else {
          if (this.$store.state.userData.section > 1) {
            this.sectionChangeAnim();
            this.$store.state.userData.section = this.$store.state.userData.section - 1;
          }
        }
        this.playerAvatar = this.player.left;
        this.itemInteract();
        
      }, 150);
     
    },
    rightMove: function () {
      this.player.idle = "idle-right.gif";
      setTimeout(() => {
        if (this.$store.state.userData.leftValue < 85) {
          this.$store.state.userData.leftValue += 1.5;
        }; 
        if (this.$store.state.userData.section < 3 && this.$store.state.userData.leftValue > 85) {
            this.sectionChangeAnim();
            this.$store.state.userData.section = this.$store.state.userData.section + 1;                   
          }
        this.playerAvatar = this.player.right;
        this.itemInteract();
      }, 150);
    },
    reset: function () {
      setTimeout(() => {
        this.playerAvatar = this.player.idle;
      }, 250);
      this.itemInteract();
    },
    sectionChange() {
      
      setTimeout(() => {
        if (this.$store.state.userData.leftValue >= 85) {
          this.$store.state.userData.leftValue = 1.5;
        } else {this.$store.state.userData.leftValue = 80;}
      },10);
      
      setTimeout(() => {
        this.currentLocationImg = this.locations[this.$store.state.userData.level - 1].level[this.$store.state.userData.section - 1].img;
        this.currentOST = this.locations[this.$store.state.userData.level - 1].level[this.$store.state.userData.section - 1].ost;
        console.log(this.currentOST);
        this.unhideItem();
        this.playAudio();
      }, 300);

    },
    sectionChangeAnim() {
      var transition = gsap.fromTo(".game-container", {
       backgroundColor: "rgba(16, 1, 22, 1)",
       duration:0.001}, {
       delay: .2, 
       backgroundColor: "rgba(16, 1, 22, 0)",
       ease: "power2.inOut"});
       transition.play;

       var chrAnim = gsap.fromTo(".player",  {
       backgroundColor: "rgba(16, 1, 22, 1)",
       duration:0.001}, {
       delay: .1, 
       backgroundColor: "rgba(16, 1, 22, 0)",
       ease: "power2.inOut"});
       chrAnim.play;
       this.sectionChange();

    },
    unhideItem() {
      document.querySelectorAll('.item').forEach(el => el.classList.add("hide"));
      document.querySelectorAll('.section' + this.$store.state.userData.section).forEach(el => el.classList.remove("hide"));

      //maybe :class="item.section" then select current section's class and remove
    },
        playAudio(){
      const audio = document.getElementById("audio-bgm");
      setTimeout(() => {
        audio.play();
        audio.loop = true;
      }, 200);
      this.itemInteract();

    },
    pauseAudio(){
      const audio = document.getElementById("audio-bgm");
      audio.pause();
    },
    itemInteract() {
      this.$store.state.userData.currentItem = null;
      this.gameItems.forEach((item) => {
        const offset = item.position - this.$store.state.userData.leftValue;
        if ((item.section === this.$store.state.userData.section) && (Math.abs(offset) <= 10 || (offset >= -10 && offset < 10))) { //checks if right section and distance from left and right of the item
            item.isInteractable = true;
            this.$store.state.userData.currentItem = item;
            item.filter = "sepia(55%)";
        } else {
          item.isInteractable = false;
          item.filter = null;
        }
      });
    },
    onEnter() {
      if (this.$store.state.userData.currentItem) {
        this.enteredOnObject = true;
        if (this.$store.state.userData.currentItem.itemType === "object") {              
        this.itemPopup = true;
        } else if (this.$store.state.userData.currentItem.itemType === "character") {              
          this.txtbxShow();
        }
      }
    },
    addToInventory() {
      this.gameItems.splice(this.$store.state.userData.currentItem.id, 1);
      this.$store.state.userData.inventory.push(this.$store.state.userData.currentItem);
      this.closeItemPopup();
    },
    closeItemPopup() {
      this.itemPopup = false;
    },
    txtbxShow() {
      this.textCount += 1;
      if (this.textCount < this.$store.state.userData.currentItem.dialogue.length) {
        this.txtbx = true;
        if (this.$store.state.userData.currentItem.dialogue[this.textCount].isAntagonist) {
          this.mainAnt = true;
        } else {
          this.mainAnt = false;
        }
        this.npcDialogueSprite = this.$store.state.userData.currentItem.dialogueSprite;
      } else {
        this.txtbx = false;
        this.enteredOnObject = false;
        this.textCount = -1;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: left;
}
.game-page {
  margin: auto;
  display: inline-block;
  text-align: left;
}
.game-and-inventory {
  display: flex;
  flex-direction: row;
}
.game-contents {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-container {
  overflow: hidden;
  position: relative;
  width: 60vw;
  height: 30vw; 
  margin-bottom: 2.5rem;
  border: .3rem solid;
  border-radius: 1.5rem;
  transition: all .2s;
}
.level-and-hearts h1 {
  margin-bottom: .5rem;
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
  bottom: -40vw;
}
.npc-avatar-dialogue {
  width: 70%;
  left: -17%;
  bottom: -40vw;
}
.hide {
  display: none;
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
  border: #a60bbb 1rem solid;
  background-color: #0e0b2b;
  width: 100%;
  min-height: 15%;
  position: absolute;
  bottom: 0;
  padding: 2rem;
  padding-top: 1rem;
}
.textbox-test,
.textbox-title {
  color: #f4ebff;
  font-size: 2rem;
  text-align: left;
  margin-top: 0.5rem;
}
.textbox-title {
  font-size: 2.5rem;
}
.AC {
  border: #370bda 1rem solid;
}

.bg-img {
  width: 130%;
  z-index: -5;
  position: absolute;
  bottom: 0;
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

@media only screen and (max-width: 768px) {
  .game-and-inventory {
    flex-direction: column;
  }
  .game-container {
    width: 80vw;
    height: 40vw;
    margin-right: 0;
  }
  .game-contents {
    margin-bottom: 5rem;
  }
  .player-avatar-dialogue {
    bottom: -55vw;
  }
  .npc-avatar-dialogue {
    bottom: -55vw;
  }
}

</style>
