<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      gameItems: {
        levelOne: {
          sectionOne: [
            {
              name: "Riddler",
              id: 1,
              position: 10,
              margin: "10%",
              img: "riddl.png",
              isInteractable: false,
              filter: null,
              itemType: "character", //could also be puzzle, object, etc.
              dialogueSprite: "sprite_dialogue_riddl.png",
              dialogue: [
                {
                  text: "Mwahaha welcome to my tower~",
                  name: "???",
                  isAntagonist: true,
                }, 
                {
                  text: "I didn't come here by choice...what is this?",
                  name: "Me"
                },
                {
                  text: "This...huh. I don't actually know what this is either! I just said that cause I thought it was spooky :D",
                  name: "???",
                  isAntagonist: true,
                }
              ],
            }, 
          ],
          sectionTwo: [
            {
              name: "Mushroom",
              id: 0,
              position: 40,
              margin: "40%",
              img: "mushroom.png",
              isInteractable: false,
              filter: null,
              itemType: "object", 
              prompt: "Do you want to pick up this amazing mushroom house?",
            },
          ],
          sectionThree: [
            {
              name: "Protagonist",
              id: 2,
              position: 70,
              margin: "70%",
              img: "prt.png",
              isInteractable: false,
              filter: null,
              itemType: "character",
              dialogueSprite: "sprite_dialogue_player.png", 
              dialogue: [
                {
                  text: "What? Am I talking to myself",
                  name: "Me?",
                  isAntagonist: true,
                }, 
                {
                  text: "Wat",
                  name: "Me"
                },
                {
                  text: "This...huh. I don't actually know what this is either! I just said that cause I thought it was spooky :D",
                  name: "Me?",
                  isAntagonist: true,
                }
              ],
            }
          ],
        },
      }
    }
  }
}
</script>
<style>
*, html, body {
  font-size: 62.5%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
