import { FlatList, Image, ScrollView,SafeAreaView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native'
import React, { useState,useCallback, useContext, useEffect } from 'react'

import { AuthContext } from '../auth/AuthProvider';

import { Bubble, GiftedChat } from 'react-native-gifted-chat'

import firestore from '@react-native-firebase/firestore'


import Ionicons from 'react-native-vector-icons/Ionicons';





const Chat = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);

    const { user} = useContext(AuthContext)



    
useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ])
    const chatid = route.params.id > user.uid ? user.uid+ "-" +route.params.id : route.params.id+ "-" +user.uid
   const querySnapShot =firestore().collection("chats").doc(chatid).collection("messages").orderBy('createdAt',"desc");
   querySnapShot.onSnapshot(snapShot =>{
    const allMessages =snapShot.docs.map(snap => {
        return {...snap.data(),createdAt:new Date(),avatar: 'https://media.istockphoto.com/id/906808234/photo/handsome-man.jpg?s=612x612&w=0&k=20&c=Ec8IY-ETslaS56vmO77BJyEOpPM1hzJlLbs6xeKRoAc='};

    })
    setMessages(allMessages)
   })
  }, [])

  const onSend = messageArray => {
    

    const msg=messageArray[0]
    const myMsg={...msg,senderId:user.uid,receiverId:route.params.id,avatar: 'https://media.istockphoto.com/id/906808234/photo/handsome-man.jpg?s=612x612&w=0&k=20&c=Ec8IY-ETslaS56vmO77BJyEOpPM1hzJlLbs6xeKRoAc='}
    const chatid = route.params.id > user.uid ? user.uid+ "-" +route.params.id : route.params.id+ "-" +user.uid

    console.log("chat id",chatid)
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))

    firestore().collection("chats").doc(chatid).collection("messages").add({
        ...myMsg,
        createdAt:firestore.FieldValue.serverTimestamp(),
    })
  }
    

  return (
    <View style={{ flex: 1,backgroundColor:"#FFFFFF" }}>

    <View style={{height:60,backgroundColor: "#282eed", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 10, paddingRight: 10 }}>
      
      <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Ionicons style={{marginRight:8}} name="arrow-back" size={25} color="#FFFFFF" />

        </TouchableOpacity>

      <Ionicons name="person-circle-outline" size={30} color="#FFFFFF" />

      </View>
      <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "800" }}>{route.params.username}</Text>
     

    </View>
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1, paddingLeft: 10, paddingRight: 10, marginTop: 10,backgroundColor:"#FFFFFF" }}>
      <View style={{flex:1,backgroundColor:"#FFFFFF"}}>
      <GiftedChat
       
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.uid,
        name:"akram",
        avatar: 'https://www.shutterstock.com/image-photo/pretty-smiling-joyfully-female-fair-260nw-776697943.jpg',
      }}
      placeholder="Type a message..."
      listViewProps={{keyboardDismissMode: 'on-drag'}}
    showUserAvatar
    alwaysShowSend
    // scrollToBottom
      renderBubble ={props =>{
        return(
            <Bubble {...props} wrapperStyle={{
                right:{
                    backgroundColor:"#282eed"
                }
            }}
            />
        )
      }}

    />
      </View>
    
    </ScrollView>


  </View>
  )
}

export default Chat

const styles = StyleSheet.create({})