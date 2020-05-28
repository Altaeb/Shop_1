import React from 'react';
import { 
  View,
  Slider,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert, 
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput,
  ScrollView
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { Card, Button,CheckBox } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import DateTimePicker from 'react-native-modal-datetime-picker';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DismissKeyboard from 'dismissKeyboard';


class Invoice extends React.Component {
  static navigationOptions = ({ navigation }) => {
		return {
			title: "Invoice",
		
		};
  };
  
  state = {
    invDate:'',
    hoursfrom:'',
    hoursto:'',
    totalAmount:0,
    invYear:0,
    checked:false
  };
  
  
  addInvoice(){
    console.log('add invoice') ;
    const { navigation: { navigate },} = this.props;
    
    const { navigation }=this.props;
    const client = navigation.getParam('client');
    const { org,userid,subject,rate,email } = client;
    
    if (!this.state.invDate) {
        Alert.alert( 'Enter the invoice date !')
        return
    }

    if (!this.state.hoursfrom) {
        Alert.alert( 'Enter the stared hours !')
        return
    }

    if (!this.state.hoursto) {
        Alert.alert( 'Enter the ending hours !')
        return
    }

    if (!this.state.totalAmount) {
        Alert.alert( 'Enter the total amount !')
        return
    }

  
   var years = String(this.state.invDate).split('-');
   var invYear = String(years[2]);
   //this.setState({
   //  invYear
   //})

    fetch(`https://time-payroll.herokuapp.com/api/inv/user/${userid}/org/${org}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invDate:this.state.invDate,
        invYear:invYear,
        subject:subject,
        rate:rate,
        email:email,
        hoursfrom:this.state.hoursfrom,
        hoursto: this.state.hoursto,
        totalAmount: this.state.totalAmount,
      })
    })
    .then((response) => {
       //console.log(response);
       
       if(response.status ===200) {
         //Alert.alert( 'Invoice Add!')
         navigate('Clients');
       }else{
         Alert.alert( 'Invoice Failed!', 'Please try again!')
       }
       
    })
    .catch((error) => {
      console.log(error)
    }); 
  }
  
  render(){
    const { navigation }=this.props;
    const client = navigation.getParam('client');
    const { org,userid,subject,rate } = client;

    return (
       <ScrollView
          keyboardShouldPersistTaps='never'
        >
        <View style={{marginTop:20, alignItems:'center', justifyContent:'center'}}>
            <TouchableHighlight style={styles.buttonContainer} onPress={() => this.addInvoice()}>
              <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'600'}}>Save Invoice</Text>
            </TouchableHighlight>
        </View>

        <Card 
          containerStyle={{marginTop:10, borderColor:'#8D9290'}}
        >
                  
          <DatePicker
            style={{width: 250, marginTop:10}}
            date={this.state.invDate}
            mode="date"
            placeholder="select date"
            format="MM-DD-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 70
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(invDate) => {this.setState({invDate})}}
          />
        
        <DatePicker
            style={{width: 250}}
            date={this.state.hoursfrom}
            mode="time"
            placeholder="Start Hours"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
             dateInput: {
                marginLeft: 70
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(hoursfrom) => {this.setState({hoursfrom})}}
          />
        
        <DatePicker
            style={{width: 250, paddingBottom:10}}
            date={this.state.hoursto}
            mode="time"
            placeholder="End Hours"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 70
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(hoursto) => {this.setState({hoursto})}}
          />
          <TextField
            label='Total Invoice Amount($)'
            value={this.state.totalAmount}
            enablesReturnKeyAutomatically={true}
            onChangeText={ (totalAmount) => this.setState({ totalAmount }) }
          />
                 
        </Card>
                  
        <Card
          containerStyle={{backgroundColor:'#EEF4FB'}}
        >
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
              <Text style={styles.labelText}>Client:</Text>
            </View>  

            <View style={{flex:1}}>
              <Text style={styles.fieldLabel}>{org}</Text>
            </View>  
              
          </View>

          <View style={{flexDirection:'row'}}>   
             <View style={{flex:1}}>
               <Text style={styles.labelText}>Service:</Text>
             </View> 
              
             <View style={{flex:1}}>
               <Text style={styles.fieldLabel}>{subject}</Text>
             </View> 
              
          </View>

          <View style={{flexDirection:'row'}}> 
            <View style={{flex:1}}>
              <Text style={styles.labelText}>Rate:</Text>
            </View>

            <View style={{flex:1}}>
               <Text style={styles.fieldLabel}>${rate}</Text>
            </View>
          </View>
          
        </Card>

        <CheckBox
            title='Paid'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})}
        />        
           
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
    width:340,
    borderRadius:30,
    backgroundColor: "#5A98E1"
  },
  labelText:{
    color:'#BABCBF'
  },
  fieldLabel:{
    color:'#4A90E2',
    fontSize:14,
    fontWeight:'600'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 }
});

export default Invoice    