<template>
  <div class="item-popup"
  tabindex="-1"
  v-on:keyup.esc="$emit('closePopup')"
  v-on:keyup.enter="$emit('itemAdded')">
    
    <button @click="$emit('closePopup')" class="close-btn">X</button>
    <slot name="item-img"></slot>
    <p>
      <slot name="item-text"></slot>
    </p>
    <button @click="$emit('itemAdded')" class="add-btn">
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
    top: 0;
    text-align: center;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    padding: 5rem;
    margin: 2rem;
    border-radius: 1.5rem;
    /* background-color: #deceff; */
    border-color: #deceff;
    border: solid .3rem;
    background-color: #2b0d47;
    z-index: 1;
    overflow: scroll;
  }
  .item-popup button {
    background-color: #deceff;
    font-size: 2rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 1.5rem;
    color: #2b0d47;
  }
  .item-popup .close-btn {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
  .item-popup .add-btn {
    margin-top: 5rem;
  }
  .item-popup p {
    color: rgb(236, 213, 255);
    font-size: 2rem;
    text-align: left;
    font-weight: 700;
  }
  img {
    position: absolute;
    top: 0;
  }
</style>