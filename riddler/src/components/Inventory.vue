<template>
  <section class="inventory-container">
    <button @click="toggleInventory()">{{ inventoryStatus }}</button>
    <div v-if="isInventoryOpen" class="inventory">
        <img @click="itemDetails(item)" v-for="item in $store.state.userData.inventory" :src="require(`@/assets/${item.img}`)" :alt="item.name" :key="item.id">
    </div>
  </section>
</template>

<script>
export default {
    name: "Inventory",
    emits: ["clickedItem", "enablePlayerOnClick"],
    data() {
      return {
        isInventoryOpen: true,
        inventoryStatus: "–", //en dash
      }
    },
    methods: {
        itemDetails(item) {
            this.$emit('clickedItem', item);
            console.log("selected in inventory:" + item.name)
        },
        toggleInventory() {
          this.isInventoryOpen = !this.isInventoryOpen;
          this.$emit("enablePlayerOnClick");
          if (this.inventoryStatus === "–") {
            this.inventoryStatus = "+";
            
          } else {
            this.inventoryStatus = "–";
            
          }
        }
    }
}
</script>

<style scoped>
@import "../assets/global.css";

  .inventory-container {
    background-color: var(--purple);
    text-align: right;
    height: fit-content;
    padding: 1rem;
    margin-left: 5rem;
    border: .2rem solid;
    border-radius: 1.5rem;
  }
  .inventory-container button {
    background-color: unset;
    border: none;
    color: #fff;
    padding: 0 1rem;
    font-size: 4rem;
  }
  .inventory {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 2rem;
  }
  .inventory img {
    height: 7rem;
    width: 7rem;
    object-fit: contain;
    margin: .5rem;
    background-color: var(--highlight-color);
    padding: .5rem;
    border-radius: 1rem;
    cursor: pointer;
  }

@media only screen and (max-width: 768px) {
  .inventory-container {
    margin: 0;
    min-height: 0;
    width: fit-content;
  }
  .inventory {
    display: flex;
  }
}
</style>