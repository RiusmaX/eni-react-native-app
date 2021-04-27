import React from 'react'
import { Button, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = ({ navigation }) => {
    const logout = async () => {
        await AsyncStorage.clear()
        // navigation.navigate('LoginNavigator', {screen: 'Login'} )
    }
    return (
        <View>
            <Text>PROFILE SCREEN</Text>
            <Button title='logout' onPress={logout} />
        </View>
    )
}

export default ProfileScreen