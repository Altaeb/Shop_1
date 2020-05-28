import React from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { 
  View,
  Slider,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  ScrollView,
  AsyncStorage
  } from 'react-native';

import { Card, Button } from 'react-native-elements'
import axios from 'axios';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DismissKeyboard from 'dismissKeyboard';
import * as EmailValidator from 'email-validator';


class Client extends React.Component {
  static navigationOptions = ({ navigation }) => {
		return {
			title: null,
		
		};
	};

  state = {
    org:'',
    phone: '',
    email:'',
    subject:'',
    rate:40,
    data:[],
    userid:'',
  };
    
  componentDidMount(){
    this.getServices();
  }
  
  change(value) {
    this.setState(() => {
      return {
        rate: parseFloat(value),
      };
    });
  }
/*

*/
getServices = async () => {
    const userid = await AsyncStorage.getItem('userid') ;
    this.setState({
      userid
    })

    const url =`https://time-payroll.herokuapp.com/api/service/user/${userid}`;
    axios(url)
      .then(data => {
        this.setState({ data });
    });
}

  
  addClient(){

    const {
      navigation: { navigate },
    } = this.props;

    const { org,phone,email,subject,userid } = this.state;
    
    if (!org) {
      Alert.alert('Enter the name!');
      return
    }

    if (!phone) {
      Alert.alert('Enter the phone number!');
      return
    }

    if (!email) {
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

    if (!subject) {
      Alert.alert('Enter the subject!');
      return
    }

    fetch(`https://time-payroll.herokuapp.com/api/org/user/${userid}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
          org:this.state.org,  
          phone:this.state.phone,
          email:this.state.email,
          subject: this.state.subject,
          rate:this.state.rate,
       })
    })
    .then((response) => {
       //console.log(response);
       if(response.status ===200) {
        //Alert.alert('add customer')
        const { params } = this.props.navigation.state;
        //params.handleRefresh();
        navigate('Clients') 
       }else{
         Alert.alert( 'Add client Failed!', 'Please try again!')
                
       }
       
    })
    .catch((error) => {
      console.log(error)
    });
 }
 

  render() {
    
    let { org,phone,email,subject,rate,data,userid } = this.state;
   
    return (

      <ScrollView
          keyboardShouldPersistTaps='never'
        >
        <View style={{marginTop:30, alignItems:'center', justifyContent:'center'}}>
         <TouchableHighlight style={styles.buttonContainer} onPress={() => this.addClient()}>
          <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'600'}}>Save Client</Text>
         </TouchableHighlight>
       </View>
        <Card 
          title="New Client"
          containerStyle={{marginTop:20}}
        >
       
          <TextField
            label='Client Full Name'
            value={org}
            enablesReturnKeyAutomatically={true}
            onChangeText={ (org) => this.setState({ org }) }
          />
          <TextField
            label='Phone #'
            value={phone}
            enablesReturnKeyAutomatically={true}
            onChangeText={ (phone) => this.setState({ phone }) }
          />
          <TextField
            label='Email'
            value={email}
            onChangeText={ (email) => this.setState({ email }) }
          />
          
          <Dropdown
            label='Service'
            data={data.data}
            onChangeText={ (subject) => this.setState({ subject }) }
          />   
          
          <Text style={{color:'#C3C6C4', fontSize:16, fontWeight:'600'}}>Rate</Text> 
          <Text style={styles.text}>${String(rate)}</Text>
          <Slider
            step={1}
            maximumValue={100}
            onValueChange={this.change.bind(this)}
            value={rate}
          />
     
        </Card>
     
    </ScrollView>  
    
    );
  }
}

const styles = StyleSheet.create({
  
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:340,
    borderRadius:20,
    backgroundColor: "#5A98E1"
  },
});
export default Client