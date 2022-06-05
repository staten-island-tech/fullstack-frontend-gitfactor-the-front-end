<template>
  <div class="endgame-popup hide" :key="titleText" 
    tabindex="-1">
      <h2>{{titleText}}</h2>''
    <img src="../assets/victory.png" class="victory cg" alt="victory image of Riddler and Player Character taking a picture outside of the burning tower.">
      <div class="btn-group" :key="titleText">
         <button @click="warpLevelOne()" class="reset-btn">{{leftBtnText}}</button>
         <button @click="warpLevelTwo()" class="reset-btn">{{rightBtnText}}</button>
         <button @click="warpLevelThree()" class="reset-btn">{{rightBtnText}}</button>
      </div>

  </div>
</template>

<script>
/* reset button: wipes user data from the store, essentially the same as the "give up" but without the giving up 

next floor button: adds 1 to floor

when popup is triggered, if floor < 3 then send out the dulled version. if floor = 3 then send out the give up version

button that gets replaced is reset/next floor, save + quit stays the same

*/

export default {
  props: ["endGamePopup"],
  data() {
    return {
      titleText: "Congratulations, you have bested the Riddler's Tower!",
    };
  },
  methods: {
    prepEndGame() {
      setTimeout(() => {
        if (this.$store.state.userData.level >= 4) {
          this.titleText = "You have defeated the Riddler!";
          this.leftBtnText = this.buttonData.saveQuit.textEnd;
          this.rightBtnText = this.buttonData.nextLevel.textEnd;
          document.getElementById("end-btn").classList.add("save-btn");
          console.log(document.getElementById("end-btn"));
        } else {
          this.titleText = "The Door of Dimensions beckons...";
          this.leftBtnText = this.buttonData.saveQuit.textNormal;
          this.rightBtnText = this.buttonData.nextLevel.textNormal;
        }
      }, 100);
    },
    checkEndGame() {
      if (this.$store.state.userData.level >= 3) {
        this.$emit(this.buttonData.nextLevel.emitEnd);
        document.getElementById("end-btn").classList.add("save-btn");
      } else {
        this.$emit(this.buttonData.nextLevel.emitNormal);
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/global.css";

.endgame-popup {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--dark-purple);
  margin: 0 auto;
  padding: 2rem;
  border-radius: 1.5rem;
  border: #deceff solid 0.3rem;
  z-index: 3;
}

.victory-cg {
  width: 30%;
}

.reset-btn {
  background-color: var(--highlight-color);
  font-size: var(--h4);
  font-weight: 700;
  margin: 10% 2rem 10% 2rem;
  padding: 1.5rem 2rem;
  border: none;
  border-radius: 1rem;
  color: var(--background-color);
}

h2 {
  margin-top: 15rem;
}

h3 {
  color: var(--purple);
}
</style>