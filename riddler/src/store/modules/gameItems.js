export const state = {
  gameItems:
  [
    [
      {
        name: "Riddler",
        id: 1,
        section: 1,
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
      {
        name: "Mushroom",
        id: 0,
        section: 2,
        position: 40,
        margin: "40%",
        img: "mushroom.png",
        isInteractable: false,
        filter: null,
        itemType: "object", 
        prompt: "Do you want to pick up this amazing mushroom house?",
      },
      {
        name: "Protagonist",
        id: 2,
        section: 3,
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
      },
    ],
  // [], level 2
  // []  level 3
  ]
}