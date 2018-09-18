import React from 'react';
import {Text, View, Button } from 'react-native';
import styles from './Styles'
import { Link } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'

import io from 'socket.io-client/dist/socket.io.js'




class Home extends React.Component {
  constructor(){
    super()
    
    this.socket = io('https://server.aktlist.com')
    
    
  }

  testServer = () => {
    
    axios.get('https://server.aktlist.com/dylan').then((response) => {
      console.log(response.data, 'res')
    })
  }
  render() {
    this.socket.emit('fire')
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Join Game</Text>
        <Text style={styles.title}>New Game</Text>
        <Button onPress={this.testServer} title="hello"/>
        
        <Link to="/flower"><Text>Go Here </Text></Link>
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


