<template>
  <div>
    <canvas id="canvas" width="700" height="400" style="border:3px solid #000000;"></canvas>
   <img :src="require(`@/assets/sprites/${playerAvatar}`)" alt="" id="playerAvatar" class="hide player">
  </div>
</template>

<script>
export default {
  name:"canvasTest",
  data() {
    return {
     player: {
        idleLeft: "idle-left.gif",
        idleRight: "idle-right.gif",
        left: "walk-left.gif",
        right: "walk-right.gif",
      },
    playerAvatar: "idle-left.gif",
    }
  },
  mounted() {
    this.loadCanvas();

  },
  computed: {

  },
  methods: {
    loadCanvas: function() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const avatar = document.getElementById("playerAvatar");
      ctx.transform(.4, 0, 0, .4, 0, 0);
      ctx.drawImage(avatar, 0, 225);
    },

  
  },

}
</script>

<style>
.hide {
  display: none;
}

.player {
  width: 20%;
}
</style>
