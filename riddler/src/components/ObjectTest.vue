<template>
  <div class="user">(^ . ^)</div>
  <img class="object" src="../assets/mushroom.png">
  <button @click="moveAvatar(5)">Avator to 5</button>
  <button @click="moveAvatar(10)">Avator to 10</button>
  <button @click="moveAvatar(20)">Avator to 20</button>
  <button @click="moveAvatar(30)">Avator to 30</button>
  <button @click="moveAvatar(40)">Avator to 40</button>

  <h1>{{ offset }}</h1>
</template>

<script>
export default {
    name: "ObjectTest",
    data() {
        return {
            offset: null,
        }
    },
    mounted() {
        this.objectInteract();
    },
    methods: {
        moveAvatar(margin) {
            document.querySelector(".user").style.marginLeft = `${margin}rem`;
            this.objectInteract();
        },
        objectInteract() {
            const userLocation = document.querySelector(".user").getBoundingClientRect();
            const objectLocation = document.querySelector(".object").getBoundingClientRect();
            const userMidpoint = Math.abs(userLocation.left + userLocation.width) / 2;
            const objectMidpoint = Math.abs(objectLocation.left + objectLocation.width) / 2;
            const offset = userMidpoint - objectMidpoint;
            this.offset = Math.abs(offset);
            if (this.offset <= 30) {
                document.querySelector(".object").style.border = ".2rem solid yellow";
            } else {
                document.querySelector(".object").style.border = ".2rem solid transparent";
            }
        }
    }
}
</script>

<style scoped>
    .user {
        position: absolute;
        bottom: 0;
        width: 5rem;
        height: 7rem;
        margin-left: 0;
        z-index: 1;
        background-color: rgb(238, 216, 183);
    }
    img {
        position: absolute;
        bottom: 0;
        left: 20rem;
        height: 7rem;
        width: 7rem;
        border-radius: 2rem;
        border: .2rem solid transparent;
    }
</style>