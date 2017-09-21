import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { AppLoading} from 'expo'
import { fetchDecks } from '../utils/api'
import { List, ListItem } from 'react-native-elements'

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
        <List containerStyle={{marginBottom: 20}}>
          {this.props.decks.map(deck => (
              <ListItem
                roundAvatar
                key={deck.title}
                title={deck.title}
                onPress={() => this.props.navigation.navigate(
                    'Deck',
                    { deckName: deck.title }
                )}
                subtitle={deck.questions.length + " cards"}
              />
            ))}
        </List>
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks: Object.values(decks)
  }
}

export default connect(
  mapStateToProps,
)(DeckList)
