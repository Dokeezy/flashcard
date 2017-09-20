import { AsyncStorage } from 'react-native'

export function fetchDecks () {
  return AsyncStorage.getItem()
    .then()
}

export function submitDeck () {
  return AsyncStorage.mergeItem()
}

export function submitQuestion () {
  return AsyncStorage.mergeItem()
}
