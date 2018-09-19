import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    home: {
      flex: 1,
      backgroundColor: 'skyblue',
      width: '100%',
      alignItems: 'center',
      paddingTop: 140
    },
    icon: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginLeft: 15
    },
    title: {
      fontSize: 40
    }, 
    box: {
      height: 200, 
      width: 350,
      backgroundColor: 'white',
      borderRadius: 15,
      margin: 10,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    userBox: {
      height: 300,
      width: 350,
      marginTop: 50,
      marginBottom: 20
    },
    userBubble: {
      height: 60,
      width: 350,
      backgroundColor: 'white',
      borderRadius: 15,
      marginTop: 3,
      marginBottom: 3,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    bottomInput: {
      height: 150,
      width: 350,
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'white',
      borderRadius: 15,
      margin: 10,
      marginBottom: 80,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    loading: {
      marginTop: 30
    }
  });