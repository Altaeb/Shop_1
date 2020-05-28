import React, { Component } from 'react';
import { Text, View,Button } from 'react-native';

import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Register from '../screens/Registe';
import ResetPassword from '../screens/ResetPassword';
import Dashboard from '../screens/Dashboard';


export default class Routes extends Component {

  render(){
    const ClientScreen = createStackNavigator(
      {
        Welcome:{
          screen: Welcome,
          navigationOptions: {
            header: null
          }
        },
        Login:{
          screen: Login,
          navigationOptions: {
            header: null
          }
        },
        Register: {
          screen: Register,
          
        },
        ResetPassword: {
          screen: ResetPassword,          
        },
        Dashboard: {
          screen: Dashboard,
          navigationOptions: {
            header: null
          }
        }, 
        

      }     
   );
    
    return(
      <ClientScreen />
    )
  }
}

