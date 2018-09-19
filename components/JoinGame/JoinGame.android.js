import React from 'react';
import {Text, View, Button, Image } from 'react-native';
import styles from './Styles'
import { Link } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'


const socket = io.connect('https://server.aktlist.com')

class JoinGame extends React.Component {
  constructor(){
    super()
    this.state = {
        input: '',
        toGameRoom: false
    }
    
  }

  render(props) {
    
    return (
      <View style={styles.home}>
          <Text> Join Room </Text>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}

export default connect(mapStateToProps)(JoinGame);


