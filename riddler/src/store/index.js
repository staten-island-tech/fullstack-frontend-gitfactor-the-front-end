import { createStore } from "vuex";

export default createStore({
  state: {
    leftValue: 50,
    inventory: [],
    lifeCount: 5,
    //level in propgress
    //what section 
    //user leftValue
    //user inventory
    //puzzles completed?

  },
  mutations: {
    incrementLives(state) {
      state.lifeCount++;
    },
    decrementLives(state) {
      state.lifeCount--;
    },
  },
  actions: {},
  modules: {},
});
