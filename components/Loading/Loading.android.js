import React from 'react';

import {View, ActivityIndicator, Image } from 'react-native';
import { FormInput, Text } from 'react-native-elements'
import styles from './Styles'

import { Link, Redirect } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
import swal from 'sweetalert2'

import {addPlayer, setJudge, updateQCard, readyPlayer} from '../../ducks/reducer'



const socket = io.connect('https://server.aktlist.com')

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        waiting: true,
        waitingPlayers: [],
        propsReadyPlayers: []
    }

    socket.on('user-added', data =>{
        let tempArr = this.props.users.slice(0)
        tempArr.push(data)
        console.log(tempArr)
        this.props.addPlayer(tempArr)
      })

    socket.on('ready-player-added', data => {
        // console.log('readyplayers', data)
        this.props.readyPlayer(data)
      })

      socket.on('readied-players', () => {

        socket.emit('readyPlayers-array', {players: this.props.readyPlayers, room: this.props.room})
      })

      socket.on('getQCard', data => {
        this.props.updateQCard(data.qCard)
    })

}

async componentDidMount(){
  console.log(this.props.room, 'room')
  socket.emit('join-room-generic', {room:this.props.room})
  await this.setState({propsReadyPlayers: this.props.readyPlayers})
  let tempArray = []
  this.props.users.map((e,i) => {
      console.log('users', e)
      let indexOfPlayer = this.state.propsReadyPlayers.findIndex((element) => {
          console.log('element', element, e)
          return element.user === e.user
      })
      console.log(indexOfPlayer,"index")
      if(indexOfPlayer === -1){
          tempArray.push(this.props.users[i])
      }
      return tempArray
  })
  this.setState({waitingPlayers: tempArray})
  if(this.props.readyPlayers.length === this.props.users.length){
      axios.put('https://server.aktlist.com/api/lockroom', {roomName:this.props.room})
      .then(
          this.setState({
              waiting: false
          }),
  
          this.setJudge(),
          this.toGame()
      )

  } else if (this.props.readyPlayers.length !== this.props.users.length){
      this.setState({
          waiting: true
      })
  }
  
}

async componentDidUpdate(prevProps){
  if(this.props.readyPlayers !== prevProps.readyPlayers || this.props.users !== prevProps.users){
      await this.setState({propsReadyPlayers: this.props.readyPlayers})
      let tempArray = []
      this.props.users.map((e,i) => {
          console.log('users', e)
          let indexOfPlayer = this.state.propsReadyPlayers.findIndex((element) => {
              console.log('element', element, e)
              return element.user === e.user
          })
          console.log(indexOfPlayer,"index")
          if(indexOfPlayer === -1){
              tempArray.push(this.props.users[i])
          }
          return tempArray
      })
      this.setState({waitingPlayers: tempArray})
      if(this.props.readyPlayers.length === this.props.users.length){
          this.setState({
              waiting: false
          }),
          this.setJudge(),
          this.toGame()
      } else if (this.props.readyPlayers.length !== this.props.users.length){
          this.setState({
              waiting: true
          })
      }
  }
  
}

setJudge = () => {
  let modifiedUsers = this.props.users
  let index = Math.floor ( Math.random() * this.props.users.length )
  modifiedUsers[0].judge = true
  this.props.setJudge(modifiedUsers)
}


toGame(){
  setTimeout(()=>{
      this.setState({
          toGame: true
      })
  },3000)
}

  render(props) {
    
    return (
      <View style={styles.home}>

           <ActivityIndicator size="large" color="white" />

      {this.state.waiting ? 
      <Text h4 style={styles.loading}>Waiting on the following players...</Text> : 
      <Text h4 style={styles.loading}>Shuffling deck...</Text>}
  
  
        <View style={styles.userBox}>
          {this.state.waitingPlayers.map((e,i) => {
            return(
             <View style={styles.userBubble} key={i}>
                  <Image style={styles.icon} source={{uri: e.userPic}}/>
                 <Text h4> {e.user} </Text>
             </View>
            )
          })}
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



export default connect(mapStateToProps,{addPlayer, setJudge, updateQCard,readyPlayer})(Loading);
