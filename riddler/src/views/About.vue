<template>
  <div>
    <canvas id="canvas" width="700" height="400" style=""></canvas>
   <img :src="require(`@/assets/sprites/${playerAvatar}`)" alt="" id="playerAvatar" class="hide player">
     <img v-for="item in gameItems" :src="item.img" :style="{ left: item.margin, filter: item.filter }" :alt="item" :key="item.key">
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
          gameItems: [
        {
          name: "riddler",
          id: "0",
          position: 50,
          margin: "50%",
          img: require("../assets/riddl.png"),
          isInteractable: false,
          prompt: "the riddler",
          filter: null,
          // isStorable
        }, 
        {
          name: "avatar",
          id: "0",
          position: 70,
          margin: "70%",
          img: require("../assets/prt.png"),
          isInteractable: false,
          prompt: "the vampire she tells you not to worry about",
          filter: null,
        }, 
      ],
    }
  },
  mounted() {
    this.loadCanvas();
    this.moveListen();

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
     moveListen: function() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          setTimeout(() => {
            if (this.leftValue > 0) {
           this.leftValue -= 1.5;
             };        
          this.playerAvatar = this.player.left;
          this.itemInteract();
          }, 250);      
      window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') {
          setTimeout(() => {
         this.playerAvatar = this.player.idleLeft;
          }, 250);
         this.itemInteract();

        ;      
        }
      })
    },      
    },
      resetRight: function() {
      setTimeout(() => {
      this.playerAvatar = this.player.idleRight;
      }, 250);
      this.itemInteract();

    },
    itemInteract() {
            this.currentItem = null;
            this.gameItems.forEach(item => {
                const offset = item.position - this.leftValue;
                if (Math.abs(offset) <= 10 || (offset >= -10 && offset < 10)) {
                    this.offset = offset;
                    item.isInteractable = true;
                    this.currentItem = item;
                    item.filter = "sepia(55%)";
                } else {
                    item.isInteractable = false;
                    item.filter = null;
                };

            });
        },
        onEnter() {
            if (this.currentItem) {              
              console.log(this.currentItem.prompt);
            }
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

h1 {
  font-size: 2rem;
    }

    img {
        position: absolute;
        top: 12%;
        /* left: 25%; this is represented in the item.position property*/
        width: 20%;
        border-radius: 3rem;
    }
</style>
