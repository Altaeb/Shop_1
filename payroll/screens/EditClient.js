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
  ScrollView
  } from 'react-native';

import { Card, Button } from 'react-native-elements'
import axios from 'axios';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DismissKeyboard from 'dismissKeyboard';
import * as EmailValidator from 'email-validator';

class EditClient extends React.Component {
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
    rate:0,
    data:[],
    animating: false
  }


  componentWillMount(){
    this.getServices();

    const { navigation }=this.props;
    const client = navigation.getParam('client');

    const { _id,org,phone,email,subject,rate } = client;
    this.setState({
      org,
      phone,
      email,
      subject,
      rate
    })
  }

  change(value) {
    this.setState(() => {
      return {
        rate: parseFloat(value),
      };
    });
  }

  getServices = async () => {
    const userid = await AsyncStorage.getItem('userid') ;
    const url =`https://time-payroll.herokuapp.com/api/service/user/${userid}`;
    axios(url)
      .then(data => {
        this.setState({ data });
    });
  }
  
  closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 3000)


  updateClient(client){
    const {
      navigation: { navigate },
    } = this.props;

    const { _id } = client;
    
    const { name,org,phone,email,subject } = this.state;
   
    if (!org) {
      Alert.alert('Enter the client!');
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

    this.setState({
      animating:true,
    })
   
    return fetch(`https://time-payroll.herokuapp.com/api/org/${_id}`, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        org:this.state.org,
        email:this.state.email,
	      subject: this.state.subject,
        rate:this.state.rate,
        phone:this.state.phone,
       
       })
    })
    .then((response) => {
       //console.log(response);
       this.closeActivityIndicator();
       if(response.status ===200) {

        navigate('Clients');
       }else{
         Alert.alert( 'Client Update Failed!', 'Please try again!')
                
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
    const animating = this.state.animating    
    const { navigation }=this.props;
    const client = navigation.getParam('client');
    const { _id,org,phone,email,subject,rate } = client;
    const { data }=this.state;
    console.log(data);

    return (
      <ScrollView
          keyboardShouldPersistTaps='never'
        >
        <View style={{marginTop:30, alignItems:'center', justifyContent:'center'}}>
         <TouchableHighlight style={styles.buttonContainer} onPress={() => this.updateClient(client)}>
          <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'600'}}>Update Client</Text>
         </TouchableHighlight>
       </View>

        <Card 
          title="Client"
          containerStyle={{marginTop:10}}
        >
       
          <TextField
            label='Client Full Name'
            value={this.state.org}
            enablesReturnKeyAutomatically={true}
            onChangeText={ (org) => this.setState({ org }) }
          />
          <TextField
            label='Phone #'
            value={this.state.phone}
            enablesReturnKeyAutomatically={true}
            onChangeText={ (phone) => this.setState({ phone }) }
          />
          <TextField
            label='Email'
            value={this.state.email}
            onChangeText={ (email) => this.setState({ email }) }
          />
          
          <Dropdown
            label='Tutoring Subject'
            data={data.data}
            value={subject}
            onChangeText={ (subject) => this.setState({ subject }) }
          />
          
          <Text style={{color:'#C3C6C4', fontSize:16, fontWeight:'600'}}>Rate</Text>
          <Text style={styles.text}>${String(this.state.rate)}</Text>
          <Slider
            step={1}
            maximumValue={100}
            onValueChange={this.change.bind(this)}
            value={this.state.rate}
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
    borderRadius:30,
    backgroundColor: "#5A98E1"
  },
});
export default EditClient