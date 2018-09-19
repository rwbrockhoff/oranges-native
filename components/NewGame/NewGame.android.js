import React from 'react';
import {Text, View, Button, Image } from 'react-native';
import styles from './Styles'
import { Link } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'


const socket = io.connect('https://server.aktlist.com')

class NewGame extends React.Component {
  constructor(){
    super()
    this.state = {

    }
    
  }

  render(props) {
    
    return (
      <View style={styles.home}>
          <Text> New Game </Text>
          <Text>{this.props.room}</Text>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}

export default connect(mapStateToProps)(NewGame);
