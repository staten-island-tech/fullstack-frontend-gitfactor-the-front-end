<template>
  <div class="pause-menu">
          <div class="icon-div">
<font-awesome-icon @click="$emit('closePause')" icon="x" class="x-icon"/>
</div>
      <h2 class="pause-title">Pause Menu</h2>
      <div class="pause-button-box">
      <button @click="$emit('instruction')" >Instruction Manual</button>
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
props: ["isPauseOpen"],
components: {
  // Instructions
},
data() {
    return {
    }
}, 
methods: {
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
  color: black;
  font-size: 5rem;
}
.icon-div{
display: flex;
justify-content: right;
padding-right: 6rem;
padding-top: 3rem;
}
.x-icon{
  font-size: 3rem;
  color: black;
}
.pause-button-box{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 1rem;
}
.pause-menu button{
  width: 30%;
font-size: 2.5rem;
margin: 1rem;
padding: 1rem;
background-color: #A68FD5;
color: black;
border: black 0.05rem solid;
border-radius: 0.5rem;
}
</style>