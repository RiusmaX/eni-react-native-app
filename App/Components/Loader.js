import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='blue' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Loader
