<template>
  <div class="event-popup" tabindex="-1">
    <font-awesome-icon @click="$emit('closeEventClick')" icon="x" class="close-event-button"/>
    <p>{{ eventText }}</p>
  </div>
</template>

<script>
export default {
  name: "EventPopup",
  props: {
    eventText: String,
  },
};
</script>

<style scoped>
@import "../assets/global.css";

.event-popup {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  font-size: var(--h4);
  max-width: 50rem;
  min-width: 40rem;
  min-height: 20rem;
  max-height: 30rem;
  padding: 2rem;
  margin: auto;
  border-radius: 1.5rem;
  border: solid var(--background-color) 0.3rem;
  background-color: var(--highlight-color);
  box-shadow: 0 0.5rem 1rem 0.2rem var(--background-color);
  z-index: 10;
  overflow: scroll;

  /*scrollbar removing*/
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.event-popup::-webkit-scrollbar {
  display: none;
}

.event-popup p {
  text-align: left;
  font-size: var(--h4);
  color: var(--background-color);
  margin-top: 3rem;
}
.close-event-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: var(--h4);
  font-weight: 700;
  margin-left: 100%;
  padding: 1.5rem 2rem;
  border: none;
  background-color: unset;
  color: var(--background-color);
}
</style>