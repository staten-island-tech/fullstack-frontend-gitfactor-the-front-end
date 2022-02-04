<template>
  <div v-on:keypress.z="txtbxShow();">
<button v-on:click="txtbxShow();" class="textbox-button">Z</button>
<div v-bind:class="{ AC: mainAnt }" v-show="txtbx" class="textbox">
      <p class="textbox-title"></p> 
      <p class="textbox-test typing-class"></p>
</div>
  </div>
</template>

<script>
export default {
name: "TextBox",
data() {
  return {
txtbx: false,
count: 0,
mainAnt: false,
textArray: [
  {
    text: "Mwahaha welcome to my castle~",
    characterID: 1, 
    order: 1,
    name: "Count Dracula"
  }, 
  {
     text: "I didn't come here by choice...what is this?",
    characterID: 0, 
    order: 2,
    name: "???"
  },
  {
     text: "This...huh. I don't actually know what this is either! I just said that cause I thought it was spooky :D",
    characterID: 1, 
    order: 3, 
    name: "Count Dracula"
  }
], 
}
}, 
methods: {
  txtbxShow(){
this.txtbx = true;
this.count +=1;
const charLabel = document.querySelector(".textbox-title");
const textOutput = document.querySelector(".textbox-test");
const num = this.count -1;
if(this.count <= this.textArray.length){
    textOutput.innerHTML = this.textArray[num].text;
    charLabel.innerHTML = this.textArray[num].name;
   if(this.textArray[num].characterID === 1){
       this.mainAnt = true;
   } else if(this.textArray[num].characterID === 0){
       this.mainAnt = false;
    }
  }else{
    this.txtbx = false;
    this.count = 0;
  }
},
}
}
</script>

<style>
.textbox-button{
  font-size: 4rem;
  background-color: #766696;
  color: #DECEFF;
  position: absolute;
  top: 30%;
  left: 40%;
  border-radius: 50%;
  border:#DECEFF solid 0.3rem ;
 height: 7.5rem;
 width: 7.5rem;
}
.textbox{
  border: purple 1rem solid;
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
/* .typing-class{
  width: 0;
  overflow: hidden;
   white-space: nowrap; 
  animation: 
    typing 1.75s steps(40, end) forwards;
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
} */
.AC{
  border: green 1rem solid;
}
</style>