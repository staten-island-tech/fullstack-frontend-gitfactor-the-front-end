export const state = {
  gameItems: [
    [
      {
        name: "Door of Truth",
        id: 0,
        section: 2,
        position: 10,
        margin: "10%",
        widthInt: 40,
        width: "40%",
        bottom: "14%",
        img: "lv1_door.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 1,
        prompt:
          "I live in the ocean, I live in your ear. You cannot hear me, but you see when I'm near.",
        puzzleAnswer: "light",
      },
      {
        name: "Blank Scroll",
        id: 1,
        section: 2,
        position: 60,
        margin: "60%",
        widthInt: 12,
        width: "12%",
        bottom: "10%",
        img: "lv1_paper.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt:
          "Hmm... It looks like a mysterious scroll, but it's completely blank! It's bound together with a string of twine and has a faint scent of citrus.",
      },
      {
        name: "Shiny Prism",
        id: 2,
        section: 3,
        position: 20,
        margin: "20%",
        widthInt: 12,
        width: "12%",
        bottom: "14%",
        img: "lv1_prism.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "It's a triangular glass prism. So pretty and shiny!",
      },
      {
        name: "Large Feather",
        id: 3,
        section: 3,
        position: 70,
        margin: "70%",
        widthInt: 15,
        width: "15%",
        bottom: "5%",
        img: "lv1_feather.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "A large yet dainty feather with beautiful blue hues.",
      },
      {
        name: "Bright Lantern",
        id: 4,
        section: 1,
        position: 35,
        margin: "35%",
        widthInt: 20,
        width: "20%",
        bottom: "18%",
        img: "lv1_lantern.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 3,
        prompt: "It's a bright lantern. What could it be used for, though?",
        puzzleAnswer: "paper",
      },
      {
        name: "Painting of Some Dude",
        id: 5,
        section: 1,
        position: 60,
        margin: "60%",
        widthInt: 20,
        width: "20%",
        bottom: "50%",
        img: "lv1_painting.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt:
          "It's a painting of some guy who seems important. If only vampires studied human history!",
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
    [
      {
        name: "Door of Truth",
        id: 0,
        section: 2,
        position: 50,
        margin: "50%",
        widthInt: 50,
        width: "50%",
        img: "lv2_door.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 1,
        prompt:
          "I live in the ocean, I live in your ear. You cannot hear me, but you see when I'm near.",
        puzzleAnswer: "light",
      },
    ],
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
  width: "(widthInt)%",
  width: Number,
  bottom: "x%",
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
  width: "(widthInt)%",
  width: Number,
  bottom: "x%",
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
  width: "(widthInt)%",
  width: Number,
  bottom: "x%",
  img: ".png",
  isInteractable: false,
  filter: null,
  itemType: "puzzle",
  puzzleType: 1/2/3,
  prompt: "",
  puzzleAnswer: "",
},
*/
