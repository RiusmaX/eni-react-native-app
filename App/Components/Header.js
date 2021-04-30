import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/HeaderStyle'

const Header = ({ color }) => {
  return (
    <View style={Object.merge(styles.container, { backgroundColor: color })}>
      <Text style={styles.text}>VOICI MON HEADER</Text>
    </View>
  )
}

export default Header
