import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, Switch } from 'react-router-native'
import {Provider} from 'react-redux'
import store from './ducks/store'
import Home from './components/Home/Home.android';
import CreateRoom from './components/CreateRoom/CreateRoom.android'
import JoinGame from './components/JoinGame/JoinGame.android'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <NativeRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/Create-Room" component={CreateRoom}/>
            <Route path='/Join-Game' component={JoinGame}/>
        </Switch>
      </NativeRouter>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
