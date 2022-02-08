<template>
<div class="gameContainer" v-on:keydown.right="rightMove();" v-on:keyup.left="resetLeft();" v-on:keyup.right="resetRight();" v-on:keydown.z="onEnter();">
  <div class="player" :style="cssProps"  tabindex="-1" ref="playerMove">    
    <img :src="require(`@/assets/sprites/${playerAvatar}`)" alt="" class="playerAvatar" >
  </div>
  <button class="resume-button" v-on:click="enablePlayerMovement" >resume</button>
  <button class="testingPuzzleClick" v-on:click="testingPopup">test</button>

  <img v-for="item in gameItems" :src="item.img" :style="{ left: item.margin, filter: item.filter }" :alt="item" :key="item.key">

  <PuzzlePopup ref="puzzlePopupBox" v-on:turn-off="turnOff" v-on:lose-heart="loseHeart"
:puzzleVisibility= "enteredOnObject" :puzzleAnswer="testPuzzleAnswer" ></PuzzlePopup>
<h1 class="hearts-counter">hearts: {{hearts }}</h1>
<h1 class="score-counter">score:{{score}}</h1>
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
      offset: null,
      currentItem: null,
      hearts:3, 
      score: 0,
      enteredOnObject: false,
      testPuzzleAnswer: "nika sucks", //tested puzzle answer value (working as a prop)
      gameItems: [
        {
          name: "riddler",
          id: "0",
          position: 10,
          margin: "10%",
          img: require("../assets/riddl.png"),
          isInteractable: false,
          prompt: "the riddler",
          filter: null,
          // isStorable
        }, 
        {
          name: "avatar",
          id: "0",
          position: 70,
          margin: "70%",
          img: require("../assets/prt.png"),
          isInteractable: false,
          prompt: "the vampire she tells you not to worry about",
          filter: null,
        }, 
      ],
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
      };
    },
  },
  methods: {
     moveListen: function() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          setTimeout(() => {
            if (this.leftValue > 0) {
           this.leftValue -= 1.5;
             };        
          this.playerAvatar = this.player.left;
          this.itemInteract();
          }, 250);      
        };
      })
    }, 
    rightMove: function(e) {
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
      },
     
      
    },
    resetLeft: function() {
      setTimeout(() => {
      this.playerAvatar = this.player.idleLeft;
      }, 250);
      this.itemInteract();

    },
      resetRight: function() {
      setTimeout(() => {
      this.playerAvatar = this.player.idleRight;
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
                    this.offset = offset;
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
                console.log('nice you are on target');
                this.enteredOnObject = true;  
               setTimeout(() => {   this.testingPopup();  }, 10);
 
            }
            else{
                console.log('u suck');
                this.enteredOnObject = false;
            };
        },
         turnOff() { 
            this.enteredOnObject = false;
            const currentScore = this.score + 100;
            this.score = currentScore;
            this.enablePlayerMovement();
        },
        loseHeart() {
            const heartsRemaining = this.hearts - 1;
           this.hearts = heartsRemaining;
            console.log(heartsRemaining);

        },
        disableMovement(key) {
        
          if(key.key === "ArrowRight" || key.key === "ArrowLeft") {
            console.log("test");
          }
          else{

          };

        }
  };


</script>

<style scoped>

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
