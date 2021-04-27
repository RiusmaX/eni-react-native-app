import React, { useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { register } from '../Services/StrapiApi'

import styles from './Styles/RegisterScreenStyle'

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('test2')
    const [email, setEmail] = useState('test2@test.fr')
    const [password, setPassword] = useState('123456')

    const handleSubmit = async () => {
        const user = {
            username,
            email,
            password
        }
        const response = await register(user)
        
        if (response && response.jwt) {
            try {
                await AsyncStorage.setItem('token', response.jwt)
                navigation.navigate('Home')
            } catch (error) {
                console.error(error)
            }
        }

    } 

    return (
        <View style={styles.container}>
            <Text>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Text>Password</Text>
            <TextInput
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button title='Envoyer' onPress={handleSubmit} />
        </View>
    )
}

export default RegisterScreen