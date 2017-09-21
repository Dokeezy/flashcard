import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'

class Quizz extends Component {

  state = {
    quizzIndex: 0,
    quizzScore: 0,
    resultsArray: [],
    resultMessage: ''
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
    this.setState({ resultMessage: '' })
    this.setState((state) => {
      return { quizzIndex: state.quizzIndex + 1 }
    })
  }

  submitTrue = () => {
    if (this.props.questions[this.state.quizzIndex].answerType) {
      this.setState((prevState) => {
        const resultsArray = prevState.resultsArray.concat(true)
        return { resultsArray }
      })
    } else {
      this.setState((prevState) => {
        const resultsArray = prevState.resultsArray.concat(false)
        return { resultsArray }
      })
    }
  }

  submitFalse = () => {
    if (!this.props.questions[this.state.quizzIndex].answerType) {
      this.setState((prevState) => {
        const resultsArray = prevState.resultsArray.concat(true)
        return { resultsArray }
      })
    } else {
      this.setState((prevState) => {
        const resultsArray = prevState.resultsArray.concat(false)
        return { resultsArray }
      })
    }
  }

  render() {
    console.log(this.state.resultsArray)
    return (
      <View>
        <Text>Quizz</Text>
        <Text>{this.state.quizzIndex}</Text>
        {this.renderCurrentQuizz()}
        <TextButton onPress={this.submitTrue}>TRUE</TextButton>
        <TextButton onPress={this.submitFalse}>FALSE</TextButton>
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
