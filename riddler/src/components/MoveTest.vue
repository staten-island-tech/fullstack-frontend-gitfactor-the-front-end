<template>
  <div>
    <img v-bind:src="test" alt="" class="stick" />
    <img src="../assets/stick.png" alt="" class="stick" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      player: {
          idle: "../assets/stick.png",
          left: "../assets/stick_l.png",
          right: "../assets/stick_r.png",
      },
      test: "../assets/stick.png",
    }
  }


}
</script>

<style>
</style>
