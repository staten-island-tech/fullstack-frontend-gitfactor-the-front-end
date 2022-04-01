<template>
  <div v-if="isPauseOpen" class="pause-menu">
      <h2 class="pause-title">Pause Menu</h2>
      <div class="pause-button-box">
      <button @click="instruction">Instruction Manual</button>
       <button>Save & Resume</button>
        <button>Save & Exit</button>
          <button>Settings</button>
          </div>
  </div>
</template>

<script>

// import Instructions from "Instructions.vue"
export default {
name: "PauseMenu", 
components: {
  // Instructions
},
data() {
    return {
      instruction(){
alert("hey this does work onclick")
      }
    }
} 
}
</script>

<style>
.pause-menu{
 position: absolute;
    top: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: #deceff;
}
.pause-title{
  margin-top: 2rem;
  color: black;
  font-size: 5rem;
}
.pause-button-box{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}
.pause-menu button{
  width: 30%;
font-size: 2.5rem;
margin: 2.5rem;
padding: 1rem;
background-color: #A68FD5;
color: black;
border: black 0.05rem solid;
border-radius: 0.5rem;
}
</style>