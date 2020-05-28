import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { Button,Card,Icon } from 'react-native-elements';

export default class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
    }
  }

//PUT api/users/email/:email
  changePassword() {
    const { navigation: { navigate },} = this.props;
    if (!this.state.email || !this.state.password) return;
    
    fetch('https://time-payroll.herokuapp.com/api/users/email/:email', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => {
       //console.log(response);
       if(response.status ===200) {
         navigate('Dashboard',
         {
           email:this.state.email,
           avatar:'//www.gravatar.com/avatar/31ae19e010d1080dda1a0fea39dcb239?s=200&r=pg&d=mm'
         });
       }else{
         Alert.alert( 'Change Password Failed!', 'Please try again!')
       }
       
    })
    .catch((error) => {
      console.log(error)
    });
 }
 
  render() {
    return (
      
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
       <Card
         title="Change Password"
       >  
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
          </View>
          
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="New Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>
       </Card>

    
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.changePassword()}>
          <Text style={styles.loginText}>Change Password</Text>
        </TouchableHighlight>

      
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF1F6',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginTop:30,
    width:200,
    borderRadius:20,
  },
  signupButton: {
    backgroundColor: "#3BEFFD",
  },
  loginText:{
   color:'#FFFFFF'
  },
  signUpText: {
    color: '#2B9DF7',
    fontSize:12,
  },
  forgotText:{
    color:'#F44336',
    fontSize:12,
    marginTop:15
  }
});