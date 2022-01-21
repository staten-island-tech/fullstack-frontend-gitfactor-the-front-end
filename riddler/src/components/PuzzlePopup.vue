<template>
<div class="popup-container"
v-show ='puzzleVisibility'>
<button v-on:click="closePuzzleClick">x</button>
    <h1>puzzle question?</h1>
    <input type="text" class="puzzle-answer">
    <button v-on:click="$emit('click', $event)"
    class="puzzle-submit-button" >enter</button>
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
    emits: ["click"],

    props: {
    puzzleVisibility: Boolean, 

    },

    data() {
        return{
    puzzleInput:"not working yet",
        }
        },
    methods:
    {
     closePuzzleClick(){
            console.log('trying to close');

        },

    },


}
</script>