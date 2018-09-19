import React from 'react';
import {Text, View, Button, Image } from 'react-native';
import { FormInput } from 'react-native-elements'
import styles from './Styles'
import { Link } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'


const socket = io.connect('https://server.aktlist.com')

class CreateRoom extends React.Component {
  constructor(){
    super()
    this.state = {
        input: '',
        toGameRoom: false
    }
    
  }

  createGame = () => {
    console.log('creating a game!')
  }

  render(props) {
    
    return (
      <View style={styles.home}>
          <Text> Create Room </Text>
          <View style={styles.box}>
          <FormInput containerStyle={{width: 200}}/>
          <Button onPress={this.createGame}title="Create Game"></Button>
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

export default connect(mapStateToProps)(CreateRoom);


