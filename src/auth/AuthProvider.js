import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
export const AuthContext = createContext({})

// GoogleSignin.configure({
//     webClientId: '975680620261-opas3mrbnf5hn5i3h5r1mhhmeckdnti1.apps.googleusercontent.com',
//     // offlineAccess: true
// });



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [confirm, setConfirm] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                Googlelogin: async () => {
                    try {
                        // Get the users ID token
                        // const { idToken } = await GoogleSignin.signIn();

                        // console.log("idToken", idToken)

                        // Create a Google credential with the token
                        // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                        // console.log("googleCredential", googleCredential)
                        // Sign-in the user with the credential
                        //    const response = auth().signInWithCredential(googleCredential);

                        //    console.log("response",response)


                        // const response = await auth().signInWithCredential(googleCredential)
                        // console.log(response)

                        return true

                        //  navigation.navigate("BottomTabNavigation")
                    } catch (error) {
                        console.log(error)
                    }
                },
                CreateUser: async (username,email,mobile,password) => {
                    try {

                     await  auth()
                            .createUserWithEmailAndPassword(email, password)
                            .then(async (res) => {
                                console.log('User account created & signed in!',);
                                // try {
                                 await  firestore()
                                        .collection('users')
                                        .add({
                                            user_id:res.user.uid,
                                            email:email,
                                            // password: state.password,
                                            username: username,
                                            mobile: mobile,
                                        }).then(doc => {

                                            console.log("data add in users table!")
                                            return "success"
                                        })
                                // } catch (err) {
                                //     console.log(err)
                                // }

                            })
                            .catch(error => {
                                if (error.code === 'auth/email-already-in-use') {
                                    alert('That email address is already in use!');
                                }

                                if (error.code === 'auth/invalid-email') {
                                    alert('That email address is invalid!');
                                }
                                console.error(error);
                            });

                    } catch (error) {
                        console.log("askdr",error);
                        return error
                    }
                },
                LoginWithEmailPassword: async (email,password) => {
                    try {

                     await  auth()
                            .signInWithEmailAndPassword(email, password)
                            .then((res) => {
                                console.log('signed in! successfully',);
                            })
                            .catch(error => {
                                console.log(error)
                                alert("please enter valid email & passwoed!")
                                if (error.code === 'auth/weak-password') {
                                    console.log('The given password is invalid.');
                                }

                                if (error.code === 'auth/invalid-email') {
                                    alert('That email address is invalid!');
                                }
                                console.error(error);
                            });

                    } catch (error) {
                        console.log("askdr",error);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut()
                    } catch (e) {
                        console.error(e)
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

