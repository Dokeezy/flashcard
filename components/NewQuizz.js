import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { submitQuestion } from '../utils/api'
import { connect } from 'react-redux'
import { addQuizz } from '../actions'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
import { Card, ListItem, Button, CheckBox, FormLabel, FormInput } from 'react-native-elements'

class NewQuizz extends Component {
  state = {
    question: '',
    answer: '',
    error: '',
    answerType: false
  }

  submit = () => {
    if (this.props.deck.questions.filter(question => question.question === this.state.question).length > 0) {
      this.setState({ error: 'You already add this question.' })
    } else {

      let quizz = {
        question:  this.state.question,
        answer: this.state.answer,
        answerType: this.state.answerType
      }

      this.props.dispatch(addQuizz(this.props.deck.title, quizz))

      submitQuestion(this.props.deck.title, quizz)

      this.setState(() => ({ question: '', answer: '', answerType: false }))

      //const backAction = NavigationActions.back()
      //this.props.navigation.dispatch(backAction)
    }
  }

  render() {
    return (
      <View>
        <Card title="New Quizz">

          <FormLabel>Question :</FormLabel>
          <FormInput
            value={this.state.question}
            onChangeText={(text) => {
              this.setState({ question: text })
              this.setState({ error: '' })
            }}/>

          <CheckBox
            title='Is the answer true ?'
            style={{marginTop: 20}}
            checked={this.state.answerType}
            onPress={() => this.setState({ answerType: !this.state.answerType })}
          />

          <FormLabel>Answer detail :</FormLabel>
          <FormInput
            value={this.state.answer}
            onChangeText={(text) => {
              this.setState({ answer: text })
              this.setState({ error: '' })
            }}/>

          <Text style={{marginBottom: 20}}>{this.state.error}</Text>
          <Button
            icon={{name: 'add'}}
            backgroundColor='#ffe274'
            disabled={this.state.question.length === 0}
            onPress={this.submit}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
            title='CREATE' />
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
)(NewQuizz)
