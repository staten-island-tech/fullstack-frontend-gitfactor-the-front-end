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
    v-model="puzzleInput" :maxlength="puzzleInputMaxLength">
    <button v-on:click="checkAnswerClick" class="puzzle-submit-button" >enter</button>
    <div class="keypad-button-div" v-for="value in buttonValues" :key="value.id" v-show= "puzzleButtonVisibility">
       <button @click="puzzle2ButtonClick(value.value)" class="puzzle-button" >{{value.value}}</button> 
       
    </div>
    
    
</div>
    
</template>

<style scoped>
.popup-container{
    width: 30vw; 
    height: 40vh;
    border: 2px solid black;
    position: fixed;
    top:15%;
    left: 35%;
    z-index: 5;
    background-color: rgb(105, 105, 189);
}
.invisible{
    display:none;
}
.puzzleQuestionLine{
    font-size: 2rem;
}
.puzzle-answer{
    font-size: 2rem;
}
.puzzle-submit-button{
    font-size: 2rem;
}
.close-puzzle-button{
    font-size: 2rem;
    position: fixed;
    left: 63%;
}
</style>

<script>

export default {
    name: "PuzzlePopup",
    emits: ["turn-off", "lose-heart"],

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
            console.log('trying to close');
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
                this.$emit('lose-heart');
                this.puzzleInput = "";  

            }
        },
        puzzle2ButtonClick(value){
            const testValue = this.puzzleInput + value ;
            this.puzzleInput = testValue;
            console.log(testValue);
            //https://stackoverflow.com/questions/56034027/how-to-limit-digit-number-in-vue-input 
            //use this to fix
            },
        checkPuzzle(){            
            if(this.puzzleVisibility === true) {
                console.log('time to check puzzle type');
                if(this.puzzleType === 1){
                    console.log('puzzle 1');
                    this.puzzleButtonVisibility = false;
                }
                else if(this.puzzleType === 2) {
                    console.log('puzzle 2');
                    this.puzzleButtonVisibility = true;
                    this.puzzleInputMaxLength = 4;
                    console.log(this.puzzleInputMaxLength);
                }
            }
        
        },

    },

}
</script>