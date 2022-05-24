export const state = {
  gameItems: [
    [ 
      {
        name: "Door of Truth",
        id: 0,
        section: 2,
        position: 10,
        margin: "10%",
        widthInt: 45,
        width: "45%",
        bottom: "10%",
        img: "lv1_door.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 1,
        prompt: "You can follow me into the past. Agent of vision, yet faster than the eye can see. What am I?",
        isLevelTransitionPuzzle: true,
        puzzleAnswer: "light",
        isPuzzleCompleted: false,
        puzzleAnsweredText:
          "MUAHAHA TIME FOR ROUND 2",
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
        position: 20,
        margin: "20%",
        widthInt: 20,
        width: "20%",
        bottom: "18%",
        img: "lv1_lantern.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 3,
        isLevelTransitionPuzzle: false,
        puzzleCompleted: false,
        prompt: "It's a bright lantern. What could it be used for, though?",
        puzzleAnswer: "Blank Scroll",
        puzzleAnsweredText: "Nice catch! When held up to the light of the lantern, the secret message written in lemon juice on the scroll revealed itself! It reads: 'A commonality between every item. That is where the answer lies.'",
      },
      {
        name: "Painting",
        id: 5,
        section: 1,
        position: 60,
        margin: "60%",
        widthInt: 19,
        width: "19%",
        bottom: "55%",
        img: "lv1_painting.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "It's a painting of some guy who seems important. If only vampires studied human history!"
      },
    ],
    [
      //Level 2
     {
        name: "Dark Door of Truth",
        id: 6,
        section: 2,
        position: 10,
        margin: "10%",
        widthInt: 40,
        width: "40%",
        bottom: "10%",
        img: "lv2_door.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 1,
        prompt: "I move, slowly but surely. Back and forth. Yet with my slow pace, over time I change the face of the world. What am I?",
        isLevelTransitionPuzzle: true,
        puzzleAnswer: "ocean",
        isPuzzleCompleted: false,
        puzzleAnsweredText:
          "MUAHAHA TIME FOR ROUND 3",
      },
      // {
      //   name: "Computer",
      //   id: ,
      //   section: 1/2/3,
      //   position: Number,
      //   margin: "(position)%",
      //   width: "(widthInt)%",
      //   width: Number,
      //   bottom: "x%",
      //   img: ".png",
      //   isInteractable: false,
      //   isLevelTransitionPuzzle: false,
      //   filter: null,
      //   itemType: "puzzle",
      //   puzzleCompleted: false,
      //   puzzleType: 2,
      //   prompt: "The answer is found at the beginning of every item",
      //   buttonChoices: [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,T,U,V,W,X,Y,Z]
      //   puzzleAnswer: " ",
      //   puzzleCompleted: false,
      //   puzzleAnsweredText: "ocean",
      // },

      // ocaringa, camera, envelope, AA batteries, notebook, computer
      // {
      //   name: "Ocarina",
      //   id: Number,
      //   section: 1/2/3,
      //   position: (0, 100),
      //   margin: "(position)%",
      //   width: "(widthInt)%",
      //   width: Number,
      //   bottom: "x%",
      //   img: ".png",
      //   isInteractable: false,
      //   filter: null,
      //   itemType: "object",
      //   prompt: "remember the names of the holes!",
      // },
      // {
      //   name: "Camera",
      //   id: Number,
      //   section: 1/2/3,
      //   position: (0, 100),
      //   margin: "(position)%",
      //   width: "(widthInt)%",
      //   width: Number,
      //   bottom: "x%",
      //   img: ".png",
      //   isInteractable: false,
      //   filter: null,
      //   itemType: "object",
      //   prompt: "whodat in the camera roll",
      // },
      // {
      //   name: "Envelope",
      //   id: Number,
      //   section: 1/2/3,
      //   position: (0, 100),
      //   margin: "(position)%",
      //   width: "(widthInt)%",
      //   width: Number,
      //   bottom: "x%",
      //   img: ".png",
      //   isInteractable: false,
      //   filter: null,
      //   itemType: "object",
      //   prompt: "slip of paper inside reads 18 9 44 12 5 18",
      // },
      // {
      //   name: "AA batteries",
      //   id: Number,
      //   section: 1/2/3,
      //   position: (0, 100),
      //   margin: "(position)%",
      //   width: "(widthInt)%",
      //   width: Number,
      //   bottom: "x%",
      //   img: ".png",
      //   isInteractable: false,
      //   filter: null,
      //   itemType: "object",
      //   prompt: "use this for the flashlight",
      // },
      // {
      //   name: "AA batteries",
      //   id: Number,
      //   section: 1/2/3,
      //   position: (0, 100),
      //   margin: "(position)%",
      //   width: "(widthInt)%",
      //   width: Number,
      //   bottom: "x%",
      //   img: ".png",
      //   isInteractable: false,
      //   filter: null,
      //   itemType: "object",
      //   prompt: "use this for the flashlight",
      // },
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
  widthInt: Number,
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
  widthInt: Number,
  bottom: "x%",
  img: ".png",
  isInteractable: false,
  filter: null,
  itemType: "character",
  dialogueSprite: ".png",
  dialogue: [
    {
      name: "",
      text: "",
      color: "CSS CP",
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
  widthInt: Number,
  bottom: "x%",
  img: ".png",
  isInteractable: false,
  filter: null,
  itemType: "puzzle",
  puzzleType: 1/2/3,
  prompt: "pre-solve text",
  isLevelTransitionPuzzle: true/false, //not required
  buttonChoices: [], //not required
  puzzleAnswer: "",
  isPuzzleCompleted: false, 
  puzzleAnsweredText: "post-solve text",
},
*/
