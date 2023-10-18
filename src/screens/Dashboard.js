import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'

import { AuthContext } from '../auth/AuthProvider';

import Ionicons from 'react-native-vector-icons/Ionicons';

import GetAllUsers from '../api/GetAllUsers';
import Spinner from 'react-native-loading-spinner-overlay';

function UserCard({name,mobile,email,goTo}) {

  
  
  return (
    <TouchableOpacity onPress={goTo} style={{ backgroundColor: "#FFFFFF",marginBottom:14,marginRight:1,marginLeft:1,marginTop:1 }}>
      <View style={{ flexDirection: "row", elevation: 4, height: 65, backgroundColor: "#FFFFFF", borderRadius: 10 }}>
        <View style={{ justifyContent: "center", alignItems: "center", marginRight: 10, marginLeft: 7 }}>
          <Ionicons name="person-circle-outline" size={40} color="#000000" />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text>{name}</Text>
          <Text>{mobile}</Text>
        </View>
      </View>
    </TouchableOpacity>

  )
}


const Dashboard = ({navigation}) => {

  const { user,logout } = useContext(AuthContext)
  const [allUsers,setAllUsers]=useState([])
  const [loading, setLoading] = useState(false)


useEffect(()=>{
   getUsers()
},[])


  const getUsers=async()=>{
    setLoading(true)
  const res =await GetAllUsers.getAllUsers(user.uid)

  setAllUsers(res)
  setLoading(false)
     
  }

  
  return (
    <View style={{ flex: 1,backgroundColor:"#FFFFFF" }}>
        {/* {
                loading ?
                    <Spinner visible={true} />
                    :
                    null
            } */}

      <View style={{ flex: 0.07, backgroundColor: "#282eed", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 10, paddingRight: 10 }}>
        <Ionicons name="person-circle-outline" size={30} color="#FFFFFF" />
        <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "800" }}>All Users</Text>
        <TouchableOpacity onPress={()=> logout()}>
        <Ionicons name="search" size={25} color="#FFFFFF" />

        </TouchableOpacity>

      </View>
      <View style={{ flex: 0.93, paddingLeft: 10, paddingRight: 10, marginTop: 10,backgroundColor:"#FFFFFF" }}>
        
        <FlatList
           data={allUsers}
           keyExtractor={(stock)=> stock.id}
           renderItem={({item})=>{

            return(
              <UserCard
               key={item.id}
               name={item.username}
               mobile={item.mobile}
               email={item.email}
               goTo={() => navigation.navigate("Chat", item)}
              />
            )

           }}
        
        />
      </View>


    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  topContainer: {

    backgroundColor: "red"
  },
  bottomContainer: {

    backgroundColor: "blue"

  }
})