<template>
    <section class="inventory">
        <img v-for="item in $store.state.inventory" :src="item.img" :alt="item.name">
    </section>
</template>

<script>
export default {
    name: "Inventory",
    computed: {
        inventory() {
            return this.$store.state.inventory;
        },
    }
}
</script>

<style scoped>
    .inventory {
        width: 20%;
        min-height: 20rem;
        height: fit-content;
        font-size: 2rem;
        border: .2rem solid;
    }
    .inventory img {
        height: 5rem;
    }
</style>