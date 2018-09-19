import React from 'react';

import {Text, View} from 'react-native';
import styles from './Styles'

import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'

import Qcard from '../Qcard/Qcard.android'
import Acards from '../Acard/Acard.android'


const socket = io.connect('https://server.aktlist.com')

class Game extends React.Component {
  constructor(){
    super()
    this.state = {
      judge: false
    }
  }

  componentDidMount(){
    let judge = this.props.users.filter(player => {
      return player.judge === true
    })
    console.log(judge, 'judge')
    if(judge[0].user === this.props.user.user){
      this.setState({
        judge: true
      })
    }
  }

  render(props) {
    
    return (
      <View style={styles.home}>

        <View>
            <Qcard/>
        </View>

    <View>
{this.state.judge === true ? 
<Text h1>You're the judge this round!</Text>  : 
<Text></Text>
}
    </View>

        <View>
           <Acards/>
        </View> 

    </View>

    )
  }
}

function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}

export default connect(mapStateToProps)(Game);


