<template>
  <button @click="moveAvatar(5)" v-on:keyup.enter="onEnter">Move avatar forward</button>
  <button @click="moveAvatar(-5)" v-on:keyup.enter="onEnter">Move avatar backward</button>

  <h1>{{ offset }}</h1>
  <h1>{{ currentItem }}</h1>

  <img v-for="item in gameItems" :src="item.img" :style="{ left: item.margin, filter: item.filter }" :alt="item" :key="item.key">
</template>

<script>
export default {
    name: "ItemTest",
    data() {
        return {
            offset: null,
            avatarLocation: 0,
            currentItem: null,
            gameItems: [
                {
                    name: "mushroom",
                    id: "0",
                    position: 10,
                    margin: "10%",
                    img: require("../assets/mushroom.png"),
                    isInteractable: false,
                    prompt: "An amazing mushroom house",
                    filter: null,
                    // isStorable
                }, 
                {
                    name: "mushroom",
                    id: "0",
                    position: 70,
                    margin: "70%",
                    img: require("../assets/mushroom.png"),
                    isInteractable: false,
                    prompt: "Another amazing mushroom house",
                    filter: null,
                }, 
            ],
        }
    },
    methods: {
        itemInteract() {
            this.gameItems.forEach(item => {
                const offset = item.position - this.avatarLocation;
                if (Math.abs(offset) <= 8 || (offset >= -13 && offset < 8)) {
                    this.offset = offset;
                    item.isInteractable = true;
                    this.currentItem = item;
                    item.filter = "sepia(100%)";
                } else {
                    item.isInteractable = false;
                    item.filter = null;
                }
            });
        },
        moveAvatar(distance) {
            this.avatarLocation += distance;
            document.querySelector(".avatar").style.left = `${this.avatarLocation}%`;
            this.currentItem = null;
            this.itemInteract();
        },
        onEnter() {
            if (this.currentItem) {
                alert(this.currentItem.prompt);
            }
        }
    }
}
</script>

<style scoped>
    h1 {
        font-size: 2rem;
    }
    .avatar {
        position: absolute;
        font-size: 2rem;
        bottom: 0;
        width: 6rem;
        height: 10rem;
        left: 0;
        z-index: 1;
        background-color: rgb(238, 216, 183);
    }
    img {
        position: absolute;
        bottom: 0;
        /* left: 25%; this is represented in the item.position property*/
        height: 11.2rem;
        width: 11.2rem;
        border-radius: 3rem;
    }
</style>