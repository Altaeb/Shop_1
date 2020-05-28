import React from 'react';
import { View, Linking, TouchableOpacity,StyleSheet } from 'react-native';
import { Text, Button, Card, Divider,Avatar } from 'react-native-elements';

export default class Service extends React.Component {
  
  render() {
    const {
         value
    } = this.props.service;
     
    return (
      
       <Card
         title={value}
         containerStyle={{height:60}} 
       />
       
    );
  }
}

const styles = StyleSheet.create({
  
  avatarContainer: {
    justifyContent:'center', 
    alignItems:'center', 
    paddingLeft:10
  },
 
});
