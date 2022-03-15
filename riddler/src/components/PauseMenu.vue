<template>
  <div class="pause-menu">
      <!-- <font-awesome-icon icon="fa-solid fa-gear" /> -->
      <h2 class="pause-title">Pause Menu</h2>
      <div class="pause-button-box">
      <button>Instruction Menu</button>
       <button>Save</button>
        <button>Save & Exit</button>
          <button>Settings</button>
          </div>
  </div>
</template>

<script>
export default {
name: "PauseMenu"
}
</script>

<style>
.pause-menu{
 position: absolute;
    top: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    background-color: #deceff;
}
.pause-title{
  color: white;
  font-size: 3rem;
}
.pause-button-box{
display: flex;
flex-direction: column;
justify-content: center;
}
.pause-menu button{
  width: 30%;
font-size: 2rem;
background-color: #A68FD5;
color: black;
}
</style>