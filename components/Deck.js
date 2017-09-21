import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import TextButton from './TextButton'
import { addQuizz } from '../actions'

class Deck extends Component {

  startQuizz = () => {
    this.props.navigation.navigate('Quizz', { deckName: this.props.deck.title })
  }

  render() {
    return (
      <View>
        <Card
          title={this.props.deck.title}>
          <Text style={{marginBottom: 20}}>
            You have {this.props.deck.questions.length} cards created for this deck.
          </Text>
          <Button
            icon={{name: 'add'}}
            backgroundColor='#ffe274'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
            title='ADD CARD'
            onPress={() => this.props.navigation.navigate(
                'NewQuizz',
                { deckName: this.props.deck.title }
            )} />
            <Button
              icon={{name: 'play-arrow'}}
              backgroundColor='#ffe274'
              disabled={this.props.deck.questions.length === 0}
              onPress={this.startQuizz}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
              title='START QUIZZ' />
        </Card>
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
