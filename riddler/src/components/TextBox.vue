<template>
  <div >
    <button v-on:click="txtbxShow" class="textbox-button">Z</button>
    <div v-if="txtbx" class="textbox">
      <p class="textbox-title">Count Dracula</p>
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
  }, 
  {
     text: "I didn't come here by choice...what is this?",
    characterID: 0, 
    order: 2,
  },
  {
     text: "This...huh. I don't actually know what this is either! I just said that cause I thought it was spooky :D",
    characterID: 1, 
    order: 3, 
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
// console.log(this.count);
const textOutput = document.querySelector(".textbox-test");
console.log(textOutput.innerHTML);
// if(this.count === this.textArray.order){
//   textOutput.innerHTML = this.textArray[2].text;
// }
this.textArray.forEach(object => {
  if(this.count === object.order){
    console.log("hi")
  }
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
  padding: 2rem;
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