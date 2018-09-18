import React from 'react';
import {Text, View } from 'react-native';
import styles from './Styles'
import { Link } from 'react-router-native'

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <Link to="/"> 
          <Text style={styles.title}>Flower</Text>
       </Link>
      </View>
    );
  }
}


