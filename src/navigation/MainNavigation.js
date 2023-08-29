import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import RegisterUser from '../registration/RegisterUser';
import Dashboard from '../dashboard/Dashboard';
import Splash from '../splashScreen/Splash';
import LoginUser from '../login/LoginUser';
import ViewDetails from '../dashboard/ViewDetails';
import MainDashboard from '../dashboard/MainDashboard';
// import Splash from '../screens/splash/Splash';

export default function MainNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator  >
      <Stack.Screen
          options={{headerShown: false,}}
          name="Splash"
          
          component={Splash}></Stack.Screen>
           <Stack.Screen
          options={{headerShown: false}}
          name="LoginUser"
          component={LoginUser}
          ></Stack.Screen>
            <Stack.Screen
          // options={{headerShown: false}}
          options={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: '#fff',
          }}
          name="RegisterUser"
          component={RegisterUser}></Stack.Screen>
        <Stack.Screen
          options={{headerShown: false}}
          name="Dashboard"
          component={Dashboard}></Stack.Screen>
          <Stack.Screen
          options={{headerShown: false}}
          name="ViewDetails"
          component={ViewDetails}></Stack.Screen>
        <Stack.Screen
          options={{headerShown: false}}

          // options={{
          //   headerStyle: {
          //     backgroundColor: '#000',
          //   },
          //   headerTitleStyle: {
          //     color: 'white',
          //   },
          //   headerTintColor: '#fff',
          // }}
          name="MainDashboard"
          component={MainDashboard}></Stack.Screen>
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="Dashboard"
          component={Dashboard}></Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
