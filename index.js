/**
 * @format
 */

/* global __DEV__ */

import 'react-native-gesture-handler'

import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import { name as appName } from './app.json'

if (__DEV__) {
  import('./App/Config/ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

AppRegistry.registerComponent(appName, () => App)
