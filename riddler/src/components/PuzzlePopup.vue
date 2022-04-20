<template>
<div class="popup-container"
tabindex="-1"

v-on:keyup.esc="closePuzzleClick"
v-on:keyup.enter="checkAnswerClick"

>
  <button v-on:click="closePuzzleClick" class="close-puzzle-button">x</button>
    <!-- <h1 class="puzzleQuestionLine">{{puzzlePrompt}}</h1> -->
  <slot name="puzzle-text"></slot>

  <button class="puzzle-btn puzzleClearButton" @click="clearInputClick">Clear</button>
  <input type="text" class="puzzle-answer"
  v-model="puzzleInput" :maxlength="puzzleInputMaxLength" :disabled="puzzleInputDisabled" placeholder="Answer the riddle">
  <button @click="checkAnswerClick" class="puzzle-btn puzzle-submit-button">Enter</button>
  <div class="keypad-button-div" v-for="value in buttonValues" :key="value.id" v-show= "puzzleButtonVisibility">
    <button @click="puzzle2ButtonClick(value.value)" class="puzzle-btn puzzle-button">
      {{value.value}}
    </button> 
  </div>
</div>
    
</template>

<script>

export default {
    name: "PuzzlePopup",
    emits: ["turn-off", ],

    props: {
    puzzleVisibility: Boolean, 
    puzzlePrompt: String,
    puzzleAnswer: String,
    puzzleType: Number,
    },

    data() {
        return{
    puzzleInput: "" , 
    isDisabled: false,
    puzzleInputMaxLength: 10,
    puzzleButtonVisibility: false,
    puzzleInputDisabled: false,
    
    buttonValues: [
        {value: "1", id: 1},
        {value: "2", id: 2},
        {value: "3", id: 3},
        {value: "4", id:4},
    ],

 
        }
        },
        updated() {
            //this.checkPuzzle();
        },

    methods:
    {
     closePuzzleClick(){
            this.$emit('turn-off'); 
            this.puzzleInput = ""; 
                    

        },
        checkAnswerClick(){
            if(this.puzzleInput === this.puzzleAnswer){
                console.log('correct!');
                this.$emit('turn-off'); 
                this.puzzleInput = "";  
                

            }
            else{
                console.log('taking away 1 heart');
                this.loseHeart(); 
                this.puzzleInput = "";  

            }
        },
          loseHeart() { // move to component 
        this.$store.commit('decrementLives');
        },
        puzzle2ButtonClick(value){
            const testValue = this.puzzleInput + value ;
            this.puzzleInput = testValue;
           
            if(this.puzzleInput.length > this.puzzleInputMaxLength){
                this.puzzleInput = this.puzzleInput.slice(0, this.puzzleInputMaxLength);
                
            }
            },
            clearInputClick() { 
                console.log('trying to clear');
                this.puzzleInput = "";
            },
        checkPuzzle(){            
            if(this.puzzleVisibility === true) {
                
                if(this.puzzleType === 1){
                    console.log('puzzle 1');
                    this.puzzleButtonVisibility = false;
                    this.puzzleInputDisabled = false;
                }
                else if(this.puzzleType === 2) {
                    console.log('puzzle 2');
                    this.puzzleButtonVisibility = true;
                    this.puzzleInputDisabled = true;
                    this.puzzleInputMaxLength = 4;
                    console.log(this.puzzleInputMaxLength);
                }
                else if(this.puzzleType === 3) {
                    console.log('puzzle 3');
                }
            }
        
        },

    },

}
</script>

<style scoped>
@import "../assets/global.css";

  .popup-container {
    position: absolute;
    top: 0;
    text-align: center;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    padding: 5rem;
    margin: 2rem;
    border-radius: 1.5rem;
    border: solid var(--highlight-color) .3rem;
    background-color: var(--background-color);
    z-index: 1;
    overflow: scroll;
  }
  .close-puzzle-button {
    font-size: var(--h4);
    position: absolute;
    top: 2rem;
    right: 2rem;
    border: none;
    background-color: unset;
    color: var(--highlight-color);
  }
.invisible {
    display:none;
}

.puzzleQuestionLine {
    font-size: 2rem;
}
.puzzle-btn, input {
    font-size: var(--h4);
    font-weight: 700;
    padding: .6rem 1.2rem;
    border: none;
    border-radius: .5rem;
    margin-top: 5rem;
}
  input {
    margin: 5rem 1rem;
    width: 25rem;
  }
  .puzzle-btn {
    background-color: var(--highlight-color);
    color: var(--background-color);
  }
  .puzzleClearButton {
    background-color: #f9e3e3;
    color: #ad2020;
  }
</style>
