// Story Time. Each story is told in about a minute, one short sentence at a
// time, and every sentence has its own moment on the stage: that is a "beat".
// The stage acts out exactly what is said, so a child who does not know the
// words yet can still follow the story by watching.
//
//   line    what is said (also shown as a caption for grown-ups)
//   say     the same words in short pieces, each with a mood, so the telling
//           has feeling: see scripts/generate-voice-story.mjs for the moods
//   uz      the same in Uzbek, for the Uzbek helper
//   scene   the backdrop (components/Scenes.jsx); stays until a beat changes it
//   camera  [x, y, zoom]: move in close to what the sentence is about
//   actors  who is on the stage. An actor is drawn from the picture with its
//           `id` ("bobo" is Bobo) and keeps its place in the list from beat
//           to beat by `id` (or `key`, when two share a picture), so it
//           walks or glides from its old spot to the new one.
//             x, y   centre, in percent of the 4:3 stage
//             size   width, in percent of the stage
//             from   how it arrives the first time: left, right, top, rise,
//                    fall, grow (default: pops up)
//             run    move fast (a run instead of a walk)
//             act    what it does: hop, bounce, joy, dance, wiggle, sway, spin,
//                    shiver, nod, no (shakes its head), peek, chew, knock,
//                    fly, yawn, glow, roll, sleep, wave (Bobo); `actAt` is
//                    when it starts, in seconds
//             feel   a thought bubble: love, ask, wow, happy, sad, sleepy,
//                    hungry, music, idea; `feelAt` is when it pops up
//             hold   things it holds or wears: [{ id, x, y, size, rot }] in
//                    percent of the actor's own box; they move along with it
//             eaten  walk to x, y (a mouth) and get eaten, bite by bite
//             gone   shrink away to nothing at x, y (hidden, flown away)
//             mood   Bobo's face: happy, wow, sad, sleepy, eat
//             arms   Bobo's arms: up or clap
//             talk   Bobo's mouth moves while this sentence is spoken
//             delay  seconds to wait before arriving or moving, to match the words
//             z      draw in front of (or behind) others; normally lower on the
//                    stage is in front
//   fx      effects over the stage: rain, hearts, sparkle, notes, confetti, lights
//   sfx     a sound (munch, boing, knock, chime, pop, tweet, whoosh) at
//           `sfxAt` milliseconds, or a list of [sound, milliseconds]
//
// After changing any spoken text run `npm run voice:story` and `npm run voice:uz`.

const bobo = (x, y, more = {}) => ({ id: 'bobo', x, y, size: 20, ...more })

// The bush the puppy hides behind, in the garden.
const BUSH = { id: 'bush', x: 82, y: 72, size: 28 }

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
        sfx: [['whoosh', 1500]],
        actors: [
          bobo(26, 66, { act: 'wave', feel: 'happy', feelAt: 0.3 }),
          { id: 'dog', x: 50, y: 74, size: 18, from: 'right', delay: 1.4, feel: 'love', feelAt: 2.8 },
          BUSH,
        ],
      },
      {
        line: 'The dog loves to play. Jump, jump, jump!',
        say: [['The dog loves to play.', 'happy'], ['Jump, jump, jump!', 'excited']],
        uz: "Kuchukcha o'ynashni yaxshi ko'radi. Sakra, sakra!",
        sfx: [['boing', 1900], ['boing', 2600], ['boing', 3300]],
        actors: [
          bobo(26, 66, { act: 'nod' }),
          { id: 'dog', x: 50, y: 72, size: 18, act: 'joy', actAt: 1.7 },
          { id: 'ball', x: 66, y: 80, size: 10, from: 'right', act: 'bounce' },
          BUSH,
        ],
      },
      {
        line: 'Oh no! Where is the dog? The dog is hiding!',
        say: [['Oh no!', 'worried'], ['Where is the dog?', 'asking'], ['The dog is hiding!', 'surprised']],
        uz: 'Voy! Kuchukcha qani? Kuchukcha yashirinib oldi!',
        sfx: [['whoosh', 200]],
        actors: [
          bobo(30, 66, { mood: 'sad', act: 'shiver', feel: 'ask', feelAt: 1.2 }),
          // Behind the bush: only the tips of the ears show.
          { id: 'dog', x: 80, y: 67, size: 15, run: true },
          { id: 'ball', x: 62, y: 82, size: 10 },
          BUSH,
        ],
      },
      {
        line: 'Is this the dog? No! It is a cat. Meow!',
        say: [['Is this the dog?', 'asking'], ['No!', 'surprised'], ['It is a cat.', 'calm'], ['Meow!', 'tiny']],
        uz: 'Bu kuchukchami? Yo‘q! Bu mushuk. Miyov!',
        actors: [
          bobo(24, 66, { feel: 'ask', feelAt: 0.2, act: 'no', actAt: 1.3 }),
          { id: 'cat', x: 50, y: 74, size: 19, from: 'left', act: 'wiggle', actAt: 2.6, feel: 'love', feelAt: 3 },
          { id: 'dog', x: 80, y: 67, size: 15 },
          { id: 'ball', x: 62, y: 82, size: 10 },
          BUSH,
        ],
      },
      {
        line: 'Is this the dog? No! It is a duck. Quack, quack!',
        say: [['Is this the dog?', 'asking'], ['No!', 'surprised'], ['It is a duck.', 'calm'], ['Quack, quack!', 'funny']],
        uz: 'Bu kuchukchami? Yo‘q! Bu o‘rdak. G‘aq-g‘aq!',
        actors: [
          bobo(20, 66, { feel: 'ask', feelAt: 0.2, act: 'no', actAt: 1.3 }),
          { id: 'cat', x: 38, y: 76, size: 17 },
          { id: 'duck', x: 58, y: 78, size: 17, from: 'right', act: 'wiggle', actAt: 2.6, feel: 'music', feelAt: 3 },
          { id: 'dog', x: 80, y: 67, size: 15 },
          { id: 'ball', x: 64, y: 88, size: 9 },
          BUSH,
        ],
      },
      {
        line: 'Look up! A little bird is in the tree.',
        say: [['Look up!', 'excited'], ['A little bird is in the tree.', 'calm']],
        uz: 'Yuqoriga qara! Daraxtda kichkina qush bor.',
        // Up close on the tree, where the bird lands.
        camera: [74, 22, 1.7],
        sfx: [['tweet', 2000]],
        actors: [
          bobo(20, 66, { flip: true, mood: 'wow' }),
          { id: 'cat', x: 38, y: 76, size: 17 },
          { id: 'duck', x: 58, y: 78, size: 17 },
          { id: 'bird', x: 72, y: 20, size: 11, from: 'top', delay: 0.6, act: 'hop', actAt: 1.6 },
          { id: 'dog', x: 80, y: 67, size: 15 },
          BUSH,
        ],
      },
      {
        line: 'Tweet, tweet! says the bird. The dog is here!',
        say: [['Tweet, tweet!', 'tiny'], ['says the bird.', 'calm'], ['The dog is here!', 'excited']],
        uz: 'Chiq-chiq! deydi qush. Kuchukcha shu yerda!',
        // From the bird down to the bush: the dog peeks out!
        camera: [68, 56, 1.2],
        sfx: [['tweet', 100], ['tweet', 900]],
        actors: [
          bobo(20, 66, { flip: true }),
          { id: 'cat', x: 38, y: 76, size: 17 },
          { id: 'duck', x: 58, y: 78, size: 17 },
          { id: 'bird', x: 72, y: 20, size: 11, act: 'fly', feel: 'idea', feelAt: 1.4 },
          { id: 'dog', x: 82, y: 66, size: 15, act: 'peek', actAt: 1.8 },
          BUSH,
        ],
      },
      {
        line: 'Woof, woof! Here is the dog!',
        say: [['Woof, woof!', 'low'], ['Here is the dog!', 'excited']],
        uz: 'Vov-vov! Mana kuchukcha!',
        sfx: [['whoosh', 300], ['chime', 1400]],
        fx: ['hearts'],
        actors: [
          bobo(26, 66, { act: 'joy', feel: 'love', feelAt: 1.2 }),
          { id: 'cat', x: 60, y: 80, size: 15 },
          { id: 'duck', x: 76, y: 82, size: 15 },
          { id: 'bird', x: 72, y: 20, size: 11, act: 'hop' },
          { id: 'dog', x: 44, y: 72, size: 20, run: true, act: 'joy', actAt: 0.8, feel: 'love', feelAt: 1 },
          BUSH,
        ],
      },
      {
        scene: 'room',
        line: 'Now the dog is sleepy. Here is the bed.',
        say: [['Now the dog is sleepy.', 'soft'], ['Here is the bed.', 'calm']],
        uz: 'Endi kuchukchaning uyqusi keldi. Mana karavot.',
        actors: [
          bobo(22, 68),
          { id: 'dog', x: 40, y: 78, size: 16, act: 'yawn', feel: 'sleepy', feelAt: 0.6 },
          { id: 'bed', x: 66, y: 62, size: 40, from: 'right', delay: 1.6 },
        ],
      },
      {
        scene: 'night',
        line: 'Good night, little dog. Sleep well!',
        say: [['Good night, little dog.', 'soft'], ['Sleep well!', 'soft']],
        uz: 'Xayrli tun, kuchukcha. Yaxshi uxla!',
        camera: [56, 60, 1.2],
        actors: [
          bobo(22, 68, { act: 'wave', mood: 'sleepy' }),
          { id: 'bed', x: 66, y: 62, size: 40 },
          { id: 'dog', x: 68, y: 56, size: 15, act: 'sleep' },
        ],
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
        camera: [74, 26, 1.5],
        actors: [{ id: 'sun', x: 78, y: 20, size: 26, from: 'rise', act: 'glow', actAt: 1.4 }],
      },
      {
        line: 'Bobo is on the green hill. Time for a picnic!',
        say: [['Bobo is on the green hill.', 'calm'], ['Time for a picnic!', 'excited']],
        uz: 'Bobo yashil tepalikda. Sayr vaqti keldi!',
        actors: [
          { id: 'sun', x: 82, y: 16, size: 20, act: 'glow' },
          bobo(46, 54, { from: 'left', act: 'joy', actAt: 1.8, feel: 'happy', feelAt: 2, hold: [{ id: 'basket', x: 96, y: 74, size: 52 }] }),
        ],
      },
      {
        line: 'A red apple. A yellow banana. And purple grapes!',
        say: [['A red apple.', 'calm'], ['A yellow banana.', 'calm'], ['And purple grapes!', 'happy']],
        uz: 'Qizil olma. Sariq banan. Va binafsha uzum!',
        // Each one drops onto the blanket as it is named.
        sfx: [['pop', 700], ['pop', 2000], ['pop', 3400]],
        actors: [
          { id: 'sun', x: 82, y: 16, size: 20 },
          bobo(46, 50),
          { id: 'basket', x: 66, y: 58, size: 13 },
          { id: 'apple', x: 28, y: 84, size: 13, from: 'fall', delay: 0.2 },
          { id: 'banana', x: 50, y: 86, size: 13, from: 'fall', delay: 1.5 },
          { id: 'grapes', x: 72, y: 84, size: 13, from: 'fall', delay: 2.9 },
        ],
      },
      {
        line: 'Here comes the cat. Here comes the duck. Hello, friends!',
        say: [['Here comes the cat.', 'calm'], ['Here comes the duck.', 'calm'], ['Hello, friends!', 'happy']],
        uz: "Mana mushuk keldi. Mana o'rdak keldi. Salom, do'stlar!",
        actors: [
          { id: 'sun', x: 82, y: 16, size: 20 },
          bobo(46, 50, { act: 'wave', actAt: 3 }),
          { id: 'basket', x: 66, y: 58, size: 13 },
          { id: 'cat', x: 14, y: 66, size: 18, from: 'left' },
          { id: 'duck', x: 86, y: 68, size: 17, from: 'right', delay: 1.5 },
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
          { id: 'sun', x: 82, y: 16, size: 20 },
          bobo(46, 50),
          { id: 'basket', x: 66, y: 58, size: 13 },
          { id: 'cat', x: 16, y: 66, size: 20, feel: 'hungry', feelAt: 0.2, act: 'chew', actAt: 3 },
          { id: 'duck', x: 86, y: 68, size: 17 },
          // The apple rolls to the cat's mouth, then is eaten bite by bite.
          { id: 'apple', x: 18, y: 69, size: 11, eaten: true, delay: 1.9 },
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
          { id: 'sun', x: 82, y: 16, size: 20 },
          bobo(46, 50),
          { id: 'basket', x: 66, y: 58, size: 13 },
          { id: 'cat', x: 16, y: 66, size: 18, feel: 'love' },
          { id: 'duck', x: 84, y: 68, size: 19, act: 'chew', actAt: 1.5, feel: 'love', feelAt: 2.8 },
          { id: 'banana', x: 50, y: 86, size: 13 },
          { id: 'grapes', x: 82, y: 71, size: 11, eaten: true, delay: 0.4 },
        ],
      },
      {
        line: 'And Bobo eats the banana. Mmm! I like bananas!',
        say: [['And Bobo eats the banana.', 'calm'], ['Mmm! I like bananas!', 'bobo']],
        uz: 'Bobo esa bananni yeydi. Mmm! Men bananni yaxshi ko‘raman!',
        sfx: 'munch',
        sfxAt: 1900,
        actors: [
          { id: 'sun', x: 82, y: 16, size: 20 },
          bobo(46, 50, { mood: 'eat', feel: 'love', feelAt: 2.8 }),
          { id: 'basket', x: 66, y: 58, size: 13 },
          { id: 'cat', x: 16, y: 66, size: 18 },
          { id: 'duck', x: 84, y: 68, size: 17 },
          { id: 'banana', x: 48, y: 56, size: 11, eaten: true, delay: 0.5 },
        ],
      },
      {
        line: 'Oh! Drip, drop. Drip, drop. It is rain!',
        say: [['Oh!', 'surprised'], ['Drip, drop.', 'soft'], ['Drip, drop.', 'soft'], ['It is rain!', 'worried']],
        uz: "Voy! Tomchi, tomchi. Yomg'ir yog'yapti!",
        fx: ['rain'],
        actors: [
          // The cloud slides over the sun and hides it.
          { id: 'sun', x: 82, y: 16, size: 20, gone: true, delay: 0.8 },
          { id: 'cloud', x: 76, y: 17, size: 38, from: 'right' },
          bobo(46, 50, { mood: 'wow', feel: 'wow', feelAt: 0.1, act: 'shiver', actAt: 1 }),
          { id: 'basket', x: 66, y: 58, size: 13 },
          { id: 'cat', x: 16, y: 66, size: 18, act: 'shiver', feel: 'sad', feelAt: 1.5 },
          // Ducks love rain!
          { id: 'duck', x: 84, y: 68, size: 17, act: 'joy', feel: 'happy', feelAt: 2 },
        ],
      },
      {
        line: 'Bobo has a big umbrella. Come here, friends!',
        say: [['Bobo has a big umbrella.', 'happy'], ['Come here, friends!', 'excited']],
        uz: "Boboda katta soyabon bor. Bu yoqqa keling, do'stlar!",
        fx: ['rain'],
        sfx: [['whoosh', 1900]],
        actors: [
          { id: 'cloud', x: 70, y: 17, size: 38 },
          bobo(50, 58, { hold: [{ id: 'umbrella', x: 50, y: -24, size: 230, back: true }] }),
          { id: 'basket', x: 66, y: 64, size: 12 },
          // The friends run in under the umbrella.
          { id: 'cat', x: 33, y: 68, size: 16, run: true, delay: 1.8, feel: 'love', feelAt: 3 },
          { id: 'duck', x: 69, y: 70, size: 15, run: true, delay: 2 },
        ],
      },
      {
        line: 'The rain stops. Look! A rainbow!',
        say: [['The rain stops.', 'calm'], ['Look!', 'excited'], ['A rainbow!', 'excited']],
        uz: "Yomg'ir to'xtadi. Qara! Kamalak!",
        sfx: [['chime', 1600]],
        fx: ['sparkle'],
        actors: [
          // The cloud floats away and the rainbow grows across the sky.
          { id: 'cloud', x: 130, y: 14, size: 38 },
          { id: 'rainbow', x: 50, y: 24, size: 60, from: 'grow', delay: 1.2 },
          bobo(50, 58, { act: 'joy', actAt: 1.4, mood: 'wow' }),
          { id: 'basket', x: 66, y: 64, size: 12 },
          { id: 'cat', x: 28, y: 68, size: 17, act: 'joy', actAt: 1.6 },
          { id: 'duck', x: 72, y: 70, size: 16, act: 'joy', actAt: 1.8 },
        ],
      },
      {
        line: 'What a happy day! Bye-bye!',
        say: [['What a happy day!', 'happy'], ['Bye-bye!', 'happy']],
        uz: 'Qanday baxtli kun! Xayr!',
        fx: ['hearts'],
        actors: [
          { id: 'rainbow', x: 50, y: 24, size: 60 },
          { id: 'sun', x: 84, y: 14, size: 18, from: 'rise', act: 'glow' },
          bobo(50, 58, { act: 'wave', feel: 'happy' }),
          { id: 'basket', x: 66, y: 64, size: 12 },
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
        sfx: [['chime', 1900]],
        actors: [
          { id: 'cat', x: 44, y: 62, size: 24, act: 'joy', actAt: 1.8, feel: 'happy', feelAt: 2.2, hold: [{ id: 'partyhat', x: 52, y: 2, size: 54, rot: -10 }] },
          { id: 'cake', x: 74, y: 78, size: 22, delay: 0.8 },
        ],
      },
      {
        line: 'Knock, knock! Who is it?',
        say: [['Knock, knock!', 'big'], ['Who is it?', 'asking']],
        uz: 'Taq-taq! Kim u?',
        sfx: 'knock',
        sfxAt: 200,
        actors: [
          { id: 'cat', x: 38, y: 64, size: 22, flip: true, feel: 'ask', feelAt: 1.4, hold: [{ id: 'partyhat', x: 52, y: 2, size: 54, rot: -10 }] },
          { id: 'cake', x: 20, y: 80, size: 20 },
          { id: 'door', x: 86, y: 54, size: 24, from: 'right', act: 'knock' },
        ],
      },
      {
        line: 'It is the dog! The dog has a red ball.',
        say: [['It is the dog!', 'excited'], ['The dog has a red ball.', 'calm']],
        uz: "Bu kuchuk! Kuchukda qizil koptok bor.",
        actors: [
          { id: 'cat', x: 36, y: 64, size: 22, feel: 'love', feelAt: 0.8, hold: [{ id: 'partyhat', x: 52, y: 2, size: 54, rot: -10 }] },
          { id: 'cake', x: 20, y: 80, size: 20 },
          { id: 'door', x: 88, y: 54, size: 24 },
          { id: 'dog', x: 64, y: 68, size: 19, from: 'right', act: 'joy', actAt: 1.4, hold: [{ id: 'ball', x: 24, y: 76, size: 58 }] },
        ],
      },
      {
        line: 'Knock, knock! It is the lion! The lion has a teddy bear.',
        say: [['Knock, knock!', 'big'], ['It is the lion!', 'excited'], ['The lion has a teddy bear.', 'calm']],
        uz: 'Taq-taq! Bu sher! Sherda ayiqcha bor.',
        sfx: 'knock',
        sfxAt: 200,
        actors: [
          { id: 'cat', x: 30, y: 64, size: 21, hold: [{ id: 'partyhat', x: 52, y: 2, size: 54, rot: -10 }] },
          { id: 'cake', x: 12, y: 82, size: 18 },
          { id: 'door', x: 88, y: 54, size: 24, act: 'knock' },
          { id: 'dog', x: 48, y: 72, size: 17, hold: [{ id: 'ball', x: 24, y: 76, size: 58 }] },
          { id: 'lion', x: 68, y: 66, size: 21, from: 'right', delay: 1.4, feel: 'love', feelAt: 3.6, hold: [{ id: 'teddy', x: 20, y: 72, size: 64 }] },
        ],
      },
      {
        line: 'Knock, knock! It is the cow! The cow has ice cream.',
        say: [['Knock, knock!', 'big'], ['It is the cow!', 'excited'], ['The cow has ice cream.', 'calm']],
        uz: 'Taq-taq! Bu sigir! Sigirda muzqaymoq bor.',
        sfx: 'knock',
        sfxAt: 200,
        actors: [
          { id: 'cat', x: 22, y: 62, size: 20, hold: [{ id: 'partyhat', x: 52, y: 2, size: 54, rot: -10 }] },
          { id: 'cake', x: 10, y: 84, size: 16 },
          { id: 'door', x: 90, y: 54, size: 22, act: 'knock' },
          { id: 'dog', x: 38, y: 74, size: 16, hold: [{ id: 'ball', x: 24, y: 76, size: 58 }] },
          { id: 'lion', x: 56, y: 66, size: 19, hold: [{ id: 'teddy', x: 20, y: 72, size: 64 }] },
          { id: 'cow', x: 76, y: 68, size: 19, from: 'right', delay: 1.4, act: 'nod', actAt: 3.4, hold: [{ id: 'icecream', x: 18, y: 70, size: 58 }] },
        ],
      },
      {
        line: 'One, two, three! Three friends at the party.',
        say: [['One, two, three!', 'happy'], ['Three friends at the party.', 'calm']],
        uz: "Bir, ikki, uch! Bayramda uchta do'st.",
        // A number pops up over each friend as it is counted.
        sfx: [['pop', 150], ['pop', 750], ['pop', 1350]],
        actors: [
          { id: 'cat', x: 14, y: 66, size: 18, hold: [{ id: 'partyhat', x: 52, y: 2, size: 54, rot: -10 }] },
          { id: 'cake', x: 10, y: 88, size: 14 },
          { id: 'dog', x: 38, y: 70, size: 18, hold: [{ id: 'ball', x: 24, y: 76, size: 58 }], act: 'joy', actAt: 0.1 },
          { id: 'one', x: 38, y: 38, size: 13, delay: 0.1 },
          { id: 'lion', x: 61, y: 68, size: 19, hold: [{ id: 'teddy', x: 20, y: 72, size: 64 }], act: 'joy', actAt: 0.7 },
          { id: 'two', x: 61, y: 36, size: 13, delay: 0.7 },
          { id: 'cow', x: 84, y: 68, size: 18, hold: [{ id: 'icecream', x: 18, y: 70, size: 58 }], act: 'joy', actAt: 1.3 },
          { id: 'three', x: 84, y: 36, size: 13, delay: 1.3 },
        ],
      },
      {
        line: 'Bounce, bounce! The ball goes up and down.',
        say: [['Bounce, bounce!', 'excited'], ['The ball goes up and down.', 'calm']],
        uz: "Sakra, sakra! Koptok yuqoriga va pastga uchadi.",
        sfx: [['boing', 300], ['boing', 1100], ['boing', 1900], ['boing', 2700]],
        actors: [
          { id: 'cat', x: 14, y: 66, size: 18, act: 'nod', hold: [{ id: 'partyhat', x: 52, y: 2, size: 54, rot: -10 }] },
          { id: 'cake', x: 10, y: 88, size: 14 },
          { id: 'dog', x: 34, y: 70, size: 18, act: 'hop' },
          { id: 'ball', x: 50, y: 74, size: 12, act: 'bounce' },
          { id: 'lion', x: 66, y: 68, size: 19, act: 'nod', hold: [{ id: 'teddy', x: 20, y: 72, size: 64 }] },
          { id: 'cow', x: 86, y: 68, size: 18, act: 'nod', hold: [{ id: 'icecream', x: 18, y: 70, size: 58 }] },
        ],
      },
      {
        line: 'The cat eats the ice cream. Mmm, yummy!',
        say: [['The cat eats the ice cream.', 'calm'], ['Mmm, yummy!', 'bobo']],
        uz: 'Mushuk muzqaymoqni yeydi. Mmm, mazali!',
        sfx: 'munch',
        sfxAt: 1700,
        camera: [50, 60, 1.3],
        actors: [
          { id: 'cat', x: 50, y: 62, size: 24, act: 'chew', actAt: 1.5, feel: 'love', feelAt: 2.6, hold: [{ id: 'partyhat', x: 52, y: 2, size: 54, rot: -10 }] },
          { id: 'cake', x: 10, y: 88, size: 14 },
          { id: 'dog', x: 18, y: 72, size: 17 },
          { id: 'ball', x: 28, y: 86, size: 9 },
          { id: 'lion', x: 82, y: 70, size: 18, hold: [{ id: 'teddy', x: 20, y: 72, size: 64 }] },
          { id: 'cow', x: 66, y: 74, size: 16 },
          // The cow gives the ice cream to the cat.
          { id: 'icecream', x: 52, y: 66, size: 13, eaten: true, delay: 0.3 },
        ],
      },
      {
        line: "Now let's dance! La, la, la!",
        say: [["Now let's dance!", 'excited'], ['La, la, la!', 'happy']],
        uz: "Endi raqsga tushamiz! Lya, lya, lya!",
        fx: ['lights', 'notes'],
        actors: [
          { id: 'cat', x: 50, y: 62, size: 22, act: 'dance', hold: [{ id: 'partyhat', x: 52, y: 2, size: 54, rot: -10 }] },
          { id: 'cake', x: 10, y: 88, size: 14 },
          { id: 'dog', x: 14, y: 70, size: 18, act: 'dance' },
          { id: 'ball', x: 28, y: 86, size: 9, act: 'roll' },
          { id: 'lion', x: 86, y: 68, size: 19, act: 'dance' },
          { id: 'cow', x: 32, y: 74, size: 17, act: 'spin' },
          bobo(68, 70, { from: 'right', act: 'dance', size: 17, feel: 'music', feelAt: 1.4 }),
        ],
      },
      {
        line: 'Happy birthday, little cat! Bye-bye!',
        say: [['Happy birthday, little cat!', 'happy'], ['Bye-bye!', 'happy']],
        uz: "Tug'ilgan kuning bilan, mushukcha! Xayr!",
        fx: ['confetti', 'hearts'],
        sfx: [['chime', 200]],
        actors: [
          { id: 'cat', x: 50, y: 62, size: 26, act: 'joy', feel: 'love', hold: [{ id: 'partyhat', x: 52, y: 2, size: 54, rot: -10 }] },
          { id: 'cake', x: 50, y: 88, size: 18 },
          { id: 'dog', x: 14, y: 70, size: 18, act: 'joy', actAt: 0.3 },
          { id: 'lion', x: 86, y: 68, size: 19, act: 'joy', actAt: 0.6 },
          { id: 'cow', x: 30, y: 74, size: 17, act: 'joy', actAt: 0.9 },
          bobo(70, 70, { act: 'wave', size: 17 }),
        ],
      },
    ],
  },
  {
    id: 'bus',
    title: 'The Big Bus Ride',
    cover: 'bus',
    color: '#facc15',
    uz: 'Katta avtobus sayohati haqida ertak.',
    beats: [
      {
        scene: 'street',
        line: 'Bobo is at the bus stop. He waits and waits.',
        say: [['Bobo is at the bus stop.', 'calm'], ['He waits and waits.', 'soft']],
        uz: 'Bobo avtobus bekatida. U kutadi va kutadi.',
        actors: [bobo(76, 66, { act: 'sway', actAt: 1.6, feel: 'ask', feelAt: 2 })],
      },
      {
        line: 'Here comes a car. Beep! Is it the bus? No!',
        say: [['Here comes a car.', 'calm'], ['Beep!', 'funny'], ['Is it the bus?', 'asking'], ['No!', 'surprised']],
        uz: "Mana mashina keldi. Bip! Bu avtobusmi? Yo'q!",
        sfx: [['boing', 1600]],
        actors: [bobo(76, 66, { act: 'no', actAt: 3.6 }), { id: 'car', x: 36, y: 82, size: 26, from: 'left' }],
      },
      {
        line: 'Here comes a big truck. Honk, honk! It is not the bus.',
        say: [['Here comes a big truck.', 'big'], ['Honk, honk!', 'low'], ['It is not the bus.', 'calm']],
        uz: 'Mana katta yuk mashinasi. Bip-bip! Bu avtobus emas.',
        actors: [
          bobo(76, 66, { mood: 'sad', act: 'no', actAt: 3.4 }),
          { id: 'car', x: -20, y: 82, size: 26, run: true },
          { id: 'truck', x: 40, y: 80, size: 32, from: 'left', delay: 0.6 },
        ],
      },
      {
        line: 'Look! A yellow bus! Hooray!',
        say: [['Look!', 'excited'], ['A yellow bus!', 'surprised'], ['Hooray!', 'excited']],
        uz: 'Qara! Sariq avtobus! Hurra!',
        fx: ['confetti'],
        sfx: [['chime', 1600]],
        actors: [
          bobo(78, 66, { act: 'joy', actAt: 1.6, feel: 'happy', feelAt: 1.8 }),
          { id: 'truck', x: -30, y: 80, size: 32, run: true },
          { id: 'bus', x: 42, y: 74, size: 44, from: 'left', delay: 0.3 },
        ],
      },
      {
        line: 'Bobo gets on the bus. The wheels go round and round!',
        say: [['Bobo gets on the bus.', 'happy'], ['The wheels go round and round!', 'excited']],
        uz: "Bobo avtobusga chiqadi. G'ildiraklar aylanadi va aylanadi!",
        sfx: [['whoosh', 2200]],
        actors: [
          { id: 'bus', x: 42, y: 74, size: 44 },
          // In the bus, at a window (z: in front of it).
          bobo(33, 66, { size: 11, z: 90, feel: 'happy', feelAt: 2 }),
        ],
      },
      {
        line: 'The bus goes past a taxi, a bike and a tractor.',
        say: [['The bus goes past a taxi,', 'calm'], ['a bike,', 'happy'], ['and a tractor.', 'calm']],
        uz: "Avtobus taksi, velosiped va traktor yonidan o'tadi.",
        actors: [
          { id: 'bus', x: 30, y: 74, size: 40 },
          bobo(22, 66, { size: 10, z: 90 }),
          { id: 'taxi', x: 62, y: 84, size: 20, from: 'right', delay: 0.4 },
          { id: 'bike', x: 78, y: 82, size: 16, from: 'right', delay: 1.6 },
          { id: 'tractor', x: 92, y: 80, size: 18, from: 'right', delay: 2.6 },
        ],
      },
      {
        scene: 'beach',
        line: 'Stop! Here is the sea. Bobo sees a boat.',
        say: [['Stop!', 'excited'], ['Here is the sea.', 'happy'], ['Bobo sees a boat.', 'calm']],
        uz: "To'xta! Mana dengiz. Bobo qayiqni ko'radi.",
        sfx: [['whoosh', 200]],
        actors: [
          { id: 'bus', x: 18, y: 78, size: 30 },
          bobo(42, 76, { feel: 'wow', feelAt: 2.6 }),
          { id: 'boat', x: 72, y: 46, size: 24, from: 'right', delay: 2, act: 'sway', actAt: 3 },
        ],
      },
      {
        line: 'Look up! A plane and a helicopter fly by. Whoosh!',
        say: [['Look up!', 'excited'], ['A plane and a helicopter fly by.', 'calm'], ['Whoosh!', 'funny']],
        uz: "Yuqoriga qara! Samolyot va vertolyot uchib o'tadi. Vuuush!",
        camera: [50, 30, 1.3],
        sfx: [['whoosh', 1600], ['whoosh', 3200]],
        actors: [
          { id: 'bus', x: 18, y: 78, size: 30 },
          bobo(42, 76, { flip: true, mood: 'wow' }),
          { id: 'boat', x: 72, y: 46, size: 24, act: 'sway' },
          { id: 'plane', x: 40, y: 14, size: 26, from: 'left', delay: 1.2, act: 'fly' },
          { id: 'helicopter', x: 76, y: 22, size: 20, from: 'right', delay: 2.2, act: 'fly' },
        ],
      },
      {
        line: 'What a fun ride! Bye-bye, bus!',
        say: [['What a fun ride!', 'happy'], ['Bye-bye, bus!', 'happy']],
        uz: 'Qanday qiziqarli sayohat! Xayr, avtobus!',
        fx: ['confetti', 'hearts'],
        actors: [
          bobo(50, 70, { act: 'wave', feel: 'love', feelAt: 0.6 }),
          { id: 'bus', x: 130, y: 78, size: 30, run: true, delay: 1.4 },
          { id: 'boat', x: 76, y: 46, size: 22, act: 'sway' },
        ],
      },
    ],
  },
  {
    id: 'sea',
    title: 'Splash at the Sea',
    cover: 'crab',
    color: '#2dd4bf',
    uz: 'Dengizdagi sarguzasht haqida ertak.',
    beats: [
      {
        scene: 'beach',
        line: 'Bobo goes to the sea. Splash, splash!',
        say: [['Bobo goes to the sea.', 'happy'], ['Splash, splash!', 'excited']],
        uz: 'Bobo dengizga boradi. Shalop-shalop!',
        sfx: [['whoosh', 1800]],
        actors: [bobo(30, 76, { from: 'left', act: 'joy', actAt: 1.8, feel: 'happy', feelAt: 2 })],
      },
      {
        line: 'A little crab walks on the sand. Snap, snap!',
        say: [['A little crab walks on the sand.', 'calm'], ['Snap, snap!', 'tiny']],
        uz: 'Qumda kichkina qisqichbaqa yuradi. Qars-qars!',
        sfx: [['knock', 2600]],
        actors: [bobo(30, 76, { feel: 'wow', feelAt: 1 }), { id: 'crab', x: 62, y: 84, size: 16, from: 'right', act: 'wiggle', actAt: 2.4 }],
      },
      {
        line: 'Look! A fish jumps out of the water.',
        say: [['Look!', 'excited'], ['A fish jumps out of the water.', 'happy']],
        uz: 'Qara! Baliq suvdan sakrab chiqadi.',
        sfx: [['boing', 1200]],
        actors: [
          bobo(30, 76, { flip: true }),
          { id: 'crab', x: 62, y: 84, size: 16 },
          { id: 'fish', x: 56, y: 44, size: 14, from: 'rise', delay: 0.8, act: 'hop', actAt: 1.2 },
        ],
      },
      {
        line: 'Here is a big turtle. It swims slowly.',
        say: [['Here is a big turtle.', 'calm'], ['It swims slowly.', 'soft']],
        uz: 'Mana katta toshbaqa. U sekin suzadi.',
        actors: [
          bobo(30, 76),
          { id: 'crab', x: 62, y: 84, size: 16 },
          { id: 'fish', x: 50, y: 50, size: 12, act: 'wiggle' },
          { id: 'turtle', x: 76, y: 52, size: 22, from: 'right', act: 'sway', actAt: 1.6 },
        ],
      },
      {
        line: 'And who is this? An octopus! It waves eight arms.',
        say: [['And who is this?', 'asking'], ['An octopus!', 'surprised'], ['It waves eight arms.', 'happy']],
        uz: "Bu kim? Sakkizoyoq! U sakkizta qo'lini silkitadi.",
        sfx: [['pop', 1500]],
        actors: [
          bobo(26, 76, { feel: 'ask', feelAt: 0.4, mood: 'wow' }),
          { id: 'crab', x: 64, y: 86, size: 14 },
          { id: 'turtle', x: 82, y: 52, size: 20 },
          { id: 'octopus', x: 52, y: 50, size: 22, from: 'rise', delay: 1, act: 'dance', actAt: 2.4 },
        ],
      },
      {
        line: 'Bobo finds a pretty shell in the sand.',
        say: [['Bobo finds a pretty shell in the sand.', 'happy']],
        uz: "Bobo qumdan chiroyli chig'anoq topadi.",
        camera: [36, 80, 1.6],
        sfx: [['chime', 1400]],
        fx: ['sparkle'],
        actors: [
          bobo(28, 76, { feel: 'wow', feelAt: 1.2 }),
          { id: 'shell', x: 42, y: 86, size: 10, from: 'grow', delay: 1 },
          { id: 'crab', x: 64, y: 86, size: 14 },
          { id: 'octopus', x: 52, y: 50, size: 20 },
        ],
      },
      {
        line: 'Listen! The shell sings the song of the sea.',
        say: [['Listen!', 'soft'], ['The shell sings the song of the sea.', 'soft']],
        uz: "Tingla! Chig'anoq dengiz qo'shig'ini kuylaydi.",
        fx: ['notes'],
        actors: [
          bobo(30, 74, { act: 'sway', feel: 'music', feelAt: 1, hold: [{ id: 'shell', x: 92, y: 40, size: 50 }] }),
          { id: 'crab', x: 64, y: 86, size: 14, act: 'dance' },
          { id: 'octopus', x: 52, y: 50, size: 20, act: 'sway' },
        ],
      },
      {
        line: 'A dolphin jumps! Splash! Everyone is happy.',
        say: [['A dolphin jumps!', 'excited'], ['Splash!', 'funny'], ['Everyone is happy.', 'happy']],
        uz: 'Delfin sakraydi! Shalop! Hamma xursand.',
        sfx: [['whoosh', 300], ['chime', 2200]],
        fx: ['confetti'],
        actors: [
          bobo(30, 74, { act: 'joy', actAt: 2, hold: [{ id: 'shell', x: 92, y: 40, size: 50 }] }),
          { id: 'dolphin', x: 62, y: 38, size: 24, from: 'rise', act: 'hop' },
          { id: 'crab', x: 64, y: 86, size: 14, act: 'joy', actAt: 2.4 },
          { id: 'octopus', x: 86, y: 54, size: 18, act: 'dance' },
        ],
      },
      {
        line: 'Bye-bye, sea friends! See you soon!',
        say: [['Bye-bye, sea friends!', 'happy'], ['See you soon!', 'happy']],
        uz: "Xayr, dengiz do'stlari! Ko'rishguncha!",
        fx: ['hearts'],
        actors: [
          bobo(30, 74, { act: 'wave', feel: 'love', feelAt: 0.8, hold: [{ id: 'shell', x: 92, y: 40, size: 50 }] }),
          { id: 'dolphin', x: 62, y: 40, size: 22, act: 'hop' },
          { id: 'crab', x: 64, y: 86, size: 14, act: 'wiggle' },
          { id: 'octopus', x: 86, y: 54, size: 18, act: 'sway' },
          { id: 'turtle', x: 44, y: 52, size: 16, from: 'right', act: 'sway' },
        ],
      },
    ],
  },
  {
    id: 'dressed',
    title: 'Bobo Gets Dressed',
    cover: 'coat',
    color: '#f472b6',
    uz: 'Bobo kiyinadi: ertak.',
    beats: [
      {
        scene: 'room',
        line: 'Brrr! It is cold today. Look, it is snowing!',
        say: [['Brrr!', 'worried'], ['It is cold today.', 'calm'], ['Look, it is snowing!', 'surprised']],
        uz: "Brrr! Bugun sovuq. Qara, qor yog'yapti!",
        actors: [bobo(40, 66, { act: 'shiver', mood: 'wow', feel: 'ask', feelAt: 2.4 }), { id: 'snow', x: 72, y: 30, size: 22, from: 'top', delay: 2.2 }],
      },
      {
        line: 'First, Bobo puts on his socks.',
        say: [['First,', 'calm'], ['Bobo puts on his socks.', 'happy']],
        uz: 'Avval Bobo paypoqlarini kiyadi.',
        sfx: [['pop', 1800]],
        actors: [bobo(40, 66, { hold: [{ id: 'socks', x: 50, y: 94, size: 40 }] }), { id: 'snow', x: 72, y: 30, size: 22 }],
      },
      {
        line: 'Then his boots. Stomp, stomp!',
        say: [['Then his boots.', 'calm'], ['Stomp, stomp!', 'funny']],
        uz: 'Keyin etiklarini. Gup-gup!',
        sfx: [['knock', 1200], ['knock', 1700]],
        actors: [bobo(40, 66, { act: 'hop', actAt: 1.1, hold: [{ id: 'boots', x: 50, y: 94, size: 42 }] }), { id: 'snow', x: 72, y: 30, size: 22 }],
      },
      {
        line: 'Now his warm coat. So cosy!',
        say: [['Now his warm coat.', 'calm'], ['So cosy!', 'happy']],
        uz: 'Endi issiq paltosini. Juda iliq!',
        sfx: [['pop', 1000]],
        actors: [
          bobo(40, 66, { feel: 'love', feelAt: 1.8, hold: [{ id: 'coat', x: 50, y: 80, size: 52 }, { id: 'boots', x: 50, y: 94, size: 42 }] }),
          { id: 'snow', x: 72, y: 30, size: 22 },
        ],
      },
      {
        line: 'A scarf for his neck, and a hat for his head.',
        say: [['A scarf for his neck,', 'calm'], ['and a hat for his head.', 'happy']],
        uz: "Bo'yniga sharf, boshiga shlyapa.",
        sfx: [['pop', 600], ['pop', 2300]],
        actors: [
          bobo(40, 66, {
            hold: [
              { id: 'coat', x: 50, y: 80, size: 52 },
              { id: 'boots', x: 50, y: 94, size: 42 },
              { id: 'scarf', x: 50, y: 64, size: 56 },
              { id: 'hat', x: 52, y: 0, size: 62, rot: -8 },
            ],
          }),
          { id: 'snow', x: 72, y: 30, size: 22 },
        ],
      },
      {
        scene: 'snow',
        line: 'Ready! Now Bobo can play in the snow. Hooray!',
        say: [['Ready!', 'excited'], ['Now Bobo can play in the snow.', 'happy'], ['Hooray!', 'excited']],
        uz: "Tayyor! Endi Bobo qorda o'ynashi mumkin. Hurra!",
        fx: ['confetti'],
        actors: [
          bobo(36, 68, {
            act: 'joy',
            actAt: 0.4,
            feel: 'happy',
            feelAt: 0.6,
            hold: [
              { id: 'coat', x: 50, y: 80, size: 52 },
              { id: 'boots', x: 50, y: 94, size: 42 },
              { id: 'scarf', x: 50, y: 64, size: 56 },
              { id: 'hat', x: 52, y: 0, size: 62, rot: -8 },
            ],
          }),
        ],
      },
      {
        line: 'He makes a big snowman. Hello, snowman!',
        say: [['He makes a big snowman.', 'happy'], ['Hello, snowman!', 'excited']],
        uz: 'U katta qorbobo yasaydi. Salom, qorbobo!',
        sfx: [['chime', 2000]],
        actors: [
          bobo(30, 68, {
            act: 'wave',
            actAt: 2,
            hold: [
              { id: 'coat', x: 50, y: 80, size: 52 },
              { id: 'boots', x: 50, y: 94, size: 42 },
              { id: 'scarf', x: 50, y: 64, size: 56 },
              { id: 'hat', x: 52, y: 0, size: 62, rot: -8 },
            ],
          }),
          { id: 'snowman', x: 64, y: 64, size: 28, from: 'grow', delay: 0.8, feel: 'love', feelAt: 2.4 },
        ],
      },
      {
        line: 'Warm and happy. What a lovely day!',
        say: [['Warm and happy.', 'soft'], ['What a lovely day!', 'happy']],
        uz: 'Iliq va xursand. Qanday ajoyib kun!',
        fx: ['hearts'],
        actors: [
          bobo(36, 68, {
            act: 'sway',
            feel: 'love',
            feelAt: 0.6,
            hold: [
              { id: 'coat', x: 50, y: 80, size: 52 },
              { id: 'boots', x: 50, y: 94, size: 42 },
              { id: 'scarf', x: 50, y: 64, size: 56 },
              { id: 'hat', x: 52, y: 0, size: 62, rot: -8 },
            ],
          }),
          { id: 'snowman', x: 64, y: 64, size: 28, act: 'sway' },
        ],
      },
    ],
  },
  {
    id: 'egg',
    title: 'The Dino Egg',
    cover: 'egg',
    color: '#22c55e',
    uz: 'Dinozavr tuxumi haqida ertak.',
    beats: [
      {
        scene: 'jungle',
        line: 'Bobo is in Dino Valley. Look! A big egg!',
        say: [['Bobo is in Dino Valley.', 'calm'], ['Look!', 'excited'], ['A big egg!', 'surprised']],
        uz: 'Bobo Dino vodiysida. Qara! Katta tuxum!',
        actors: [bobo(30, 70, { from: 'left', feel: 'wow', feelAt: 2.6, mood: 'wow' }), { id: 'egg', x: 60, y: 76, size: 16, from: 'grow', delay: 2.2 }],
      },
      {
        line: 'Knock, knock! The egg wiggles.',
        say: [['Knock, knock!', 'funny'], ['The egg wiggles.', 'surprised']],
        uz: 'Taq-taq! Tuxum qimirlaydi.',
        camera: [56, 72, 1.5],
        sfx: [['knock', 200], ['knock', 700]],
        actors: [bobo(34, 70, { feel: 'ask', feelAt: 1.6 }), { id: 'egg', x: 60, y: 76, size: 16, act: 'shiver', actAt: 1.4 }],
      },
      {
        line: 'Crack! A baby dinosaur! Hello, little one!',
        say: [['Crack!', 'big'], ['A baby dinosaur!', 'excited'], ['Hello, little one!', 'tiny']],
        uz: 'Qars! Kichkina dinozavr! Salom, kichkintoy!',
        fx: ['sparkle'],
        sfx: [['pop', 200], ['chime', 1200]],
        actors: [
          bobo(34, 70, { act: 'joy', actAt: 1.2, feel: 'love', feelAt: 1.4 }),
          { id: 'egg', x: 60, y: 76, size: 16, gone: true },
          { id: 'dinosaur', x: 60, y: 72, size: 18, from: 'grow', delay: 0.4, act: 'nod', actAt: 2.4 },
        ],
      },
      {
        line: 'The baby dinosaur is hungry. Here is some broccoli!',
        say: [['The baby dinosaur is hungry.', 'calm'], ['Here is some broccoli!', 'happy']],
        uz: 'Kichkina dinozavr och. Mana brokkoli!',
        sfx: [['munch', 3600]],
        actors: [
          bobo(34, 70),
          { id: 'dinosaur', x: 60, y: 72, size: 18, feel: 'hungry', feelAt: 0.6 },
          { id: 'broccoli', x: 56, y: 66, size: 10, eaten: true, delay: 2.2 },
        ],
      },
      {
        line: 'Yum! Now the baby wants to play. Stomp, stomp!',
        say: [['Yum!', 'happy'], ['Now the baby wants to play.', 'happy'], ['Stomp, stomp!', 'funny']],
        uz: "Mazali! Endi kichkintoy o'ynamoqchi. Gup-gup!",
        sfx: [['knock', 3000], ['knock', 3500]],
        actors: [
          bobo(30, 70, { act: 'joy', actAt: 2.8 }),
          { id: 'dinosaur', x: 56, y: 72, size: 18, act: 'joy', actAt: 2.8 },
          { id: 'footprint', x: 72, y: 88, size: 8, from: 'grow', delay: 3 },
          { id: 'footprint', key: 'print2', x: 84, y: 86, size: 8, from: 'grow', delay: 3.5 },
        ],
      },
      {
        line: 'Oh! Who is this? A big T-rex! Roar!',
        say: [['Oh!', 'surprised'], ['Who is this?', 'asking'], ['A big T-rex!', 'big'], ['Roar!', 'low']],
        uz: 'Voy! Bu kim? Katta T-reks! Rrrr!',
        sfx: [['boing', 3200]],
        actors: [
          bobo(24, 70, { act: 'shiver', mood: 'wow', feel: 'ask', feelAt: 0.8 }),
          { id: 'dinosaur', x: 46, y: 74, size: 16 },
          { id: 'trex', x: 76, y: 62, size: 34, from: 'right', delay: 1, act: 'nod', actAt: 3 },
        ],
      },
      {
        line: 'Don’t be scared. It is the baby’s mommy!',
        say: [['Don’t be scared.', 'soft'], ['It is the baby’s mommy!', 'happy']],
        uz: "Qo'rqma. Bu kichkintoyning onasi!",
        fx: ['hearts'],
        actors: [
          bobo(24, 70, { feel: 'happy', feelAt: 2 }),
          { id: 'dinosaur', x: 60, y: 74, size: 16, act: 'joy', actAt: 1.6 },
          { id: 'trex', x: 76, y: 62, size: 34, feel: 'love', feelAt: 1.8 },
        ],
      },
      {
        line: 'A pterodactyl flies over the volcano. Whoosh!',
        say: [['A pterodactyl flies over the volcano.', 'calm'], ['Whoosh!', 'funny']],
        uz: "Pterodaktil vulqon ustidan uchib o'tadi. Vuuush!",
        camera: [62, 30, 1.3],
        sfx: [['whoosh', 2600]],
        actors: [
          bobo(24, 70, { flip: true, mood: 'wow' }),
          { id: 'dinosaur', x: 60, y: 74, size: 16 },
          { id: 'trex', x: 76, y: 62, size: 34 },
          { id: 'pterodactyl', x: 70, y: 18, size: 22, from: 'left', delay: 0.6, act: 'fly' },
        ],
      },
      {
        line: 'Bye-bye, dinosaurs! Bobo has new friends.',
        say: [['Bye-bye, dinosaurs!', 'happy'], ['Bobo has new friends.', 'happy']],
        uz: "Xayr, dinozavrlar! Boboning yangi do'stlari bor.",
        fx: ['hearts', 'confetti'],
        actors: [
          bobo(28, 70, { act: 'wave', feel: 'love', feelAt: 1.6 }),
          { id: 'dinosaur', x: 54, y: 74, size: 16, act: 'joy' },
          { id: 'trex', x: 76, y: 62, size: 32, act: 'nod' },
          { id: 'pterodactyl', x: 70, y: 18, size: 20, act: 'fly' },
        ],
      },
    ],
  },
  {
    id: 'bugs',
    title: 'The Bug Hunt',
    cover: 'ladybug',
    color: '#a3e635',
    uz: 'Hasharot ovi haqida ertak.',
    beats: [
      {
        scene: 'garden',
        line: 'Bobo goes on a bug hunt. Shh! Let’s look.',
        say: [['Bobo goes on a bug hunt.', 'calm'], ['Shh!', 'soft'], ['Let’s look.', 'soft']],
        uz: "Bobo hasharot ovlashga chiqadi. Jim! Keling, qaraymiz.",
        actors: [bobo(24, 70, { from: 'left', feel: 'ask', feelAt: 2.6 })],
      },
      {
        line: 'Here is a ladybug. It is red with black spots.',
        say: [['Here is a ladybug.', 'happy'], ['It is red with black spots.', 'calm']],
        uz: "Mana xonqizi. U qizil, qora nuqtalari bor.",
        camera: [56, 80, 1.6],
        actors: [bobo(30, 70, { feel: 'wow', feelAt: 1 }), { id: 'ladybug', x: 56, y: 84, size: 10, from: 'grow', delay: 0.6, act: 'wiggle', actAt: 1.8 }],
      },
      {
        line: 'Buzz, buzz! A bee flies to a flower.',
        say: [['Buzz, buzz!', 'funny'], ['A bee flies to a flower.', 'calm']],
        uz: 'Bzz-bzz! Asalari gulga uchib keladi.',
        actors: [
          bobo(30, 70, { flip: true }),
          { id: 'ladybug', x: 56, y: 84, size: 10 },
          { id: 'bee', x: 50, y: 78, size: 11, from: 'top', act: 'fly' },
        ],
      },
      {
        line: 'A snail is very slow. Slowly, slowly.',
        say: [['A snail is very slow.', 'calm'], ['Slowly, slowly.', 'soft']],
        uz: 'Shilliqqurt juda sekin. Sekin, sekin.',
        actors: [
          bobo(30, 70, { act: 'yawn', actAt: 2.2 }),
          { id: 'ladybug', x: 56, y: 84, size: 10 },
          { id: 'bee', x: 50, y: 78, size: 11, act: 'fly' },
          { id: 'snail', x: 74, y: 84, size: 14, from: 'right', delay: 0.4, act: 'sway', actAt: 2 },
        ],
      },
      {
        line: 'Look! A caterpillar eats a leaf. Munch, munch!',
        say: [['Look!', 'excited'], ['A caterpillar eats a leaf.', 'calm'], ['Munch, munch!', 'funny']],
        uz: "Qara! Qurt barg yeydi. Qarsillatib, qarsillatib!",
        sfx: [['munch', 2800]],
        actors: [
          bobo(30, 70),
          { id: 'snail', x: 80, y: 86, size: 12 },
          { id: 'caterpillar', x: 58, y: 82, size: 16, from: 'right', act: 'chew', actAt: 2.6 },
        ],
      },
      {
        line: 'Oh! A spider! Bobo is a little scared.',
        say: [['Oh!', 'surprised'], ['A spider!', 'worried'], ['Bobo is a little scared.', 'worried']],
        uz: "Voy! O'rgimchak! Bobo biroz qo'rqdi.",
        actors: [
          bobo(26, 70, { act: 'shiver', actAt: 1.4, mood: 'sad' }),
          { id: 'caterpillar', x: 58, y: 84, size: 14 },
          { id: 'spider', x: 56, y: 30, size: 16, from: 'top', delay: 0.4 },
        ],
      },
      {
        line: 'But the spider says hello. It is friendly!',
        say: [['But the spider says hello.', 'calm'], ['It is friendly!', 'happy']],
        uz: "Lekin o'rgimchak salom beradi. U do'stona!",
        fx: ['hearts'],
        actors: [
          bobo(26, 70, { act: 'joy', actAt: 2.4, feel: 'happy', feelAt: 2.4 }),
          { id: 'caterpillar', x: 58, y: 84, size: 14 },
          { id: 'spider', x: 56, y: 34, size: 16, act: 'nod', actAt: 1, feel: 'love', feelAt: 1.4 },
        ],
      },
      {
        line: 'Look up! A butterfly! So many colors!',
        say: [['Look up!', 'excited'], ['A butterfly!', 'surprised'], ['So many colors!', 'happy']],
        uz: "Yuqoriga qara! Kapalak! Qancha ranglar!",
        fx: ['sparkle'],
        sfx: [['chime', 1400]],
        actors: [
          bobo(26, 70, { flip: true, mood: 'wow' }),
          { id: 'spider', x: 56, y: 34, size: 14 },
          { id: 'butterfly', x: 66, y: 26, size: 20, from: 'left', delay: 0.8, act: 'fly' },
        ],
      },
      {
        line: 'What a great bug hunt! Bye-bye, bugs!',
        say: [['What a great bug hunt!', 'happy'], ['Bye-bye, bugs!', 'happy']],
        uz: 'Qanday ajoyib ov! Xayr, hasharotlar!',
        fx: ['confetti'],
        actors: [
          bobo(30, 70, { act: 'wave', feel: 'love', feelAt: 0.8 }),
          { id: 'butterfly', x: 66, y: 26, size: 18, act: 'fly' },
          { id: 'ladybug', x: 56, y: 84, size: 10, act: 'wiggle' },
          { id: 'bee', x: 44, y: 80, size: 10, act: 'fly' },
          { id: 'snail', x: 80, y: 86, size: 12 },
        ],
      },
    ],
  },
  {
    id: 'school',
    title: 'Bobo Goes to School',
    cover: 'bag',
    color: '#3b82f6',
    uz: 'Bobo maktabga boradi: ertak.',
    beats: [
      {
        scene: 'room',
        line: 'Today is a big day. Bobo goes to school!',
        say: [['Today is a big day.', 'happy'], ['Bobo goes to school!', 'excited']],
        uz: 'Bugun katta kun. Bobo maktabga boradi!',
        actors: [bobo(36, 66, { act: 'joy', actAt: 1.8, feel: 'happy', feelAt: 2 }), { id: 'mom', x: 70, y: 60, size: 26, from: 'right' }],
      },
      {
        line: 'Mom puts a book and a pencil in his bag.',
        say: [['Mom puts a book and a pencil in his bag.', 'calm']],
        uz: "Oyi uning portfeliga kitob va qalam soladi.",
        sfx: [['pop', 1800], ['pop', 2600]],
        actors: [
          bobo(30, 66),
          { id: 'mom', x: 70, y: 60, size: 26 },
          { id: 'bag', x: 50, y: 80, size: 16, from: 'grow' },
          { id: 'book', x: 50, y: 80, size: 10, gone: true, delay: 1.6 },
          { id: 'pencil', x: 50, y: 80, size: 10, gone: true, delay: 2.4 },
        ],
      },
      {
        line: 'Bobo is a little shy.',
        say: [['Bobo is a little shy.', 'soft']],
        uz: 'Bobo biroz uyalyapti.',
        actors: [
          bobo(40, 66, { mood: 'sad', feel: 'ask', feelAt: 0.8, hold: [{ id: 'bag', x: 82, y: 58, size: 56 }] }),
          { id: 'mom', x: 70, y: 60, size: 26, feel: 'love', feelAt: 1.2 },
        ],
      },
      {
        scene: 'classroom',
        line: 'Here is the classroom. So many friends!',
        say: [['Here is the classroom.', 'calm'], ['So many friends!', 'surprised']],
        uz: "Mana sinf xonasi. Qancha do'stlar!",
        actors: [
          bobo(24, 70, { from: 'left', mood: 'wow', hold: [{ id: 'bag', x: 82, y: 58, size: 56 }] }),
          { id: 'brother', x: 58, y: 70, size: 20, from: 'right', delay: 1.6 },
          { id: 'friend', x: 82, y: 70, size: 24, from: 'right', delay: 2.2 },
        ],
      },
      {
        line: 'A girl says, Hello! Do you want to paint?',
        say: [['A girl says,', 'calm'], ['Hello!', 'tiny'], ['Do you want to paint?', 'asking']],
        uz: 'Bir qiz: Salom! Rasm chizasanmi? deydi.',
        actors: [
          bobo(24, 70, { feel: 'ask', feelAt: 3, hold: [{ id: 'bag', x: 82, y: 58, size: 56 }] }),
          { id: 'sister', x: 50, y: 70, size: 20, from: 'right', act: 'nod', actAt: 1.6, hold: [{ id: 'paint', x: 90, y: 70, size: 60 }] },
          { id: 'brother', x: 72, y: 72, size: 18 },
          { id: 'friend', x: 88, y: 72, size: 20 },
        ],
      },
      {
        line: 'They paint a big yellow sun together.',
        say: [['They paint a big yellow sun together.', 'happy']],
        uz: "Ular birga katta sariq quyosh chizishadi.",
        fx: ['sparkle'],
        sfx: [['chime', 1800]],
        actors: [
          bobo(30, 70, { act: 'nod', actAt: 0.8 }),
          { id: 'sister', x: 50, y: 70, size: 20, hold: [{ id: 'paint', x: 90, y: 70, size: 60 }] },
          { id: 'sun', x: 58, y: 30, size: 16, from: 'grow', delay: 1.4, act: 'glow', actAt: 2.4 },
          { id: 'brother', x: 72, y: 72, size: 18 },
        ],
      },
      {
        line: 'Now Bobo is not shy. He is happy!',
        say: [['Now Bobo is not shy.', 'calm'], ['He is happy!', 'excited']],
        uz: 'Endi Bobo uyalmaydi. U xursand!',
        fx: ['hearts'],
        actors: [
          bobo(30, 70, { act: 'joy', actAt: 1.8, feel: 'happy', feelAt: 1.8 }),
          { id: 'sister', x: 50, y: 70, size: 20, act: 'joy', actAt: 2 },
          { id: 'sun', x: 58, y: 30, size: 16, act: 'glow' },
          { id: 'brother', x: 72, y: 72, size: 18 },
        ],
      },
      {
        line: 'They sing a song and clap their hands.',
        say: [['They sing a song', 'happy'], ['and clap their hands.', 'happy']],
        uz: "Ular qo'shiq aytib, qarsak chalishadi.",
        fx: ['notes'],
        sfx: [['knock', 2200], ['knock', 2600]],
        actors: [
          bobo(30, 70, { act: 'dance', arms: 'clap' }),
          { id: 'sister', x: 50, y: 70, size: 20, act: 'dance' },
          { id: 'brother', x: 70, y: 72, size: 18, act: 'dance', actAt: 0.4 },
          { id: 'friend', x: 88, y: 72, size: 20, act: 'joy', actAt: 0.8 },
        ],
      },
      {
        line: 'School is fun! See you tomorrow!',
        say: [['School is fun!', 'excited'], ['See you tomorrow!', 'happy']],
        uz: "Maktab qiziqarli! Ertaga ko'rishguncha!",
        fx: ['confetti'],
        actors: [
          bobo(30, 70, { act: 'wave', feel: 'love', feelAt: 0.8, hold: [{ id: 'bag', x: 82, y: 58, size: 56 }] }),
          { id: 'sister', x: 50, y: 70, size: 20, act: 'joy' },
          { id: 'brother', x: 70, y: 72, size: 18, act: 'joy', actAt: 0.4 },
          { id: 'friend', x: 88, y: 72, size: 20, act: 'joy', actAt: 0.8 },
        ],
      },
    ],
  },
]

export function getStory(id) {
  return stories.find((s) => s.id === id)
}
