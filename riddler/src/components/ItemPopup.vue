<template>
  <div class="item-popup"
  tabindex="-1"
  v-on:keyup.esc="$emit('closePopup')"
  v-on:keyup.enter="$emit('itemAdded')">
    <h4>
      <slot name="item-name"></slot>
    </h4>
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
@import "../assets/global.css";

  .item-popup {
    position: absolute;
    top: 0;
    text-align: center;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    padding: 5rem;
    margin: 2rem;
    border-radius: 1.5rem;
    border: solid var(--highlight-color) .3rem;
    background-color: var(--background-color);
    z-index: 1;
    overflow: scroll;
  }
  .item-popup button {
    background-color: var(--highlight-color);
    font-size: var(--h4);
    font-weight: 700;
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 1rem;
    color: var(--background-color);
  }
  .item-popup .close-btn {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background-color: unset;
    color: var(--highlight-color);
  }
  .item-popup .add-btn {
    margin-top: 5rem;
  }
  .item-popup p {
    color: var(--highlight-color);
    font-size: var(--h4);
    line-height: 1.5;
  }
</style>