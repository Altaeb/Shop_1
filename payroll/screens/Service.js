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
  AsyncStorage
} from 'react-native';
import { Button,Card,Icon } from 'react-native-elements';
import Services from './Services';

export default class Service extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value:'',
      userid:'',
    }
  }
   
  componentDidMount(){
    this.getUserId();
  }

  getUserId = async () => {
    const userid = await AsyncStorage.getItem('userid') ;
    //const userid ="wpiusa@gmail.com"
    this.setState({
      userid
    })
    
  }

  displayService = () => {
   
    const {
      navigation: { navigate },
   } = this.props;

    const { navigation }=this.props;
    navigate('Services')
   
  }

  addService() {
   // const email="wpiusa@gmail.com" // change to your email
    const { userid }=this.state;
    if (!this.state.value) {
        Alert.alert( 'Enter the service !')
        return
    }
   
    fetch(`https://time-payroll.herokuapp.com/api/service/user/${userid}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        value:this.state.value,
      })
    })
    .then((response) => {
       if(response.status ===200) {
         Alert.alert( 'Add Service Success !')
         this.setState({value:''})
        
       }else{
         Alert.alert( 'Add Service Failed!', 'Please try again!')
       }
       
    })
    .catch((error) => {
      console.log(error)
    });
 }


  render() {
    const {
     navigation: { navigate },
   } = this.props;
    
    return (
      
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
       
       <Card
        
       >  
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} 
             onPress={() => this.addService()}>
            <Text style={styles.loginText}>Add Service</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} 
             onPress={() => this.displayService() }>   
            <Text style={styles.loginText}>List Services</Text>
          </TouchableHighlight>

           <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Enter Service Name"
                value={this.state.value}
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({value})}/>
           </View>

       </Card>
    
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#EAF1F6',
    
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
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
    marginBottom:10,
    marginTop:10,
    width:275,
    borderRadius:10,
  },
  signupButton: {
    backgroundColor: "#3BEFFD",
  },
  loginText:{
   color:'#FFFFFF'
  },
  
});