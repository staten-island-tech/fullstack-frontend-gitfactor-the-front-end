export const state = {
  gameItems: [
    [
      {
        name: "Door of Truth",
        id: 0,
        section: 2,
        position: 10,
        margin: "10%",
        img: "door.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 1,
        prompt: "I live in the ocean, I live in your ear. You cannot hear me, but you see when I'm near.",
        puzzleAnswer: "light",
      },
      {
        name: "Sheet of Paper",
        id: 1,
        section: 2,
        position: 60,
        margin: "60%",
        img: "paper.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "Hmm. It's just a blank sheet of paper with a faint scent of lemon.",
      },
      {
        name: "Prism",
        id: 2,
        section: 3,
        position: 20,
        margin: "20%",
        img: "prism.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "A triangular glass prism. So pretty and shiny!",
      },
      {
        name: "Feather",
        id: 3,
        section: 3,
        position: 70,
        margin: "70%",
        img: "feather.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "A feather with beautiful blue hues.",
      },
      {
        name: "Lantern",
        id: 4,
        section: 1,
        position: 35,
        margin: "35%",
        img: "lantern.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 3,
        prompt: "It's a bright lantern. What could it be used for, though?",
        puzzleAnswer: "Sheet of Paper",
      },
      // {
      //   name: "",
      //   id: 5,
      //   section: 1/2/3,
      //   position: (0, 100),
      //   margin: "(position)%",
      //   img: ".png",
      //   isInteractable: false,
      //   filter: null,
      //   itemType: "object",
      //   prompt: "",
      // },
      

    ],
    // [], level 2
    // []  level 3
  ],
};

/*
Templates for Items
-------------------
Object:
{
  name: "",
  id: Number,
  section: 1/2/3,
  position: (0, 100),
  margin: "(position)%",
  img: ".png",
  isInteractable: false,
  filter: null,
  itemType: "object",
  prompt: "",
},

Character: 
{
  name: "",
  id: 1,
  section: 1/2/3,
  position: 0,
  margin: "(position)%",
  img: ".png",
  isInteractable: false,
  filter: null,
  itemType: "character",
  dialogueSprite: ".png",
  dialogue: [
    {
      text: "",
      name: "",
      isAntagonist: Boolean,
    },
    {},
  ],
},

Puzzle:
{
  name: "",
  id: 2,
  section: 1/2/3,
  position: Number,
  margin: "(position)%",
  img: ".png",
  isInteractable: false,
  filter: null,
  itemType: "puzzle",
  puzzleType: 1/2/3,
  prompt: "",
  puzzleAnswer: "",
},
*/

