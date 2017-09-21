import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

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

  render() {
    console.log(this.props.questions)
    return (
      <View>
        <Text>Quizz</Text>
        {this.renderCurrentQuizz()}
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
