const adjetiveisor = (function (configData) {
  // Properties:
  let maleSingular
  let malePlural
  let femaleSingular
  let femalePlural

  let verbose = false

  const simpleTraductions = {}
  const notSoSimpleTraductions = []
  const verboseTraductions = {}

  // Private methods:
  function setConfig (config) {
    if (typeof config !== 'undefined' && typeof config.ms === 'string' && typeof config.mp === 'string' && typeof config.fs === 'string' && typeof config.fp === 'string') {
      maleSingular = config.ms
      malePlural = config.mp
      femaleSingular = config.fs
      femalePlural = config.fp

      simpleTraductions[maleSingular] = ['el', 'al', 'del', 'un', 'este', 'ese', 'aquel']
      simpleTraductions[malePlural] = ['los', 'unos', 'estos', 'esos', 'aquellos']
      simpleTraductions[femaleSingular] = ['la', 'una', 'esta', 'esa', 'aquella']
      simpleTraductions[femalePlural] = ['las', 'unas', 'estas', 'esas', 'aquellas']

      notSoSimpleTraductions.push({
        wordBefore: ['mi', 'tu', 'su'],
        endOfWord: { o: maleSingular, a: femaleSingular }
      })
      notSoSimpleTraductions.push({
        wordBefore: ['mis', 'tus', 'sus'],
        endOfWord: { os: malePlural, as: femalePlural }
      })

      verboseTraductions[maleSingular] = ['me', 'te', 'se']
      return true
    } else {
      return false
    }
  }

  function setVerbose (verb) {
    if (verb === true) {
      verbose = true
      return true
    }
    verbose = false
    return false
  }

  function cleanWord (word) {
    return word.replace(/\W/ig, '')
  }

  function getLastCharacters (word, n) {
    return word.split('').reverse().slice(0, n).reverse().join('')
  }

  function doTheTranslation (text) {
    if (typeof maleSingular !== 'string' || typeof malePlural !== 'string' || typeof femaleSingular !== 'string' || typeof femalePlural !== 'string') return 'missing config'

    if (typeof text !== 'string') return 'missing text'

    const cleanText = text.replace(/\s\s+/igm, ' ') // remove multiple whitespaces
    const words = cleanText.split(' ')

    if (words.length === 1) {
      let word = words[0]
      let lastCharacter = getLastCharacters(word, 1)
      let lastTwoCharacters = getLastCharacters(word, 2)
      let finalText

      for (var i = 0; i < notSoSimpleTraductions.length; i++) {
        if (notSoSimpleTraductions[i].endOfWord.hasOwnProperty(lastCharacter)) {
          finalText = `${notSoSimpleTraductions[i].endOfWord[lastCharacter]} ${word}`
          break
        } else if (notSoSimpleTraductions[i].endOfWord.hasOwnProperty(lastTwoCharacters)) {
          finalText = `${notSoSimpleTraductions[i].endOfWord[lastTwoCharacters]} ${word}`
          break
        } else {
          finalText = word
        }
      }

      return finalText
    }

    // words.length > 1

    const translatedWords = [words[0]]
    const simpleTraductionsKeys = Object.keys(simpleTraductions)
    const verboseTraductionsKeys = Object.keys(verboseTraductions)

    for (var i = 1; i < words.length; i++) {
      let wordBefore = cleanWord(words[i - 1])
      let currentWord = cleanWord(words[i])
      let lastCharacter = getLastCharacters(currentWord, 1)
      let lastTwoCharacters = getLastCharacters(currentWord, 2)

      for (var j = 0; j < simpleTraductionsKeys.length; j++) {
        if (simpleTraductions[simpleTraductionsKeys[j]].indexOf(wordBefore) !== -1) {
          translatedWords.push(simpleTraductionsKeys[j])
          break
        }
      }

      for (var j = 0; j < notSoSimpleTraductions.length; j++) {
        if (notSoSimpleTraductions[j].wordBefore.indexOf(wordBefore) !== -1) {
          if (notSoSimpleTraductions[j].endOfWord.hasOwnProperty(lastCharacter)) {
            translatedWords.push(notSoSimpleTraductions[j].endOfWord[lastCharacter])
            break
          } else if (notSoSimpleTraductions[j].endOfWord.hasOwnProperty(lastTwoCharacters)) {
            translatedWords.push(notSoSimpleTraductions[j].endOfWord[lastTwoCharacters])
            break
          }
        }
      }

      if (verbose) {
        for (var j = 0; j < verboseTraductionsKeys.length; j++) {
          if (verboseTraductions[verboseTraductionsKeys[j]].indexOf(wordBefore)) {
            translatedWords.push(verboseTraductionsKeys[j])
            break
          }
        }
      }

      translatedWords.push(words[i])
    }

    let translatedSentence = translatedWords.join(' ')

    // Remove repeated added adjetives:
    const regexs = [
      { r: new RegExp(`${maleSingular} ${maleSingular}`, 'img'), t: maleSingular },
      { r: new RegExp(`${malePlural} ${malePlural}`, 'img'), t: malePlural },
      { r: new RegExp(`${femaleSingular} ${femaleSingular}`, 'img'), t: femaleSingular },
      { r: new RegExp(`${femalePlural} ${femalePlural}`, 'img'), t: femalePlural }
    ]

    regexs.map(regex => {
      translatedSentence.replace(regex.r, regex.t)
    })

    return translatedSentence
  }

  // Initial config:
  setConfig(configData);

  // Public methods:
  return {
    config: (config) => {
      return setConfig(config)
    },
    verbose: (verb) => {
      return setVerbose(verb)
    },
    translate: (text) => {
      return doTheTranslation(text)
    }

  }
})

module.exports = adjetiveisor
