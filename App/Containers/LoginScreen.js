import React, { useState } from 'react'
import { Button, Text, View, TextInput } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

import { useAuth, loginUser } from '../Contexts/AuthContext'

import styles from './Styles/LoginScreenStyle'

GoogleSignin.configure({
  webClientId: '538466890673-iujps3q9vn7dmvn9tgpoat7j2ncqasco.apps.googleusercontent.com'
})

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({ identifier: 'test2@test.fr', password: '123456' })

  const { dispatch } = useAuth()

  const signInWithGoogle = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()
    console.log(idToken)
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
  }

  const handleSubmit = () => {
    loginUser(dispatch, credentials)
  }

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={credentials.identifier}
        onChangeText={(text) => setCredentials({ ...credentials, identifier: text })}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={credentials.password}
        onChangeText={(text) => setCredentials({ ...credentials, password: text })}
      />
      <Button style={styles.btn} title='Login' onPress={handleSubmit} />
      <Button style={styles.btn} title='Register' onPress={() => navigation.navigate('Register')} />
      <Button style={styles.btn} title='Open Modal' onPress={() => navigation.navigate('Modal')} />
      <Button style={styles.btn} title='Connect with Google' onPress={signInWithGoogle} />
    </View>
  )
}

export default LoginScreen
