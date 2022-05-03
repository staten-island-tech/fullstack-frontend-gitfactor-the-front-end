<template>
  <div class="game-page">

    <div class="level-and-hearts">
      <h1>Lvl. {{ $store.state.userData.level }}</h1>
      <HeartBar />
    </div>

    <div class="game-and-inventory">
      <main class="game-contents">
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
        
        <item-popup @itemAdded="addToInventory()" v-if="itemPopup" @closePopup="closeItemPopup()" :item="currentItem" 
        ref="itemPopupBox">
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

    <PuzzlePopup  
        @turn-off="closePuzzlePopup" 
        @testFunction="makeThePuzzleFinallyWork"
        @refocus-on-puzzle="openPuzzlePopup"
        @delete-item="deleteFromInventory"
        
        :puzzleAnswer="emittedPuzzleAnswer"
        :puzzleVisibility="puzzlePopupVisibility" 
        :isPromptAnswered="puzzleQuestionCompleted"
        :inventoryItem="selectedInventoryItem"        
        :puzzleType ="emittedPuzzleType"
        ref="puzzlePopupBox"
        >
        <template v-slot:puzzle-text>
          <div class="puzzle-text-div">
            <h1 class="puzzle-name">{{$store.state.userData.currentItem.name}}</h1>
          <h2 class="puzzle-prompt">{{$store.state.userData.currentItem.prompt}}</h2>
          </div>
          
          
        </template>
        <template v-slot:puzzle-correct-text>
          <p class="puzzle-correct-info">{{$store.state.userData.currentItem.puzzleAnsweredText}}</p>
        </template>
        </PuzzlePopup>

    <Inventory @clicked-item="selectedInventoryItemName">
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
      playerLocation: [
        {
          level: [
            { id: 1, img: "bg_1_a.png" },
            { id: 2, img: "bg_1_b.png" },
            { id: 3, img: "bg_1_c.png" },
          ],
        },
      ],
      enteredOnObject: false,
      emittedPuzzleAnswer: "", 
      puzzleQuestionCompleted: null,
      emittedPuzzleType: null,
      currentLocationImg: "",
      gameItems: null,
      currentItem: null,
      itemPopup: false,
      txtbx: false,
      textCount: -1,
      mainAnt: false,
      puzzlePopupVisibility: false,
      selectedInventoryItem:"",
    
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
    makeThePuzzleFinallyWork(){
      this.puzzlePopupVisibility = null;
    },
    selectedInventoryItemName(name) {
      //this.selectedInventoryItem = (this.$store.state.userData.inventory.item.name);
      //console.log(this.selectedInventoryItem);
      console.log(name);
      this.selectedInventoryItem = name;
    },
    enablePlayerMovement() {
      this.$refs.playerMove.focus();  
      console.log('done');    
    },
    getUserData() {
      this.currentLocationImg = this.playerLocation[this.$store.state.userData.level - 1].level[this.$store.state.userData.section - 1].img;
      this.gameItems = this.$store.state.gameItems.gameItems[this.$store.state.userData.level - 1];
      // NEXT STEP: for each item in this.$store.userData.inventory, filter currentLevelItems for item.id, if true then pop item from gameItems
    },
    leftMove(e){
      this.player.idle = "idle-left.gif";
      if(this.enteredOnObject && e.key === "ArrowLeft"){
        e.preventDefault();
      }
      else{
      setTimeout(() => {

        if (this.$store.state.userData.leftValue <= 1.5) {
          if (this.$store.state.userData.section > 1) {
            this.sectionChangeAnim();                      
          }
        };

        if (this.$store.state.userData.leftValue > 0) {
          this.$store.state.userData.leftValue -= 1.5;
        } else {
          if (this.$store.state.userData.section > 1) {
            this.$store.state.userData.leftValue = 1;
            this.sectionChange();
            this.$store.state.userData.section = this.$store.state.userData.section - 1;
            setTimeout(() => {
             this.$store.state.userData.leftValue = 84;
            }, 25);
          }
        }
        this.playerAvatar = this.player.left;
        this.itemInteract();
      }, 250);
      }
     
    },
    rightMove(e) {
      this.player.idle = "idle-right.gif";
      if(this.enteredOnObject && e.key === "ArrowRight") {
        e.preventDefault();
      }
      else{
      setTimeout(() => {
        if (this.$store.state.userData.leftValue >= 83.5) {
          if (this.$store.state.userData.section < 3) {
            this.sectionChangeAnim();                      
          }
        };
        if (this.$store.state.userData.leftValue <= 85) {
          this.$store.state.userData.leftValue += 1.5;
        } else {
          if (this.$store.state.userData.section < 3) {
            this.$store.state.userData.leftValue = 1;
            this.$store.state.userData.section = this.$store.state.userData.section + 1;
            setTimeout(() => {
            this.sectionChange();
             this.$store.state.userData.leftValue = 1;
            }, 250);
                        
          }
        }
        this.playerAvatar = this.player.right;
        this.itemInteract();

        this.playerAvatar = this.player.right;
        this.itemInteract();
      }, 250);
      }
    },
   
    reset() {
      setTimeout(() => {
      this.playerAvatar = this.player.idleRight;
      this.playerAvatar = this.player.idle;
      }, 250);
       this.itemInteract();
      },
    sectionChange() {
      setTimeout(() => {
        console.log(this.currentLocationImg);
        this.currentLocationImg = this.playerLocation[this.$store.state.userData.level - 1].level[this.$store.state.userData.section - 1].img;
        this.unhideItem();
      }, 300);
    },
    sectionChangeAnim() {
      var transOpaque = gsap.to(".game-container", {
       backgroundColor: "rgba(16, 1, 22, 1)",
       duration:0.2});
      var transClear = gsap.to(".game-container", {
       delay: .25, 
       backgroundColor: "rgba(16, 1, 22, 0)",
       ease: "power2.inOut"});
      transClear.play;
      transOpaque.play;

    },
    unhideItem() {
      document.querySelectorAll('.item').forEach(el => el.classList.add("hide"));

      document.querySelectorAll('.section' + this.$store.state.userData.section).forEach(el => el.classList.remove("hide"));

      //maybe :class="item.section" then select current section's class and remove

/*       
      const overworldItems = document.getElementsByClassName("item");
      for (let item of overworldItems) {
        if (this.$store.state.userData.section === item.id) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      } */
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
            setTimeout(() => {   
              this.openPuzzlePopup();  
            }, 10);
              if (this.$store.state.userData.currentItem.puzzleType === 1){ //technically not needed
                console.log('this is type 1');
              }
              else if (this.$store.state.userData.currentItem.puzzleType === 2){
                console.log('this is type 2');
              }
              else if (this.$store.state.userData.currentItem.puzzleType === 3){
                console.log('this is type 3');  
              }
          }
      }
    },
    addToInventory() {
      this.gameItems.splice(this.$store.state.userData.currentItem.id, 1);
      this.$store.state.userData.inventory.push(this.$store.state.userData.currentItem);
      this.closeItemPopup();
    },
    deleteFromInventory() {
      console.log(this.$store.state.userData.currentItem.id);
      this.$store.state.userData.inventory.splice(this.$store.state.userData.currentItem.id, 1);
      //this is not working :/
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
.puzzle-name {
  text-align: center;
  font-size: 3.5rem;
}
.puzzle-prompt {
  font-size: 2rem;
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
