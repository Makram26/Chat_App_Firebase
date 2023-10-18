import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useState,useContext } from 'react'
// Import vector icons
import EyesIcons from 'react-native-vector-icons/Ionicons';
import GoogleIcons from 'react-native-vector-icons/Ionicons';
import EmailIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../src/constant/Styles';

import { AuthContext } from '../auth/AuthProvider';
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const Login = ({navigation}) => {
    const [securePassword, setSecurePassword] = useState(true)
    
    const {LoginWithEmailPassword} =useContext(AuthContext)
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [loading, setLoading] = useState(false)

// create state variables
const [state, setState] = useState({
   
    email: "",
   
    password: "",
    emailError: "",
  
    passwordError: "",
   
   
})
   
    const Login = async ()=>{

      
        if (state.email === "" || EMAIL_REGEX.test(state.email) === false) {
            setState({ ...state, emailError: "please enter a valid email" })
            return true
        }
       
        else if (state.password === "") {
            setState({ ...state, passwordError: "please enter your password!" })
            return true
        }
        else{
            setLoading(true)
        await LoginWithEmailPassword(state.email,state.password)
        setLoading(false)
        }
     
       


    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1, }}>
             {
                loading ?
                    <Spinner visible={true} />
                    :
                    null
            }
            <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                    source={require("../../src/assets/logo/screenLogo.png")}
                    style={styles.imageContainer}
                />
                <View style={{ width: windowWidth - 40 }}>
                    <Text style={styles.heading}>Sign in</Text>
                    <Text style={styles.headingText}>Stay updated on your professional world</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your Email'
                            placeholderTextColor="#00000057"
                            onChangeText={(val) => { setState({ ...state, emailError: "", email: val }) }}
                            style={styles.inputText}
                        />
                        <EmailIcons name="email" size={20} color="#000000" />
                    </View>
                    {
                        state.emailError ?
                            <Text style={styles.errorSyles}>{state.emailError}</Text>
                            : null
                    }
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your Password'
                            placeholderTextColor="#00000057"
                            secureTextEntry={securePassword ? true : false}
                            onChangeText={(val) => { setState({ ...state, passwordError: "", password: val }) }}
                            style={styles.inputText}

                        />
                        <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
                            {
                                securePassword ?
                                    <EyesIcons name="eye" size={20} color="#000000" />
                                    :
                                    <EyesIcons name="eye-off" size={20} color="#000000" />
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        state.passwordError ?
                            <Text style={styles.errorSyles}>{state.passwordError}</Text>
                            : null
                    }
                    <Text style={styles.textStyle}>
                        Forget Password?
                    </Text>
                    <TouchableOpacity style={styles.btnContainer} onPress={() => Login()}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={styles.drawLine} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center', fontSize: 15, fontWeight: "bold" }}>or</Text>
                        </View>
                        <View style={styles.drawLine} />
                    </View>
                    <TouchableOpacity style={{ ...styles.btnContainer, backgroundColor: "#e82309", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <GoogleIcons name="logo-google" size={20} color="#FFFFFF" />
                        <Text style={styles.btnText}>  Sign In With Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp") } style={styles.bottomContainer}>
                        <Text style={{ ...styles.textStyle, fontSize: 15, textAlign: "left", marginTop: 0 }}>Don't have an account ?
                            <Text style={{ color: "#282eed" }}> Register</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
export default Login

