<template>
  <div class="event-popup">
    <font-awesome-icon @click="$emit('closeEventClick')" icon="x" class="close-event-button"/>
    <p>{{ eventText }}</p>
  </div>
</template>

<script>
export default {
  name: "EventPopup",
  props: {
    eventText: String
  },
}
</script>

<style scoped>
@import "../assets/global.css";

.event-popup {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  font-size: var(--h4);
  width: 50rem;
  height: 20rem;
  padding: 2rem;
  margin: auto;
  border-radius: 1.5rem;
  border: solid var(--background-color) .3rem;
  background-color: var(--highlight-color);
  box-shadow: 0 .5rem 1rem .2rem var(--background-color);
  z-index: 3;
  overflow: scroll;
}
.event-popup p {
  font-size: var(--h4);
  color: var(--background-color);
  margin-top: 3rem;
}
.close-event-button {
  position: absolute;
  top: .5rem;
  right: .5rem;
  font-size: var(--h4);
  font-weight: 700;
  margin-left: 100%;
  padding: 1.5rem 2rem;
  border: none;
  background-color: unset;
  color: var(--background-color);
}
</style>