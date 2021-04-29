/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import {
  StatusBar,
  useColorScheme,
} from 'react-native'
import OneSignal from 'react-native-onesignal'
import FlashMessage from "react-native-flash-message";

import { AuthProvider } from '../Contexts/AuthContext'

import Navigation from './Navigation'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  useEffect(() => {
     /* O N E S I G N A L   S E T U P */
     OneSignal.setAppId("a179d01a-6827-440c-9f1d-4b6c56162a65");
     OneSignal.setLogLevel(6, 0);
     OneSignal.setRequiresUserPrivacyConsent(false);
     OneSignal.promptForPushNotificationsWithUserResponse(response => {
         console.log("Prompt response:", response);
     });
     OneSignal.sendTag('userID', '123456789')

     /* O N E S I G N A L  H A N D L E R S */
     OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
         console.log("OneSignal: notification will show in foreground:", notifReceivedEvent);
     });
     OneSignal.setNotificationOpenedHandler(notification => {
         console.log("OneSignal: notification opened:", notification);
         if (notification && notification.notification.additionalData) {
           
         }
     });
     OneSignal.setInAppMessageClickHandler(event => {
         console.log("OneSignal IAM clicked:", event);
     });
     OneSignal.addEmailSubscriptionObserver((event) => {
         console.log("OneSignal: email subscription changed: ", event);
     });
     OneSignal.addSubscriptionObserver(event => {
         console.log("OneSignal: subscription changed:", event);
     });
     OneSignal.addPermissionObserver(event => {
         console.log("OneSignal: permission changed:", event);
     });
}, [])
  
  return (
    <AuthProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
      <FlashMessage position='top' />
    </AuthProvider>
  )
}

export default App;
