<template>

  <div class="game-page" :key="$store.state.userData.level">
    <button @click="levelAdd" class="mobile-button">l+ratio</button>
    <button @click="levelMinus" class="mobile-button">l-1</button>

    <div class="level-and-hearts">
      <h1>Lvl. {{ $store.state.userData.level }}</h1>
      <HeartBar />
    </div>

    <div v-if="$store.state.userData.level === 2" class="battery-meter">
      <h1>Battery: {{ $store.state.userData.battery }}</h1>
      <div class="battery" :style="{ width: batteryPercentage }"></div>
    </div>
    
    <div class="game-and-inventory">
    <main class="game-contents" >
      <div class="audio-container">
        <audio id="audio-bgm" :src="require(`@/assets/audio/bgm/${currentOST}.mp3`)"></audio>
        <audio id="walk-sfx" :src="require(`@/assets/audio/sfx/walkstep.mp3`)"></audio>
      </div>

    <div class="game-overlay">
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
          :style="{ left: item.margin, width: item.width, filter: item.filter }"
          :alt="item"
          :key="item.key"
          :class="'section' + item.section"
          class="item hide"
        />

        <div :class="{ AC: mainAnt }" v-if="txtbx" class="textbox">
          <img
            :src="require(`@/assets/sprites/${player.dialogueSprite}`)"
            class="player-avatar-dialogue"
            id="player-dialogue-sprite"
          />
          <img
            :src="require(`@/assets/sprites/${npcDialogueSprite}`)"
            class="npc-avatar-dialogue"
            id="npc-dialogue-sprite"
          />
          <p class="textbox-title">{{ this.$store.state.userData.currentItem.dialogue[this.textCount].name }}</p>
          <p class="textbox-test typing-class">{{ this.$store.state.userData.currentItem.dialogue[this.textCount].text }}</p>
        </div>
        
        <item-popup @itemAdded="addToInventory()" v-if="itemPopup" @closePopup="closeItemPopup()" :item="currentItem" 
        ref="itemPopupBox">
          <template v-slot:item-img>
            <img class="itempopup-img" style="width: 12.5%" :src="require(`@/assets/${$store.state.userData.currentItem.img}`)" :alt="$store.state.userData.currentItem.name"/>
          </template>
          <template v-slot:item-text>
            {{ $store.state.userData.currentItem.prompt }}
          </template>
        </item-popup>
      
      </div>
    </div>

      <div class="mobile-button-container">
        <button @mousedown="leftMove()" @mouseup="reset()" class="mobile-button">&lt;</button>
        <button @click="onEnter()" class="mobile-button">Z</button>
        <button @mousedown="rightMove()" @mouseup="reset()" class="mobile-button">&gt;</button>
      </div>
    </main>

    <PuzzlePopup  
        @turn-off="closePuzzlePopup" 
        :puzzleAnswer="emittedPuzzleAnswer"
        :puzzleVisibility="puzzlePopupVisilibility" 
        
        :puzzleType ="emittedPuzzleType"
        ref="puzzlePopupBox"
        >
        <template v-slot:puzzle-text>
          <h1>{{$store.state.userData.currentItem.prompt}}</h1>
          
        </template>
        </PuzzlePopup>

    <Inventory />
    <button v-if="$store.state.userData.level === 2" @click="flashlight()" class="flashlight"></button>
  </div>   

  </div>
</template>

<script>
import { gsap } from "gsap";
gsap.config;

import HeartBar from "./HeartBar.vue";
import Inventory from "./Inventory.vue";
import ItemPopup from "./ItemPopup.vue";
import PuzzlePopup from "./PuzzlePopup.vue"; 


export default {
  name: "MoveTest",
  components: {
    HeartBar, Inventory, ItemPopup, PuzzlePopup
  },
  created() {
    this.getUserData();
    this.sectionChange();
  },
  mounted() {
    this.unhideItem();
    this.enablePlayerMovement();
    this.checkLevel();
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
          assets: 
            [
              { id: 1, img: "bg_1_a.png", ost:"lv01" },
              { id: 2, img: "bg_1_b.png", ost:"lv01" },
              { id: 3, img: "bg_1_c.png", ost:"lv01" },
            ],
        },
        {
          assets:             [
              { id: 1, img: "bg_2_a.png", ost:"lv02" },
              { id: 2, img: "bg_2_b.png", ost:"lv02" },
              { id: 3, img: "bg_2_c.png", ost:"lv02" },
            ],
        },
      ],
      enteredOnObject: false,
      emittedPuzzleAnswer: "", 
      
      emittedPuzzleType: null,
      currentLocationImg: "",
      gameItems: null,
      currentOST: "lv01",
      itemPopup: false,
      txtbx: false,
      textCount: -1,
      mainAnt: false,
      puzzlePopupVisilibility: false,
      isFlashlightOn: false,
    };
  },

  computed: {
    cssProps() {
      return {
        '--leftVar': (this.$store.state.userData.leftValue) + "%",
      }
    },
    batteryPercentage() {
      return this.$store.state.userData.battery + "%";
    }
  },
  methods: {
    enablePlayerMovement() {
      this.$refs.playerMove.focus();  
      console.log('done');    
    },
    getUserData() {
      this.currentLocationImg = this.locations[this.$store.state.userData.level - 1].assets[this.$store.state.userData.section - 1].img;
      this.gameItems = this.$store.state.gameItems.gameItems[this.$store.state.userData.level - 1];
    },
    checkLevel() {
      if (this.$store.state.userData.level === 2) {
        setTimeout(() => {
          document.querySelector(".game-overlay").style.filter = "brightness(.1)";
        }, 0)      
      }
    },
    leftMove(e){
      this.playWalkSfx();
      this.player.idle = "idle-left.gif";
      if(this.enteredOnObject && e.key === "ArrowLeft"){
        e.preventDefault();
      }
      else{
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
      }
     
    },
    rightMove(e) {
      this.player.idle = "idle-right.gif";
      if(this.enteredOnObject && e.key === "ArrowRight") {
        e.preventDefault();
      }
      else{
      setTimeout(() => {
        
        if (this.$store.state.userData.leftValue < 85) {
          this.$store.state.userData.leftValue += 1.5;
        }; 
        if (this.$store.state.userData.section < 3 && this.$store.state.userData.leftValue > 83) {
            this.sectionChangeAnim();
            this.$store.state.userData.section = this.$store.state.userData.section + 1;                   
          }
        this.playerAvatar = this.player.right;
        this.itemInteract();
      }, 150);
      }
    },
   
    reset() {
      this.stopWalkSfx();
      setTimeout(() => {
      this.playerAvatar = this.player.idleRight;
      this.playerAvatar = this.player.idle;
      }, 250);
       this.itemInteract();
      },
    sectionChange() {
      setTimeout(() => {
        if (this.$store.state.userData.leftValue >= 83) {
          this.$store.state.userData.leftValue = 1.5;
        } else {this.$store.state.userData.leftValue = 80;}
      }, 10);
      
      setTimeout(() => {
        this.currentLocationImg = this.locations[this.$store.state.userData.level - 1].assets[this.$store.state.userData.section - 1].img;
        this.currentOST = this.locations[this.$store.state.userData.level - 1].assets[this.$store.state.userData.section - 1].ost;
        this.unhideItem();
        this.playAudio();
      }, 300);
    },
    levelChange() {
      setTimeout(() => {
        this.$store.state.userData.leftValue = 40;
        this.currentLocationImg = this.locations[this.$store.state.userData.level - 1].assets[this.$store.state.userData.section - 1].img;
        this.currentOST = this.locations[this.$store.state.userData.level - 1].assets[this.$store.state.userData.section - 1].ost;
        this.unhideItem();
        this.playAudio();
      }, 300);
    },
    sectionChangeAnim() {
      var transition = gsap.fromTo(".game-container", {
       backgroundColor: "rgba(16, 1, 22, 1)",
       duration:0.1}, {
       delay: .2, 
       duration: .3,
       backgroundColor: "rgba(16, 1, 22, 0)",
       ease: "power2.inOut"});
       transition.play;
       this.sectionChange();
    },
    unhideItem() {
      document.querySelectorAll('.item').forEach(el => el.classList.add("hide"));
      document.querySelectorAll('.section' + this.$store.state.userData.section).forEach(el => el.classList.remove("hide"));

      //maybe :class="item.section" then select current section's class and remove
    },
    playAudio(){
      const audio = document.getElementById("audio-bgm");
      audio.volume = .25;
      setTimeout(() => {
        audio.play();
        audio.loop = true;
      }, 200);
      this.itemInteract();

    },
    playWalkSfx(){
      const audio = document.getElementById("walk-sfx");
      audio.loop = true;
      audio.play();
    },
    stopWalkSfx(){
      const audio = document.getElementById("walk-sfx");
      audio.pause();
      audio.currentTime = 60;
    },
    itemInteract() {
      this.$store.state.userData.currentItem = null;
      this.gameItems.forEach((item) => {
        const offset = item.position - this.$store.state.userData.leftValue;
        console.log(offset)
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
          setTimeout(() => {   
            this.openItemPopup();  
          }, 10);

        } else if (this.$store.state.userData.currentItem.itemType === "character") {              
          this.txtbxShow();

        } else if (this.$store.state.userData.currentItem.itemType === "puzzle") {        
      
            this.puzzlePopupVisilibility = true;
            console.log(this.puzzlePopupVisilibility);
            this.emittedPuzzleAnswer = this.$store.state.userData.currentItem.puzzleAnswer;
           
            this.emittedPuzzleType = this.$store.state.userData.currentItem.puzzleType;
            setTimeout(() => {   
              this.openPuzzlePopup();  
            }, 10);
              if (this.currentItem.puzzleType === 1){
                console.log('this is type 1');
              }
              else if (this.currentItem.puzzleType === 2){
                console.log('this is type 2');
              }
              else if (this.currentItem.puzzleType === 3){
                console.log('this is type 3'); 
              }
          }
      }
    },
    addToInventory() {
      const selectedItem = this.gameItems.findIndex(item => item.id === this.$store.state.userData.currentItem.id);
      this.gameItems.splice(selectedItem, 1);
      this.$store.state.userData.inventory.push(this.$store.state.userData.currentItem);
      this.closeItemPopup();
    },
    openPuzzlePopup() {
      this.$refs.puzzlePopupBox.$el.focus();// this not working
    },
    openItemPopup() {
      this.$refs.itemPopupBox.$el.focus();
    },
    closeItemPopup() {
      this.itemPopup = false;
        this.enteredOnObject = false;
      this.enablePlayerMovement();
    },
    closePuzzlePopup() { 
      this.enteredOnObject = false;
      this.puzzlePopupVisilibility = false;
      this.enablePlayerMovement();
    },
  
    txtbxShow() {
      const playerTxtSprite = document.getElementById("player-dialogue-sprite");
      const npcTxtSprite = document.getElementById("npc-dialogue-sprite");
      
      this.textCount += 1;
      if (this.textCount < this.$store.state.userData.currentItem.dialogue.length) {
        this.txtbx = true;
        if (this.$store.state.userData.currentItem.dialogue[this.textCount].isAntagonist) {
          this.mainAnt = true;
        } else {
          this.mainAnt = false;
        }

        this.npcDialogueSprite = this.$store.state.userData.currentItem.dialogueSprite;

      if (this.mainAnt == true) {
        playerTxtSprite.classList.add("avatar-dialogue-unfocus");
        npcTxtSprite.classList.remove("avatar-dialogue-unfocus");
      } else {
        npcTxtSprite.classList.add("avatar-dialogue-unfocus");
        playerTxtSprite.classList.remove("avatar-dialogue-unfocus");
      }

      } else {
        this.txtbx = false;
        this.enteredOnObject = false;
        this.textCount = -1;
      };

    },
    levelAdd() {
      this.$store.commit('incrementLevel');
      console.log(this.$store.state.userData.level);
      this.getUserData();
      this.levelChange();
      setTimeout(()=> {this.$store.state.userData.leftValue = 40;}, 250);
      this.checkLevel();
    },
    levelMinus() {
      this.$store.commit('decrementLevel');
      console.log(this.$store.state.userData.level);
      this.getUserData();
      this.levelChange();    
      this.checkLevel();
    },
    flashlight() {
      if (!this.isFlashlightOn) {
        alert("Use this flashlight at your own risk. If the battery runs out, you will be lost in the dark forever! Muahahahaha!!")
        this.isFlashlightOn = true;
        document.querySelector(".game-overlay").style.filter = "brightness(1)";
        const intervalId = setInterval(() => { 
          if (this.isFlashlightOn) {
            if (this.$store.state.userData.battery === 0) {
              clearInterval(intervalId);
              this.isFlashlightOn = false;
              document.querySelector(".game-overlay").style.filter = "brightness(.1)";
            } else {
              this.$store.state.userData.battery = this.$store.state.userData.battery - 1;
            }
          }
        }, 2000);
      } else {
        this.isFlashlightOn = false;
        document.querySelector(".game-overlay").style.filter = "brightness(.1)";
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
  width: inherit;
  height: inherit;
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

.avatar-dialogue-unfocus {
  filter: brightness(50%);
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
}
.item-popup img {
  position: unset;
  margin-bottom: 5rem;
}

.flashlight {
  height: 5rem;
  width: 5rem;
}
.battery-meter {
  width: 20rem;
}
.battery {
  background-color: #fff200;
  height: 2rem;
}
.dark {
  filter: brightness(.1);
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
