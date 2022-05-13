<template>
<div class="popup-container"
tabindex="-1"
v-if ='puzzleVisibilityFunction()'
v-on:keyup.esc="closePuzzleClick"
v-on:keyup.enter="checkAnswerClick"


>
  <button v-on:click="closePuzzleClick" class="close-puzzle-button">x</button>
    <div class="promptAnsweredText" v-if="puzzlePromptAnswered">
        <h2>correct!</h2>
         <slot name="puzzle-correct-text"></slot>
    </div>
    <div class="questionPrompt" v-else>
        <slot name="puzzle-text"></slot>
        <slot name="puzzle-img"></slot>
        <input type="text" class="puzzle-answer"
        v-model="puzzleInput" :maxlength="puzzleInputMaxLength" :disabled="puzzleInputDisabled" v-show="puzzleInputVisibility">
        <div class="selected-item-div" v-show="selectedItemDiv" >
        <h2 >selected:{{inventoryItem}}</h2>  
        </div>
        <button v-on:click="checkAnswerClick" class="puzzle-submit-button" >enter</button>
        <button class="puzzleClearButton" @click="clearInputClick"> clear </button>
     <div class="keypad-button-div" v-for="value in puzzle2ButtonArray"  :key="value.id" v-show="puzzleButtonVisibility">
    
       <button @click="puzzle2ButtonClick(value.value)" class="puzzle-button" >{{value.value}}</button> 
       
    </div>
 

    </div>  
    
</div>
    
</template>

<script>

export default {
    name: "PuzzlePopup",
    emits: ["turn-off","reset-visibility", "refocus-on-puzzle", "delete-item", "next-level"],
  

props: {
    puzzleVisibility: Boolean, 
    puzzlePrompt: String,
    puzzleAnswer: String,
    puzzleType: Number,
    isPromptAnswered: Boolean,
    inventoryItem: String,
    isLevelTransitionPuzzle: Boolean,
    puzzle2ButtonArray: Array,
    },

    data() {
        return{ 
    puzzleInput: "" , 
    isDisabled: false,
    puzzleInputMaxLength: 10,
    puzzleButtonVisibility: false,
    puzzleInputDisabled: false,
    selectedItemDiv: false,
    puzzleInputVisibility: true,
    

    puzzlePromptAnswered: null,  //give each puzzle a string value 
    
    buttonValues: [],
 
        }
        },

 
    methods:
    {
        puzzleVisibilityFunction() {
            if(this.puzzleVisibility === true){  //this checks everytime, mad annoying and prevents the correct screen from displaying 
                this.puzzlePromptAnswered = this.isPromptAnswered;
                //console.log(this.puzzlePromptAnswered + " visibility boolean");   // can be deleted
                this.checkPuzzleType();
                //console.log(this.puzzleVisibility);   // can be deleted
                this.$emit('reset-visibility');
                return true;
            }
            else if(this.puzzleVisibility === null){
              // console.log(this.puzzleVisibility);    // can be deleted
               return true;
            }

            else{
                return false;
            }
        },
        closePuzzleClick(){
            this.$emit('turn-off'); 
            this.puzzleInput = "";       

        },
        checkAnswerClick(){             
            const puzzleAnswerInput = (this.puzzleInput.trim()).toLowerCase()
            console.log(puzzleAnswerInput);
            
            if(this.puzzleType === 3){
                if(this.inventoryItem === this.puzzleAnswer){
                    console.log("puzzle 3 answered correctly")
                    this.$store.state.userData.currentItem.puzzleCompleted = true;
                    this.puzzlePromptAnswered = true;
                     this.$emit('refocus-on-puzzle');
                     this.$emit('delete-item');
                     this.levelTransition();                  
                                         
                }
                 else {
                       this.loseHeart(); 
                }
            }
            else {
                if(puzzleAnswerInput === this.puzzleAnswer){                
                    this.puzzleInput = "";  
                    console.log("puzzle answered correctly")
                    this.$store.state.userData.currentItem.puzzleCompleted = true;
                    this.puzzlePromptAnswered = true;

                    this.$emit('refocus-on-puzzle');
                    this.levelTransition();
                }

                else {
                    console.log('taking away 1 heart');
                    this.loseHeart(); 
                    this.puzzleInput = "";  
                 }

             }
            
         
        },
        levelTransition(){
            if(this.isLevelTransitionPuzzle === true){
            console.log("door opened trying to go to next level");
            this.$emit('turn-off');
           this.$emit('next-level');
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
        checkPuzzleType(){        
            
            if(this.puzzleVisibility === true) {
                
                if(this.puzzleType === 1){
                    console.log('puzzle 1');
                    this.puzzleButtonVisibility = false;
                    this.puzzleInputDisabled = false;
                    this.selectedItemDiv = false;
                    this.puzzleInputVisibility= true;
                    //this.selectedInventoryItemVisibility = false;
                }
                else if(this.puzzleType === 2) {
                    console.log('puzzle 2');
                    
                    this.puzzleButtonVisibility = true;
                    this.puzzleInputDisabled = true;
                    this.selectedItemDiv = false;
                    this.puzzleInputVisibility= true;
                    this.puzzleInputMaxLength = 4; 
                    
                  
                }
                else if(this.puzzleType === 3) {
                    console.log('puzzle 3');
                    this.puzzleButtonVisibility = false;
                    this.puzzleInput = this.inventoryItem;
                    this.selectedItemDiv = true;
                    this.puzzleInputDisabled = true;
                    this.puzzleInputVisibility= false;
                    //this.selectedInventoryItemVisilibty = true;
                    
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

.puzzle-answer {
    margin: 0;
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
  button {
        background-color: var(--highlight-color);
    font-size: var(--h4);
    font-weight: 700;
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 1rem;
    color: var(--background-color);
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
