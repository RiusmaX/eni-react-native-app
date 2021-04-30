import React from 'react'
import { View, Text, Button } from 'react-native'
import { CountProvider, useCount, actions } from '../Contexts/CountContext'

const Counter = () => {
  const { state: { count } } = useCount()
  return (
    <View>
      <Text>Valeur du compteur : {count} </Text>
    </View>
  )
}

const Actions = () => {
  const { dispatch } = useCount()
  return (
    <View>
      <Button title='+' onPress={() => dispatch({ type: actions.INCREMENT })} />
      <Button title='-' onPress={() => dispatch({ type: actions.DECREMENT })} />
    </View>
  )
}

const CountScreen = () => {
  return (
    <CountProvider>
      <Counter />
      <Actions />
    </CountProvider>
  )
}

export default CountScreen
