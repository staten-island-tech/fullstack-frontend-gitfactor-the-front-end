<template>
  <div class="item-popup"
  tabindex="-1"
  v-on:keyup.esc="$emit('closePopup')"
  v-on:keyup.enter="$emit('itemAdded')">
    <h3>
      <slot name="item-name"></slot>
    </h3>
    <font-awesome-icon @click="$emit('closePopup')" icon="x" class="close-btn"/>
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
    item: Object,
  },
};
</script>

<style scoped>
@import "../assets/global.css";

.item-popup {
  overflow: scroll;
  position: absolute;
  top: 0;
  text-align: center;
  width: calc(100% - 4rem);
  height: calc(100% - 4rem);
  padding: 5rem;
  margin: 2rem;
  border-radius: 1.5rem;
  border: solid var(--highlight-color) 0.3rem;
  background-color: var(--background-color);
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 1;
}

.item-popup::-webkit-scrollbar {
  display: none;
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
  font-size: var(--h4);
  top: 3rem;
  right: 3rem;
  background-color: unset;
  color: var(--highlight-color);
}
.item-popup .add-btn {
  margin-top: 5rem;
}
.item-popup p {
  text-align: left;
  color: var(--highlight-color);
  font-size: var(--h4);
  line-height: 1.5;
}
</style>