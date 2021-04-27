import React from 'react'
import { Button, Text, View } from 'react-native'

const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Text>LOGIN SCREEN</Text>
            <Button title='Login' onPress={() => {}} />
            <Button title='Register' onPress={() => navigation.navigate('Register')} />
            <Button title='Open Modal' onPress={() => navigation.navigate('Modal')} />
        </View>
    )
}

export default LoginScreen