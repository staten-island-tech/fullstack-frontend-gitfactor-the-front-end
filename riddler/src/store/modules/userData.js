export const state = {  
  level: null,
  section: null,
  leftValue: null,
  lifeCount: null,
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
    state.level = newState[0].level;
    state.section = newState[0].section;
    state.leftValue = newState[0].leftValue;
    state.lifeCount = newState[0].lifeCount;
    state.inventory = newState[0].inventory;
  },
}