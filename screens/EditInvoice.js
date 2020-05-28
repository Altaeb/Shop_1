import React, { Component } from 'react';
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

export default class EditInvoice extends Component {
    
  static navigationOptions = ({ navigation }) => {
	return {
      title: "Invoice",		
    };
  };
  
  state = {
    invDate:'',
    hoursfrom:'',
    hoursto:'',
    totalAmount:'',
    invYear:0,
    checked:false
  };

  componentWillMount(){

    const { navigation }=this.props;
    const invoice = navigation.getParam('invoice');
    const { hoursfrom,hoursto,invDate,totalAmount,paid  } = invoice;

    var iDate= String(invDate).split(':');
    var nDate = String(iDate[0]).split('-');
    var year = String(nDate[0]);
    var month =String(nDate[1]);
    var days =String(nDate[2].substring(0,2));

    this.setState({
      invDate:month+"-"+days+"-"+year,
      hoursfrom,
      hoursto,
      totalAmount,
      checked:paid, 
    })
    
  }  

  updateInvoice(invoice){
   //console.log(invoice);

    const {
        navigation: { navigate },
    } = this.props;
  
    const { _id,subject,rate } = invoice;  
    const { hoursfrom,hoursto,invDate,totalAmount,checked } = this.state;

    
    if (!invDate) {
        Alert.alert( 'Enter the invoice date !')
        return
    }

    if (!hoursfrom) {
        Alert.alert( 'Enter the stared hours !')
        return
    }

    if (!hoursto) {
        Alert.alert( 'Enter the ending hours !')
        return
    }

    if (!totalAmount) {
        Alert.alert( 'Enter the total amount !')
        return
    }

  
   var years = String(invDate).split('-');
   var invYear = String(years[2]);
  
   
   fetch(`https://time-payroll.herokuapp.com/api/inv/${_id}`, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invDate:this.state.invDate,
        invYear:invYear,
        subject:subject,
        rate:rate,
        hoursfrom:this.state.hoursfrom,
        hoursto: this.state.hoursto,
        totalAmount: this.state.totalAmount,
        paid:this.state.checked,
      })
    })
    .then((response) => {
       //console.log(response);
       
       if(response.status ===200) {
          navigate('DisplayInvoice');
       }else{
         Alert.alert( 'Invoice Update Failed!', 'Please try again!')
       }
       
    })
    .catch((error) => {
      console.log(error)
    }); 
  }
  
  render(){
      const { navigation }=this.props;
      const invoice = navigation.getParam('invoice');

      const { hoursfrom,hoursto,invDate,org,paid,subject,totalAmount,userid,rate } = invoice;
     

      return (
       <ScrollView
          keyboardShouldPersistTaps='never'
        >
        <View style={{marginTop:20, alignItems:'center', justifyContent:'center'}}>
            <TouchableHighlight style={styles.buttonContainer} onPress={() => this.updateInvoice(invoice)}>
              <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'600'}}>Update Invoice</Text>
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
      fontSize:14 ,
      fontWeight:'600'
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
  });
