import { AsyncStorage } from 'react-native'
const DECKS_STORAGE_KEY = 'flashcard:decks'

export function fetchDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => {
      return JSON.parse(data)
    })
}

export function submitDeck (deckName) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckName]: {
      'title': deckName,
      'questions': []
    }
  }))
}

export function submitQuestion (deckName, quizz) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckName].questions.push(quizz)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}
