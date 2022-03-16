<template>
  <div class="pause-menu">
      <!-- <font-awesome-icon icon="fa-solid fa-gear" /> -->
      <h2 class="pause-title">Pause Menu</h2>
      <div class="pause-button-box">
      <button>Instruction Manual</button>
      <!-- Doing instructions manual first; need some fncn to take you to the manual component on click ... or superimpose it?? -->
       <button>Save & Resume</button>
        <button>Save & Exit</button>
          <button>Settings</button>
          </div>
  </div>
</template>

<script>

export default {
name: "PauseMenu", 
components: {
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
margin: 2rem;
background-color: #A68FD5;
color: black;
border: black 0.05rem solid;
border-radius: 0.5rem;
}
</style>