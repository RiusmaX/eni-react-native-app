import React, { useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'

import { useAuth, registerUser } from '../Contexts/AuthContext'

import styles from './Styles/RegisterScreenStyle'

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('test2')
    const [email, setEmail] = useState('test2@test.fr')
    const [password, setPassword] = useState('123456')

    const { dispatch } = useAuth()

    const handleSubmit = async () => {
        const user = {
            username,
            email,
            password
        }
       registerUser(dispatch, user)
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