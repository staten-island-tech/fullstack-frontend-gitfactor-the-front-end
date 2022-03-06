<template>
    <section class="inventory">
        <img @click="itemDetails(item)" v-for="item in $store.state.userData.inventory" :src="require(`@/assets/${item.img}`)" :alt="item.name" :key="item.id">
    </section>
</template>

<script>
export default {
    name: "Inventory",
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
        padding: 1rem;
        margin: 2.5rem;
        border: .2rem solid;
        border-radius: 1.5rem;
    }
    .inventory img {
        height: 5rem;
    }
</style>