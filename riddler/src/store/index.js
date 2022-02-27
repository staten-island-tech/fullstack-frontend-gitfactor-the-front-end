import { createStore } from "vuex";

export default createStore({
  state: {
    // leftValue: 50,
    // inventory: [],
    // lifeCount: 5,
    // //level in propgress
    // //what section 
    // //puzzles completed?
    // //items left in level

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
