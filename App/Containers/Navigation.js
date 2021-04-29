import React from 'react'
import jwt_decode from "jwt-decode"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { useAuth } from '../Contexts/AuthContext'

import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import ProfileScreen from './ProfileScreen'
import NotesScreen from './NotesScreen'
import Modal from './Modal'
import CountScreen from './CountScreen'

import Loader from '../Components/Loader'

const LoginStack = createStackNavigator()

const Home = createBottomTabNavigator()

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={HomeScreen} />
        <Drawer.Screen name='Profile' component={ProfileScreen} />
        <Drawer.Screen name='Notes' component={NotesScreen} />
      </Drawer.Navigator>
    )
  }

const Navigation = () => {
    const { state: {user, jwt, loading} } = useAuth()

    if (jwt) {
        console.log(jwt_decode(jwt))
    }

    return (
        <NavigationContainer>
            {
                loading
                ? <Loader />
                : user && jwt
                ? (
                <Home.Navigator>
                    <Home.Screen name='Home' component={HomeScreen} />
                    <Home.Screen name='Profile' component={ProfileScreen} />
                    <Home.Screen name='Notes' component={NotesScreen} />
                    <Home.Screen name='Drawer' component={DrawerNavigator} />
                </Home.Navigator>
                )
                : (
                <LoginStack.Navigator initialRouteName='Login'>
                    <LoginStack.Screen name='Login' component={LoginScreen} />
                    <LoginStack.Screen name='Register' component={RegisterScreen} />
                    <LoginStack.Screen name='Modal' component={Modal} options={{ headerShown: false }} />
                    <LoginStack.Screen name='Count' component={CountScreen} />
                </LoginStack.Navigator>
                )
            }
        </NavigationContainer>
    )
  
}

export default Navigation