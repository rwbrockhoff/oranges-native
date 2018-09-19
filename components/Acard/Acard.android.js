import React from 'react';

import {Text, View, Button, Image } from 'react-native';
import { FormInput } from 'react-native-elements'
import styles from './Styles'

import { Link, Redirect } from 'react-router-native'
import {connect} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
import swal from 'sweetalert2'
import { addRoom } from '../../ducks/reducer'

const socket = io.connect('https://server.aktlist.com')

class Acard extends React.Component {
  constructor(){
    super()
    this.state = {
        addStuff: 'here'
    }
    
  }

  render(props) {
    
    return (
      <View style={styles.home}>
          <Text>Acard Component </Text>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}

export default connect(mapStateToProps, {addRoom})(Acard);


