import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
import { FormLabel, FormInput, Card, Button } from 'react-native-elements'

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
        <Card title="What's the title of your new deck ?">
          <FormLabel>Deck name :</FormLabel>
          <FormInput
            value={this.state.deckName}
            onChangeText={(text) => {
            this.setState({ deckName: text })
            this.setState({ error: '' })
          }}/>
          <Text style={{marginBottom: 20}}>{this.state.error}</Text>
          <Button
            icon={{name: 'add'}}
            backgroundColor='#ffe274'
            disabled={this.state.deckName.length === 0}
            onPress={this.submit}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
            title='CREATE' />
        </Card>
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
