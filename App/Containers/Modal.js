import React from 'react'
import { View, Button, Text } from 'react-native'

const Modal = ({ navigation }) => {
    return (
        <View>
            <Text>CECI EST MON MODAL</Text>
            <Button title='Fermer le modal' onPress={() => navigation.goBack()} />
        </View>
    )
}

export default Modal