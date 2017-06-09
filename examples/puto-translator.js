const adjetiveisor = require('../adjetiveisor')
const adj = adjetiveisor()

// Config for male singular, male plural, female singular, female plural
adj.config({
  ms: 'puto',
  mp: 'putos',
  fs: 'puta',
  fp: 'putas'
})

const text = 'la semana que viene tengo que cortarle el pelo a mi perro y lavarle las orejas a tus gatos.'
const translatedText = adj.translate(text) // la puta semana que viene tengo que cortarle el puto pelo a mi puto perro y lavarle las putas orejas a tus putos gatos.

console.log('The original text:')
console.log(text)
console.log('Is translated into:')
console.log(translatedText)
