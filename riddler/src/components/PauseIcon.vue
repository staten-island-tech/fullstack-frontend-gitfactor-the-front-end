<template>
<div class="icon-container">
<font-awesome-icon @click="openPause" class="pause-icon" icon="pause" />
<div v-if="isPauseOpen">
    Hiiii pause is open
</div>
      </div>
</template>

<script>
export default {
name: "PauseIcon",
created(){
    this.$emit('openPause', [this.isPauseOpen = true]);
},
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