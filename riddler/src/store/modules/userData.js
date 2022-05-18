export const state = {  
  level: 1,
  section: 2,
  leftValue: 30,
  lifeCount: 5,
  currentItem: null,
  inventory: [],
  battery: 100,
};

export const mutations = {
  incrementLives(state) {
    state.lifeCount++;
  },
  decrementLives(state) {
    state.lifeCount--;
  },
  incrementLevel(state) {
    state.level++;
  },
  decrementLevel(state) {
    state.level--;
  },
  updateState(state, newState) {
    state.level = newState.level;
    state.section = newState.section;
    state.leftValue = newState.leftValue;
    state.lifeCount = newState.lifeCount;
    state.currentItem = newState.currentItem;
    state.inventory = newState.inventory;
    state.battery = newState.battery;
  },
};
