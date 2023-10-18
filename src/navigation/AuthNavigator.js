import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';



const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name='SplashScreen' 
        component={SplashScreen}
        options={{ header: () => null }}
      /> */}
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}