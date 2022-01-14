<template>
  <div class="avatar">(^ . ^)</div>
  <button @click="moveAvatar(10)" v-on:keyup.enter="onEnter">Avatar to 10</button>
  <button @click="moveAvatar(30)" v-on:keyup.enter="onEnter">Avatar to 30</button>
  <button @click="moveAvatar(50)" v-on:keyup.enter="onEnter">Avatar to 50</button>
  <button @click="moveAvatar(70)" v-on:keyup.enter="onEnter">Avatar to 70</button>
  <button @click="moveAvatar(90)" v-on:keyup.enter="onEnter">Avatar to 90</button>

  <h1>{{ offset }}</h1>
  <h1>{{ currentItem }}</h1>

  <img v-for="item in gameItems" :src="item.img" :style="{ left: item.margin, filter: item.filter }" :alt="item" :key="item.key">
</template>

<script>
export default {
    name: "ItemTest",
    data() {
        return {
            // offset: null,
            avatarLocation: null,
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
                const offset = Math.abs(item.position - this.avatarLocation);
                if (offset <= 8) {
                    // this.offset = offset;
                    item.isInteractable = true;
                    this.currentItem = item;
                    item.filter = "sepia(100%)";
                } else {
                    // this.offset = "no item detected";
                    item.isInteractable = false;
                    item.filter = null;
                }
            });
        },
        moveAvatar(distance) {
            document.querySelector(".avatar").style.left = `${distance}%`;
            this.avatarLocation = distance;
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
        height: 8rem;
        width: 8rem;
        border-radius: 3rem;
    }
</style>