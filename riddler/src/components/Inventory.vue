<template>
    <section class="inventory">
        <img @click="itemDetails(item)" v-for="item in $store.state.inventory" :src="item.img" :alt="item.name" :key="item.id">
    </section>
</template>

<script>
export default {
    name: "Inventory",
    computed: {
        inventory() {
            return this.$store.state.inventory;
        },
    },
    methods: {
        itemDetails(item) {
            alert(`This item is a ${item.name}.`);
        }
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