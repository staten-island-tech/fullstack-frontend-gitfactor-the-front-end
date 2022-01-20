<template>
<div class="popup-container"
v-show ='puzzleVisibility'>
    <h1>puzzle question?</h1>
    <input type="text" class="puzzle-answer">
    <button v-on:click="puzzleButtonClick"
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
    emits: ["changePopupVisibility"],

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
        puzzleButtonClick(){
            //console.log(this.puzzleInput);
            console.log('sup');
            this.$emit("changePopupVisibility", "test")
        },

    },


}
</script>