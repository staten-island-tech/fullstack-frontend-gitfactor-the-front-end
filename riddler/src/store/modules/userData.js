export const state = {  
  level: 1,
  section: 2,
  leftValue: 30,
  lifeCount: 5,
  currentItem: {},
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