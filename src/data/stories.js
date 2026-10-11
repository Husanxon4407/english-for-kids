// Story Time. Each story is told by Bobo in about a minute, one short
// sentence at a time, and every sentence has its own moment on the stage:
// that is a "beat".
//
//   line    what Bobo says (also shown as a caption for grown-ups)
//   say     the same words in short pieces, each with a mood, so the telling
//           has feeling: see scripts/lib/acting.mjs for the moods
//   uz      the same in Uzbek, for the Uzbek helper
//   scene   the backdrop (components/Scenes.jsx); stays until a beat changes it
//   actors  who is on the stage. An actor is drawn from the picture with its
//           `id` ("bobo" is Bobo) and keeps its place in the list from beat
//           to beat by `id` (or `key`, when two share a picture), so it
//           glides from its old spot to the new one.
//             x, y   centre, in percent of the 4:3 stage
//             size   width, in percent of the stage
//             from   how it arrives the first time: left, right, top (default: pops up)
//             act    what it does: hop, bounce, dance, wiggle, sway, sleep, wave (Bobo)
//             flip   face the other way
//             gone   shrink away to nothing at x, y (eaten, hidden)
//             delay  seconds to wait before moving, to match the words
//   fx      effects over the stage: rain, hearts, sparkle, notes, confetti, night
//   sfx     a sound: munch, boing, knock, chime; `sfxAt` is when, in milliseconds
//
// After changing any text run `npm run voice` and `npm run voice:uz`.

const bobo = (x, y, more = {}) => ({ id: 'bobo', x, y, size: 20, ...more })

export const stories = [
  {
    id: 'puppy',
    title: 'The Lost Puppy',
    cover: 'dog',
    color: '#8fd16a',
    uz: "Yo'qolgan kuchukcha haqida ertak.",
    beats: [
      {
        scene: 'garden',
        line: 'This is Bobo. And this is his little dog.',
        say: [['This is Bobo.', 'happy'], ['And this is his little dog.', 'calm']],
        uz: 'Bu Bobo. Bu esa uning kichkina kuchukchasi.',
        actors: [bobo(24, 66), { id: 'dog', x: 50, y: 74, size: 18, from: 'right' }],
      },
      {
        line: 'The dog loves to play. Jump, jump, jump!',
        say: [['The dog loves to play.', 'happy'], ['Jump, jump, jump!', 'excited']],
        uz: "Kuchukcha o'ynashni yaxshi ko'radi. Sakra, sakra!",
        sfx: 'boing',
        actors: [bobo(24, 66), { id: 'dog', x: 50, y: 72, size: 18, act: 'bounce' }, { id: 'ball', x: 68, y: 80, size: 11, from: 'right', act: 'hop' }],
      },
      {
        line: 'Oh no! Where is the dog? The dog is hiding!',
        say: [['Oh no!', 'worried'], ['Where is the dog?', 'asking'], ['The dog is hiding!', 'surprised']],
        uz: 'Voy! Kuchukcha qani? Kuchukcha yashirinib oldi!',
        actors: [bobo(30, 66, { act: 'wiggle' }), { id: 'dog', x: 76, y: 46, size: 18, gone: true }, { id: 'ball', x: 68, y: 80, size: 11 }],
      },
      {
        line: 'Is this the dog? No! It is a cat. Meow!',
        say: [['Is this the dog?', 'asking'], ['No!', 'surprised'], ['It is a cat.', 'calm'], ['Meow!', 'tiny']],
        uz: 'Bu kuchukchami? Yo‘q! Bu mushuk. Miyov!',
        actors: [bobo(26, 66), { id: 'cat', x: 50, y: 74, size: 19, from: 'left', act: 'wiggle' }, { id: 'ball', x: 68, y: 80, size: 11 }],
      },
      {
        line: 'Is this the dog? No! It is a duck. Quack, quack!',
        say: [['Is this the dog?', 'asking'], ['No!', 'surprised'], ['It is a duck.', 'calm'], ['Quack, quack!', 'funny']],
        uz: 'Bu kuchukchami? Yo‘q! Bu o‘rdak. G‘aq-g‘aq!',
        actors: [bobo(22, 66), { id: 'cat', x: 42, y: 76, size: 17 }, { id: 'duck', x: 62, y: 78, size: 17, from: 'right', act: 'wiggle' }, { id: 'ball', x: 84, y: 82, size: 10 }],
      },
      {
        line: 'Look up! A little bird is in the tree.',
        say: [['Look up!', 'excited'], ['A little bird is in the tree.', 'calm']],
        uz: 'Yuqoriga qara! Daraxtda kichkina qush bor.',
        actors: [bobo(22, 66, { flip: true }), { id: 'cat', x: 42, y: 76, size: 17 }, { id: 'duck', x: 60, y: 78, size: 17 }, { id: 'bird', x: 74, y: 22, size: 13, from: 'top', act: 'hop' }],
      },
      {
        line: 'Tweet, tweet! says the bird. The dog is here!',
        say: [['Tweet, tweet!', 'tiny'], ['says the bird.', 'calm'], ['The dog is here!', 'excited']],
        uz: 'Chiq-chiq! deydi qush. Kuchukcha shu yerda!',
        actors: [bobo(22, 66, { flip: true }), { id: 'cat', x: 42, y: 76, size: 17 }, { id: 'duck', x: 58, y: 78, size: 17 }, { id: 'bird', x: 74, y: 22, size: 13, act: 'wiggle' }, { id: 'dog', x: 86, y: 62, size: 14 }],
      },
      {
        line: 'Woof, woof! Here is the dog!',
        say: [['Woof, woof!', 'low'], ['Here is the dog!', 'excited']],
        uz: 'Vov-vov! Mana kuchukcha!',
        sfx: 'chime',
        fx: ['hearts'],
        actors: [bobo(26, 66, { act: 'hop' }), { id: 'cat', x: 60, y: 78, size: 15 }, { id: 'duck', x: 76, y: 80, size: 15 }, { id: 'bird', x: 74, y: 22, size: 13 }, { id: 'dog', x: 44, y: 72, size: 20, act: 'bounce' }],
      },
      {
        scene: 'room',
        line: 'Now the dog is sleepy. Here is the bed.',
        say: [['Now the dog is sleepy.', 'soft'], ['Here is the bed.', 'calm']],
        uz: 'Endi kuchukchaning uyqusi keldi. Mana karavot.',
        actors: [bobo(22, 68), { id: 'bed', x: 62, y: 62, size: 40 }, { id: 'dog', x: 40, y: 78, size: 16 }],
      },
      {
        scene: 'night',
        line: 'Good night, little dog. Sleep well!',
        say: [['Good night, little dog.', 'soft'], ['Sleep well!', 'soft']],
        uz: 'Xayrli tun, kuchukcha. Yaxshi uxla!',
        actors: [bobo(22, 68, { act: 'wave' }), { id: 'bed', x: 62, y: 62, size: 40 }, { id: 'dog', x: 64, y: 57, size: 15, act: 'sleep' }],
      },
    ],
  },
  {
    id: 'picnic',
    title: "Bobo's Picnic",
    cover: 'banana',
    color: '#f87171',
    uz: 'Boboning sayri haqida ertak.',
    beats: [
      {
        scene: 'hill',
        line: 'It is a sunny day. The sun is big and yellow.',
        say: [['It is a sunny day.', 'happy'], ['The sun is big and yellow.', 'calm']],
        uz: 'Bugun quyoshli kun. Quyosh katta va sariq.',
        actors: [{ id: 'sun', x: 80, y: 18, size: 24, act: 'sway' }],
      },
      {
        line: 'Bobo is on the green hill. Time for a picnic!',
        say: [['Bobo is on the green hill.', 'calm'], ['Time for a picnic!', 'excited']],
        uz: 'Bobo yashil tepalikda. Sayr vaqti keldi!',
        actors: [{ id: 'sun', x: 80, y: 18, size: 22 }, bobo(50, 52, { from: 'left', act: 'hop' })],
      },
      {
        line: 'A red apple. A yellow banana. And purple grapes!',
        say: [['A red apple.', 'calm'], ['A yellow banana.', 'calm'], ['And purple grapes!', 'happy']],
        uz: 'Qizil olma. Sariq banan. Va binafsha uzum!',
        actors: [
          { id: 'sun', x: 80, y: 18, size: 22 },
          bobo(50, 50),
          { id: 'apple', x: 28, y: 84, size: 13, from: 'top' },
          { id: 'banana', x: 50, y: 86, size: 13, from: 'top' },
          { id: 'grapes', x: 72, y: 84, size: 13, from: 'top' },
        ],
      },
      {
        line: 'Here comes the cat. Here comes the duck. Hello, friends!',
        say: [['Here comes the cat.', 'calm'], ['Here comes the duck.', 'calm'], ['Hello, friends!', 'happy']],
        uz: "Mana mushuk keldi. Mana o'rdak keldi. Salom, do'stlar!",
        actors: [
          { id: 'sun', x: 80, y: 18, size: 22 },
          bobo(50, 50, { act: 'wave' }),
          { id: 'cat', x: 14, y: 66, size: 18, from: 'left' },
          { id: 'duck', x: 86, y: 68, size: 17, from: 'right' },
          { id: 'apple', x: 28, y: 84, size: 13 },
          { id: 'banana', x: 50, y: 86, size: 13 },
          { id: 'grapes', x: 72, y: 84, size: 13 },
        ],
      },
      {
        line: 'The cat is hungry. The cat eats the apple. Crunch, crunch!',
        say: [['The cat is hungry.', 'calm'], ['The cat eats the apple.', 'calm'], ['Crunch, crunch!', 'big']],
        uz: 'Mushukning qorni och. Mushuk olmani yeydi. Qars-qurs!',
        sfx: 'munch',
        sfxAt: 3200,
        actors: [
          { id: 'sun', x: 80, y: 18, size: 22 },
          bobo(50, 50),
          { id: 'cat', x: 16, y: 66, size: 20, act: 'wiggle' },
          { id: 'duck', x: 86, y: 68, size: 17 },
          { id: 'apple', x: 16, y: 70, size: 13, gone: true, delay: 2.2 },
          { id: 'banana', x: 50, y: 86, size: 13 },
          { id: 'grapes', x: 72, y: 84, size: 13 },
        ],
      },
      {
        line: 'The duck eats the grapes. Yum, yum, yum!',
        say: [['The duck eats the grapes.', 'calm'], ['Yum, yum, yum!', 'funny']],
        uz: "O'rdak uzumni yeydi. Mazali, mazali!",
        sfx: 'munch',
        sfxAt: 1700,
        actors: [
          { id: 'sun', x: 80, y: 18, size: 22 },
          bobo(50, 50),
          { id: 'cat', x: 16, y: 66, size: 18 },
          { id: 'duck', x: 84, y: 68, size: 19, act: 'wiggle' },
          { id: 'banana', x: 50, y: 86, size: 13 },
          { id: 'grapes', x: 82, y: 70, size: 13, gone: true, delay: 0.6 },
        ],
      },
      {
        line: 'And Bobo eats the banana. Mmm! I like bananas!',
        say: [['And Bobo eats the banana.', 'calm'], ['Mmm! I like bananas!', 'bobo']],
        uz: 'Bobo esa bananni yeydi. Mmm! Men bananni yaxshi ko‘raman!',
        sfx: 'munch',
        sfxAt: 1900,
        actors: [
          { id: 'sun', x: 80, y: 18, size: 22 },
          bobo(50, 50, { act: 'hop' }),
          { id: 'cat', x: 16, y: 66, size: 18 },
          { id: 'duck', x: 84, y: 68, size: 17 },
          { id: 'banana', x: 50, y: 54, size: 13, gone: true, delay: 0.8 },
        ],
      },
      {
        line: 'Oh! Drip, drop. Drip, drop. It is rain!',
        say: [['Oh!', 'surprised'], ['Drip, drop.', 'soft'], ['Drip, drop.', 'soft'], ['It is rain!', 'worried']],
        uz: "Voy! Tomchi, tomchi. Yomg'ir yog'yapti!",
        fx: ['rain'],
        actors: [
          { id: 'sun', x: 80, y: 18, size: 22, gone: true },
          { id: 'cloud', x: 70, y: 16, size: 34, from: 'right' },
          bobo(50, 50, { act: 'wiggle' }),
          { id: 'cat', x: 16, y: 66, size: 18, act: 'wiggle' },
          { id: 'duck', x: 84, y: 68, size: 17 },
        ],
      },
      {
        line: 'Bobo has a big umbrella. Come here, friends!',
        say: [['Bobo has a big umbrella.', 'happy'], ['Come here, friends!', 'excited']],
        uz: "Boboda katta soyabon bor. Bu yoqqa keling, do'stlar!",
        fx: ['rain'],
        actors: [
          { id: 'cloud', x: 70, y: 16, size: 34 },
          { id: 'umbrella', x: 50, y: 34, size: 46, from: 'top' },
          bobo(50, 58),
          { id: 'cat', x: 34, y: 68, size: 16 },
          { id: 'duck', x: 66, y: 70, size: 15 },
        ],
      },
      {
        line: 'The rain stops. Look! A rainbow!',
        say: [['The rain stops.', 'calm'], ['Look!', 'excited'], ['A rainbow!', 'excited']],
        uz: "Yomg'ir to'xtadi. Qara! Kamalak!",
        sfx: 'chime',
        fx: ['sparkle'],
        actors: [
          { id: 'cloud', x: 120, y: 16, size: 34 },
          { id: 'rainbow', x: 50, y: 22, size: 56 },
          { id: 'umbrella', x: 50, y: 34, size: 46, gone: true },
          bobo(50, 58, { act: 'hop' }),
          { id: 'cat', x: 28, y: 68, size: 17, act: 'hop' },
          { id: 'duck', x: 72, y: 70, size: 16, act: 'hop' },
        ],
      },
      {
        line: 'What a happy day! Bye-bye!',
        say: [['What a happy day!', 'happy'], ['Bye-bye!', 'happy']],
        uz: 'Qanday baxtli kun! Xayr!',
        fx: ['hearts'],
        actors: [
          { id: 'rainbow', x: 50, y: 22, size: 56 },
          { id: 'sun', x: 84, y: 16, size: 18 },
          bobo(50, 58, { act: 'wave' }),
          { id: 'cat', x: 28, y: 68, size: 17, act: 'dance' },
          { id: 'duck', x: 72, y: 70, size: 16, act: 'dance' },
        ],
      },
    ],
  },
  {
    id: 'party',
    title: 'The Birthday Party',
    cover: 'cat',
    color: '#a78bfa',
    uz: "Tug'ilgan kun haqida ertak.",
    beats: [
      {
        scene: 'party',
        line: "Today is the cat's birthday. Happy birthday, cat!",
        say: [["Today is the cat's birthday.", 'happy'], ['Happy birthday, cat!', 'excited']],
        uz: "Bugun mushukning tug'ilgan kuni. Tug'ilgan kuning bilan, mushuk!",
        fx: ['confetti'],
        actors: [{ id: 'cat', x: 50, y: 64, size: 24, act: 'hop' }, { id: 'hat', x: 50, y: 40, size: 14, act: 'hop' }],
      },
      {
        line: 'Knock, knock! Who is it?',
        say: [['Knock, knock!', 'big'], ['Who is it?', 'asking']],
        uz: 'Taq-taq! Kim u?',
        sfx: 'knock',
        actors: [{ id: 'cat', x: 40, y: 64, size: 22, flip: true }, { id: 'hat', x: 40, y: 42, size: 13 }, { id: 'door', x: 86, y: 54, size: 24, from: 'right', act: 'wiggle' }],
      },
      {
        line: 'It is the dog! The dog has a red ball.',
        say: [['It is the dog!', 'excited'], ['The dog has a red ball.', 'calm']],
        uz: "Bu kuchuk! Kuchukda qizil koptok bor.",
        actors: [
          { id: 'cat', x: 36, y: 64, size: 22 },
          { id: 'hat', x: 36, y: 42, size: 13 },
          { id: 'door', x: 88, y: 54, size: 24 },
          { id: 'dog', x: 64, y: 68, size: 19, from: 'right', act: 'hop' },
          { id: 'ball', x: 52, y: 80, size: 11, from: 'right' },
        ],
      },
      {
        line: 'Knock, knock! It is the lion! The lion has a teddy bear.',
        say: [['Knock, knock!', 'big'], ['It is the lion!', 'excited'], ['The lion has a teddy bear.', 'calm']],
        uz: 'Taq-taq! Bu sher! Sherda ayiqcha bor.',
        sfx: 'knock',
        actors: [
          { id: 'cat', x: 30, y: 64, size: 21 },
          { id: 'hat', x: 30, y: 43, size: 12 },
          { id: 'door', x: 88, y: 54, size: 24, act: 'wiggle' },
          { id: 'dog', x: 12, y: 70, size: 17 },
          { id: 'ball', x: 14, y: 86, size: 10 },
          { id: 'lion', x: 66, y: 66, size: 21, from: 'right', act: 'hop' },
          { id: 'teddy', x: 50, y: 80, size: 13, from: 'right' },
        ],
      },
      {
        line: 'Knock, knock! It is the cow! The cow has ice cream.',
        say: [['Knock, knock!', 'big'], ['It is the cow!', 'excited'], ['The cow has ice cream.', 'calm']],
        uz: 'Taq-taq! Bu sigir! Sigirda muzqaymoq bor.',
        sfx: 'knock',
        actors: [
          { id: 'cat', x: 34, y: 62, size: 20 },
          { id: 'hat', x: 34, y: 42, size: 12 },
          { id: 'door', x: 90, y: 54, size: 22, act: 'wiggle' },
          { id: 'dog', x: 10, y: 70, size: 16 },
          { id: 'ball', x: 12, y: 86, size: 10 },
          { id: 'lion', x: 54, y: 64, size: 19 },
          { id: 'teddy', x: 44, y: 82, size: 12 },
          { id: 'cow', x: 74, y: 66, size: 19, from: 'right', act: 'hop' },
          { id: 'icecream', x: 62, y: 82, size: 12, from: 'right' },
        ],
      },
      {
        line: 'One, two, three! Three friends at the party.',
        say: [['One, two, three!', 'happy'], ['Three friends at the party.', 'calm']],
        uz: "Bir, ikki, uch! Bayramda uchta do'st.",
        actors: [
          { id: 'cat', x: 14, y: 68, size: 18 },
          { id: 'hat', x: 14, y: 49, size: 11 },
          { id: 'dog', x: 38, y: 70, size: 18 },
          { id: 'one', x: 38, y: 40, size: 14 },
          { id: 'lion', x: 60, y: 68, size: 19 },
          { id: 'two', x: 60, y: 38, size: 14 },
          { id: 'cow', x: 84, y: 68, size: 18 },
          { id: 'three', x: 84, y: 38, size: 14 },
          { id: 'icecream', x: 50, y: 86, size: 11 },
          { id: 'ball', x: 26, y: 88, size: 9 },
          { id: 'teddy', x: 72, y: 88, size: 11 },
        ],
      },
      {
        line: 'Bounce, bounce! The ball goes up and down.',
        say: [['Bounce, bounce!', 'excited'], ['The ball goes up and down.', 'calm']],
        uz: "Sakra, sakra! Koptok yuqoriga va pastga uchadi.",
        sfx: 'boing',
        actors: [
          { id: 'cat', x: 14, y: 68, size: 18 },
          { id: 'hat', x: 14, y: 49, size: 11 },
          { id: 'dog', x: 34, y: 70, size: 18, act: 'hop' },
          { id: 'lion', x: 66, y: 68, size: 19 },
          { id: 'cow', x: 86, y: 68, size: 18 },
          { id: 'ball', x: 50, y: 72, size: 13, act: 'bounce' },
          { id: 'icecream', x: 76, y: 88, size: 11 },
          { id: 'teddy', x: 24, y: 88, size: 11 },
        ],
      },
      {
        line: 'The cat eats the ice cream. Mmm, yummy!',
        say: [['The cat eats the ice cream.', 'calm'], ['Mmm, yummy!', 'bobo']],
        uz: 'Mushuk muzqaymoqni yeydi. Mmm, mazali!',
        sfx: 'munch',
        sfxAt: 1700,
        actors: [
          { id: 'cat', x: 50, y: 62, size: 24, act: 'wiggle' },
          { id: 'hat', x: 50, y: 38, size: 14 },
          { id: 'dog', x: 16, y: 72, size: 17 },
          { id: 'lion', x: 82, y: 70, size: 18 },
          { id: 'cow', x: 32, y: 78, size: 15 },
          { id: 'icecream', x: 50, y: 68, size: 11, gone: true, delay: 0.6 },
        ],
      },
      {
        line: "Now let's dance! La, la, la!",
        say: [["Now let's dance!", 'excited'], ['La, la, la!', 'happy']],
        uz: "Endi raqsga tushamiz! Lya, lya, lya!",
        fx: ['notes'],
        actors: [
          { id: 'cat', x: 50, y: 62, size: 22, act: 'dance' },
          { id: 'hat', x: 50, y: 40, size: 13, act: 'dance' },
          { id: 'dog', x: 14, y: 70, size: 18, act: 'dance' },
          { id: 'lion', x: 86, y: 68, size: 19, act: 'dance' },
          { id: 'cow', x: 32, y: 74, size: 17, act: 'dance' },
          bobo(68, 70, { from: 'right', act: 'dance', size: 17 }),
        ],
      },
      {
        line: 'Happy birthday, little cat! Bye-bye!',
        say: [['Happy birthday, little cat!', 'happy'], ['Bye-bye!', 'happy']],
        uz: "Tug'ilgan kuning bilan, mushukcha! Xayr!",
        fx: ['confetti', 'hearts'],
        actors: [
          { id: 'cat', x: 50, y: 62, size: 26, act: 'hop' },
          { id: 'hat', x: 50, y: 37, size: 15, act: 'hop' },
          { id: 'dog', x: 14, y: 70, size: 18 },
          { id: 'lion', x: 86, y: 68, size: 19 },
          { id: 'cow', x: 30, y: 74, size: 17 },
          bobo(70, 70, { act: 'wave', size: 17 }),
        ],
      },
    ],
  },
]

export function getStory(id) {
  return stories.find((s) => s.id === id)
}
