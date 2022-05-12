<template>

  <div class="game-page" :key="$store.state.userData.level">
    <button @click="levelAdd" class="mobile-button">l+ratio</button>
    <button @click="levelMinus" class="mobile-button">l-1</button>

    <div class="level-and-hearts">
      <h2>Lv. {{ $store.state.userData.level }}</h2>
      <HeartBar />
    </div>

    <div v-if="$store.state.userData.level === 2" class="battery-meter">
      <h2>{{ $store.state.userData.battery }}%</h2>
      <div class="charge-container">
        <div class="charge" :style="{ width: batteryPercentage }"></div>
      </div>
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
          :style="{ left: item.margin, width: item.width, bottom: item.bottom, filter: item.filter }"
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
        
        <ItemPopup @itemAdded="addToInventory()" v-if="itemPopup" @closePopup="closeItemPopup()" :item="currentItem" 
        ref="itemPopupBox">
          <template v-slot:item-name>
            {{ $store.state.userData.currentItem.name }}
          </template>
          <template v-slot:item-img>
            <img class="itempopup-img" style="width: 12.5%" :src="require(`@/assets/${$store.state.userData.currentItem.img}`)" :alt="$store.state.userData.currentItem.name"/>
          </template>
          <template v-slot:item-text>
            {{ $store.state.userData.currentItem.prompt }}
          </template>
        </ItemPopup>
           <PuzzlePopup  
        @turn-off="closePuzzlePopup" 
        @reset-visibility="makeThePuzzleFinallyWork"
        @refocus-on-puzzle="openPuzzlePopup"
        @delete-item="deleteFromInventory"
        @next-level="openTransitionPopup"
        
        :puzzleAnswer="emittedPuzzleAnswer"
        :puzzleVisibility="puzzlePopupVisibility" 
        :isPromptAnswered="puzzleQuestionCompleted"
        :inventoryItem="selectedInventoryItem"        
        :puzzleType ="emittedPuzzleType"
        :isLevelTransitionPuzzle="isLevelTransitionPuzzleValue"
        :puzzle2ButtonArray="puzzle2ButtonChoices"
        ref="puzzlePopupBox"
        >
        <template v-slot:puzzle-text>
          <div class="puzzle-text-div">
            <h1 class="puzzle-name">{{$store.state.userData.currentItem.name}}</h1>
          <h2 class="puzzle-prompt">{{$store.state.userData.currentItem.prompt}}</h2>
          </div>          
          
        </template>
         <template v-slot:puzzle-img>
            <img class="itempopup-img" style="width: 12.5%" :src="require(`@/assets/${$store.state.userData.currentItem.img}`)" :alt="$store.state.userData.currentItem.name"/>
          </template>
        <template v-slot:puzzle-correct-text>
          <p class="puzzle-correct-info">{{$store.state.userData.currentItem.puzzleAnsweredText}}</p>
        </template>
        </PuzzlePopup>
      </div>
    </div>

      <div class="mobile-button-container">
        <button @mousedown="leftMove()" @mouseup="reset()" class="mobile-button">&lt;</button>
        <button @click="onEnter()" class="mobile-button">Z</button>
        <button @mousedown="rightMove()" @mouseup="reset()" class="mobile-button">&gt;</button>
      </div>
    </main>

 

    <Inventory @clicked-item="selectedInventoryItemName">
       <button v-if="$store.state.userData.level === 2" @click="flashlight()" class="flashlight"></button>
      </Inventory>
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
      puzzleQuestionCompleted: null,
      emittedPuzzleType: null,
      currentLocationImg: "",
      gameItems: null,
      currentOST: "lv01",
      itemPopup: false,
      txtbx: false,
      textCount: -1,
      mainAnt: false,
      puzzlePopupVisibility: false,
      selectedInventoryItem:"",
      selectedInventoryItemId: 0,
      isLevelTransitionPuzzleValue:null,
      puzzle2ButtonChoices:[],      
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
    openTransitionPopup(){
      console.log('opening the transition thingie');
    },  
    enablePlayerMovement() {
      this.$refs.playerMove.focus();  
      console.log('done');    
    },
    getUserData() {
      this.currentLocationImg = this.locations[this.$store.state.userData.level - 1].assets[this.$store.state.userData.section - 1].img;
      this.gameItems = this.$store.state.gameItems.gameItems[this.$store.state.userData.level - 1];
    },
    checkLevel() {
      if (this.$store.state.userData.level === 1) {
        console.log("level 1");
          document.querySelector(".game-overlay").classList.add("game-overlay");
      } 
      if (this.$store.state.userData.level === 2) {
        console.log("level 2");
        setTimeout(() => {
          document.querySelector(".game-overlay").classList.add("dark");

        }, 0)      
      } 
      if (this.$store.state.userData.level === 3) {
        console.log("level 3");
        setTimeout(() => {
          document.querySelector(".game-overlay").classList.add("fog");
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
        const itemLeft = item.position;
        const itemRight = item.position + item.widthInt;
        if ((item.section === this.$store.state.userData.section) && ((this.$store.state.userData.leftValue + 8) >= itemLeft && (this.$store.state.userData.leftValue + 10) <= itemRight)) { //checks if avatar is in range of item
            item.isInteractable = true;
            this.$store.state.userData.currentItem = item;
            console.log('in range');
            item.filter = "brightness(55%)";
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
      
            this.puzzlePopupVisibility = true;
          
            this.emittedPuzzleAnswer = this.$store.state.userData.currentItem.puzzleAnswer;           
            this.emittedPuzzleType = this.$store.state.userData.currentItem.puzzleType;
            this.puzzleQuestionCompleted = this.$store.state.userData.currentItem.puzzleCompleted;
            this.isLevelTransitionPuzzleValue = this.$store.state.userData.currentItem.isLevelTransitionPuzzle;
            this.puzzle2ButtonChoices = this.$store.state.userData.currentItem.buttonChoices;
            
            setTimeout(() => {   
              this.openPuzzlePopup();  
            }, 10);
          }
      }
    },
      selectedInventoryItemName(name, id) {
      this.selectedInventoryItem = name;
      console.log(name);
      this.selectedInventoryItemId = id;
    },
    addToInventory() {
      const selectedItem = this.gameItems.findIndex(item => item.id === this.$store.state.userData.currentItem.id);
      this.gameItems.splice(selectedItem, 1);
      this.$store.state.userData.inventory.push(this.$store.state.userData.currentItem);
      this.closeItemPopup();
    },
    deleteFromInventory() {
      console.log(this.selectedInventoryItemId);
      this.$store.state.userData.inventory.splice(this.selectedInventoryItemId, 1);
    },
     makeThePuzzleFinallyWork(){
      this.puzzlePopupVisibility = null;
    },
    openPuzzlePopup() {
      this.$refs.puzzlePopupBox.$el.focus();
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
      this.puzzlePopupVisibility = false;
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
@import "../assets/global.css";

h1 {
  text-align: left;
}
h2 {
  font-size: var(--h4);
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
.game-overlay {
  overflow: hidden;
  border-radius: 1.5rem;
}
.game-container {
  overflow: hidden;
  position: relative;
  width: 66vw;
  height: 33vw; 
  border: .3rem solid;
  border-radius: 1.5rem;
  transition: all .2s;
}
.level-and-hearts h2 {
  font-size: var(--h3);
  margin-bottom: .5rem;
}
.player {
  width: inherit;
  height: inherit;
}
.player-avatar {
  width: 20%;
  z-index: -1;
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
.mobile-button-container {
  margin-top: 2.5rem;
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
.puzzle-name {
  text-align: center;
  font-size: 3.5rem;
}
.puzzle-prompt {
  font-size: 2rem;
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

.item {
  z-index: -2;
  position: absolute;
}

.item-popup img {
  position: unset;
  margin-bottom: 3rem;
}

.flashlight {
  background-color: #fff200;
  height: 5rem;
  width: 5rem;
  margin: 2rem;
  border-radius: 5rem;
}
.battery-meter {
  margin-bottom: 1rem;
}
.charge-container {
  overflow: hidden;
  width: 15rem;
  background-color: var(--purple);
  margin-top: .5rem;
  border-radius: .5rem;
}
.charge {
  background-color: #fff200;
  height: 2.5rem;
}
.dark {
  filter: brightness(.1);
}

.fog {
  position: relative;
}
.fog:before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-image: url("../assets/bubbles.png");
  animation: fogFade 20s ease-in-out infinite;
}
    @keyframes fogFade {
      0% {
        filter: brightness(0%);
      }
      20% {
        filter: brightness(70%);
      }
      30% {
        filter: brightness(90%);
      }
      40% {
        filter: brightness(95%);
      }
      50% {
        filter: brightness(100%);
      }
      60% {
        filter: brightness(40%);
      }
      70% {
        filter: brightness(70%);
      }
      100% {
        filter: brightness(0%);
      }
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
