export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUIZZ = 'ADD_QUIZZ'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addQuizz (deckName, quizz) {
  return {
    type: ADD_QUIZZ,
    deckName,
    quizz,
  }
}
