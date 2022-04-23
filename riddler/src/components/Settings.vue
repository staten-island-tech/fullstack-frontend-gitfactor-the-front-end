<template>
   <div class="pause-menu">
          <div class="icon-div">
<font-awesome-icon @click="$emit('closeSetting')" icon="x" class="x-icon"/>
</div>
      <h2 class="pause-title settings-title">Settings</h2>
      <div class="pause-button-box settings-box">
      <button>Music Volume</button>
       <button>Sound Effect Volume</button>
        <button>Brightness</button>
           <button>Restart Game</button>
          <button>Delete Account</button>
          </div>
  </div>
</template>

<script>
export default {
name: "Settings"
}
</script>

<style>
.settings-title{
    font-size: 3.5rem;
}
.settings-box button{
    font-size: 2rem;
}
</style>