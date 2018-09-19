import React from 'react';
import {Text, View, Button, Image } from 'react-native';
import styles from './Styles'
import { Link } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
import RouterButton from 'react-router-native-button';


const socket = io.connect('https://server.aktlist.com')

class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      sound: true,
      playbackFailed: false
    }

    
  }

  componentDidMount(){
    socket.emit('leaveAll')
    if(this.props.users[0]){
      //Dont like this but used to clear the sockets properly//
      window.location.reload()
    }
  }

  render(props) {
    
    return (
      <View style={styles.home}>
          <Image style={styles.logo} source={require("../../assets/logo.png")}/>

      <View style={styles.box}>
      <RouterButton to="/Create-Room" title="Create Room" color="#279af1"/>
      </View>

       <View style={styles.box}>
       <RouterButton to="/Join-Game" title="Join Game" color="#279af1"/>
      </View>

      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}

export default connect(mapStateToProps)(Home);


