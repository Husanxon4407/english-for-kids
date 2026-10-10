// Story Time. Each story is a few scenes; in every scene Bobo tells a little
// of the story and then asks the child to find something they already know —
// the same words as the worlds, but in a new place.
//
// Items are placed on a 4:3 stage: `x` and `y` are the left and top edge and
// `size` is the width, all in percent of the stage.
// `uz` is the Uzbek helper line for that part of the story.
// After changing any text run `npm run voice` and `npm run voice:uz`.

export const stories = [
  {
    id: 'puppy',
    title: 'The Lost Puppy',
    cover: 'dog',
    color: '#8fd16a',
    uz: "Boboning kuchukchasi yo'qolib qoldi. Unga yordam beramiz!",
    scenes: [
      {
        scene: 'garden',
        lines: ['Bobo has a little dog.', 'Oh no! The dog is hiding!'],
        uz: 'Kuchukcha qayerda? Uni top!',
        prompt: 'Where is the dog?',
        target: 'dog',
        items: [
          { id: 'bird', x: 63, y: 9, size: 15 },
          { id: 'cat', x: 6, y: 52, size: 24 },
          { id: 'dog', x: 38, y: 58, size: 22 },
          { id: 'duck', x: 72, y: 64, size: 22 },
        ],
        reward: ['Woof woof!', "It's a dog!"],
      },
      {
        scene: 'garden',
        lines: ['The dog wants to play.'],
        uz: "Kuchukcha o'ynamoqchi. Koptok qayerda?",
        prompt: 'Where is the ball?',
        target: 'ball',
        items: [
          { id: 'dog', x: 5, y: 50, size: 26 },
          { id: 'car', x: 38, y: 64, size: 20 },
          { id: 'ball', x: 62, y: 50, size: 18 },
          { id: 'teddy', x: 80, y: 62, size: 18 },
        ],
        reward: ['Bounce, bounce!', 'Great job!'],
      },
      {
        scene: 'room',
        lines: ['Now the dog is sleepy.'],
        uz: 'Kuchukchaning uyqusi keldi. Karavotni top!',
        prompt: 'Find the bed!',
        target: 'bed',
        items: [
          { id: 'lamp', x: 4, y: 30, size: 20 },
          { id: 'chair', x: 28, y: 44, size: 22 },
          { id: 'bed', x: 52, y: 42, size: 30 },
          { id: 'dog', x: 82, y: 62, size: 16 },
        ],
        reward: ['Yes!', "It's a bed!"],
      },
    ],
    ending: {
      scene: 'night',
      lines: ['Good night, little dog!', 'Bye-bye!'],
      uz: 'Xayrli tun, kuchukcha!',
      items: [
        { id: 'bed', x: 30, y: 38, size: 40 },
        { id: 'dog', x: 44, y: 34, size: 18 },
      ],
    },
  },
  {
    id: 'picnic',
    title: "Bobo's Picnic",
    cover: 'banana',
    color: '#f87171',
    uz: 'Bugun havo ochiq. Bobo sayrga chiqdi!',
    scenes: [
      {
        scene: 'hill',
        lines: ["It's a sunny day!", "Let's have a picnic!"],
        uz: "Quyosh qayerda? Uni ko'rsat!",
        prompt: 'Show me the sun!',
        target: 'sun',
        items: [
          { id: 'cloud', x: 6, y: 6, size: 26 },
          { id: 'bird', x: 42, y: 20, size: 13 },
          { id: 'sun', x: 68, y: 3, size: 26 },
        ],
        reward: ['Yes!', "It's the sun!"],
      },
      {
        scene: 'hill',
        lines: ['Bobo is hungry.'],
        uz: 'Boboning qorni och. Unga banan ber!',
        prompt: 'Give me a banana!',
        target: 'banana',
        items: [
          { id: 'apple', x: 14, y: 62, size: 17 },
          { id: 'grapes', x: 34, y: 66, size: 17 },
          { id: 'banana', x: 54, y: 62, size: 17 },
          { id: 'pear', x: 73, y: 66, size: 17 },
        ],
        reward: ['Thank you! I like bananas!'],
      },
      {
        scene: 'hill',
        lines: ['Oh! Drip drop!', "It's rain!"],
        uz: "Yomg'ir yog'di. Kamalakni ko'rsat!",
        prompt: 'Show me the rainbow!',
        target: 'rainbow',
        items: [
          { id: 'rain', x: 5, y: 4, size: 26 },
          { id: 'rainbow', x: 36, y: 6, size: 30 },
          { id: 'cloud', x: 72, y: 8, size: 24 },
        ],
        reward: ['Beautiful!', "It's a rainbow!"],
      },
    ],
    ending: {
      scene: 'hill',
      lines: ['What a happy day!', 'Bye-bye!'],
      uz: 'Qanday ajoyib kun!',
      items: [
        { id: 'rainbow', x: 30, y: 4, size: 40 },
        { id: 'sun', x: 76, y: 4, size: 20 },
      ],
    },
  },
  {
    id: 'party',
    title: 'The Birthday Party',
    cover: 'cat',
    color: '#a78bfa',
    uz: "Bugun mushukchaning tug'ilgan kuni!",
    scenes: [
      {
        scene: 'party',
        lines: ["It's the cat's birthday!"],
        uz: 'Mushukni top!',
        prompt: 'Find the cat!',
        target: 'cat',
        items: [
          { id: 'lion', x: 5, y: 48, size: 22 },
          { id: 'duck', x: 29, y: 56, size: 20 },
          { id: 'cat', x: 52, y: 48, size: 22 },
          { id: 'cow', x: 76, y: 50, size: 21 },
        ],
        reward: ['Meow!', 'Happy birthday, cat!'],
      },
      {
        scene: 'party',
        lines: ['Here is a present!'],
        uz: "Mana sovg'a! Ayiqcha qayerda?",
        prompt: 'Where is the teddy bear?',
        target: 'teddy',
        items: [
          { id: 'train', x: 5, y: 56, size: 22 },
          { id: 'teddy', x: 30, y: 50, size: 21 },
          { id: 'doll', x: 54, y: 52, size: 20 },
          { id: 'blocks', x: 77, y: 56, size: 20 },
        ],
        reward: ["It's a teddy bear!", 'Wow!'],
      },
      {
        scene: 'party',
        lines: ["Let's count the stars!"],
        uz: 'Yulduzlarni sanaymiz. Uch raqamini top!',
        prompt: 'Find number three!',
        target: 'three',
        items: [
          { id: 'five', x: 10, y: 48, size: 22 },
          { id: 'one', x: 39, y: 50, size: 22 },
          { id: 'three', x: 68, y: 48, size: 22 },
        ],
        reward: ['Three stars!', 'Fantastic!'],
      },
      {
        scene: 'party',
        lines: ['The cat loves you!'],
        uz: 'Yurakni top!',
        prompt: 'Find the heart!',
        target: 'heart',
        items: [
          { id: 'star', x: 10, y: 50, size: 21 },
          { id: 'heart', x: 40, y: 48, size: 21 },
          { id: 'circle', x: 70, y: 50, size: 21 },
        ],
        reward: ["It's a heart!", 'Well done!'],
      },
    ],
    ending: {
      scene: 'party',
      lines: ['Happy birthday!', 'Bye-bye!'],
      uz: "Tug'ilgan kuning bilan!",
      items: [
        { id: 'cat', x: 36, y: 44, size: 28 },
        { id: 'heart', x: 66, y: 40, size: 14 },
      ],
    },
  },
]

export function getStory(id) {
  return stories.find((s) => s.id === id)
}
