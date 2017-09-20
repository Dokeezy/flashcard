import { RECEIVE_DECKS, ADD_DECK, ADD_QUIZZ } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {

    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }

    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }

    case ADD_QUIZZ :
      return {
        ...state,
        [action.deckName]: {
          ...state[action.deckName],
          questions: [
            ...state[action.deckName.questions],
            action.quizz
          ]
        }
      }

    default :
      return state
  }
}

export default decks
