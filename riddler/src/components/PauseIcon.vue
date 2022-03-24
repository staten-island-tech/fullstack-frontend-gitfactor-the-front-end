<template>
<div class="icon-container">
<font-awesome-icon @click="openPause()" class="pause-icon" icon="pause" />
      </div>
</template>

<script>
export default {
name: "PauseIcon",
 data() {
     return{
         isPauseOpen: false,
     }
 }, 
 methods: {
     openPause(){
this.isPauseOpen = true;
     }
 }
}
</script>

<style>
.icon-container{
    display: flex;
    justify-content: right;
}
.pause-icon{
    font-size: 4rem;
        color:  #deceff;
}
</style>