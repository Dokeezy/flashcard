import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from './utils/helpers'

class Quizz extends Component {

  state = {
    quizzIndex: 0,
    quizzScore: 0,
    resultMessage: '',
    isFinish: false
  }

  nextQuestion = () => {
    if (this.state.quizzIndex < (this.props.questions.length - 1)) {
      this.setState({ resultMessage: '' })
      this.setState((state) => {
        return { quizzIndex: state.quizzIndex + 1 }
      })
    } else {
      this.setState({ isFinish: true })
    }
  }

  submitTrue = () => {
    if (this.props.questions[this.state.quizzIndex].answerType) {
      this.setState((prevState) => {
        return { quizzScore: prevState.quizzScore + 1 }
      })
      this.setState({ resultMessage: 'Well done ! 👍' })
    } else {
      this.setState({ resultMessage: 'Huh, maybe next time ! 👎' })
    }
  }

  submitFalse = () => {
    if (!this.props.questions[this.state.quizzIndex].answerType) {
      this.setState((prevState) => {
        return { quizzScore: prevState.quizzScore + 1 }
      })
      this.setState({ resultMessage: 'Well done ! 👍' })
    } else {
      this.setState({ resultMessage: 'Huh, maybe next time ! 👎' })
    }
  }

  restartQuizz = () => {
    this.setState({
      quizzIndex: 0,
      quizzScore: 0,
      resultMessage: '',
      isFinish: false
    })
    clearLocalNotification()
      .then(setLocalNotification)
  }

  backToDeck = () => {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    let currentQuestion = this.props.questions[this.state.quizzIndex]

    if (!this.state.isFinish) {
      return (
        <View>
          <Text>Quizz</Text>
          <Text>{(this.state.quizzIndex + 1) + " / " + this.props.questions.length} </Text>
          <View>
            <Text>{currentQuestion.question}</Text>
            {this.state.resultMessage.length > 0 && (
              <Text>{currentQuestion.answer}</Text>
            )}
          </View>
          {this.state.resultMessage.length === 0 && (
            <View>
              <TextButton onPress={this.submitTrue}>TRUE</TextButton>
              <TextButton onPress={this.submitFalse}>FALSE</TextButton>
            </View>
          )}
          {this.state.resultMessage.length > 0 && (
            <View>
              <Text>{this.state.resultMessage}</Text>
              <TextButton onPress={this.nextQuestion}>Next</TextButton>
            </View>
          )}
        </View>
      )
    } else {
      return (
        <View>
          <Text>Results</Text>
          <Text>Your score : {this.state.quizzScore + " / " + this.props.questions.length}</Text>
          <TextButton onPress={this.restartQuizz}>RESTART QUIZZ</TextButton>
          <TextButton onPress={this.backToDeck}>BACK TO DECK</TextButton>
        </View>
      )
    }

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
