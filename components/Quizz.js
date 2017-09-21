import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'

class Quizz extends Component {

  state = {
    quizzIndex: 0,
    quizzScore: 0
  }

  renderCurrentQuizz () {
    let currentQuestion = this.props.questions[this.state.quizzIndex]
    return (
      <View>
        <Text>{currentQuestion.question}</Text>
        <Text>{currentQuestion.answer}</Text>
      </View>
    )
  }

  nextQuestion = () => {
    this.setState((state) => {
      return { quizzIndex: state.quizzIndex + 1 }
    })
  }

  render() {
    console.log(this.props.questions)
    return (
      <View>
        <Text>Quizz</Text>
        <Text>{this.state.quizzIndex}</Text>
        {this.renderCurrentQuizz()}
        <TextButton onPress={this.nextQuestion}>Next</TextButton>
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const { deckName } = navigation.state.params

  return {
    questions: decks[deckName].questions
  }
}

export default connect(
  mapStateToProps,
)(Quizz)
