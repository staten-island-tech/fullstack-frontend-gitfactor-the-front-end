export const state = {
  gameItems: [
    [
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
            name: "Me",
          },
          {
            text: "This...huh. I don't actually know what this is either! I just said that cause I thought it was spooky :D",
            name: "???",
            isAntagonist: true,
          },
        ],
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
            name: "Me",
          },
          {
            text: "This...huh. I don't actually know what this is either! I just said that cause I thought it was spooky :D",
            name: "Me?",
            isAntagonist: true,
          },
        ],
      },
      {
        name: "Puzzle 1",
        id: 3,
        section: 1,
        position: 0,
        margin: "0%",
        img: "door.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 1,
        isLevelTransitionPuzzle: true,
        prompt: "the answer is one",
        puzzleAnswer: "one",
        puzzleCompleted: false,
        puzzleAnsweredText:
          "some random text or info that needs to be inserted 1",
      },
      {
        name: "Puzzle 2",
        id: 4,
        section: 2,
        position: 85,
        margin: "85%",
        img: "chest.jpg",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 2,
        isLevelTransitionPuzzle: false,
        prompt: "the answer is 1234",
        //4 answer cuz puzzle 2
        puzzleAnswer: "1234",
        puzzleCompleted: false,
        puzzleAnsweredText:
          "some random text or info that needs to be inserted 2",
        /*
          buttonValues: [
        {value: "1", id: 1},
        {value: "2", id: 2},
        {value: "3", id: 3},
        {value: "4", id:4},
    ],
          */
      },
      {
        name: "Puzzle 3",
        id: 5,
        section: 2,
        position: 15,
        margin: "15%",
        img: "chest.jpg",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 3,
        isLevelTransitionPuzzle: false,
        prompt: "the answer is mushroom",
        puzzleAnswer: "Mushroom",
        puzzleCompleted: false,
        puzzleAnsweredText:
          "some random text or info that needs to be inserted 3",
      },
    ],
    // [], level 2
    // []  level 3
  ],
};
