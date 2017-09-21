import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { submitQuestion } from '../utils/api'
import { connect } from 'react-redux'
import { addQuizz } from '../actions'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
import { CheckBox } from 'react-native-elements'

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

      this.setState(() => ({ question: '', answer: '' }))

      //const backAction = NavigationActions.back()
      //this.props.navigation.dispatch(backAction)
    }
  }

  render() {
    return (
      <View>
        <Text>NewQuizz</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.setState({ question: text })
            this.setState({ error: '' })
          }}
          value={this.state.question}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.setState({ answer: text })
            this.setState({ error: '' })
          }}
          value={this.state.answer}
        />
        <CheckBox
          title='Is the answer true ?'
          checked={this.state.answerType}
          onPress={() => this.setState({ answerType: !this.state.answerType })}
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

function mapStateToProps (decks, { navigation }) {
  const { deckName } = navigation.state.params

  return {
    deck: decks[deckName]
  }
}

export default connect(
  mapStateToProps,
)(NewQuizz)
