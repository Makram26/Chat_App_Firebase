import firestore from '@react-native-firebase/firestore'




const getAllUsers = async (id) => {

    var userList = [];
  
    console.log(id)
  
    await firestore().collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { user_id, username, mobile,email } = doc.data()
          if (user_id !== id) {
            userList.push({
              id: user_id,
              username: username,
              mobile: mobile,
              email: email
            });
          }
        });
      })
  
  
  
    return userList
  }


  export default {
    getAllUsers
  }