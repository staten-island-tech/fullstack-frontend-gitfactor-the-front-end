import {
  epilogue,
  levelFourIntro,
} from "../../../src/dialogue";

export const state = {
  gameItems: [
    [
      {
        name: "Door of Truth",
        id: 0,
        section: 2,
        position: 7,
        margin: "7%",
        widthInt: 45,
        width: "45%",
        bottom: "10%",
        img: "lv1_door.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 1,
        prompt:
          "You can follow me into the past. Agent of vision, yet faster than the eye can see. What am I?",
        isLevelTransitionPuzzle: true,
        puzzleAnswer: "light",
        isPuzzleCompleted: false,
      },
      {
        name: "Blank Scroll",
        id: 1,
        section: 2,
        position: 65,
        margin: "65%",
        widthInt: 12,
        width: "12%",
        bottom: "10%",
        img: "lv1_paper.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt:
          "Hmm... It looks like a mysterious scroll, but it's completely blank! Made of a very pale-colored parchment, the scroll is bound together with a string of twine and has a faint scent of citrus.",
        chosenItemTextCorrect: "Nice catch! The citrus scent from the scroll must've been lemon juice, which oxidized when put up to the flame of the lantern!", 
      },
      {
        name: "Shiny Prism",
        id: 2,
        section: 1,
        position: 60,
        margin: "60%",
        widthInt: 10,
        width: "10%",
        bottom: "13%",
        img: "lv1_prism.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "It's a triangular glass prism. So pretty and shiny!",
        chosenItemTextFalse: "When held up to the lantern, the prism split the light from the flame into a beautiful rainbow! But nothing beneficial happened otherwise. Now I lost a soul point.",
      },
      {
        name: "Large Feather",
        id: 3,
        section: 3,
        position: 25,
        margin: "25%",
        widthInt: 15,
        width: "15%",
        bottom: "5%",
        img: "lv1_feather.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "A large yet unexpectedly lightweight feather with beautiful blue hues. I wonder what kind of bird it came from.",
        chosenItemTextFalse: "Unsurprisingly, nothing happens when you put a feather up to a lantern. Now I lost a soul point.",
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
        isPuzzleCompleted: false,
        prompt:
          "It's a lantern with a bright flame. What could it be used for, though? Click on an item in your inventory to select it as your answer.",
        puzzleAnswer: "Blank Scroll",
        puzzleAnsweredText:
          "When held up to the light of the lantern, the secret message written in lemon juice on the scroll revealed itself! It reads: 'A commonality between every item. That is where the answer lies.'",
      },
      {
        name: "Painting",
        id: 5,
        section: 3,
        position: 72,
        margin: "72%",
        widthInt: 19,
        width: "19%",
        bottom: "55%",
        img: "lv1_painting.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "It's a painting, dated 'February 1847', of some guy who seems important, but it's hard to tell who it is. If only vampires studied human history!",
        chosenItemTextFalse: "Oh no! Holding the painting up to the lantern caused the paint to start melting! Not only did it not help, but now a piece of art has been sabotaged. Now I lost a soul point.",
      },
    ],
    [
      //Level 2
      {
        name: "Dark Door of Truth",
        id: 6,
        section: 2,
        position: 9,
        margin: "9%",
        widthInt: 40,
        width: "40%",
        bottom: "7%",
        img: "lv2_door.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 1,
        prompt:
          "I move, slowly but surely. Back and forth. Yet with my slow pace, over time I change the face of the world. What am I?",
        isLevelTransitionPuzzle: true,
        puzzleAnswer: "ocean",
        isPuzzleCompleted: false,
      },
      {
        name: "Monitor",
        id: 7,
        section: 2,
        position: 55,
        margin: "55%",
        widthInt: 30,
        width: "30%",
        bottom: "14%",
        img: "lv2_monitor.png",
        isInteractable: false,
        isLevelTransitionPuzzle: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 2,
        prompt:
          "This monitor seems like it could have useful information on it, but it's protected by a password. What could the password be? Enter it using the keypad below.",
        buttonChoices: [
          "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
        ],
        puzzleAnswer: "riddler",
        isPuzzleCompleted: false,
        puzzleAnsweredText:
          "Nice! I'm in! The monitor displays a message: 'From where each item begins is where you shall find an end.'",
      },
      {
        name: "Ocarina",
        id: 8,
        section: 3,
        position: 22,
        margin: "22%",
        widthInt: 11,
        width: "11%",
        bottom: "12%",
        img: "lv2_ocarina.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt:
          "Oh, what a pretty ocarina. It has 7 holes, and each hole is marked with the note it plays and a number. They read '1A', '2B', '3C', and so on. I'm sure it makes a beautiful sound!",
      },
      {
        name: "Camera",
        id: 9,
        section: 1,
        position: 65,
        margin: "65%",
        widthInt: 14,
        width: "14%",
        bottom: "10%",
        img: "lv2_camera.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt:
          "A pretty cool, old-fashioned looking camera. Oh, and there are photos on the ground right next to it. No way, is that the Riddler as a child? He looks so innocent! He's just sitting at a desk in a classroom. Aw, he looks kinda sad. But he gets no sympathy from me!",
      },
      {
        name: "Envelope",
        id: 10,
        section: 1,
        position: 30,
        margin: "30%",
        widthInt: 10,
        width: "10%",
        bottom: "9%",
        img: "lv2_envelope.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt:
          "You open the glossy wax seal, but there's nothing inside the envelope. Inscribed on the inside of the envelope, however, are the numbers '18 9 44 12 5 18'.",
      },
      {
        name: "AA Batteries",
        id: 11,
        section: 1,
        position: 10,
        margin: "10%",
        widthInt: 9,
        width: "9%",
        bottom: "12%",
        img: "lv2_batteries.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt:
          "Great! Batteries to charge my flashlight! Lemme just pop them in here...oh no. The flashlight uses AAA's. Darn.",
      },
      {
        name: "Notebook",
        id: 12,
        section: 3,
        position: 65,
        margin: "65%",
        widthInt: 14,
        width: "14%",
        bottom: "6%",
        img: "lv2_notebook.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt:
          "A classic marble notebook. All the pages are blank, but the cover reads: 'Name: The Riddler / Class: Algebra 1'. Oh, there are some doodles, too. Never knew the Riddler was an artist...",
      },
    ],
    [
      {
        name: "Aqua Door of Truth",
        id: 13,
        section: 2,
        position: 8,
        margin: "8%",
        widthInt: 45,
        width: "45%",
        bottom: "5%",
        img: "lv3_door.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 1,
        prompt: "Spring turned from tranquil to chill. Summer turned from smiles to sorrows. Fall turned from beauty to ruin. Winter turned from innocence to monstrous. Tell me the name of the winter’s wrath.",
        isLevelTransitionPuzzle: true,
        puzzleAnswer: "tempest",
        isPuzzleCompleted: false, 
      },
      {
        name: "Coral Reef",
        id: 14,
        section: 3,
        position: 56,
        margin: "56%",
        widthInt: 30,
        width: "30%",
        bottom: "8%",
        img: "lv3_coralreef.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 3,
        prompt: "When you put your ear close to it, you can hear something moving somewhere in the coral reef. What should you use to get to the source of the sound? ",
        puzzleAnswer: "Fish Food",
        isPuzzleCompleted: false, 
        puzzleAnsweredText: "AWWW a cute fish swam out of the reef to eat the fish food! And it's wearing a funny, little hat. I think it likes me! It's following me around! I can see it in my inventory.",
      },
      {
        name: "Fish Food",
        id: 15,
        section: 1,
        position: 10,
        margin: "10%",
        widthInt: 7,
        width: "7%",
        bottom: "10%",
        img: "lv3_fishfood.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "Aw, it's a little can of fish food. Reminds me of the fishies I had as a child. Maybe I can make some new fish friends with this!",
        chosenItemTextCorrect: "Yes! That sound from the reef must be coming from a fish! Using this fish food will let the fish come to me without disturbing the reef.",
      },
      {
        name: "Fishing Rod and Bobber",
        id: 16,
        section: 3,
        position: 70,
        margin: "70%",
        widthInt: 25,
        width: "25%",
        bottom: "5%",
        img: "lv3_fishingrod.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "Oooo, what a nice, sturdy fishing rod. I wish it had a prettier-looking lure at the end, but I guess a basic bobber will suffice.",
        chosenItemTextFalse: "It seemed like I could use the fishing rod to hook whatever's in the reef, but the stupid bobber keeps pulling the fishing line towards the surface! Now I lost a soul point.",
      },
      {
        name: "Mallet",
        id: 17,
        section: 2,
        position: 75,
        margin: "75%",
        widthInt: 12,
        width: "12%",
        bottom: "8%",
        img: "lv3_mallet.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "Now that's a mallet, alright. Like something outta a video game. Nice, wide ends perfect for a controlled smash.",
        chosenItemTextFalse: "I can't smash an endangered coral reef with this mallet! That would harm an entire ecosystem! Now I lost a soul point.",
      },
      {
        name: "Sleek Shovel",
        id: 18,
        section: 2,
        position: 65,
        margin: "65%",
        widthInt: 25,
        width: "25%",
        bottom: "10%",
        img: "lv3_shovel.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "I never thought a shovel would capture my admiration, but it just happened. It's as sleek as a racecar. Perfect for digging in the sand and maybe for poking and prodding with that pointy end.",
        chosenItemTextFalse: "I can't go carelessly prodding with this shovel! That would put an entire ecosystem at risk! Now I lost a soul point.",
      },
      {
        name: "Ghost of Spring",
        id: 19,
        section: 3,
        position: 25,
        margin: "25%",
        widthInt: 20,
        width: "20%",
        bottom: "0%",
        img: "sprites/lv3_spring.png",
        isInteractable: false,
        filter: null,
        itemType: "character",
        dialogueSprite: "lv3_spring.png",
        spriteAlt: "A majestic ghost with pink flower petal hair and dress",
        dialogue: [
          {
            name: "Ghost of Spring",
            text: "Our village's cherry blossoms were so cute and pretty. Bright clouds of pink that always bloomed in the spring. But that one year, the temperature was way too cold, and they never opened up. That was a sign of what was to come. ",
            color: "spring",
          },
        ],
      },
      {
        name: "Ghost of Summer",
        id: 20,
        section: 1,
        position: 60,
        margin: "60%",
        widthInt: 20,
        width: "20%",
        bottom: "0%",
        img: "sprites/lv3_summer.png",
        isInteractable: false,
        filter: null,
        itemType: "character",
        dialogueSprite: "lv3_summer.png",
        spriteAlt: "A majestic ghost with yellow flower petal hair and dress",
        dialogue: [
          {
            name: "Ghost of Summer",
            text: "Oh, summer was a jolly time, indeed. Each year, all the youths frolicked to the pier and raced up that lighthouse at the shore. They pretended it was a tower of sorts, a dungeon, and the first to reach the top won. That was always but a temporary activity, and yet there was one poor, little boy who sat by the lighthouse by himself all year, waiting for the ocean to return to him something he lost. It must've been of great importance to him.",
            color: "summer",
          },
        ],
      },
      {
        name: "Ghost of Autumn",
        id: 21,
        section: 1,
        position: 20,
        margin: "20%",
        widthInt: 20,
        width: "20%",
        bottom: "0%",
        img: "sprites/lv3_autumn.png",
        isInteractable: false,
        filter: null,
        itemType: "character",
        dialogueSprite: "lv3_autumn.png",
        spriteAlt: "A majestic ghost with orange flower petal hair and dress",
        dialogue: [
          {
            name: "Ghost of Autumn",
            text: "When autumn came, the leaves fell down and so did the trees. Everything slowly began to crumble in our midst. For many, it was tempting to just give up. Only one dared to find the truth—a meteorologist determined to build a machine that would save the town. Her invention was complete, yet she wasn't able to use it.",
            color: "autumn",
          },
          {
            name: "Me",
            text: "Why not?",
            color: "protagonist"
          },
          {
            name: "Ghost of Autumn",
            text: "To work, the machine needed to be turned on at the place of highest elevation, which was the lighthouse by the shore. But there was one little boy who always sat next to the lighthouse, and the shockwaves from the machine would've put him in danger.",
            color: "autumn",
          },
          {
            name: "Me",
            text: "So this meteorologist sacrificed the lives of the entire village because she was too nice to talk some sense into one stubborn child? How stupid can you be...",
            color: "protagonist",
          },
          {
            name: "Ghost of Autumn",
            text: "Not exactly. I suggest you talk to Winter herself to find out more.",
            color: "autumn",
          },
          {
            name: "Me",
            text: "I haven't seen her anywhere, though.",
            color: "protagonist",
          },
          {
            name: "Ghost of Autumn",
            text: "Ah, yeah. We haven't seen her for a while. I think she's still trying to come to terms with the incident. But if you can find the thing she was so desperately looking for in her last moments alive, she may reappear.",
            color: "autumn",
          },
        ],
      },
    ],
    [
      {
        name: "Bright Lantern",
        id: 24,
        section: 1,
        position: 60,
        margin: "60%",
        widthInt: 20,
        width: "20%",
        bottom: "18%",
        img: "lv1_lantern.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 3,
        isLevelTransitionPuzzle: false,
        isPuzzleCompleted: false,
        prompt:
          "It's a lantern with a bright flame. Do you remember what it can be used for?",
        puzzleAnswer: "Blank Scroll",
        puzzleAnsweredText:
          "When held up to the light of the lantern, the secret message written in lemon juice on the scroll revealed itself! It reads: 'They say math and music have a lot in common. Let the notes find order in chronology.'",
      },
      {
        name: "Blank Scroll",
        id: 25,
        section: 1,
        position: 30,
        margin: "30%",
        widthInt: 10,
        width: "10%",
        bottom: "7%",
        img: "lv1_paper.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "This scroll was super helpful way back. Lemme open it... Oh. Nothing written inside. I feel like this happened before, didn't it?",
        chosenItemTextCorrect: "Aw yeah! Still got it!",
      },
      {
        name: "Shiny Prism",
        id: 26,
        section: 2,
        position: 2,
        margin: "2%",
        widthInt: 10,
        width: "10%",
        bottom: "13%",
        img: "lv1_prism.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "Ooo it refracts the moonlight so nicely.",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Painting",
        id: 27,
        section: 1,
        position: 40,
        margin: "40%",
        widthInt: 19,
        width: "19%",
        bottom: "12%",
        img: "lv1_painting.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "Still a painting of the same guy, but the date was replaced! Now, it says 'January 34th'. That's not even a real date. Could it mean something?",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Large Feather",
        id: 28,
        section: 1,
        position: 40,
        margin: "40%",
        widthInt: 15,
        width: "15%",
        bottom: "5%",
        img: "lv1_feather.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "Nothing much to say about the feather. Still large, still light.",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Ocarina",
        id: 29,
        section: 2,
        position: 5,
        margin: "5%",
        widthInt: 11,
        width: "11%",
        bottom: "8%",
        img: "lv2_ocarina.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "It looks like the ocarina from level 2, but it's a bit different! This ocarina has 8 holes, which means it can play 8 notes! Ahh, I bet it sounds pretty, but I have no time to try playing it! ",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Camera",
        id: 30,
        section: 1,
        position: 30,
        margin: "30%",
        widthInt: 14,
        width: "14%",
        bottom: "5%",
        img: "lv2_camera.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "Oh, what is this? The camera is the same but the photo on the ground is different. Wait, is that me? The Riddler was taking pictures of me?? What a perv.",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Envelope",
        id: 31,
        section: 1,
        position: 50,
        margin: "50%",
        widthInt: 7,
        width: "7%",
        bottom: "0%",
        img: "lv2_envelope.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "The envelope has a slip of paper with a new set of numbers this time! It reads: '6310'.",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "AA Batteries",
        id: 32,
        section: 1,
        position: 25,
        margin: "25%",
        widthInt: 9,
        width: "9%",
        bottom: "12%",
        img: "lv2_batteries.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "These batteries were definitely not helpful...",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Notebook",
        id: 33,
        section: 1,
        position: 48,
        margin: "48%",
        widthInt: 10,
        width: "10%",
        bottom: "0%",
        img: "lv2_notebook.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "The notebook wasn't too helpful to be honest.",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Fish Food",
        id: 34,
        section: 1,
        position: 45,
        margin: "45%",
        widthInt: 7,
        width: "7%",
        bottom: "10%",
        img: "lv3_fishfood.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "I'm not in the ocean anymore, but the fish food was really helpful then, right? Lemme check inside... Oh! The fish food is gone, but there is a slip of paper that has the number '118'.",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Fishing Rod and Bobber",
        id: 35,
        section: 1,
        position: 51,
        margin: "51%",
        widthInt: 25,
        width: "25%",
        bottom: "5%",
        img: "lv3_fishingrod.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "Bobber? I hardly even know her! Sorry.",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Mallet",
        id: 36,
        section: 1,
        position: 35,
        margin: "35%",
        widthInt: 12,
        width: "12%",
        bottom: "8%",
        img: "lv3_mallet.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "I highly doubt this will be helpful.",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Sleek Shovel",
        id: 37,
        section: 1,
        position: 24,
        margin: "24%",
        widthInt: 25,
        width: "25%",
        bottom: "10%",
        img: "lv3_shovel.png",
        isInteractable: false,
        filter: null,
        itemType: "object",
        prompt: "The shovel is still very sleek, but I don't think it was or will be very useful.",
        chosenItemTextFalse: "Aghh it's not right! How did I solve this last time??",
      },
      {
        name: "Ghost of Spring",
        id: 38,
        section: 1,
        position: 0,
        margin: "0%",
        widthInt: 20,
        width: "20%",
        bottom: "0%",
        img: "sprites/lv3_spring.png",
        isInteractable: false,
        filter: null,
        itemType: "character",
        dialogueSprite: "lv3_spring.png",
        spriteAlt: "A majestic ghost with pink flower petal hair and dress.",
        dialogue: [
          {
            name: "Ghost of Spring",
            text: "Shhh. Don't tell the Riddler I was here.",
            color: "spring",
          },
          {
            name: "Me",
            text: "Of course. Lips sealed.",
            color: "protagonist",
          },
          {
            name: "Ghost of Spring",
            text: "*Smiles* Thanks. Oh, and I suggest you look for the items that helped you most in the past. They'll likely be the most helpful ones now.",
            color: "spring",
          },
          {
            name: "Me",
            text: "The items most helpful in the past, huh? Hmmm...",
            color: "protagonist",
          },
        ],
      },
      {
        name: "Piano",
        id: 39,
        section: 3,
        position: 70,
        margin: "70%",
        widthInt: 30,
        width: "30%",
        bottom: "2%",
        img: "lv4_piano.png",
        isInteractable: false,
        filter: null,
        itemType: "puzzle",
        puzzleType: 2,
        prompt: "While it looks like a classic grand piano from the outside, this is a self-playing piano that seems to operate off of a short melody that the pianist inputs. What notes should the piano play?",
        isLevelTransitionPuzzle: true,
        buttonChoices: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"],
        puzzleAnswer: "cdd♯fdab♭g",
        isPuzzleCompleted: false, 
       },
       {
       intro: true,
       name: "Riddler",
       id: 40,
       section: 2,
       position: 40,
       margin: "40%",
       widthInt: 22,
       width: "22%",
       bottom: "0%",
       img: "sprites/sprite_dialogue_riddl.png",
       isInteractable: false,
       filter: null,
       itemType: "character",
       dialogueSprite: "sprite_dialogue_riddl.png",
       spriteAlt: "The spooky silhouette from earlier is a purple-haired character with a top hat and purple suit.",
       dialogue: levelFourIntro,
      },
    ],
    [
      {
        intro: true,
        name: "Riddler",
        id: 42,
        section: 2,
        position: 45,
        margin: "45%",
        widthInt: 22,
        width: "22%",
        bottom: "0%",
        img: "sprites/sprite_dialogue_riddl.png",
        isInteractable: false,
        filter: null,
        itemType: "character",
        dialogueSprite: "sprite_dialogue_riddl.png",
        spriteAlt: "The spooky silhouette from earlier is a purple-haired character with a top hat and purple suit.",
        dialogue: epilogue,
       },
    ]
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
  widthInt: Number,
  width: "(widthInt)%",
  bottom: "x%",
  img: ".png",
  isInteractable: false,
  filter: null,
  itemType: "object",
  prompt: "",
  chosenItemTextCorrect: "if right", 
  chosenItemTextFalse: "if wrong"
},

Character: 
{
  name: "",
  id: 1,
  section: 1/2/3,
  position: 0,
  margin: "(position)%",
  widthInt: Number,
  width: "(widthInt)%",
  bottom: "x%",
  img: "sprites/.png",
  isInteractable: false,
  filter: null,
  itemType: "character",
  dialogueSprite: ".png",
  spriteAlt: "",
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
  widthInt: Number,
  width: "(widthInt)%",
  bottom: "x%",
  img: ".png",
  isInteractable: false,
  filter: null,
  itemType: "puzzle",
  puzzleType: 1/2/3,
  prompt: "pre-solve text",
  isLevelTransitionPuzzle: true/false, //not required
  buttonChoices: [], //puzzle 2 only
  puzzleAnswer: "",
  isPuzzleCompleted: false, 
  puzzleAnsweredText: "post-solve text",
},
*/
