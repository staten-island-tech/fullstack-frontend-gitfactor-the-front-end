<template>
  <div >
    <button v-on:click="txtbxShow" class="textbox-button">Enter</button>
    <div v-if="txtbx" class="textbox">
      <p class="textbox-title">Count Dracula</p>
<p class="textbox-test">{{textArray[0].text}}</p>
    </div>
  </div>
</template>

<script>
export default {
name: "TextBox",
data() {
  return {
textArray: [
  {
    text: "Mwahaha welcome to my castle~",
    characterID: 1, 
  }, 
  {
     text: "I didn't come here by choice...what is this?",
    characterID: 0, 
  },
  {
     text: "This...huh. I don't actually know what this is either! I just said that cause I thought it was spooky :D",
    characterID: 1, 
  }
], 
 txtbx: false,
txtbxShow(){
this.txtbx = true;
const dialogue = document.querySelector(".textbox-test").innerHTML;
 console.log(dialogue)
 var btn = document.querySelector(".textbox-button");
 btn.addEventListener("click", function() {
  let counter = 0;
counter += 1;
  console.log(counter);
});
},
  }
}
}
</script>

<style>
.textbox-button{
  font-size: 3rem;
  background-color: black;
  color: red;
  position: absolute;
  top: 40%;
  left: 40%;
}
.textbox{
  border: red 1rem solid;
  background-color: black;
  width: 100%;
  height: 20rem;
position: absolute;
bottom: 0;
padding: 2rem;
padding-top: 1rem;
}
.textbox-test, .textbox-title{
  color: white;
  font-size: 2rem;
  text-align: left;
  margin-top: 0.5rem;
}
.textbox-title{
  font-size: 2.5rem;
}
</style>