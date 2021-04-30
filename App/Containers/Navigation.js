import React from 'react'
import jwtDecode from 'jwt-decode'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { useAuth } from '../Contexts/AuthContext'

import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import ProfileScreen from './ProfileScreen'
import GraphScreen from './GraphScreen'
import Modal from './Modal'
import CountScreen from './CountScreen'

import Loader from '../Components/Loader'

import SplashScreen from 'react-native-splash-screen'

const LoginStack = createStackNavigator()

const Home = createBottomTabNavigator()

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={HomeScreen} />
      <Drawer.Screen name='Profile' component={ProfileScreen} />
      <Drawer.Screen name='Graph' component={GraphScreen} />
    </Drawer.Navigator>
  )
}

const Navigation = () => {
  const { state: { user, jwt, loading } } = useAuth()

  if (jwt) {
    console.log(jwtDecode(jwt))
  }

  SplashScreen.hide()

  return (
    <NavigationContainer>
      {
                loading
                  ? <Loader />
                  : user && jwt
                    ? (
                      <Home.Navigator initialRouteName='Graph'>
                        <Home.Screen name='Home' component={HomeScreen} />
                        <Home.Screen name='Profile' component={ProfileScreen} />
                        <Home.Screen name='Graph' component={GraphScreen} />
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
