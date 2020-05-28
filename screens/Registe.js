import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Button,Card,Icon } from 'react-native-elements';
import * as EmailValidator from 'email-validator';

export default class Register extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email   : '',
      password: '',
      password2:'', 
      animating: false
    }
  }
   
  closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 3000)


  userRegister() {

    const { navigation: { navigate },} = this.props;
    const { password,password2 } =this.state;

    if (!this.state.name) {
        Alert.alert( 'Enter the name !')
        return
    }

    if (!this.state.email) {
        Alert.alert( 'Enter the email !')
        return
    }

    if (!EmailValidator.validate(this.state.email)) {
      Alert.alert('Invalid email format !');
      this.setState({
        email:''
      })
      return
    }

    if (!this.state.password) {
        Alert.alert( 'Enter the password !')
        return
    }

    if (!this.state.password2) {
        Alert.alert( 'Re-Enter the password !')
        return
    }

    if (password !== password2) {
      Alert.alert( 'Password is not matched !')
      return
    }

    this.setState({
      animating:true,
    })

    fetch('https://time-payroll.herokuapp.com/api/users/register', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:this.state.name,
        email:this.state.email,
        password: this.state.password,
        password2: this.state.password2,
      })
    })
    .then((response) => {
       //console.log(response);
       this.closeActivityIndicator();
       if(response.status ===200) {
         navigate('Dashboard',
         {
           email:this.state.email,
           avatar:'//www.gravatar.com/avatar/31ae19e010d1080dda1a0fea39dcb239?s=200&r=pg&d=mm'
         });
       }else{
         Alert.alert( 'Register Failed!', 'Please try again!')
       }
       
    })
    .catch((error) => {
      console.log(error)
    });
 }


  render() {
    const animating = this.state.animating
    return (
      
      <ScrollView
         keyboardShouldPersistTaps='never'
      >
       <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.userRegister()}>
          <Text style={styles.loginText}>Register</Text>
       </TouchableHighlight>

       <Card
         title="Sign Up"
       >  
           <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Name"
                underlineColorAndroid='transparent'
                onChangeText={(name) => this.setState({name})}/>
          </View>

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
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Re-Enter Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password2) => this.setState({password2})}/>
          </View>
       </Card>

       <ActivityIndicator
          animating = {animating}
          color = '#1BD1F9'
          size = "large"
          style = {styles.activityIndicator}
       />
      </ScrollView>

      
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
    height:55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginTop:30,
    width:350,
    borderRadius:20,
    marginLeft:10,
  },
  signupButton: {
    backgroundColor: "#F9581B",
  },
  loginText:{
   color:'#FFFFFF',
   fontWeight: '600',
   fontSize:16,
  },
  forgotText:{
    color:'#F95F46',
    fontSize:12,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 }
});