<template>
  <div v-if="txtbx">
    <div class="textbox">
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
txtbx: true,
txtbxShowFunction(){

}
  }
}
}
</script>

<style>
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