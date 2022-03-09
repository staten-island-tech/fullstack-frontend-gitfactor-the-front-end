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
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 20rem;
    height: fit-content;
    text-align: left;
    font-size: 2rem;
    padding: 1rem;
    margin-left: 5rem;
    border: .2rem solid;
    border-radius: 1.5rem;
  }
  .inventory img {
      height: 7rem;
      margin: .5rem;
      background-color: #deceff;
      padding: .5rem;
      border-radius: 1rem;
      cursor: pointer;
  }

@media only screen and (max-width: 768px) {
  .inventory {
    margin: 0;
    min-height: 0;
    display: flex;
  }
}
</style>