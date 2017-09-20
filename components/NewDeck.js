import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'

class NewDeck extends Component {
  state = {
    deckName: '',
    error: ''
  }

  submit = () => {
    if (this.props.decks.filter(deck => deck.title === this.state.deckName).length > 0) {
      this.setState({ error: 'This deck name already exists.' })
    } else {
      this.props.dispatch(addDeck(this.state.deckName))

      submitDeck(this.state.deckName)

      this.props.navigation.navigate('Deck', { deckName: this.state.deckName })

      this.setState(() => ({ deckName: '' }))
    }
  }

  render() {
    return (
      <View>
        <Text>What's the title of your new deck ?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.setState({ deckName: text })
            this.setState({ error: '' })
          }}
          value={this.state.deckName}
        />
        <Text>{this.state.error}</Text>
        <TextButton onPress={this.submit}>SUBMIT</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1
  }
})

function mapStateToProps (decks) {
  return {
    decks: Object.values(decks)
  }
}

export default connect(
  mapStateToProps,
)(NewDeck)
