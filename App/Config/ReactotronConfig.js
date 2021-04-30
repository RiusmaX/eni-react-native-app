/* global __DEV__ */

import Reactotron from 'reactotron-react-native'

Reactotron
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

if (__DEV__) {
  console.tron = Reactotron
}
