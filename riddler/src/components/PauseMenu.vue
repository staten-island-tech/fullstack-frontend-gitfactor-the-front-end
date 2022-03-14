<template>
  <div class="pause-menu">
      <!-- <font-awesome-icon icon="fa-solid fa-gear" /> -->
      <h2 class="pause-title">Pause Menu</h2>
      <button>Instruction Menu</button>
       <button>Save</button>
        <button>Save & Exit</button>
          <button>Settings</button>
  </div>
</template>

<script>
export default {
name: "PauseMenu"
}
</script>

<style>
.pause-menu{
    width: 100%;
    height: 100%;
    background-color: #deceff;
    display: flex;
    justify-content: center;
align-content: center;
}
.pause-title{
  color: white;
  font-size: 3rem;
}
.pause-menu button{

background-color: #A68FD5;
color: black;
}
</style>