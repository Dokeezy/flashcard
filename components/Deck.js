import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { addQuizz } from '../actions'

class Deck extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.deck.title}</Text>
        <Text>{this.props.deck.questions.length} cards</Text>
        <TextButton onPress={() => this.props.navigation.navigate(
            'NewQuizz',
            { deckName: this.props.deck.title }
        )}>Add Card</TextButton>
        <TextButton style={{backgroundColor: this.props.deck.questions.length === 0 ? 'lightgrey' : '#444444'}} disabled={this.props.deck.questions.length === 0}>Start Quizz</TextButton>
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const { deckName } = navigation.state.params

  return {
    deck: decks[deckName]
  }
}

export default connect(
  mapStateToProps,
)(Deck)
