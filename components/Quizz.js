import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { Card, ListItem, Button } from 'react-native-elements'

class Quizz extends Component {

  state = {
    quizzIndex: 0,
    quizzScore: 0,
    showAnswer: false,
    resultMessage: '',
    isFinish: false
  }

  nextQuestion = () => {
    if (this.state.quizzIndex < (this.props.questions.length - 1)) {
      this.setState({ resultMessage: '', showAnswer: false })
      this.setState((state) => {
        return { quizzIndex: state.quizzIndex + 1 }
      })
    } else {
      this.setState({ isFinish: true })
    }
  }

  submitAnswer(userAnswer) {
    if (this.props.questions[this.state.quizzIndex].answerType === userAnswer) {
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
          <Card
            title={currentQuestion.question}>
            <Text style={{marginBottom: 20}}>
              {(this.state.quizzIndex + 1) + " / " + this.props.questions.length}
            </Text>


            {(this.state.showAnswer === false && this.state.resultMessage.length === 0) && (
              <Button
                backgroundColor='#444444'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
                title='SHOW ANSWER'
                onPress={() => this.setState({ showAnswer: true })} />
            )}
            {(this.state.showAnswer && this.state.resultMessage.length === 0) && (
              <Text style={{marginBottom: 20}}>{currentQuestion.answer}</Text>
            )}

            {this.state.resultMessage.length === 0 && (
              <View>
                <Button
                  backgroundColor='green'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
                  title='TRUE'
                  onPress={() => this.submitAnswer(true)} />
                  <Button
                    backgroundColor='red'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
                    title='FALSE'
                    onPress={() => this.submitAnswer(false)} />
              </View>
            )}
            {this.state.resultMessage.length > 0 && (
              <View>
                <Text style={{marginBottom: 20}}>{currentQuestion.answer}</Text>
                <Text style={{marginBottom: 20}}>{this.state.resultMessage}</Text>
                <Button
                  backgroundColor='#444444'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
                  title='NEXT'
                  onPress={this.nextQuestion} />
              </View>
            )}
          </Card>
        </View>
      )
    } else {
      return (
        <View>
          <Card
            title="Results 🏆">
            <Text style={{marginBottom: 20}}>
              Your score : {this.state.quizzScore + " / " + this.props.questions.length}
            </Text>
            <Button
              icon={{name: 'replay'}}
              backgroundColor='#ffe274'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
              title='RESTART QUIZZ'
              onPress={this.restartQuizz} />
              <Button
                icon={{name: 'arrow-back'}}
                backgroundColor='#444444'
                onPress={this.backToDeck}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 20}}
                title='BACK TO DECK' />
          </Card>
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
