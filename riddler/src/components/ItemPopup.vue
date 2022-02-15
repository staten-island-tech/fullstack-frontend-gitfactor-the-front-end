<template>
  <div class="item-popup">
    <button @click="$emit('closePopup')">X</button>
    <slot name="item-img"></slot>
    <p>
      <slot name="item-text"></slot>
    </p>
    <button @click="$store.state..inventory.push(item)">
      Add to inventory
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemPopup",
  props: {
    item: Object
  }
}
</script>

<style scoped>
  .item-popup {
    position: absolute;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    padding: 5rem;
    margin: 2rem;
    border-radius: 1.5rem;
    background-color: #a791d4;
    z-index: 1;
  }
  /* .item-popup button {
    position: absolute;
    top: 2rem;
    right: 2rem;
  } */
  .item-popup p {
    color: #000;
    font-size: 2rem;
    text-align: left;
    font-weight: 700;
  }
  img {
    position: absolute;
    top: 0;
  }
</style>