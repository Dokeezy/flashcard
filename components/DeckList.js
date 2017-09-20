import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { AppLoading} from 'expo'
import { fetchDecks } from '../utils/api'

class DeckList extends Component {
  state = {
      ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props

    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View>
        <Text>DeckList</Text>
        {this.props.decks.map(deck => {
          return (
            <Text
              key={deck.title}
              style={styles.deck}
              onPress={() => this.props.navigation.navigate(
                  'Deck',
                  { deckName: deck.title }
              )}
            >
              {deck.title} - {deck.questions.length} cards
            </Text>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps (decks) {
  return {
    decks: Object.values(decks)
  }
}

export default connect(
  mapStateToProps,
)(DeckList)
