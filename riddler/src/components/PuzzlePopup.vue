<template>
  <div
    class="popup-container"
    tabindex="-1"
    v-if="puzzleVisibilityFunction()"
    @keyup.esc="closePuzzleClick"
    @keyup.enter="checkAnswerClick"
  >
    <font-awesome-icon @click="closePuzzleClick" icon="x" class="close-puzzle-button"/>
    <div class="solved-text" v-if="puzzlePromptAnswered">
      <h3>Solved!</h3>
      <p>
        <slot name="puzzle-correct-text"></slot>
      </p>
    </div>

    <div class="questionPrompt" v-else>
      <h3>
        <slot name="puzzle-name"></slot>
      </h3>
      <slot name="puzzle-img"></slot>
      <h4>
        <slot name="puzzle-text"></slot>
      </h4>

      <div class="selected-item-div" v-show="selectedItemDiv">
        <div class="select-item-options">
          <div class="selected-item">
            <img :src="require(`@/assets/${inventoryItem.img}`)" v-if="inventoryItem"/>
            <p v-else>?</p>
          </div>
          <button @click="checkAnswerClick" class="puzzle-submit-btn" :disabled="!inventoryItem">Enter</button>
        </div>
      </div>
      
      <button class="puzzle-clear-btn" @click="clearInputClick" v-show="puzzleInputVisibility">Clear</button>
        <input
          type="text"
          class="puzzle-answer"
          v-model="puzzleInput"
          :maxlength="puzzleInputMaxLength"
          :disabled="puzzleInputDisabled"
          v-show="puzzleInputVisibility"
          placeholder="Solve the puzzle"
        />
      <button @click="checkAnswerClick" class="puzzle-submit-btn" v-show="puzzleInputVisibility" :disabled="!puzzleInput">Enter</button>
      
      <div
        class="keypad-button-div"
        v-show="puzzleButtonVisibility"
      >
        <button
        @click="puzzle2ButtonClick(value)"
        v-for="value in puzzle2ButtonArray"
        :key="value" class="keypad-button">
          {{ value }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PuzzlePopup",
  emits: ["turn-off", "reset-visibility", "refocus-on-puzzle", "next-level"],
  props: {
    puzzleVisibility: Boolean,
    puzzlePrompt: String,
    puzzleAnswer: String,
    puzzleType: Number,
    isPromptAnswered: Boolean,
    inventoryItem: Object,
    isLevelTransitionPuzzle: Boolean,
    puzzle2ButtonArray: Array,
  },

  data() {
    return {
      puzzleInput: "",
      isDisabled: false,
      puzzleInputMaxLength: 10,
      puzzleButtonVisibility: false,
      puzzleInputDisabled: false,
      selectedItemDiv: false,
      puzzleInputVisibility: true,

      puzzlePromptAnswered: null, //give each puzzle a string value

      buttonValues: [],
    };
  },
  methods: {
    puzzleVisibilityFunction() {
      if (this.puzzleVisibility === true) {
        this.puzzlePromptAnswered = this.isPromptAnswered;
        this.checkPuzzleType();
        this.$emit("reset-visibility");
        return true;
      } else if (this.puzzleVisibility === null) {
        return true;
      } else {
        return false;
      }
    },
    checkPuzzleType() {
      if (this.puzzleVisibility === true) {
        if (this.puzzleType === 1) {
          console.log("puzzle 1");
          this.puzzleButtonVisibility = false;
          this.puzzleInputDisabled = false;
          this.selectedItemDiv = false;
          this.puzzleInputVisibility = true;
        } else if (this.puzzleType === 2) {
          console.log("puzzle 2");
          this.puzzleButtonVisibility = true;
          this.puzzleInputDisabled = false;
          this.selectedItemDiv = false;
          this.puzzleInputVisibility = true;
          this.puzzleInputMaxLength = 10;
        } else if (this.puzzleType === 3) {
          console.log("puzzle 3");
          this.puzzleButtonVisibility = false;
          this.puzzleInput = this.inventoryItem;
          console.log(this.inventoryItem);
          this.selectedItemDiv = true;
          this.puzzleInputDisabled = true;
          this.puzzleInputVisibility = false;
        }
      }
    },
    checkAnswerClick() {
      if (this.puzzleType === 3) {
        if (this.inventoryItem.name === this.puzzleAnswer) {
          console.log("puzzle 3 answered correctly");
          this.$store.state.userData.currentItem.puzzleCompleted = true;
          const solvedPuzzle = this.$store.state.userData.currentItem;
          this.$store.state.userData.solvedPuzzles.push(solvedPuzzle); //tracks solved puzzles so they will stay solved on re-login
          this.puzzlePromptAnswered = true;
          this.$emit("refocus-on-puzzle");
          this.levelTransition();
          if (this.puzzleAnswer === "Fish Food") {
            this.$store.state.userData.inventory.push({
              name: "Fish in a Hat",
              id: 21,
              section: 3,
              position: 60,
              margin: "60%",
              widthInt: 15,
              width: "15%",
              bottom: "10%",
              img: "lv3_fish.png",
              isInteractable: false,
              filter: null,
              itemType: "object",
              prompt: "A friendly fish wearing a comically small hat.",
            });
            this.$emit('foundHat');
          }
        } else {
          this.loseHeart();
        }
      } else {
        const puzzleAnswerInput = this.puzzleInput.trim().toLowerCase();
        console.log(puzzleAnswerInput);

        if (puzzleAnswerInput === this.puzzleAnswer) {
          this.puzzleInput = "";
          console.log("puzzle answered correctly");
          this.$store.state.userData.currentItem.puzzleCompleted = true;
          this.puzzlePromptAnswered = true;
          this.$emit("refocus-on-puzzle");
          this.levelTransition();
        } else {
          console.log("taking away 1 heart");
          this.loseHeart();
          this.puzzleInput = "";
        }
      }
    },
    puzzle2ButtonClick(value) {
      const testValue = this.puzzleInput + value;
      this.puzzleInput = testValue;
      if (this.puzzleInput.length > this.puzzleInputMaxLength) {
        this.puzzleInput = this.puzzleInput.slice(0, this.puzzleInputMaxLength);
      }
    },
    closePuzzleClick() {
      this.$emit("turn-off");
      this.puzzleInput = "";
    },
    clearInputClick() {
      console.log("trying to clear");
      this.puzzleInput = "";
    },
    levelTransition() {
      if (this.isLevelTransitionPuzzle === true) {
        console.log("door opened trying to go to next level"); //delete this later
        this.$emit("turn-off");
        this.$emit("next-level");
      }
    },
    loseHeart() {
      this.$store.commit("decrementLives");
      if (this.$store.state.userData.lifeCount === 0) {
        //lifeCount is restored in checkLevel()
        this.$store.state.userData.section = 2;
        this.$store.state.userData.leftValue = 45;
        this.$store.state.userData.currentItem = null;
        this.$store.state.userData.inventory = [];
        this.$store.state.userData.battery = 100;
        this.$store.state.userData.solvedPuzzles = [];
        this.$emit("level-fail");
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/global.css";

button:disabled {
  cursor: default;
  background-color: #6f627b;
}
button:disabled:hover {
  filter: brightness(1);
}
.popup-container {
  overflow: scroll;
  position: absolute;
  top: 0;
  text-align: center;
  width: calc(100% - 4rem);
  height: calc(100% - 4rem);
  padding: 5rem;
  margin: 2rem;
  border-radius: 1.5rem;
  border: solid var(--highlight-color) 0.3rem;
  background-color: var(--background-color);
  z-index: 1;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.popup-container::-webkit-scrollbar {
  display: none;
}
.popup-container h4 {
  text-align: left;
}
.solved-text p {
  text-align: left;
  font-size: var(--h4);
  margin-top: 1rem;
}
.close-puzzle-button {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: var(--h4);
  font-weight: 700;
  padding: 1.5rem 2rem;
  border: none;
  background-color: unset;
  color: var(--highlight-color);
}
.invisible {
  display: none;
}

.puzzle-submit-btn,
.puzzle-clear-btn,
input {
  font-size: var(--h4);
  font-weight: 700;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
}
input {
  margin: 5rem 1.5rem;
  width: 30rem;
}
.puzzle-submit-btn {
  background-color: var(--highlight-color);
  color: var(--background-color);
}
.puzzle-clear-btn {
  background-color: #f9e3e3;
  color: #ad2020;
}

.selected-item-div {
  margin-top: 1rem;
}
.select-item-options {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}
.selected-item {
  display: flex;
  height: fit-content;
  width: fit-content;
  min-width: 10rem;
  min-height: 10rem;
  background-color: var(--purple);
  border-radius: 1rem;
  margin-right: 2rem;
}
.selected-item p {
  margin: auto;
  font-size: var(--h1);
}
.selected-item img {
  height: 10rem;
  width: 10rem;
  padding: 0.5rem;
  object-fit: contain;
}
.keypad-button-div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
.keypad-button {
  font-size: var(--h3);
  font-weight: 500;
  width: 4.5rem;
  height: 4.5rem;
  margin: 0.45rem;
  color: var(--lightest-purple);
  background-color: var(--purple);
  border: 0.1rem solid var(--lightest-purple);
  border-radius: 0.5rem;
}
</style>
