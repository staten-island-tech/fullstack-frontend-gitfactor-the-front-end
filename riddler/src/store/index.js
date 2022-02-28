import { createStore } from "vuex";

export default createStore({
  state: {
    level: null,
    section: null,
    leftValue: null,
    lifeCount: null,
    inventory: [],

  },
  mutations: {
    incrementLives(state) {
      state.lifeCount++;
    },
    decrementLives(state) {
      state.lifeCount--;
    },
    updateState(state, newState) {
      state.lifeCount = newState[0].lifeCount;
      state.inventory = newState[0].inventory;
      console.log(state);
    },
  },
  actions: {},
  modules: {},
});
