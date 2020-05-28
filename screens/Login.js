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
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { Button,Card,Icon } from 'react-native-elements';
import * as EmailValidator from 'email-validator';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      avatar:'', 
      animating: false
    }
  }

  

  closeActivityIndicator = () => setTimeout(() => this.setState({
   animating: false }), 3000)

  
  userLogin() {
    
  
    const { navigation: { navigate },} = this.props;
    //======================================================
    
    //navigate('Dashboard',
     //   {
     //    email:"wpiusa@gmail.com",
     //    avatar:'//www.gravatar.com/avatar/31ae19e010d1080dda1a0fea39dcb239?s=200&r=pg&d=mm'
      // });
  
    //=========================================================================     
        
    if (!this.state.email) {
      Alert.alert('Enter the email!');
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
      Alert.alert('Enter the password!');
      return
    }

    
    this.setState({
      animating:true,
    })

    fetch('https://time-payroll.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => {
       //console.log(response);
       this.closeActivityIndicator();
       AsyncStorage.setItem('userid', this.state.email);

       if(response.status ===200) {
         navigate('Dashboard',
         {
           email:this.state.email,
           avatar:'//www.gravatar.com/avatar/31ae19e010d1080dda1a0fea39dcb239?s=200&r=pg&d=mm'
         });
       }else{
         Alert.alert( 'Login Failed!', 'Please try again!')
        
         this.setState({
           email:'',
           password:''
         })
        // navigate('Dashboard',
         //{
           //email:this.state.email,
          // avatar:'//www.gravatar.com/avatar/31ae19e010d1080dda1a0fea39dcb239?s=200&r=pg&d=mm'
         //});
       }
       
    })
    .catch((error) => {
      console.log(error)
    });
 }

 userSignup(){
   const { navigation: { navigate },} = this.props;
    navigate('Register');
 }

 forgotPassword(){
   const { navigation: { navigate },} = this.props;
   navigate('ResetPassword');
 }
  render() {
    const animating = this.state.animating
    return (
      
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
       <Card
         title="Login To Payroll"
       >  
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}/>
          </View>
          
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}/>
          </View>
       </Card>
           
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.userLogin()}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.userSignup()}>
          <Text style={styles.signUpText}>New User? Register here</Text>
        </TouchableHighlight>
       
        <TouchableHighlight onPress={() => this.forgotPassword()}>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableHighlight>

        <ActivityIndicator
          animating = {animating}
          color = '#1BD1F9'
          size = "large"
          style = {styles.activityIndicator}
       />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
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
    width:280,
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
    fontSize:15,
    marginTop:20,
  },
  forgotText:{
    color:'#F44336',
    fontSize:15,
    marginTop:15,
    marginBottom:20,
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
});