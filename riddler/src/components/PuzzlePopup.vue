<template>
<div class="popup-container"
tabindex="-1"
v-show ='puzzleVisibility'

v-on:keyup.esc="closePuzzleClick"
v-on:keyup.enter="checkAnswerClick"

>
<button v-on:click="closePuzzleClick" class="close-puzzle-button">x</button>
    <h1 class="puzzleQuestionLine">{{puzzlePrompt}}</h1>
    <input type="text" class="puzzle-answer"
    v-model="puzzleInput">
    <button v-on:click="checkAnswerClick" class="puzzle-submit-button" >enter</button>
    <div class="keypad-button-div">
        <button class="puzzle-button">1</button>
        <button class="puzzle-button">2</button>
        <button class="puzzle-button">3</button>
        <button class="puzzle-button">4</button>
<!-- https://codesandbox.io/s/l2ovzz34m7?file=/src/main.js i need to create a keypad thing -->
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

    },

    data() {
        return{
    puzzleInput: "" ,    
 
        }
        },
    methods:
    {
     closePuzzleClick(){
            console.log('trying to close');
            this.$emit('turn-off'); 
            this.puzzleInput = null; 
                    

        },
        checkAnswerClick(){
            if(this.puzzleInput === this.puzzleAnswer){
                console.log('correct!');
                this.$emit('turn-off'); 
                this.puzzleInput = null;  
                

            }
            else{
                console.log('taking away 1 heart');
                this.$emit('lose-heart');
                this.puzzleInput = null;  

            }
        },

    },

}
</script>