import React, { Component } from 'react';
import { Text, View,Button } from 'react-native';

import { createStackNavigator } from 'react-navigation';
import Login from './screens/LoginSave';

export default class Routes extends Component {

  render(){
    const LoginScreen = createStackNavigator(
       {
         login: {
           screen: Login,
          },
        
       },
        
   );
    
    return(
      <LoginScreen />
    )
  }
}





