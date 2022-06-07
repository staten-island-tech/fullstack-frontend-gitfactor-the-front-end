export const state = {
  username: null,
  level: 1,
  section: 2,
  leftValue: 45,
  lifeCount: 3,
  currentItem: null,
  inventory: [],
  battery: 100,
  isIntro: true,
  solvedPuzzles: [],
  failedLevel: false,
  roofTime: 300,
  gameFinished: false,
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
  updateState(state, newState) {
    const updates = Object.keys(state);
    updates.forEach(update => {
      state[update] = newState[update]; //user's information = updated information
    });
  },
};
