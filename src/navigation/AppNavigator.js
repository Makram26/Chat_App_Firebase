import React from 'react';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';



const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


const screenOptionStyle = {
  headerStyle: {
      backgroundColor: "#F7941D",
  },
  headerTintColor: "#FFFFFF",
  headerBackTitle: "#F7941D",
};


const DashBoardStackNavigator = () => {
  return (
      <Stack.Navigator
          screenOptions={[screenOptionStyle, {cardStyleInterpolator: CardStyleInterpolators.for}]}>
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
      <Stack.Navigator
          screenOptions={[screenOptionStyle, {cardStyleInterpolator: CardStyleInterpolators.for}]}>
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#FFFFFF',
      
      // headerPressColor:"#F7941D",
      tabBarInactiveTintColor:"#8c9191",
     
      tabBarStyle :{
        // paddingTop:10
        // backgroundColor:"red", 
        // paddingTop:Platform.OS === 'ios'? 10:5
        backgroundColor:"#282eed",
        height:60

        // height:Platform.OS === 'ios'? windowHeight/10 :windowHeight/12,
      },
      // tabBarStyle: {alignItems:"center",height:windowHeight/14, marginBottom:
      // Platform.OS === 'ios' &&
      // (D_HEIGHT === IPHONE12_H ||
      // D_HEIGHT === IPHONE12_Max ||
      // D_HEIGHT === IPHONE12_Mini)
      // ? 20 : 0 },
      tabBarLabelStyle: {
        fontSize: 10,
        marginBottom:10
        // paddingBottom:Platform.OS === 'ios'? 0: RFValue(8),
      },

    }}
    >
     
      <Tab.Screen
        name='Home'
        component={DashBoardStackNavigator}
        options={{
          headerShown: false,
          tabBarLebal: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          tabBarLebal: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}