import React from 'react';
import {Text, View, Button, Image } from 'react-native';
import { FormInput } from 'react-native-elements'
import styles from './Styles'
import { Link, Redirect } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
import {addRoom} from '../../ducks/reducer'


const socket = io.connect('https://server.aktlist.com')

class CreateRoom extends React.Component {
  constructor(){
    super()
    this.state = {
        text: '',
        toGameRoom: false
    }
    
  }

  createGame = () => {
    axios.get(`https://server.aktlist.com/api/checkroom/${this.state.text}`)
    .then(res => {
      if(!res.data[0]){
        axios.post('https://server.aktlist.com/api/addroom', {room: this.state.text})
        .then(res =>{
          socket.emit('join-room', {room: this.state.text})
          
          this.props.addRoom({room: this.state.text})
          console.log(this.props)
          this.setState({
            toGameRoom: true
          })
        })
      } else {
        swal({
          type: 'error',
          title: 'Oops...',
          text: "Looks like that room is already taken!",
        })
      }
    })
  }
  handleRoomInput(input){
    this.setState({
      text:input
    })
    console.log(input)
  }

  render(props) {
    if (this.state.toGameRoom === true) {
      return <Redirect to="/New-Game"/>
  } 
    
    return (
      <View style={styles.home}>
          <Text> Create Room </Text>
          <View style={styles.box}>
          <FormInput onChangeText={(input)=>{this.handleRoomInput(input)}} placeholder="Room Name" value={this.state.text} containerStyle={{width: 200}}/>
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

export default connect(mapStateToProps, {addRoom})(CreateRoom);


