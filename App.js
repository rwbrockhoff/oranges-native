import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, Switch } from 'react-router-native'
import {Provider} from 'react-redux'
import store from './ducks/store'
import Home from './components/Home/Home.android';
import Flower from './components/Flower/Flower.android';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <NativeRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/flower" component={Flower}/>
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
