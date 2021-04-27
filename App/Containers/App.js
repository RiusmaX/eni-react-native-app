/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import {
  StatusBar,
  useColorScheme,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import ProfileScreen from './ProfileScreen'
import NotesScreen from './NotesScreen'
import Modal from './Modal'

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

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      return token
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken()
      if (token) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }

    checkToken()
  }, [])

  return (
    <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {
          isLoggedIn
          ? (
            <Home.Navigator>
              <Home.Screen name='Home' component={HomeScreen} />
              <Home.Screen name='Profile' component={ProfileScreen} />
              <Home.Screen name='Notes' component={NotesScreen} />
              <Home.Screen name='Drawer' component={DrawerNavigator} />
            </Home.Navigator>
          )
          : (
            <LoginStack.Navigator initialRouteName='Register'>
              <LoginStack.Screen name='Login' component={LoginScreen} />
              <LoginStack.Screen name='Register' component={RegisterScreen} />
              <LoginStack.Screen name='Modal' component={Modal} options={{ headerShown: false }} />
            </LoginStack.Navigator>
          )
        }
    </NavigationContainer>
  )
}

export default App;
