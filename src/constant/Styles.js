import {Dimensions,StyleSheet} from "react-native"


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    inputContainer: {
      borderColor: "#00000057",
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      // width: "90%",
      // padding: 5,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 10,
      // paddingLeft: 8
    },
    inputText: {
      width: "90%",
      fontSize: 13,
      color: "#000000",
      padding: 6,
    },
    btnContainer: {
      marginTop: 15,
      backgroundColor: "#282eed",
      // width: "90%",
      alignItems: "center",
      borderRadius: 100
    },
    btnText: {
      padding: 10,
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "bold"
    },
    imageContainer: {
      height: windowWidth / 1.3,
      width: windowWidth / 1.3,
    },
    textStyle: {
      // width: "90%",
      fontSize: 14,
      fontWeight: "600",
      color: "#000000",
      textAlign: "right",
      marginTop: 10
    },
    bottomContainer: {
      marginTop: 20,
      marginBottom: 15
    },
    heading: {
      fontSize: 20,
      fontWeight: "900",
      color: "#000000",
      marginTop: -10,
      marginBottom: 5
    },
    headingText: {
      fontSize: 12,
      color: "#000000",
      fontWeight: "500",
      marginBottom: 5
    },
    drawLine: {
      flex: 1,
      height: 1,
      backgroundColor: 'black'
    },
    errorSyles:{
      color: "red", 
      fontSize: 12 
    }
  })

  export default styles;