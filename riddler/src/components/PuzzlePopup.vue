<template>
<div class="popup-container"
tabindex="-1"
v-if ='puzzleVisibility'
v-on:keyup.esc="closePuzzleClick"
v-on:keyup.enter="checkAnswerClick"


>
<button v-on:click="closePuzzleClick" class="close-puzzle-button">x</button>
    <!-- <h1 class="puzzleQuestionLine">{{puzzlePrompt}}</h1> -->
    <div class="promptAnsweredText" v-if="puzzlePromptAnswered">
        <h2>correct!</h2>
         <slot name="puzzle-correct-text"></slot>
    </div>
    <div class="questionPrompt" v-else>
        <slot name="puzzle-text"></slot>
    <input type="text" class="puzzle-answer"
    v-model="puzzleInput" :maxlength="puzzleInputMaxLength" :disabled="puzzleInputDisabled">
    <button v-on:click="checkAnswerClick" class="puzzle-submit-button" >enter</button>
     <button class="puzzleClearButton" @click="clearInputClick"> clear </button>
    <div class="keypad-button-div" v-for="value in buttonValues" :key="value.id" v-show= "puzzleButtonVisibility">
        
       <button @click="puzzle2ButtonClick(value.value)" class="puzzle-button" >{{value.value}}</button> 
       
    </div>
    <div class="selected-item-div">
        <h2 >selected:{{inventoryItem}}</h2>  <!-- v-show="selectedInventoryItemVisilibty" -->
    </div>

    </div>  
    
</div>
    
</template>

<script>

export default {
    name: "PuzzlePopup",
    emits: ["turn-off", ],
  
  updated()  {
            
            console.log("updated!");
        },
     props: {
    puzzleVisibility: Boolean, 
    puzzlePrompt: String,
    puzzleAnswer: String,
    puzzleType: Number,
    promptAnswered: Boolean,
    inventoryItem: String,
    },

    data() {
        return{  //to do: section change string, answered value "working", and puzzle 3 (halfway there)
    puzzleInput: "" , 
    isDisabled: false,
    puzzleInputMaxLength: 10,
    puzzleButtonVisibility: false,
    puzzleInputDisabled: false,
    //selectedInventoryItemVisilibty = false,

    puzzlePromptAnswered: null,  //give each puzzle a string value 
    
    buttonValues: [
        {value: "1", id: 1},
        {value: "2", id: 2},
        {value: "3", id: 3},
        {value: "4", id:4},
    ],
 
        }
        },
    methods:
    {
     closePuzzleClick(){
            this.$emit('turn-off'); 
            this.puzzleInput = "";       

        },
        checkAnswerClick(){         //add door custom function where it sends you to next level     
            const puzzleAnswerInput = (this.puzzleInput.trim()).toLowerCase()
            console.log(puzzleAnswerInput);
            
            if(puzzleAnswerInput === this.puzzleAnswer){
                
                this.puzzleInput = "";  
                console.log("puzzle answered correctly")
                //this.$store.state.userData.currentItem.puzzleAnswer = true;
                // this.puzzlePromptAnswered = true;
                // console.log( "2" + this.puzzlePromptAnswered);

                //check if puzzle 3, then make the selected item gone
                    // in order to do so find teh id of the thing and then use splice to delete from gameItems
                //change the puzzle visibility thing for correct to true
                // go and change the value in gameItems
                
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
        checkPuzzleType(){        
            
            if(this.puzzleVisibility === true) {
                
                if(this.puzzleType === 1){
                    console.log('puzzle 1');
                    this.puzzleButtonVisibility = false;
                    this.puzzleInputDisabled = false;
                    //this.selectedInventoryItemVisilibty = false;
                }
                else if(this.puzzleType === 2) {
                    console.log('puzzle 2');
                    this.puzzleButtonVisibility = true;
                    this.puzzleInputDisabled = true;
                    //this.selectedInventoryItemVisilibty = false;
                    this.puzzleInputMaxLength = 4;  //gotta add reusability 
                    console.log(this.puzzleInputMaxLength);
                }
                else if(this.puzzleType === 3) {
                    console.log('puzzle 3');
                    this.puzzleButtonVisibility = false;
                    this.puzzleInput = this.inventoryItem;
                    //this.selectedInventoryItemVisilibty = true;
                }
            }
        
        },

    },

}
</script>

<style scoped>
.popup-container {
    position: absolute;
    top: 0;
    text-align: center;
    width: calc(60% - 4rem);
    height: calc(70% - 4rem);
    padding: 5rem;
    margin: 2rem;
    border-radius: 1.5rem;
    /* background-color: #deceff; */
    border-color: #deceff;
    border: solid .3rem;
    background-color: #2b0d47;
    z-index: 1;
    overflow: scroll;
  }
.invisible {
    display:none;
}

.puzzleQuestionLine {
    font-size: 2rem;
}
.puzzle-answer {
    font-size: 2rem;
}
button {
    font-size: 2rem;
}
.close-puzzle-button {
    font-size: 2rem;
    position: fixed;
    left: 63%;
}
</style>
