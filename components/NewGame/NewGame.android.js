import React from 'react';
import {View, Button, Image } from 'react-native';
import styles from './Styles'
import { Link } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
import { FormInput, Text } from 'react-native-elements'
import {addPlayer, storeUser, readyPlayer} from '../../ducks/reducer'


const socket = io.connect('https://server.aktlist.com')

class NewGame extends React.Component {
    constructor(){
        super()
        this.state = {
            text: '',
            pictureInput: '',
            roomId: null,
            players: [],
            toLoading: false,
            userNameSubmit: false,
            cancelGame: false
        }

        socket.on('user-added', data =>{
          let tempArr = this.props.users.slice(0)
          tempArr.push(data)
          this.props.addPlayer(tempArr)
        })


        socket.on('new-player', data =>{
        })

        socket.on('get-me-players', ()=>{
          if(this.props.users[0]) {
            socket.emit('here-are-players', {players: this.props.users, room: this.props.room})
          }
        })

        socket.on('ready-player-added', data => {

          this.props.readyPlayer(data)
        })

        socket.on('readied-players', () => {
          socket.emit('readyPlayers-array', {players: this.props.readyPlayers, room: this.props.room})
        })

        socket.on('add-players', data => {
          this.props.addPlayer(data.data.players)
        })

        socket.on('here-are-readyPlayers', data => {
          this.props.readyPlayer(data)
        })

        socket.on('removed-players', data => {
          this.props.addPlayer(data)
        })



    }
    componentDidMount(props){

      this.setState({
        roomId: this.props.room,
        players: this.props.users
      })
      socket.emit('join-room', {room:this.props.room})

      socket.emit('receive-ready-players', {room: this.props.room})

    }
    
    createUser = ()=>{
      let names = this.props.users.map(element => {
        return element.user
      })
      if(names.indexOf(this.state.text) === -1){
        socket.emit('add-user', {userName: this.state.text, userPic: `https://api.adorable.io/avatars/50/${this.state.text}.png`, room:this.props.room, score: 0})
        this.props.storeUser({user: this.state.text, userPic: `https://api.adorable.io/avatars/50/${this.state.text}.png`, judge: false, score: 0})
        this.setState({userNameSubmit: true})
      } else {
        // swal({
        //   type: 'error',
        //   text: "Looks like that name is already taken!",
        // })
        alert('name already taken')
      }
    }

    handleRoomInput(input){
        this.setState({
          text:input
        })
        console.log(input)
      }

      async readyClick(){
      
        let copyReady = this.props.readyPlayers.slice(0);
        copyReady.push(this.props.user)
        await this.props.readyPlayer(copyReady)
        socket.emit('ready-player', {players: this.props.readyPlayers, room:this.props.room})
        setTimeout(() => {
          this.setState({toLoading: true})
        }, 1000)
      }
  
      cancelGame = () => {
        this.setState({cancelGame: true})
  
        // If user submitted userName, but cancelled game--we need to
        // remove them from readyPlayers on cancel.
  
      }

  render(props) {

    var userInputReady = () => {
      // If they haven't submitted a userName, render Input box.
      if (!this.state.userNameSubmit){
        return (
      <View>
          <FormInput onChangeText={(input)=>{this.handleRoomInput(input)}} placeholder="User Name" value={this.state.text} containerStyle={{width: 200, marginBottom: 20}}/>
          <Button onPress={this.createUser}title="Join"></Button>
      </View>
        )}
  
      // If they submitted userName, render a ready message.
      else if (this.state.userNameSubmit && this.props.users.length > 2) {
        return (
          <View>
              <Text h4> Ready up when everyone is here! </Text>
          </View>
        )
      }
      else if(this.state.userNameSubmit){
        return(
      <View>
          <Text h4> Waiting for more players. </Text>
      </View>
        )
      }
    }
  
    var userButtonReady = () => {
      if (this.state.userNameSubmit && this.props.users.length > 1){
        return ( 
        <Button onPress={this.readyClick} title="Ready?"></Button>
        )
      }
      
    }

    
    return (
      <View style={styles.home}>
          <Text h3>Room ID: {this.props.room}</Text>
      
      {/* Eventually we will have to change View to ScrollView or FlatList because View doesn't have a scroll property. */}
      
      <View style={styles.userBox}>
        {this.props.users.map((element, index) =>{
          console.log('elementuser',element)
          return(
           <View style={styles.userBubble} key={index}>
                <Image style={styles.icon} source={{uri: element.userPic}}/>
               <Text h4> {element.user} </Text>
           </View>
          )
        })}
      </View> 
                <View style={styles.bottomInput}>
                    {userInputReady()}
                    {userButtonReady()}
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

export default connect(mapStateToProps, {addPlayer, storeUser, readyPlayer})(NewGame);
