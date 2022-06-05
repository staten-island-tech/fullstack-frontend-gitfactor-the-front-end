<template>
  <div class="game-page" :key="$store.state.userData.level">
    
    <button @click="levelAdd" class="mobile-button">l+ratio</button>
    <button @click="levelMinus" class="mobile-button">l-1</button>

    <div class="level-and-hearts">      
      <div>
        <h2 v-if="$store.state.userData.level === 4">Roof</h2>
        <h2 v-else-if="$store.state.userData.level === 5">Epilogue</h2>
        <h2 v-else>Lv. {{ $store.state.userData.level }}</h2>
        <HeartBar />
      </div>
      <font-awesome-icon @click="openPause" class="pause-icon" icon="pause" />
    </div>
    
    <div class="game-and-inventory">
      <main class="game-contents" >
        <div class="audio-container">
          <audio id="audio-bgm" :src="require(`@/assets/audio/bgm/${currentOST}.mp3`)"></audio>
          <audio id="walk-sfx" :src="require(`@/assets/audio/sfx/walkstep.mp3`)"></audio>
        </div>

          
      <div class="main">
        <div :style="{ border: `.3rem solid var(--${$store.state.userData.currentItem.dialogue[textCount].color})` }" v-if="textbox" class="textbox">
          <img
            :src="require(`@/assets/sprites/${player.dialogueSprite}`)"
            :style="playerDialogueSprite"
            class="player-avatar-dialogue"
            id="player-dialogue-sprite"
            alt="A white-haired, red-eyed protagonist whom you play as."
          />
          <img
            :src="require(`@/assets/sprites/${$store.state.userData.currentItem.dialogueSprite}`)"
            :style="npcDialogueSprite"
            class="npc-avatar-dialogue"
            id="npc-dialogue-sprite"
            :alt="$store.state.userData.currentItem.spriteAlt"
          />
          <div class="text-button-icons" v-if="textbox && !isPauseOpen">
            <font-awesome-icon @click="textBack()" icon="caret-left" class="back-button" v-if="textCount > 0"/>
            <font-awesome-icon @click="onEnter()" class="back-button forward-button" icon="caret-right" />
          </div>
          <h2 :style="{ color: `var(--${$store.state.userData.currentItem.dialogue[textCount].color})` }" class="textbox-title">{{ $store.state.userData.currentItem.dialogue[textCount].name }}</h2>
          <p class="textbox-text typing-class">{{ $store.state.userData.currentItem.dialogue[textCount].text }}</p>
        </div>
        
        <EndGamePopup v-if="$store.state.userData.gameFinished"/>

            
        <EventPopup :eventText="eventMessage" @closeEventClick="closeEventPopup()" v-if="eventMessage" ref="eventPopupBox"/>
        
        <ItemPopup @itemAdded="addToInventory()" v-if="itemPopup" @closePopup="closeItemPopup()" :item="currentItem" 
        ref="itemPopupBox">
          <template v-slot:item-name>
            {{ $store.state.userData.currentItem.name }}
          </template>
          <template v-slot:item-img>
            <img class="itempopup-img" style="width: 12.5%" :src="require(`@/assets/${$store.state.userData.currentItem.img}`)" :alt="$store.state.userData.currentItem.prompt"/>
          </template>
          <template v-slot:item-text>
            {{ $store.state.userData.currentItem.prompt }}
          </template>
        </ItemPopup>

        <PuzzlePopup
          @turn-off="closePuzzlePopup()"
          @reset-visibility="puzzleVisibilityValueReset()"
          @refocus-on-puzzle="openPuzzlePopup()"
          @next-level="levelAdd()"
          @level-fail="$emit('gameEvent')"
          @foundHat="getUserData()"
          @puzzleInputWrong="alertWrongAnswer()"
          @puzzleItemChosen="puzzleResponse"
          :puzzleAnswer="emittedPuzzleAnswer"
          :puzzleVisibility="puzzlePopupVisibility"
          :isPromptAnswered="isPuzzleQuestionCompleted"
          :inventoryItem="selectedInventoryItem"
          :puzzleType="emittedPuzzleType"
          :isLevelTransitionPuzzle="isLevelTransitionPuzzleValue"
          :puzzle2ButtonArray="puzzle2ButtonChoices"
          ref="puzzlePopupBox"
        >
          <template v-slot:puzzle-name>
                {{ $store.state.userData.currentItem.name }}
          </template>
          <template v-slot:puzzle-text>
                {{ $store.state.userData.currentItem.prompt }}
          </template>
          <template v-slot:puzzle-img>
            <img :src="require(`@/assets/${$store.state.userData.currentItem.img}`)" class="puzzlepopup-img" style="width: 15%; position: unset; margin: 1rem;" :alt="$store.state.userData.currentItem.prompt" />
          </template>
          <template v-slot:puzzle-correct-text>
              {{ $store.state.userData.currentItem.puzzleAnsweredText }}
          </template>
        </PuzzlePopup>

      <PauseMenu @closePause="closePM()" @instruction="instructionHandler()"
       @setting="settingHandler()" @about="aboutHandler()" v-if="isPauseOpen" /> 
       <Instructions @closeInstruc="closeInstrucHandler()" v-if="instruction" /> 
       <Settings @closeSetting="closeSettingHandler()" v-if="setting" @emitVol="volumeChangeHandler" @emitVol2="SFXChange" />
       <AboutSection @closeAbout="closeAboutHandler()" v-if="about" />

        <div v-if="$store.state.userData.level === 2 && !$store.state.userData.isIntro" class="battery-meter">
          <h2>{{ $store.state.userData.battery }}%</h2>
          <div class="charge-container">
            <div class="charge" :style="{ width: batteryPercentage }"></div>
          </div>
        </div>
        <font-awesome-icon v-if="$store.state.userData.level === 2 && !$store.state.userData.isIntro" @click="flashlight()" class="flashlight-btn" icon="power-off"></font-awesome-icon>

        <div v-if="$store.state.userData.level === 4 && !$store.state.userData.isIntro" class="battery-meter">
          <h2>{{ $store.state.userData.roofTime }}s left</h2>
          <div class="charge-container">
            <div class="charge" :style="{ width: timePercentage }"></div>
          </div>
        </div>

        <div class="game-overlay">
          <div
            class="game-container"
            id="game-viewport"
            @keydown.right="rightMove()"
            @keydown.left="leftMove()"
            @keyup="reset()"
            @keyup.z="onEnter()"
        >
          <img
            :src="require(`@/assets/environment/lv1/${currentLocationImg}`)"
            class="bg-img"
          />
          <div class="player" :style="cssProps" tabindex="-1" ref="playerMove">
            <img
              :src="require(`@/assets/sprites/${playerAvatar}`)"
              class="player-avatar"
              alt="A white-haired, red-eyed protagonist whom you play as."
            />
          </div>

          <img
            v-for="item in gameItems"
            :src="require(`@/assets/${item.img}`)"
            :style="{ left: item.margin, width: item.width, bottom: item.bottom, filter: item.filter }"
            :alt="item.prompt ? item.prompt : item.spriteAlt"
            :key="item.key"
            :class="'section' + item.section"
            class="item hide"
          />
        </div>
      </div>
    </div>

    <div class="mobile-button-container">
      <button @mousedown="leftMove()" @mouseup="reset()" class="mobile-button">
        <font-awesome-icon icon="caret-left" />
      </button>
      <button @click="onEnter()" class="mobile-button">
        <font-awesome-icon icon="z" />
      </button>
      <button @mousedown="rightMove()" @mouseup="reset()" class="mobile-button">
        <font-awesome-icon icon="caret-right" />
      </button>
    </div>
  </main>
    
  <Inventory @clickedItem="selectInventoryItem" v-if="$store.state.userData.inventory[0]" @enablePlayerOnClick="enablePlayerMovement()" />

  </div>   

</div>
</template>

<script>
import { gsap } from "gsap";
gsap.config;

import HeartBar from "./HeartBar.vue";
import Inventory from "./Inventory.vue";
import ItemPopup from "./ItemPopup.vue";
import PauseMenu from "./PauseMenu.vue";
import Instructions from "./Instructions.vue";
import Settings from "./Settings.vue";
import AboutSection from './AboutSection.vue';
import PuzzlePopup from "./PuzzlePopup.vue";
import EventPopup from "./EventPopup.vue";
import EndGamePopup from "./EndGamePopup.vue";

import {
  levelOneIntro,
  levelTwoIntro,
  levelThreeIntro,
  winterDialogue,
  levelFail,
  levelFailedAgain,
} from "../dialogue";

export default {
  name: "MoveTest",
  components: {
    HeartBar,
    Inventory,
    ItemPopup,
    PauseMenu,
    Instructions,
    Settings,
    PuzzlePopup,
    EventPopup,
    EndGamePopup,
    AboutSection,
  },
  created() {
    this.getUserData();
  },
  mounted() {
    this.unhideItem();
    this.enablePlayerMovement();
    this.itemInteract();
    this.checkLevel();
    setTimeout(() => {
      this.$emit('doneLoading'); //shuts off loading screen
    }, 2000);
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
      locations: [
        {
          assets: [
            { id: 1, img: "bg_1_a.png", ost: "lv01" },
            { id: 2, img: "bg_1_b.png", ost: "lv01" },
            { id: 3, img: "bg_1_c.png", ost: "lv01" },
          ],
        },
        {
          assets: [
            { id: 1, img: "bg_2_a.png", ost: "lv02" },
            { id: 2, img: "bg_2_b.png", ost: "lv02" },
            { id: 3, img: "bg_2_c.png", ost: "lv02" },
          ],
        },
        {
          assets: [
            { id: 1, img: "bg_3_a.png", ost: "lv03" },
            { id: 2, img: "bg_3_b.png", ost: "lv03" },
            { id: 3, img: "bg_3_c.png", ost: "lv03" },
          ],
        },
        {
          assets: [
            { id: 1, img: "bg_4_a.png", ost: "lv04" },
            { id: 2, img: "bg_4_b.png", ost: "lv04" },
            { id: 3, img: "bg_4_c.png", ost: "lv04" },
          ],
        },
        {
          assets: [
            { id: 1, img: "bg_4_a.png", ost: "lv04" },
            { id: 2, img: "bg_4_b.png", ost: "lv04" },
            { id: 3, img: "bg_4_c.png", ost: "lv04" },
          ],
        },
      ],
      eventMessage: null,
      enteredOnObject: false,
      emittedPuzzleAnswer: "",
      isPuzzleQuestionCompleted: null,
      emittedPuzzleType: null,
      currentLocationImg: "",
      gameItems: null,
      currentOST: "lv01",
      itemPopup: false,
      textbox: false,
      playerDialogueSprite: null,
      npcDialogueSprite: null,
      textCount: -1,
      puzzlePopupVisibility: false,
      selectedInventoryItem: null,
      isLevelTransitionPuzzleValue: null,
      puzzle2ButtonChoices: null,
      isPauseOpen: false,
      instruction: false,
      setting: false,
      about: false,
      isFlashlightOn: false,
      fromSettings: "25",
      fromSettingsTwo: "",
    };
  },
  computed: {
    cssProps() {
      return {
        "--leftVar": this.$store.state.userData.leftValue + "%",
      };
    },
    batteryPercentage() {
      return this.$store.state.userData.battery + "%";
    },
    timePercentage() {
      return ((this.$store.state.userData.roofTime / 300) * 100) + "%";
    },
  },
  methods: {
    getUserData() {
      this.currentLocationImg =
        this.locations[this.$store.state.userData.level - 1].assets[
          this.$store.state.userData.section - 1
        ].img;
      this.gameItems =
        this.$store.state.gameItems.gameItems[
          this.$store.state.userData.level - 1
        ];
      this.$store.state.userData.inventory.forEach((inventoryItem) => {
        //removes items already in inventory from game items
        const duplicate = this.gameItems.findIndex(
          (gameItem) => gameItem.id === inventoryItem.id
        );
        this.gameItems.splice(duplicate, 1);
      });
      this.$store.state.userData.solvedPuzzles.forEach((solvedPuzzle) => {
        //marks previously solved puzzles as solved
        const solved = this.gameItems.findIndex(
          (gameItem) => gameItem.id === solvedPuzzle.id
        );
        this.gameItems[solved].isPuzzleCompleted = true;
      });
      this.currentOST =
        this.locations[this.$store.state.userData.level - 1].assets[
          this.$store.state.userData.section - 1
        ].ost;

      if (this.$store.state.userData.level === 3 && this.$store.state.userData.solvedPuzzles[0]) {
        console.log("found winter")
        this.$store.state.gameItems.gameItems[2].push({ //pushes to level 3 array
          name: "Ghost of Winter",
          id: 23,
          section: 2,
          position: 50,
          margin: "50%",
          widthInt: 20,
          width: "20%",
          bottom: "0%",
          img: "sprites/lv3_winter.png",
          isInteractable: false,
          filter: null,
          itemType: "character",
          dialogueSprite: "lv3_winter.png",
          dialogue: winterDialogue,
        });
      }
      this.unhideItem();
    },
    checkLevel() {
      const gameOverlay = document.querySelector(".game-overlay");

      if (
        this.$store.state.userData.lifeCount === 0 &&
        this.$store.state.userData.failedLevel === false
      ) {
        this.$store.state.userData.lifeCount = 3;
        this.$store.state.userData.failedLevel = true;
        this.playAudio();
        this.eventMessage = "You hear a transmission over the intercom.";
        setTimeout(() => {
          this.openEventPopup();
        }, 10);
        this.enteredOnObject = true;
        this.gameItems.unshift({
          intro: true,
          name: "Riddler",
          id: -1,
          section: 2,
          position: 45,
          margin: "45%",
          widthInt: 20,
          width: "20%",
          bottom: "5%",
          img: "sprites/sprite_dialogue_spookyriddl.png",
          isInteractable: false,
          filter: null,
          itemType: "character",
          dialogueSprite: "sprite_dialogue_spookyriddl.png",
          spriteAlt: "The dark silhouette of a spooky, mischievous character.",
          dialogue: levelFail,
        });
        this.itemInteract();
        this.onEnter();
      } else if (
        this.$store.state.userData.lifeCount === 0 &&
        this.$store.state.userData.failedLevel === true
      ) {
        this.$store.state.userData.lifeCount = 3;
        this.playAudio();
        this.eventMessage = "You hear a transmission over the intercom.";
        setTimeout(() => {
          this.openEventPopup();
        }, 10);
        this.enteredOnObject = true;
        this.gameItems.unshift({
          intro: true,
          name: "Riddler",
          id: -1,
          section: 2,
          position: 45,
          margin: "45%",
          widthInt: 20,
          width: "20%",
          bottom: "5%",
          img: "sprites/sprite_dialogue_spookyriddl.png",
          isInteractable: false,
          filter: null,
          itemType: "character",
          dialogueSprite: "sprite_dialogue_spookyriddl.png",
          spriteAlt: "The dark silhouette of a spooky, mischievous character.",
          dialogue: levelFailedAgain,
        });
        this.itemInteract();
        this.onEnter();
      } 
      if (this.$store.state.userData.level === 1) {
        console.log("level 1");
        if (this.$store.state.userData.isIntro) {
          setTimeout(() => {
            document.querySelector(".main").classList.add("game-intro");
          }, 0);
          this.enteredOnObject = true;
          setTimeout(() => {
            this.playAudio();
            this.eventMessage =
              "You hear a broken transmission over an intercom.";
            setTimeout(() => {
              this.openEventPopup();
            }, 10);
            this.gameItems.unshift({
              intro: true,
              name: "Riddler",
              id: -1,
              section: 2,
              position: 45,
              margin: "45%",
              widthInt: 20,
              width: "20%",
              bottom: "5%",
              img: "sprites/sprite_dialogue_spookyriddl.png",
              isInteractable: false,
              filter: null,
              itemType: "character",
              dialogueSprite: "sprite_dialogue_spookyriddl.png",
              spriteAlt: "The dark silhouette of a spooky, mischievous character.",
              dialogue: levelOneIntro,
            });
            this.itemInteract();
            this.onEnter();
          }, 7000);
        } else {
          setTimeout(() => {
            document.querySelector(".main").classList.add("game-start");
          }, 0);
          this.playAudio();
        }
      }
      if (this.$store.state.userData.level === 2) {
        console.log("level 2");
        if (this.$store.state.userData.isIntro) {
          this.playAudio();
          this.enteredOnObject = true;
          this.eventMessage = "You hear a transmission over an intercom.";
          setTimeout(() => {
            this.openEventPopup();
          }, 10);
          this.gameItems.unshift({
            intro: true,
            name: "Riddler",
            id: -1,
            section: 2,
            position: 45,
            margin: "45%",
            widthInt: 20,
            width: "20%",
            bottom: "5%",
            img: "sprites/sprite_dialogue_spookyriddl.png",
            isInteractable: false,
            filter: null,
            itemType: "character",
            dialogueSprite: "sprite_dialogue_spookyriddl.png",
            spriteAlt: "The dark silhouette of a spooky, mischievous character.",
            dialogue: levelTwoIntro,
          });
          this.itemInteract();
          this.onEnter();
        } else {
          setTimeout(() => {
            document.querySelector(".main").classList.add("game-start");
            document.querySelector(".game-overlay").classList.add("dark");
          }, 0);
          this.playAudio();
        }
      }
      if (this.$store.state.userData.level === 3) {
        console.log("level 3");
        if (this.$store.state.userData.isIntro) {
          setTimeout(() => {
            document.querySelector(".main").classList.add("game-intro");
          }, 0);
          this.playAudio();
          this.enteredOnObject = true;
          this.eventMessage =
            "You hear a faint, garbled transmission over an intercom.";
          setTimeout(() => {
            this.openEventPopup();
          }, 10);
          this.gameItems.unshift({
            intro: true,
            name: "Riddler",
            id: -1,
            section: 2,
            position: 45,
            margin: "45%",
            widthInt: 20,
            width: "20%",
            bottom: "5%",
            img: "sprites/sprite_dialogue_spookyriddl.png",
            isInteractable: false,
            filter: null,
            itemType: "character",
            dialogueSprite: "sprite_dialogue_spookyriddl.png",
            spriteAlt: "The dark silhouette of a spooky, mischievous character.",
            dialogue: levelThreeIntro,
          });
          this.itemInteract();
          this.onEnter();
        }
        document.querySelector(".main").classList.add("game-start");
        gameOverlay.classList.add("fog");
        this.playAudio();
      }

      if (this.$store.state.userData.level === 4) {
        console.log("level 4");
        if (this.$store.state.userData.isIntro) {
          setTimeout(() => {
            document.querySelector(".main").classList.add("game-start");
          }, 0);
          this.playAudio();
          this.enteredOnObject = true;
          this.eventMessage =
            "No transmission this time. You hear a familiar voice very clearly.";
          setTimeout(() => {
            this.openEventPopup();
          }, 10);
          this.itemInteract();
          this.onEnter();
        } else {
          this.roofTime();
        }
        this.playAudio();
      }
      
      if (this.$store.state.userData.level === 5) {
        console.log("level 5");
        this.itemInteract();
        this.onEnter();
        this.playAudio();
      }
    },
    enablePlayerMovement() {
      this.$refs.playerMove.focus();
    },
    leftMove(e) {
      this.player.idle = "idle-left.gif";
      if (this.enteredOnObject && e.key === "ArrowLeft") {
        e.preventDefault();
      } else {
        this.playAudio();
        this.playWalkSfx();
        setTimeout(() => {
          if (this.$store.state.userData.leftValue > 0) {
            this.$store.state.userData.leftValue -= 1.5;
          } else {
            if (this.$store.state.userData.section > 1) {
              this.sectionChangeAnim();
              this.$store.state.userData.section =
                this.$store.state.userData.section - 1;
            }
          }
          this.playerAvatar = this.player.left;
          this.itemInteract();
        }, 150);
      }
    },
    rightMove(e) {
      this.player.idle = "idle-right.gif";
      if (this.enteredOnObject && e.key === "ArrowRight") {
        e.preventDefault();
      } else {
        this.playAudio();
        this.playWalkSfx();
        setTimeout(() => {
          if (this.$store.state.userData.leftValue < 85) {
            this.$store.state.userData.leftValue += 1.5;
          }
          if (
            this.$store.state.userData.section < 3 &&
            this.$store.state.userData.leftValue > 83
          ) {
            this.sectionChangeAnim();
            this.$store.state.userData.section =
              this.$store.state.userData.section + 1;
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
        } else {
          this.$store.state.userData.leftValue = 80;
        }
      }, 10);

      setTimeout(() => {
        this.currentLocationImg =
          this.locations[this.$store.state.userData.level - 1].assets[
            this.$store.state.userData.section - 1
          ].img;
        this.currentOST =
          this.locations[this.$store.state.userData.level - 1].assets[
            this.$store.state.userData.section - 1
          ].ost;
        this.unhideItem();
        this.playAudio();
      }, 300);
    },
    sectionChangeAnim() {
      var transition = gsap.fromTo(
        ".game-container",
        {
          backgroundColor: "rgba(16, 1, 22, 1)",
          duration: 0.1,
        },
        {
          delay: 0.2,
          duration: 0.3,
          backgroundColor: "rgba(16, 1, 22, 0)",
          ease: "power2.inOut",
        }
      );
      transition.play;
      this.sectionChange();
    },
    playAudio() {
      const audio = document.getElementById("audio-bgm");
      audio.volume = this.fromSettings / 100;
      setTimeout(() => {
        audio.play();
        audio.loop = true;
      }, 200);
      this.itemInteract();
    },
    playWalkSfx() {
      const audio = document.getElementById("walk-sfx");
      audio.loop = true;
      audio.play();
    },
    stopWalkSfx() {
      const audio = document.getElementById("walk-sfx");
      audio.pause();
      audio.currentTime = 60;
    },
    itemInteract() {
      this.$store.state.userData.currentItem = null;
      this.gameItems.forEach((item) => {
        const itemLeft = item.position;
        const itemRight = item.position + item.widthInt;
        if (
          //checks if avatar is in range of item
          item.section === this.$store.state.userData.section &&
          this.$store.state.userData.leftValue + 8 >= itemLeft &&
          this.$store.state.userData.leftValue + 10 <= itemRight
        ) {
          item.isInteractable = true;
          this.$store.state.userData.currentItem = item;
          item.filter = "brightness(55%)";
        } else {
          item.isInteractable = false;
          item.filter = null;
        }
      });
    },
    unhideItem() {
      document
        .querySelectorAll(".item")
        .forEach((el) => el.classList.add("hide"));
      document
        .querySelectorAll(".section" + this.$store.state.userData.section)
        .forEach((el) => el.classList.remove("hide"));
    },
    onEnter() {
      if (this.$store.state.userData.currentItem) {
        this.enteredOnObject = true;
        if (this.$store.state.userData.currentItem.itemType === "object") {
          this.itemPopup = true;
          setTimeout(() => {
            this.openItemPopup();
          }, 10);
        } else if (
          this.$store.state.userData.currentItem.itemType === "character"
        ) {
          this.textboxShow();
        } else if (
          this.$store.state.userData.currentItem.itemType === "puzzle"
        ) {
          this.puzzlePopupVisibility = true;
          this.emittedPuzzleAnswer =
            this.$store.state.userData.currentItem.puzzleAnswer;
          this.emittedPuzzleType =
            this.$store.state.userData.currentItem.puzzleType;
          this.isPuzzleQuestionCompleted =
            this.$store.state.userData.currentItem.isPuzzleCompleted;
          this.isLevelTransitionPuzzleValue =
            this.$store.state.userData.currentItem.isLevelTransitionPuzzle;
          this.puzzle2ButtonChoices =
            this.$store.state.userData.currentItem.buttonChoices;
          setTimeout(() => {
            this.openPuzzlePopup();
          }, 10);
        }
      }
    setTimeout(() => {
      this.unhideItem();
    }, 0);
    },
    selectInventoryItem(item) {
      this.eventMessage = `You have selected ${item.name}. Its description goes as such: "${item.prompt}"`;
      setTimeout(() => {
        this.openEventPopup();
      }, 10);
      this.selectedInventoryItem = item;
    },
    addToInventory() {
      const selectedItem = this.gameItems.findIndex(
        (item) => item.id === this.$store.state.userData.currentItem.id
      );
      this.$store.state.userData.inventory.push(
        this.$store.state.userData.currentItem
      );
      this.gameItems.splice(selectedItem, 1);

      this.closeItemPopup();
      setTimeout(() => {
        this.unhideItem();
      }, 0);
    },
    puzzleVisibilityValueReset() {
      this.puzzlePopupVisibility = null;
    },
    openPuzzlePopup() {
      this.$refs.puzzlePopupBox.$el.focus();
    },
    closePuzzlePopup() {
      this.enteredOnObject = false;
      this.puzzlePopupVisibility = false;
      this.enablePlayerMovement();
      if(this.$store.state.userData.level === 3 && this.$store.state.userData.solvedPuzzles[0]) {
        this.eventMessage = "Brrrrrr... What was that freezing cold current just now?";
        setTimeout(() => {
          this.openEventPopup();
        }, 10);
        setTimeout(() => {
          document.querySelector(".main").classList.add("winter");
        }, 0);
      }
    },
    alertWrongAnswer() {
      this.eventMessage = "Oh no... That wasn't correct. Now I lost a soul point.";
      setTimeout(() => {
        this.openEventPopup();
      }, 10);
    },
    puzzleResponse(message) {
      console.log(message)
      this.eventMessage = message;
      setTimeout(() => {
        this.openEventPopup();
      }, 10);
    },
    openItemPopup() {
      this.$refs.itemPopupBox.$el.focus();
    },
    closeItemPopup() {
      this.itemPopup = false;
      this.enteredOnObject = false;
      this.enablePlayerMovement();
    },
    openEventPopup() {
      this.$refs.eventPopupBox.$el.focus();
    },
    closeEventPopup() {
      this.eventMessage = null;
      this.enablePlayerMovement();
       if (this.$store.state.userData.level === 3 && document.querySelector(".main").classList.contains("winter")) {
         document.querySelector(".main").classList.remove("winter");
       }
    },
    textboxShow() {
      this.textbox = true;
      this.textCount += 1;
      this.playAudio();

      if (
        this.textCount < this.$store.state.userData.currentItem.dialogue.length
      ) {
        document.querySelector(".bg-img").style.filter = "brightness(0.5)";
        document.querySelector(".player-avatar").style.display = "none";
        const items = document.querySelectorAll(".item");
        Array.from(items).forEach((item) => {
          item.style.visibility = "hidden";
        });
        if (
          this.$store.state.userData.currentItem.dialogue[this.textCount]
            .name === "???"
        ) {
          this.playerDialogueSprite = "filter: brightness(.5)";
          this.npcDialogueSprite = "filter: brightness(0.2)";
        } else if (
          this.$store.state.userData.currentItem.dialogue[this.textCount]
            .name !== "Me"
        ) {
          this.playerDialogueSprite = "filter: brightness(.5)";
          this.npcDialogueSprite = "none";
        } else if (
          this.$store.state.userData.currentItem.dialogue[this.textCount]
            .name === "Me" &&
          this.$store.state.userData.currentItem.dialogue[0].name === "???"
        ) {
          this.playerDialogueSprite = "none";
          this.npcDialogueSprite = "filter: brightness(.05)";
        } else if (
          this.$store.state.userData.currentItem.dialogue[this.textCount]
            .name === "Me"
        ) {
          this.playerDialogueSprite = "none";
          this.npcDialogueSprite = "filter: brightness(.5)";
        }
      } else {
        document.querySelector(".bg-img").style.filter = "brightness(1)";
        document.querySelector(".player-avatar").style.display = "block";
        const items = document.querySelectorAll(".item");
        Array.from(items).forEach((item) => {
          item.style.visibility = "visible";
        });
        if (this.gameItems[0].intro) {
          console.log(this.gameItems[0].intro);
          this.gameItems.splice(0, 1);
        }
        if (this.$store.state.userData.level === 2) {
          document.querySelector(".game-overlay").classList.add("dark");
        }
        if (this.$store.state.userData.level === 4) {
          this.roofTime();
        }
        if (this.$store.state.userData.level === 5) {
          this.$store.state.userData.gameFinished = true;
          console.log("victory")
        }
        this.textbox = false;
        this.enteredOnObject = false;
        this.textCount = -1;
        this.$store.state.userData.isIntro = false;
      }
    },
    textBack(){
       this.textCount = (this.textCount - 1);
    },
    levelAdd() {
      this.$store.commit("incrementLevel");
      console.log(this.$store.state.userData.level);
      //reset vuex state
      this.$store.state.userData.section = 2;
      this.$store.state.userData.leftValue = 45;
      this.$store.state.userData.lifeCount = 3;
      this.$store.state.userData.currentItem = null;
      this.$store.state.userData.inventory = [];
      this.$store.state.userData.battery = 100;
      this.$store.state.userData.isIntro = true;
      this.$store.state.userData.solvedPuzzles = [];
      this.$store.state.userData.roofTime = 300;

      this.$emit("gameEvent");
      this.unhideItem();
    },
    levelMinus() {
      this.$store.commit("decrementLevel");
      console.log(this.$store.state.userData.level);

      this.$store.state.userData.section = 2;
      this.$store.state.userData.leftValue = 45;
      this.$store.state.userData.lifeCount = 3;
      this.$store.state.userData.currentItem = null;
      this.$store.state.userData.inventory = [];
      this.$store.state.userData.isIntro = true;
      this.$store.state.userData.battery = 100;
      this.$store.state.userData.solvedPuzzles = [];
      this.$store.state.userData.roofTime = 300;

      this.$emit("gameEvent");
      this.unhideItem();
    },
    flashlight() {
      if (!this.isFlashlightOn) {
        this.isFlashlightOn = true;
        document.querySelector(".game-overlay").style.filter = "brightness(1)";
        const intervalId = setInterval(() => {
          if (this.isFlashlightOn) {
            if (this.$store.state.userData.battery === 0) {
              clearInterval(intervalId);
              this.isFlashlightOn = false;
              document.querySelector(".game-overlay").style.filter =
                "brightness(.1)";
            } else {
              this.$store.state.userData.battery--;
            }
          }
        }, 2000);
        this.enablePlayerMovement();
      } else {
        this.isFlashlightOn = false;
        document.querySelector(".game-overlay").style.filter = "brightness(.1)";
        this.enablePlayerMovement();
      }
    },
    roofTime() {
      const intervalId = setInterval(() => {
        if (this.$store.state.userData.roofTime === 0) {
          clearInterval(intervalId);
          this.$store.state.userData.lifeCount = 3;
          this.$store.state.userData.section = 2;
          this.$store.state.userData.leftValue = 45;
          this.$store.state.userData.currentItem = null;
          this.$store.state.userData.inventory = [];
          this.$store.state.userData.battery = 100;
          this.$store.state.userData.solvedPuzzles = [];
          this.$store.state.userData.roofTime = 300;
        this.$emit('gameEvent');
        } else {
          this.$store.state.userData.roofTime--;
        }
    }, 2000);
    },
    openPause() {
      if (
        this.$store.state.userData.level === 2 &&
        !this.$store.state.userData.isIntro
      ) {
        this.isFlashlightOn = false;
        document.querySelector(".game-overlay").style.filter = "brightness(.1)";
      }
      this.isPauseOpen = true;
    },
    closePM() {
      this.isPauseOpen = false;
      this.enablePlayerMovement();
    },
    instructionHandler() {
      this.instruction = true;
    },
    closeInstrucHandler() {
      this.instruction = false;
    },
    settingHandler() {
      this.setting = true;
    },
    closeSettingHandler() {
      this.setting = false;
    },
    aboutHandler() {
      this.about = true;
    },
    closeAboutHandler() {
      this.about = false;
    },
    volumeChangeHandler(value) {
      this.fromSettings = value;
      const audio = document.getElementById("audio-bgm");
      audio.volume = this.fromSettings / 100;
    },
    SFXChange(value) {
      this.fromSettingsTwo = value;
      const audioSFX = document.getElementById("walk-sfx");
      audioSFX.volume = this.fromSettingsTwo / 100;
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
/* DO NOT DELETE THIS */
img {
  position: absolute;
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
.main {
  overflow: hidden;
  border-radius: 1.5rem;
  position: relative;
}
.game-overlay {
  overflow: hidden;
  border-radius: 1.5rem;
}
.game-intro {
  animation: awaken 8s forwards;
}
@keyframes awaken {
  0% {
    filter: brightness(0);
  }
  20% {
    filter: brightness(0);
  }
  40% {
    filter: brightness(0.6);
  }
  50% {
    filter: brightness(0.3);
  }
  60% {
    filter: brightness(0.6);
  }
  80% {
    filter: brightness(1);
  }
}
.game-start {
  animation: fadeIn 3s forwards;
}
@keyframes fadeIn {
  0% {
    filter: brightness(0);
  }
  20% {
    filter: brightness(0);
  }
  100% {
    filter: brightness(1);
  }
}

.game-container {
  overflow: hidden;
  position: relative;
  width: 66vw;
  height: 33vw;
  border: 0.3rem solid;
  border-radius: 1.5rem;
  transition: all 0.2s;
}
.level-and-hearts {
  width: 66vw;
  display: flex;
  justify-content: space-between;
}
.level-and-hearts h2 {
  font-size: var(--h3);
  margin-bottom: 0.5rem;
}
.pause-icon {
  font-size: var(--h2);
  color: var(--highlight-color);
  margin-top: 2rem;
}
.pause-container {
  width: 100%;
  text-align: right;
}
.player {
  width: inherit;
  height: inherit;
}
.player-avatar {
  width: 20%;
  z-index: -2;
  display: flex;
  position: absolute;
  bottom: 6%;
  left: var(--leftVar);
}

.item {
  z-index: -3;
}

.player-avatar-dialogue {
  width: 70%;
  right: -15%;
  bottom: -45vw;
  z-index: -1;
}
.npc-avatar-dialogue {
  width: 70%;
  left: -15%;
  bottom: -45vw;
  z-index: -1;
}

.hide {
  display: none;
}
.mobile-button-container {
  margin-top: 2.5rem; /*vue touch events */
}
.mobile-button {
  font-size: 4rem;
  background-color: #766696;
  color: var(--highlight-color);
  border-radius: 50%;
  border: var(--highlight-color) solid 0.3rem;
  height: 7.5rem;
  width: 7.5rem;
  margin: 1rem;
}
.mobile-button svg {
  font-size: var(--h2);
}
.textbox {
  border: #a60bbb 1rem solid;
  background-color: #0e0b2b;
  width: 100%;
  min-height: 15%;
  position: absolute;
  bottom: 0;
  background-color: #0e0b2b;
  width: 100%;
  min-height: 30%;
  padding: 2rem;
  padding-top: 1rem;
  /* accounts for back button height */
  padding-bottom: 4.5rem; 
  border-radius: 1.5rem;
}
.textbox-text,
.textbox-title {
  color: #f4ebff;
  font-size: var(--h4);
  text-align: left;
  margin-top: 0.5rem;
}
.textbox-title {
  font-size: 2.5rem;
}
.textbox-text {
  line-height: 1.4;
}
.bg-img {
  width: 130%;
  z-index: -5;
  position: absolute;
  bottom: 0;
  left: -20%;
}
.text-button-icons {
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
}
.back-button {
  width: 2rem;
  height: 1.5rem;
  margin: .5rem;
  padding: 1rem;
  background-color: var(--highlight-color);
  color: #000;
  border: #000 0.05rem solid;
  border-radius: 0.7rem;
}
.item-popup img {
  position: unset;
  margin-bottom: 3rem;
}
.flashlight-btn {
  position: absolute;
  top: 10%;
  left: calc(5% + 17rem);
  font-size: var(--h3);
  padding: 0.75rem;
  color: var(--purple);
  background-color: #fff200;
  border-radius: 5rem;
  z-index: 1;
}
.battery-meter {
  position: absolute;
  top: 7%;
  left: 5%;
  margin-bottom: 1rem;
  z-index: 2;
}
.charge-container {
  overflow: hidden;
  width: 15rem;
  background-color: var(--purple);
  margin-top: 0.5rem;
  border-radius: 0.5rem;
}
.charge {
  background-color: #fff200;
  height: 2.5rem;
}
.dark {
  filter: brightness(0.1);
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
  background-size: contain;
  animation: fogFade 20s ease-in-out infinite;
}

@keyframes fogFade {
  0% {
    opacity: 10%;
  }
  20% {
    opacity: 50%;
  }
  30% {
    opacity: 60%;
  }
  40% {
    opacity: 75%;
  }
  50% {
    opacity: 80%;
  }
  60% {
    opacity: 30%;
  }
  70% {
    opacity: 50%;
  }
  100% {
    opacity: 10%;
  }
}
.winter {
  animation: winterChill 5s ease-in-out infinite;
}
@keyframes winterChill {
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(2);
  }
  100% {
    filter: brightness(1);
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
  .level-and-hearts {
    width: 80vw;
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
