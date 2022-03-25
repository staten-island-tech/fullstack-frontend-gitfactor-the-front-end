<template>
<div class="popup-container"
tabindex="-1"
v-if ='puzzleVisibility'
v-on:keyup.esc="closePuzzleClick"
v-on:keyup.enter="checkAnswerClick"


>
<button v-on:click="closePuzzleClick" class="close-puzzle-button">x</button>
    <!-- <h1 class="puzzleQuestionLine">{{puzzlePrompt}}</h1> -->
    <div class="promptAnsweredText" v-if="promptAnswered">correct!</div>
    <div class="questionPrompt" v-else>
        <slot name="puzzle-text"></slot>
    <input type="text" class="puzzle-answer"
    v-model="puzzleInput" :maxlength="puzzleInputMaxLength" :disabled="puzzleInputDisabled">
    <button v-on:click="checkAnswerClick" class="puzzle-submit-button" >enter</button>
     <button class="puzzleClearButton" @click="clearInputClick"> clear </button>
    <div class="keypad-button-div" v-for="value in buttonValues" :key="value.id" v-show= "puzzleButtonVisibility">
        
       <button @click="puzzle2ButtonClick(value.value)" class="puzzle-button" >{{value.value}}</button> 
       
    </div>

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
    promptAnswered: Boolean,
    },

    data() {
        return{
    puzzleInput: "" , 
    isDisabled: false,
    puzzleInputMaxLength: 10,
    puzzleButtonVisibility: false,
    puzzleInputDisabled: false,
    //promptAnswered: false,  //give each puzzle a string value 
    
    buttonValues: [
        {value: "1", id: 1},
        {value: "2", id: 2},
        {value: "3", id: 3},
        {value: "4", id:4},
    ],

 
        }
        },
    updated() {
            this.checkPuzzleType();
        },

    methods:
    {
     closePuzzleClick(){
            this.$emit('turn-off'); 
            this.puzzleInput = ""; 
                    

        },
        checkAnswerClick(){            
            const puzzleAnswerInput = (this.puzzleInput.trim()).toLowerCase()
            console.log(puzzleAnswerInput);
            
            if(puzzleAnswerInput === this.puzzleAnswer){
                
                this.puzzleInput = "";  
                //this.promptAnswered = true;
                //cant mutate prop
             
                
                //this.$refs.puzzlePopupBox.$el.focus();  //make it focus on the popup
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
                    this.puzzleButtonVisibility = false;
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
