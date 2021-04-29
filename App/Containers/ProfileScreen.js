import React from 'react'
import { Button, Text, View } from 'react-native'

import { useAuth, actions } from '../Contexts/AuthContext'

const ProfileScreen = () => {
    const { dispatch } = useAuth()

    const logout = async () => {
        dispatch({ type: actions.LOGOUT })
    }
    return (
        <View>
            <Text>PROFILE SCREEN</Text>
            <Button title='logout' onPress={logout} />
        </View>
    )
}

export default ProfileScreen