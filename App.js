import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Dimensions  } from 'react-native'
import React, { useState } from 'react'


// Import vector icons
import EyesIcons from 'react-native-vector-icons/Ionicons';
import GoogleIcons from 'react-native-vector-icons/Ionicons';

import EmailIcons from 'react-native-vector-icons/MaterialIcons';


import styles from './src/constant/Styles';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Providers from './src/navigation';

const windowWidth = Dimensions.get('window').width;


const App = () => {

  


  return <Providers/>
}

export default App

