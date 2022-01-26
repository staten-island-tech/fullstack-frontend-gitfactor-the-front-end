<template>
<div class="popup-container"
tabindex="-1"
v-show ='puzzleVisibility'

v-on:keyup.esc="closePuzzleClick"
v-on:keyup.enter="checkAnswerClick"

>
<button v-on:click="closePuzzleClick">x</button>
    <h1>puzzle question?</h1>
    <input type="text" class="puzzle-answer"
    v-model="puzzleAnswer">
    <button v-on:click="checkAnswerClick" class="puzzle-submit-button" >enter</button>
    
    
</div>
    
</template>

<style scoped>
.popup-container{
    width: 20vw; 
    height: 30vh;
    border: 2px solid black;
}
.invisible{
    display:none;
}
</style>

<script>
export default {
    name: "PuzzlePopup",
    emits: ["turn-off", "lose-heart"],

    props: {
    puzzleVisibility: Boolean, 

    },

    data() {
        return{
    puzzleInput:"not working yet",
    puzzleAnswer: "" ,
 
        }
        },
    methods:
    {
     closePuzzleClick(){
            console.log('trying to close');
            this.$emit('turn-off');            

        },
        checkAnswerClick(){
            if(this.puzzleAnswer === "nika sucks"){
                console.log('correct!');
                this.$emit('turn-off'); 

            }
            else{
                console.log('taking away 1 heart');
                this.$emit('lose-heart');

            }
        },

    },

}
</script>