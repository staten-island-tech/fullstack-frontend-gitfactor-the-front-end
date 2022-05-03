<template>
  <div class="transition-popup" 
    tabindex="-1">
      <h2>You have bested the Riddler!</h2>

      <div class="btn-group">
         <button @click="$emit('resetData')" class="reset-btn">{{phases.nextLevel.textEnd}}</button>
         <button @click="$emit('nxtLvl')" class="reset-btn">{{phases.nextLevel.textNormal}}.</button>
      </div>

      <h3>"L + Ratio + you tried to eat a vampire"</h3>

  </div>
</template>

<script>

/* reset button: wipes user data from the store, essentially the same as the "give up" but without the giving up 

next floor button: adds 1 to floor

when popup is triggered, if floor < 3 then send out the dulled version. if floor = 3 then send out the give up version

button that gets replaced is reset/next floor, save + quit stays the same

*/

export default {
    props: ['endGamePhase'],
    data() {
        return {
            phases: {
                saveQuit: {
                    textNormal: "Let's take a breather.",
                    textEnd: "Get me out of here.",
                },
                nextLevel: {
                    textNormal: "To the next floor.",
                    textEnd: "Let's start from the beginning.",
                }
            }
        }
    }, 
    methods() {
        
    }
}
</script>

<style scoped>
@import "../assets/global.css";

.transition-popup {
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