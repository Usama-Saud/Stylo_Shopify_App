import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Login from './src/login/Login';
import UserLogin from './src/registration/RegisterUser';
import MainNavigation from './src/navigation/MainNavigation';
import messaging from '@react-native-firebase/messaging';
import {
  NotificationLister,
  getToken,
  requestUserPermission,
} from './src/utils/CommonUtils';

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
    NotificationLister();
    getToken();
  }, []);
  return <MainNavigation />;
};

export default App;

const styles = StyleSheet.create({});
