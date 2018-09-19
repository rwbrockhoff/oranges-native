import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, Switch, history } from 'react-router-native'
import {Provider} from 'react-redux'
import store from './ducks/store'

import Home from './components/Home/Home.android';
import CreateRoom from './components/CreateRoom/CreateRoom.android'
import JoinGame from './components/JoinGame/JoinGame.android'
import NewGame from './components/NewGame/NewGame.android'
import Loading from './components/Loading/Loading.android'
import Pending from './components/Pending/Pending.android'
import Game from './components/Game/Game.android'
import EndGame from './components/EndGame/EndGame.android'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <NativeRouter history={history}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/Create-Room" component={CreateRoom}/>
            <Route path='/Join-Game' component={JoinGame}/>
            <Route path='/New-Game' component={NewGame}/>
            <Route path='/Loading' component={Loading}/>
            <Route path='/Pending' component={Pending}/>
            <Route path='/Game' component={Game}/>
            <Route path="/End-Game" component={EndGame}/>
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
