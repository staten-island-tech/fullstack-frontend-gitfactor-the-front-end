<template>
  <div >
    <button v-on:click="txtbxShow" class="textbox-button">Z</button>
    <div v-show="txtbx" class="textbox">
      <p class="textbox-title">{{ textArray[0].name }}</p> 
<p class="textbox-test">{{ textArray[0].text }}</p>
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
    order: 1,
    name: "Count Dracula"
  }, 
  {
     text: "I didn't come here by choice...what is this?",
    characterID: 2, 
    order: 2,
    name: "???"
  },
  {
     text: "This...huh. I don't actually know what this is either! I just said that cause I thought it was spooky :D",
    characterID: 3, 
    order: 3, 
    name: "Count Dracula"
  }
], 
 txtbx: false,
 count: 0,
  }
}, 
methods: {
  txtbxShow(){
this.txtbx = true;
this.count +=1;
const charLabel = document.querySelector(".textbox-title")
console.log(charLabel);
const textOutput = document.querySelector(".textbox-test");
console.log(textOutput.innerHTML);
this.textArray.forEach(object => {
  const num = this.count -1;
  if(this.count === object.order){
    textOutput.innerHTML = this.textArray[num].text;
    console.log(object.characterID)
    charLabel.innerHTML = this.textArray[num].name;
     if(object.characterID === 0){
       console.log("test");
      //  charLabel.innerHTML = "Count Dracula"
    //some style/make default styling for each or smthn?? some property?? bind??? we'll see/PROBABLY V-BIND A CLASS
  }
  if(object.characterId === 1){
    // charLabel.innerHTML = "???"
    //some style
  }
  } 
  // if(this.count != object.order ) { 
  //   this.txtbx = false;
  // } this WILL NOT work
});
}
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