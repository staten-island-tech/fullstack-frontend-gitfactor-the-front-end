<template>
  <div class="transition-popup" :key="titleText" 
    tabindex="-1">
      <h2>{{titleText}}</h2>

      <div class="btn-group" :key="titleText">
         <button @click="logout()" class="reset-btn" id="end-btn">{{leftBtnText}}</button>
         <button @click="checkEndGame" class="reset-btn">{{rightBtnText}}</button>
      </div>

  </div>
</template>

<script>

import { useAuth0, AuthState } from "/utils/useAuth0.js";

/* reset button: wipes user data from the store, essentially the same as the "give up" but without the giving up 

next floor button: adds 1 to floor

when popup is triggered, if floor < 3 then send out the dulled version. if floor = 3 then send out the give up version

button that gets replaced is reset/next floor, save + quit stays the same

*/

export default {
    setup() {
    const { logout } = useAuth0(AuthState);
    return {
        logout: () => {
          logout({ returnTo: window.location.origin });
        }
      };
    },
    props: ['endGamePhase'],
    data() {
        return {
            titleText: "The Door of Dimensions beckons...",
            rightBtnText: "To the next floor.",
            leftBtnText:"Let's take a breather.", 
            buttonData: {
                saveQuit: {
                    textNormal: "Let's take a breather.",
                    textEnd:"Get me out of here.",
                    emitNormal: "saveQuit",
                },
                nextLevel: {
                    textNormal: "To the next floor.",
                    textEnd: "Let's start from the beginning.",
                    emitNormal: "nextLevel",
                    emitEnd: "resetData"
                }
            },

            
        }
    }, 
    methods: {
        prepEndGame() {
            setTimeout(()=> {if (this.$store.state.userData.level >= 3) {
                this.titleText = "You have defeated the Riddler!";
                this.leftBtnText = this.buttonData.saveQuit.textEnd;     
                this.rightBtnText = this.buttonData.nextLevel.textEnd;     
                document.getElementById("end-btn").classList.add("save-btn");
                console.log(document.getElementById("end-btn"));
                } else {
                this.titleText = "The Door of Dimensions beckons...";
                this.leftBtnText = this.buttonData.saveQuit.textNormal;     
                this.rightBtnText = this.buttonData.nextLevel.textNormal;
                };
            },100);
            
            
        },
        checkEndGame() {
            if (this.$store.state.userData.level >= 3) {
                this.$emit(this.buttonData.nextLevel.emitEnd);      
                document.getElementById("end-btn").classList.add("save-btn");
                } else {
                this.$emit(this.buttonData.nextLevel.emitNormal);

                

                };
            
        },
        
    },
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

.save-btn {
    display: none;
}

h2 {
    margin-top: 15rem;
}

h3 {
    color: var(--purple);
}

</style>