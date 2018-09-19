import React from 'react';
import {Text, View, Button, Image } from 'react-native';
import styles from './Styles'
import { Link, Redirect } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
import swal from 'sweetalert2'
import { FormInput } from 'react-native-elements'
import { addRoom } from '../../ducks/reducer'


const socket = io.connect('https://server.aktlist.com')

class JoinGame extends React.Component {
  constructor(){
    super()
    this.state = {
        text: '',
        toGameRoom: false
    }
    
  }

  joinGame = () =>{
    axios.get(`https://server.aktlist.com/api/checkroom/${this.state.text}`)
    .then(res => {
      if(res.data[0] && res.data[0].open === true){
        socket.emit('join-room', {room: this.state.text})
        this.props.addRoom({room: this.state.text})
        this.setState({
          toGameRoom: true
        })
      } else if (res.data[0] && res.data[0].open === false){
        // swal({
        //   type: 'error',
        //   text: "Game already in progress!",
        // })
        alert('game already in progress')
      } else {
        // swal({
        //   type: 'error',
        //   title: 'Oops...',
        //   text: "We can't find that room!",
        // })
        alert('cant find that room')
      }
    })
  }
  handleRoomInput(input){
    this.setState({
      text:input
    })
  }

  render(props) {
    if (this.state.toGameRoom === true) {
      return <Redirect to="/New-Game"/>
  } 
    return (
      <View style={styles.home}>
          <Text> Join Room </Text>
          <View style={styles.box}>
          <FormInput onChangeText={(input)=>{this.handleRoomInput(input)}} placeholder="Room Name" value={this.state.text} containerStyle={{width: 200}}/>
          <Button onPress={this.joinGame}title="Join Game"></Button>
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

export default connect(mapStateToProps, {addRoom})(JoinGame);


