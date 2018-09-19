import React from 'react';

import {Text, View, Button, Image } from 'react-native';
import { FormInput } from 'react-native-elements'
import styles from './Styles'

import { Link, Redirect } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
import swal from 'sweetalert2'
import {storeQCard, updateQCard} from '../../ducks/reducer';

const socket = io.connect('https://server.aktlist.com')

class Qcard extends React.Component {
  constructor(){
    super()
    
    socket.on('getQCard', data => {
        this.props.updateQCard(data.qCard)
    })
    
}

componentDidMount(){
    socket.emit('join-room-generic', {room: this.props.room})

    let obj = this.arrayGet()
   
    if (obj[0].user === this.props.user.user){
        this.setter()
    }

}

arrayGet(){

  var userArray = this.props.users;
  
      var temp = userArray.filter((e,i) => {
          return e.judge===true
      })
      return temp
}

setter = () => {
  axios.get('https://server.aktlist.com/api/getqcard').then(results => {
      this.props.storeQCard(results.data)
  }).then(() => {
      socket.emit('updateQCard', {room: this.props.room, qCard: this.props.qCard})
  })
}


  render(props) {
    let displayQCard = this.props.qCard.map((e,i) => {
      return(
          <View style={styles.qcard} key={i}>
            <Text h1>{e.name}</Text>
            <Text h3>{e.description}</Text>
          </View>
      )
  })
return (
  <View >
      {displayQCard}
  </View>
)
}
}

function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}


export default connect(mapStateToProps, {storeQCard, updateQCard})(Qcard);

