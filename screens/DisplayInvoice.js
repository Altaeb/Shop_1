import Expo from 'expo';
import React, { Component } from 'react';
import {
  View,
  Slider,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert, 
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Carousel from 'react-native-snap-carousel'; // 3.6.0
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { Card, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import axios from 'axios';

export default class DisplayInvoice extends Component {

  constructor(props){
    super();
    this.state ={
    errors: [],
    date:new Date().getFullYear(),
    invoices:[],
    clients:[],
    clientInvoices:[],
    totalIncome:0,
    totalPaidIncome:0,
    totalUnpaidIncome:0,
    userid:'',
    animating: false
 }
    this.props = props;
    this._carousel = {};
    
  }

  closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 3000)


  componentWillMount() {
    this.makeRemoteRequest();
    this.preInvoices();
  }      

  handleSnapToItem(index){
    console.log("snapped to ", index)
  }
 
makeRemoteRequest = async () => {
  
    const { navigation }=this.props;
    const email= await AsyncStorage.getItem('userid') ;
    const year=this.state.date;

    this.setState({userid:email});

    const url=`https://time-payroll.herokuapp.com/api/inv/user/${email}/year/${year}`;
        
    axios(url)
    //.then(resp => console.log(resp.data))
    .then(res => {
        this.setState({
          invoices: [...res.data],
          errors: res.error || null,
         
        });
        this.calTotal();
      })
      .catch(error => {
        //this.setState({ error, loading: false });
      });
};


calTotal = () => {
  
  var totalIncome=0;
  var totalPaidIncome=0;
  var totalUnpaidIncome=0;
  
  //console.log(this.state.invoices)

  this.state.invoices.map((item, index) => {
     totalIncome=totalIncome+parseInt(item.totalAmount);
     if (item.paid ==="Yes"){
       totalPaidIncome=totalPaidIncome+parseInt(item.totalAmount)
     }else{
       totalUnpaidIncome=totalUnpaidIncome+parseInt(item.totalAmount)  
     }     
  })
  
  //console.log(totalIncome);

 
  this.setState({
    totalIncome,
    totalPaidIncome,
    totalUnpaidIncome
  });

  console.log(this.state)
 }


 preInvoices = async () =>{
   
  const { navigation }=this.props;
  const email= await AsyncStorage.getItem('userid') ;
   //const { userid }=this.state;

   const url=`https://time-payroll.herokuapp.com/api/inv/user/${email}`;
        
    axios(url)
    //.then(resp => console.log(resp.data))
    .then(res => {
        this.setState({
          clients: [...res.data],         
        });        
    })
    .catch(error => {
        //this.setState({ error, loading: false });
    }); 

  }

  emailInvoice() {
    //https://time-payroll.herokuapp.com/api/inv/user/wpiusa@gmail.com/email/wpiusaone@gmail.com
    const { clients} = this.state;
    this.state.invoices.map((item, index) => {
       this.getInvoices(item)
       this.sendInvoice(item)
       this.setState({clientInvoices:[]})
    })  

    this.closeActivityIndicator();
    Alert.alert('Invoice has been sent !')
  }
  
  getInvoices(invoice){
    
    this.setState({
      animating:true,
    }) 

     const url=`https://time-payroll.herokuapp.com/api/inv/user/${invoice.userid}/email/${invoice.email}`;
          
      axios(url)
      //.then(resp => console.log(resp.data))
      .then(res => {
          this.setState({
            clientInvoices: [...res.data],         
          });        
      })
      .catch(error => {
          //this.setState({ error, loading: false });
      }); 
  
  }

  sendInvoice(item){
     
    fetch(`https://time-payroll.herokuapp.com/api/email`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({       
        email:item.email,
        userid: item.userid,     
     })
    })
    .then((response) => {
       if(response.status ===200) {
        // Alert.alert( 'Invoice is sent !')
        
       }else{
         Alert.alert( 'Invoice Failed to sent !', 'Please try again!')
       }
       
    })
    .catch((error) => {
      console.log(error)
    }); 

  }


  _renderItem = ( {item, index} ) => {
    
    var invDate= String(item.invDate).split(':');
    var nDate = String(invDate[0]).split('-');
    var year = String(nDate[0]);
    var month =String(nDate[1]);
    var days =String(nDate[2].substring(0,2));

    const {
      navigation: { navigate },
    } = this.props;
    
    return (
      <ScrollView>
      <Card
        title="Swap Invoice"
        
      >
               
          <View style={styles.row}>
            <View style={{flex:1}}>
              <Text style={styles.largeFont}>{month}/{year}</Text>
            </View>

            <View style={{flex:1, marginLeft:80}}>  
              <Text style={styles.largeFont}>{days}</Text>         
            </View>   
          </View> 
          
          
            <View style={styles.row}>   
              <View style={{flex:1}}>   
                <Text style={styles.fontType}>Service:</Text>
              </View>  

              <View style={{flex:1, marginLeft:80}}>
                <Text style={styles.fontType}>{item.subject}</Text>
              </View>  
            </View>

          

          <View style={styles.boxBorder}>
            <View style={[styles.row, {marginTop:10}]}>
              <View style={{flex:1}}>
                <Text style={styles.fontType}>Total:</Text>
              </View>

              <View style={{flex:1,marginLeft:80}}>   
                <Text style={styles.fontType}>${item.totalAmount}</Text>
              </View>    
            </View>

            <View style={styles.row}>
              <View style={{flex:1}}>
                <Text style={styles.fontType}>Paid:</Text>
              </View>

              <View style={{flex:1,marginLeft:80}}> 
                <Text style={styles.fontType}>{item.paid ? "Yes" : "No"}</Text>
              </View>   
           

            </View>
            
          </View>
          <TouchableHighlight style={styles.EditButtonContainer} onPress={() => navigate('EditInvoice',{invoice:item})}>
               <Text style={{color:'#FFFFFF', fontSize:18, fontWeight:'600'}}>Edit Invoice</Text>
          </TouchableHighlight>
       
      </Card>  
      </ScrollView>      
            
    );
  }

  searchDate = async (year) => {
   
    this.setState({
      date:year
    })
  
    const email= await AsyncStorage.getItem('userid') ;
    const invyear=this.state.date;
    const url=`https://time-payroll.herokuapp.com/api/inv/user/${email}/year/${invyear}`;
    
    axios(url)
    //.then(resp => console.log(resp.data))
    .then(res => {
        this.setState({
          invoices: [...res.data],
          errors: res.error || null,
         
        });
        this.calTotal();
      })
      .catch(error => {
        //this.setState({ error, loading: false });
      }); 
 
  }

  render = () => {
    //console.log(this.state.totalIncome)
   
    const { totalIncome,totalPaidIncome, totalUnpaidIncome} =this.state    
 
    return (
      <View style={styles.container}>
        <View style={{marginTop:20}}>
        
          <DatePicker
            style={{width: 250}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 30,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 100
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.searchDate(date)}}
            //onDateChange={(date) => console.log(date)}
          />
        </View>

        <Carousel
          ref={ (c) => { this._carousel = c; } }
          data={this.state.invoices}
          renderItem={this._renderItem.bind(this)}
          onSnapToItem={this.handleSnapToItem.bind(this)}
          sliderWidth={350}
          itemWidth={350}
          layout={'default'}
          firstItem={0}
        />
    
        <Card
           containerStyle={{width:320, marginTop:20}}
        >
          <View style={{backgroundColor:"#CFF9F5"}}>
            <View style={styles.row}>
              <View style={{flex:1, width:350}}>
                <Text style={[styles.fontType, {marginTop:10}, styles.labelText]}>Paid:</Text>
              </View>

              <View style={{flex:1, marginLeft:60}}>  
                <Text style={[styles.fontType, {marginTop:10},styles.fieldText]}>${this.state.totalIncome}</Text>
              </View>  
            </View>

            <View style={styles.row}>
              <View style={{flex:1,width:350}}>  
                <Text style={[styles.fontType,styles.labelText]}>UnPaid:</Text>
              </View>

              <View style={{flex:1, marginLeft:60}}>  
                <Text style={[styles.fontType,styles.fieldText]}>${this.state.totalPaidIncome}</Text>
              </View>

            </View>

            <View style={styles.row}> 
              <View style={{flex:1,width:350}}> 
                <Text style={[styles.fontType,styles.labelText]}>Revenue:</Text>
              </View>

              <View style={{flex:1, marginLeft:60, marginBottom:10}}>  
                 <Text style={[styles.fontType,styles.fieldText]}>${this.state.totalUnpaidIncome}</Text>
              </View>   
            </View>  
          </View>  
        </Card>      
       

        <TouchableHighlight style={styles.EmailButtonContainer} onPress={() => this.emailInvoice()}>
           <Text style={{color:'#FFFFFF', fontSize:18, fontWeight:'600'}}>Email Invoice</Text>
        </TouchableHighlight>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container:{
    margin:20,
    marginTop:40,
   
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
    backgroundColor: "#D6F7FA",
    flex:1,
  },
  EditButtonContainer: {
    height:45,
    //marginBottom:20,
    width:290,
    borderRadius:20,
    backgroundColor: "#F86761",
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,
  },
  EmailButtonContainer: {
    height:45,
    width:290,
    borderRadius:20,
    backgroundColor: "#F86761",
    justifyContent:'center',
    alignItems:'center',
    marginTop:25,
    marginLeft:25,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color:'#679EFB'
  
  },
  row:{
    flexDirection:'row',
    marginLeft:10,
    //marginTop:10,
    //justifyContent:'flex-end',
  },
  fontType:{
    fontFamily:'San Francisco',
    color:'#757779'
  },
  largeFont:{
    fontSize:18,
    color:'#AFBDC8'
  },
  boxBorder:{
    borderWidth:0.5,
    padding:10,
    marginTop:10,
    //borderColor:'#FAFBFD' ,
  },
  labelText:{
    color:'#757779'
  },
  fieldText:{
    color:'#4A90E2',
    fontSize:16,
    fontWeight:'600'
  }
  
})