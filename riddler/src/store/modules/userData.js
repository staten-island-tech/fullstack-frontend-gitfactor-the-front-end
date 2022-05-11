export const state = {  
  level: null,
  section: null,
  leftValue: null,
  lifeCount: null,
  currentItem: null,
  inventory: [],
}

export const mutations = {
  incrementLives(state) {
    state.lifeCount++;
  },
  decrementLives(state) {
    state.lifeCount--;
  },
  updateState(state, newState) {
    state.level = newState.level;
    state.section = newState.section;
    state.leftValue = newState.leftValue;
    state.lifeCount = newState.lifeCount;
    state.currentItem = newState.currentItem;
    state.inventory = newState.inventory;
    console.log(state);
  },
}