import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#444444',
    padding: 10,
    borderRadius: 30,
    width: '30%'
  },
  text: {
    textAlign: 'center',
    color: 'white'
  }
})
