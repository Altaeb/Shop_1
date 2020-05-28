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
  Image
  } from 'react-native';

import { Card, Button, Divider } from 'react-native-elements'
import axios from 'axios';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DismissKeyboard from 'dismissKeyboard';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export default class ClientDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
		return {
			title: null,
		};
	};

  state ={
    refreshing:false,
    org:'',
    phone: '',
    email:'',
    subject:'',
    rate:40,
    data:[],
    userid:'',
  }

  componentWillMount(){
    const { navigation }=this.props;
    const client = navigation.getParam('client');
    const { _id,org,phone,subject,rate,email } = client;
    
    this.setState({
      org,
      phone,
      subject,
      rate,
      email,
    })
  }

 /*
  refreshScreen() {

    this.setState({
      refreshing:true,
    })

  }
*/

  deleteClient(id){
   
   const {
      navigation: { navigate },
    } = this.props;

    const { navigation } = this.props;

    Alert.alert(
      'Delete Client',
      'Are you sure to delete the client ? ',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.confirmOK(id)},
      ],
      { cancelable: false }
    )

   }
  
  confirmOK(id) {
    const {
      navigation: { navigate },
    } = this.props;

    const { params } = this.props.navigation.state;
    params.handleRefresh()

     axios.delete(`https://time-payroll.herokuapp.com/api/org/${id}`)
    .then(res => {
    //console.log(res);
     navigate('Clients') 
     
    })
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;

    const { navigation }=this.props;

    const { refreshing } = this.state;
    
    const client = navigation.getParam('client');
    const { _id,org,phone,subject,rate,email } = client;
    
    return (
      <ScrollView
          keyboardShouldPersistTaps='never'
        >
        <Card 
          title="Client"
          containerStyle={{marginTop:20}}
        >
          <View>
            <Text style={styles.smallText}>Full Name</Text>
            <Text style={styles.largeText}>{org}</Text> 
          </View>
          <Divider style={{ backgroundColor: '#F0F6FC' }} />
          
          <View>
            <Text style={styles.smallText}>Phone #</Text>
            <Text style={styles.largeText}>{phone}</Text> 
          </View>
          <Divider style={{ backgroundColor: '#F0F6FC' }} />

          <View>
            <Text style={styles.smallText}>Email</Text>
            <Text style={styles.largeText}>{email}</Text> 
          </View>
          <Divider style={{ backgroundColor: '#F0F6FC' }} />

          <View>
            <Text style={styles.smallText}>Service</Text>
            <Text style={styles.largeText}>{subject}</Text> 
          </View>
          <Divider style={{ backgroundColor: '#F0F6FC' }} />

          <View>
            <Text style={styles.smallText}>Rate</Text>
            <Text style={styles.largeText}>{rate}</Text> 
          </View>
          <Divider style={{ backgroundColor: '#F0F6FC' }} />
 
        </Card>

         
        <View style={{ marginTop:20, alignItems:'center', justifyContent:'center'}}>
          
       </View>

       <Card>
         <View style={{flexDirection:'row', justifyContent: 'space-between', flex:1}}>
            <TouchableHighlight 
               onPress={() => navigate('EditClient',{client:client})}
            >
              <View>
                <Image 
                  source ={require('./images/edit.png')}
                  style={{width:48, height:48}} />    

                  <Text style={[styles.smallText, {marginLeft:10}]}>Edit</Text>
              </View> 
            </TouchableHighlight>
                      
            <TouchableHighlight
              onPress={() => this.deleteClient(_id)}
            >          
              <View>
                <Image 
                    source ={require('./images/delete.png')}
                    style={{width:48, height:48}}
                    
                />
                 <Text style={styles.smallText}>Delete</Text>
             </View> 

            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => navigate('Invoice',{client:client})}
              
            >
              <View>
                <Image 
                    source ={require('./images/plus.png')}
                    style={{width:48, height:48}}
                    
                />
                <Text style={styles.smallText}>Invoice</Text>
              </View>
            </TouchableHighlight>
              
        </View>
       </Card>     
    </ScrollView>  
    
    );
  }
}

const styles = StyleSheet.create({
  
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#5A98E1"
  },
  smallText:{
    color:'#B2D9FA',
    fontSize:10,
    fontWeight: '600',
  },
  largeText:{
    color:'#818386',
    fontSize:14,
    padding:10 ,
    fontWeight: '600',
  }
});
