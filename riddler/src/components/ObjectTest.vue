<template>
  <div class="user">(^ . ^)</div>
  <img class="object" src="../assets/mushroom.png">
  <button @click="moveAvatar(10)">Avatar to 10</button>
  <button @click="moveAvatar(15)">Avatar to 15</button>
  <button @click="moveAvatar(20)">Avatar to 20</button>
  <button @click="moveAvatar(25)">Avatar to 25</button>
  <button @click="moveAvatar(30)">Avatar to 30</button>

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
            document.querySelector(".user").style.marginLeft = `${margin}%`;
            this.objectInteract();
        },
        objectInteract() {
            const userLocation = document.querySelector(".user").getBoundingClientRect();
            const objectLocation = document.querySelector(".object").getBoundingClientRect();
            const userMidpoint = Math.abs(userLocation.left + userLocation.width) / 2;
            const objectMidpoint = Math.abs(objectLocation.left + objectLocation.width) / 2;
            const offset = userMidpoint - objectMidpoint;
            this.offset = Math.abs(offset);
            if (this.offset <= 50) {
                document.querySelector(".object").style.border = ".5rem solid #ffe600";
                document.querySelector(".object").style.filter = "sepia(100%)";
            } else {
                document.querySelector(".object").style.border = ".5rem solid transparent";
                document.querySelector(".object").style.filter = "none";
            }
        }
    }
}
</script>

<style scoped>
    .user {
        position: absolute;
        bottom: 0;
        width: 8rem;
        height: 11.2rem;
        margin-left: 0;
        z-index: 1;
        background-color: rgb(238, 216, 183);
    }
    img {
        position: absolute;
        bottom: 0;
        left: 25%;
        height: 11.2rem;
        width: 11.2rem;
        border-radius: 3rem;
    }
</style>