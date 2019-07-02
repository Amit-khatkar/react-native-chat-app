import React, {Component} from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'
import login from './src/auth/login';
import inbox from './src/main/inbox';
import ChatBox from './src/main/ChatBox';

console.disableYellowBox = true;

const Main = createStackNavigator({
  login,
  inbox,
  ChatBox,
}, {
  headerMode: 'none'
})

const AppContainer = createAppContainer(Main);

export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}






