<template>
  <div class="game-container" @keydown.right="rightMove()" @keydown.left="leftMove()" @keyup="reset()" @keydown.z="onEnter()">
    <div class="player" :style="cssProps" tabindex="-1" ref="playerMove">    
      <img :src="require(`@/assets/sprites/${playerAvatar}`)" class="player-avatar" >
    </div>
    <img v-for="item in gameItems" :src="item.img" :style="{ left: item.margin, filter: item.filter, display: item.display }" :alt="item" :key="item.id">
    <div :class="{ AC: mainAnt }" v-show="txtbx" class="textbox">
            <p class="textbox-title"></p> 
            <p class="textbox-test typing-class"></p>
    </div>
        <button @click="onEnter()" class="textbox-button">Z</button>
        <PuzzlePopup ref="puzzlePopupBox" v-on:turn-off="turnOff" v-on:lose-heart="loseHeart"
        :puzzleAnswer="emittedPuzzleAnswer"
        :puzzleVisibility="enteredOnObject" 
        :puzzlePrompt ="emittedPuzzlePrompt"
        :puzzleType ="emittedPuzzleType"></PuzzlePopup>

  </div>      
</template>

<script>
 import PuzzlePopup from "@/components/PuzzlePopup.vue"; 
export default {
  name:"MoveTest",
  components:{
    PuzzlePopup,
  },
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
      currentItem: null,
      hearts:3, 
      score: 0,
      enteredOnObject: false,
      emittedPuzzleAnswer: "", 
      emittedPuzzlePrompt: "",
      emittedPuzzleType: null,
      gameItems: [
   
        {
          name: "Mushroom",
          id: 0,
          position: 40,
          margin: "40%",
          img: require("../assets/mushroom.png"),
          isInteractable: false,
          filter: null,
          itemType: "object", 
          prompt: "Do you want to pick up this amazing mushroom house?",
        },
        {
          name: "Riddler",
          id: 1,
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
          id: 2,
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
             {
          name: "Puzzle 1",
          id: 3, 
          position: 0,
          margin:"0%",
          img: require("../assets/door.png"),
          isInteractable: false,
          filter: null, 
          itemType: "puzzle",
          puzzleType: 1,
          prompt: "the answer is one",
          puzzleAnswer: "one",
        },
        {
            name: "Puzzle 2",
          id: 4, 
          position: 85,
          margin: "85%",
          img: require("../assets/chest.jpg"),
          isInteractable: false,
          filter: null, 
          itemType: "puzzle",
          puzzleType: 2,
          prompt: "the answer is 1234",
          puzzleAnswer: "1234",
        },
        {
          name: "Puzzle 3",
          id: 5, 
         // position: 85,
          //margin: "85%",
         // img: require("../assets/chest.jpg"),
          isInteractable: false,
          filter: null, 
          itemType: "puzzle",
          puzzleType: 3,
          prompt: "the answer is a key",
          puzzleAnswer: "key",
        },
      ],
      txtbx: false,
      textCount: 0,
      mainAnt: false,
    }
  },
  created() {
    this.moveListen()
   

  },
  mounted() {
    this.enablePlayerMovement();

  },
  computed: {
    cssProps() { 
      return {
        '--leftVar': (this.leftValue) + "%",
      }
    },
  },
  methods: {  
       moveListen: function() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          setTimeout(() => {
            if (this.leftValue > 0) {
           this.leftValue -= 0;
             };        
          this.itemInteract();
          }, 250);      
        };
      })
    }, 
    leftMove: function(e) {
      this.player.idle = "idle-left.gif";
      if(this.enteredOnObject && e.key === "ArrowLeft") {
        e.preventDefault();
      } else {
      setTimeout(() => {
            if (this.leftValue > 0) {
              this.leftValue -= 1.5;
            };  
              this.playerAvatar = this.player.left;
              this.itemInteract();
            }, 250);
            }
     
    },
    rightMove: function(e) {
      this.player.idle = "idle-right.gif";
      if(this.enteredOnObject && e.key === "ArrowRight") {
        e.preventDefault(); // i broke the site
      }
      else {
 setTimeout(() => {
      if (this.leftValue <= 85) {
        this.leftValue += 1.5;
      };  
        this.playerAvatar = this.player.right;
        this.itemInteract();
      }, 250);
      }
      
    },
  
    reset: function() {
      setTimeout(() => {
      this.playerAvatar = this.player.idleRight;
      this.playerAvatar = this.player.idle;
      }, 250);
       this.itemInteract();
      },
    enablePlayerMovement(){
      this.$refs.playerMove.focus(); 
     
    },
     testingPopup(){
         this.$refs.puzzlePopupBox.$el.focus();
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
      if (this.currentItem) {
        if (this.currentItem.itemType === "object") {   
          this.gameItems.splice(this.currentItem.id, 1);
          //show popup, see if user wants to pick up item         
          this.$store.state.inventory.push(this.currentItem);
        } else if (this.currentItem.itemType === "character") {              
          this.txtbxShow();
           
        }
        else if (this.currentItem.itemType === "puzzle") {        
          this.enteredOnObject = true;
          this.emittedPuzzleAnswer = this.currentItem.puzzleAnswer;
          this.emittedPuzzlePrompt = this.currentItem.prompt;
          this.emittedPuzzleType = this.currentItem.puzzleType;
          setTimeout(() => {   this.testingPopup();  
               }, 10);
          if(this.currentItem.puzzleType === 1){
            console.log('this is type 1');
            
          }
          else if(this.currentItem.puzzleType === 2){
            console.log('this is type 2');
           
          }
          else if(this.currentItem.puzzleType === 3){
            console.log('this is type 3');
            
          }

        }
      }
    }, 
         turnOff() { 
            this.enteredOnObject = false;
            //const currentScore = this.score + 100;
            //this.score = currentScore;
            this.enablePlayerMovement();
        },
        loseHeart() {
            const heartsRemaining = this.hearts - 1;
           this.hearts = heartsRemaining;
            console.log(heartsRemaining);
            this.$store.commit('decrementLives');
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

.game-container {
  position: relative;
  width: 80vw;
  height: 45vw;
  border: .3rem solid;
  overflow: hidden;
}
.player {
  width: inherit;
  height: inherit;
}

 .player-avatar {
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
 .textbox-button:active{
   color: #c8b0fa;
   background-color: #685194;

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
