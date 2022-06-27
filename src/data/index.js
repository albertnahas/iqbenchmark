const fs = require("fs")
var questions = require("./questions.json")

const questionsMapped = questions
  .filter((q) => q.question)
  .map((question) => {
    return {
      id: question.id,
      question: question.question,
      question_line2: question.question_line2,
      answer: question.answer,
      hasFigure: question.hasFigure,
      figureSize: question.figure_size,
      type: question.type,
      shapesCount: question.shapes_count,
      category: question.categories,
      choices: [
        question.a,
        question.b,
        question.c,
        question.d,
        question.e,
        question.f,
        question.g,
      ].filter((c) => !!c),
    }
  })
console.log(questionsMapped.length)
let data = JSON.stringify(questionsMapped)
fs.writeFileSync("data.json", data)

// asnwers extraction
// var split =  answers.split(/\d+\./g)
// split.filter(s=>!!s).map(s=>s.split(/;|:/)[0].trim())

// B
// allow
// 20
// 3527
// pressure
// D. Lines down proceed +3, +2, +1
// C
// weight, speed
// 2 9 5 7 3\n7 16 12 12\n19 28 28\n47 56\n103
// B
// 44 minutes
// SHIVER,\nEROTIC, ICICLE, LENGTH, THRASH
// cube
// Switch A is faulty
// B
// impact
// WIN BOAR =\nrainbow. The foods are spaghetti (PAST EIGHT), macaroni (I CAN ROAM), pancake\n(CAN PEAK) and chocolate (COOL CHEAT)
// 4
// PROFESSIONAL
// 11
// D
// 51\n/16
// linguist, polyglot
// 888, 890
// take
// swimmer, skier
// place/pace
// Alf 144, Jim 36, Sid 12
// sexed Utah = exhausted. The words meaning out of this world are
// 40 socks. If\nhe takes out 38 socks, although it is very unlikely, it is possible they could all be blue\nand red. To make 100 per cent certain that he also has a pair of black socks he must\ntake out a further two socks
// The black dot is moving up (then down) by one position at each stage
// 37 minutes
// medley, conglomeration
// evil
// 93541
// D
// HANG\nGLIDER
// G
// 0
// C
// E
// PART
// B
// glass
// 5
// fact is stranger than fiction
// B
// 7.5
// meridian, parallel
// B
// observe
// Tile 7 is incorrect, and should be replaced by tile B
// frivolity, sobriety
// 56
// weigh hay
// D
// mandible
// 10 pm
// OPTICAL ILLUSION
// A
// A
// crossfire
// 57
// C
// 27, 9, 12
// D
// minimum
// 7
// Switch D is faulty
// coalesce
// 17
// E
// 32
// DERIVE/DRIVE
// 49
// COMPUTE
// D
// MEDIOCRE, SUPERIOR
// 8
// E
