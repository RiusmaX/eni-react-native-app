import React from 'react'
import { Button, Text, View } from 'react-native'

import { Colors } from '../Theme/Light'

const HomeScreen = ({ setColor }) => {
    return (
        <View>
            <Text>HOME SCREEN</Text>
            <Button title='Changer la couleur' onPress={() => setColor(Colors.primary)} />
        </View>
    )
}

export default HomeScreen