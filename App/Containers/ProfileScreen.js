import React from 'react'
import { Button, Text, View } from 'react-native'

import { useAuth, logout } from '../Contexts/AuthContext'

const ProfileScreen = () => {
  const { dispatch } = useAuth()

  const handleLogout = async () => {
    logout(dispatch)
  }
  return (
    <View>
      <Text>PROFILE SCREEN</Text>
      <Button title='logout' onPress={handleLogout} />
    </View>
  )
}

export default ProfileScreen
