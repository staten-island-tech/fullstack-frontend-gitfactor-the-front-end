<template>
<div class="popup-container"
tabindex="-1"
v-if ='puzzleVisibility'

v-on:keyup.esc="closePuzzleClick"
v-on:keyup.enter="checkAnswerClick"

>
<button v-on:click="closePuzzleClick" class="close-puzzle-button">x</button>
    <h1 class="puzzleQuestionLine">{{puzzlePrompt}}</h1>
    <input type="text" class="puzzle-answer"
    v-model="puzzleInput" :maxlength="puzzleInputMaxLength" :disabled="puzzleInputDisabled">
    <button v-on:click="checkAnswerClick" class="puzzle-submit-button" >enter</button>
    <div class="keypad-button-div" v-for="value in buttonValues" :key="value.id" v-show= "puzzleButtonVisibility">
       <button @click="puzzle2ButtonClick(value.value)" class="puzzle-button" >{{value.value}}</button> 
       
    </div>
    <button class="puzzleClearButton" @click="clearInputClick"> clear </button>
    
    
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
            this.checkPuzzle();
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
.popup-container {
    width: 30vw; 
    height: 40vh;
    border: 2px solid black;
    position: fixed;
    top:15%;
    left: 35%;
    z-index: 5;
    background-color: rgb(105, 105, 189);
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
