<template>
  <div class="user"></div>
  <img class="object" src="../assets/mushroom.png">
  <!-- <button @click="moveAvatar">Move avatar</button> -->
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
    computed: {
        returnOffset() {
            // const userLocation = document.querySelector(".user").getBoundingClientRect();
            // const objectLocation = document.querySelector(".object").getBoundingClientRect();
            // const offset = userLocation.left - objectLocation.left;
            return this.offset;
        }
    },
    mounted() {
        const userLocation = document.querySelector(".user").getBoundingClientRect();
        const objectLocation = document.querySelector(".object").getBoundingClientRect();
        const userMidpoint = Math.abs(userLocation.left + userLocation.width) / 2;
        const objectMidpoint = Math.abs(objectLocation.left + objectLocation.width) / 2;
        const offset = userMidpoint - objectMidpoint;
        this.offset = Math.abs(offset);
        this.objectInteract();
    },
    methods: {
        // moveAvatar() {
        //     document.querySelector(".user").style.marginLeft = "23rem";
        // },
        objectInteract() {
            if (this.offset <= 30) {
                document.querySelector(".object").style.border = ".2rem solid yellow";
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
        margin-left: 23rem;
        z-index: 1;
        background-color: #0000ff;
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