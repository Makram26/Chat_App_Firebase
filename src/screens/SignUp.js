import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useState, useContext } from 'react'
// Import vector icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../src/constant/Styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../auth/AuthProvider';

const windowWidth = Dimensions.get('window').width;
const SignUp = ({ navigation }) => {
    const [securePassword, setSecurePassword] = useState(true)
    const [secureConfirmPassword, setSecureConfirmPassword] = useState(true)
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { CreateUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    // create state variables
    const [state, setState] = useState({
        username: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassowrd: "",
        usernameError: "",
        emailError: "",
        mobileError: "",
        passwordError: "",
        confirmPasswordError: ""
    })



    const CreateNewUser = async () => {
        if (state.username === "") {
            setState({ ...state, usernameError: "Username is Required" })
            return true
        }
        else if (state.email === "" || EMAIL_REGEX.test(state.email) === false) {
            setState({ ...state, emailError: "please enter a valid email" })
            return true
        }
        else if (state.mobile === "" || state.mobile.length > 11) {
            setState({ ...state, mobileError: "Mobile number should have 11 characters max" })
            return true
        }
        else if (state.password === "" || state.password.length < 8) {
            setState({ ...state, passwordError: "Password should have 8 characters min" })
            return true
        }
        else if (state.confirmPassowrd !== state.password) {
            setState({ ...state, confirmPasswordError: "Password & Confirm Password should be match!" })
            return true
        }
        else {
            setLoading(true)
           await CreateUser(state.username,state.email,state.mobile,state.password)
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
                    <Text style={styles.heading}>Sign Up</Text>
                    <Text style={styles.headingText}>Stay updated on your professional world</Text>

                    <View style={styles.inputContainer}>
                        <Ionicons name="person" size={15} color="#000000" />
                        <TextInput
                            placeholder='Enter your Name'
                            placeholderTextColor="#00000057"
                            onChangeText={(val) => { setState({ ...state, usernameError: "", username: val }) }}
                            style={styles.inputText}
                        />

                    </View>
                    {
                        state.usernameError ?
                            <Text style={styles.errorSyles}>{state.usernameError}</Text>
                            : null
                    }
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="email" size={15} color="#000000" />
                        <TextInput
                            placeholder='Enter your Email'
                            placeholderTextColor="#00000057"
                            onChangeText={(val) => { setState({ ...state, emailError: "", email: val }) }}
                            style={styles.inputText}
                        />

                    </View>
                    {
                        state.emailError ?
                            <Text style={styles.errorSyles}>{state.emailError}</Text>
                            : null
                    }
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="mobile-screen-share" size={15} color="#000000" />
                        <TextInput
                            placeholder='Enter your Mobile Number'
                            placeholderTextColor="#00000057"
                            keyboardType="numeric"
                            onChangeText={(val) => { setState({ ...state, mobileError: "", mobile: val }) }}
                            style={styles.inputText}
                        />

                    </View>
                    {
                        state.mobileError ?
                            <Text style={styles.errorSyles}>{state.mobileError}</Text>
                            : null
                    }
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed" size={15} color="#000000" />
                        <TextInput
                            placeholder='Enter your Password'
                            placeholderTextColor="#00000057"
                            secureTextEntry={securePassword ? true : false}
                            onChangeText={(val) => { setState({ ...state, passwordError: "", password: val }) }}
                            style={{ ...styles.inputText, width: "85%" }}

                        />
                        <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
                            {
                                securePassword ?
                                    <Ionicons name="eye" size={20} color="#000000" />
                                    :
                                    <Ionicons name="eye-off" size={20} color="#000000" />
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        state.passwordError ?
                            <Text style={styles.errorSyles}>{state.passwordError}</Text>
                            : null
                    }

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed" size={15} color="#000000" />
                        <TextInput
                            placeholder='Enter your Confirm Password'
                            placeholderTextColor="#00000057"
                            secureTextEntry={secureConfirmPassword ? true : false}
                            onChangeText={(val) => { setState({ ...state, confirmPasswordError: "", confirmPassowrd: val }) }}


                            style={{ ...styles.inputText, width: "85%" }}

                        />
                        <TouchableOpacity onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}>
                            {
                                secureConfirmPassword ?
                                    <Ionicons name="eye" size={20} color="#000000" />
                                    :
                                    <Ionicons name="eye-off" size={20} color="#000000" />
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        state.confirmPasswordError ?
                            <Text style={styles.errorSyles}>{state.confirmPasswordError}</Text>
                            : null
                    }

                    <TouchableOpacity onPress={() => CreateNewUser()} style={styles.btnContainer}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.bottomContainer}>
                        <Text style={{ ...styles.textStyle, fontSize: 15, textAlign: "left", marginTop: 0 }}>Have an account ?
                            <Text style={{ color: "#282eed" }}> LogIn</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
export default SignUp

