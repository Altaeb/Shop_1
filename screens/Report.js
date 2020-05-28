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

import { Card, Button,Divider } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

export default class Report extends Component {
  
  state ={
    errors: [],
    date:new Date().getFullYear(),
    invoices:[],
    total_jan:0,
    total_feb:0,
    total_mar:0,
    total_apr:0,
    total_may:0,
    total_jun:0,
    total_july:0,
    total_aug:0,
    total_sep:0,
    total_oct:0,
    total_nov:0,
    total_dec:0,
    totalu_jan:0,
    totalu_feb:0,
    totalu_mar:0,
    totalu_apr:0,
    totalu_may:0,
    totalu_jun:0,
    totalu_july:0,
    totalu_aug:0,
    totalu_sep:0,
    totalu_oct:0,
    totalu_nov:0,
    totalu_dec:0,
    totalp_jan:0,
    totalp_feb:0,
    totalp_mar:0,
    totalp_apr:0,
    totalp_may:0,
    totalp_jun:0,
    totalp_july:0,
    totalp_aug:0,
    totalp_sep:0,
    totalp_oct:0,
    totalp_nov:0,
    totalp_dec:0,
    totalIncome:0,
    totalPaidIncome:0,
    totalUnpaidIncome:0,
  }  

  componentWillMount() {
     this.makeRemoteRequest();
  }      
 

  makeRemoteRequest = async () => {
    
    const { navigation }=this.props;
    const email= await AsyncStorage.getItem('userid') ;
    //const email="wpiusa@gmail.com";
    const year=this.state.date;
       
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


  searchDate = async (year) => {
    const { navigation }=this.props;
    const email= await AsyncStorage.getItem('userid') ;
    //const email="wpiusa@gmail.com";
   
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
   
  }

  calTotal = () => {
  
    var totalIncome=0;
    var totalPaidIncome=0;
    var totalUnpaidIncome=0;
    var total_jan=0;
    var total_feb=0;
    var total_mar=0;
    var total_apr=0;
    var total_may=0;
    var total_jun=0;
    var total_july=0;
    var total_aug=0;
    var total_sep=0;
    var total_oct=0;
    var total_nov=0;
    var total_dec=0;
    
    var totalu_jan=0;
    var totalu_feb=0;
    var totalu_mar=0;
    var totalu_apr=0;
    var totalu_may=0;
    var totalu_jun=0;
    var totalu_july=0;
    var totalu_aug=0;
    var totalu_sep=0;
    var totalu_oct=0;
    var totalu_nov=0;
    var totalu_dec=0;

    var totalp_jan=0;
    var totalp_feb=0;
    var totalp_mar=0;
    var totalp_apr=0;
    var totalp_may=0;
    var totalp_jun=0;
    var totalp_july=0;
    var totalp_aug=0;
    var totalp_sep=0;
    var totalp_oct=0;
    var totalp_nov=0;
    var totalp_dec=0;

    this.state.invoices.map((item, index) => {
      var invDate= String(item.invDate).split(':');
      var nDate = String(invDate[0]).split('-');
      var year = String(nDate[0]);
      var month =String(nDate[1]);

      if (month === "01") {
        total_jan=total_jan+parseInt(item.totalAmount);
        
        if (item.paid ==="Yes"){
          totalp_jan=totalp_jan+parseInt(item.totalAmount)
        }else{
          totalu_jan=totalu_jan+parseInt(item.totalAmount)  
        }     
      }

      if (month === "02") {
        total_feb=total_feb+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_feb=totalp_feb+parseInt(item.totalAmount)
        }else{
          totalu_feb=totalu_feb+parseInt(item.totalAmount)  
        }
      }

      if (month === "03") {
        total_mar=total_mar+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_mar=totalp_mar+parseInt(item.totalAmount)
        }else{
          totalu_mar=totalu_mar+parseInt(item.totalAmount)  
        }
      }

      if (month === "04") {
        total_apr=total_apr+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_apr=totalp_apr+parseInt(item.totalAmount)
        }else{
          totalu_apr=totalu_apr+parseInt(item.totalAmount)  
        }
      }

      if (month === "05") {
        total_may=total_may+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_may=totalp_may+parseInt(item.totalAmount)
        }else{
          totalu_may=totalu_may+parseInt(item.totalAmount)  
        }
      }

      if (month === "06") {
        total_jun=total_jun+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_jun=totalp_jun+parseInt(item.totalAmount)
        }else{
          totalu_jun=totalu_jun+parseInt(item.totalAmount)  
        }
      }

      if (month === "07") {
        total_july=total_july+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_july=totalp_july+parseInt(item.totalAmount)
        }else{
          totalu_july=totalu_july+parseInt(item.totalAmount)  
        }
      }

      if (month === "08") {
        total_aug=total_aug+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_aug=totalp_aug+parseInt(item.totalAmount)
        }else{
          totalu_aug=totalu_aug+parseInt(item.totalAmount)  
        }
      }

      if (month === "09") {
        total_sep=total_sep+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_sep=totalp_sep+parseInt(item.totalAmount)
        }else{
          totalu_sep=totalu_sep+parseInt(item.totalAmount)  
        }
      }
   
      if (month === "10") {
        total_oct=total_oct+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_oct=totalp_oct+parseInt(item.totalAmount)
        }else{
          totalu_oct=totalu_oct+parseInt(item.totalAmount)  
        }
      }

      if (month === "11") {
        total_nov=total_nov+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_nov=totalp_nov+parseInt(item.totalAmount)
        }else{
          totalu_nov=totalu_nov+parseInt(item.totalAmount)  
        }
      }

      if (month === "12") {
        total_dec=total_dec+parseInt(item.totalAmount);

        if (item.paid ==="Yes"){
          totalp_dec=totalp_dec+parseInt(item.totalAmount)
        }else{
          totalu_dec=totalu_dec+parseInt(item.totalAmount)  
        }
      }

     
    })
    

    totalIncome=total_jan+total_feb+total_mar+total_apr+total_may+total_jun+total_july+total_aug+total_sep+total_oct+total_nov+total_dec;
    totalPaidIncome=totalp_jan+totalp_feb+totalp_mar+totalp_apr+totalp_may+totalp_jun+totalp_july+totalp_aug+totalp_sep+totalp_oct+totalp_nov+totalp_dec;
    totalUnpaidIncome=totalu_jan+totalu_feb+totalu_mar+totalu_apr+totalu_may+totalu_jun+totalu_july+totalu_aug+totalu_sep+totalu_oct+totalu_nov+totalu_dec;


    this.setState({
      totalIncome,
      totalPaidIncome,
      totalUnpaidIncome,
      total_jan,
      total_feb,
      total_mar,
      total_apr,
      total_may,
      total_jun,
      total_july,
      total_aug,
      total_sep,
      total_oct,
      total_nov,
      total_dec,
      totalu_jan,
      totalu_feb,
      totalu_mar,
      totalu_apr,
      totalu_may,
      totalu_jun,
      totalu_july,
      totalu_aug,
      totalu_sep,
      totalu_oct,
      totalu_nov,
      totalu_dec,
      totalp_jan,
      totalp_feb,
      totalp_mar,
      totalp_apr,
      totalp_may,
      totalp_jun,
      totalp_july,
      totalp_aug,
      totalp_sep,
      totalp_oct,
      totalp_nov,
      totalp_dec,
    });
 }


 render() {
    const {total_jan,total_feb,total_mar,total_apr,total_may,total_jun,total_july,total_aug,
      total_sep,total_oct,total_nov,total_dec,totalIncome,totalPaidIncome,totalUnpaidIncome,
      totalp_jan,totalp_feb,totalp_mar,totalp_apr,totalp_may,totalp_jun,totalp_july,totalp_aug,
      totalp_sep,totalp_oct,totalp_nov,totalp_dec,
      totalu_jan,totalu_feb,totalu_mar,totalu_apr,totalu_may,totalu_jun,totalu_july,totalu_aug,
      totalu_sep,totalu_oct,totalu_nov,totalu_dec,animating} = this.state;
        

    return (
      <ScrollView style={styles.container}>
       
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
           
            }}
            onDateChange={(date) => {this.searchDate(date)}}
          />

           
        </View>
       
        <Card title="January">      
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_jan}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_jan}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_jan}</Text>
              </View>
           </View>

        </Card>

        <Card title="February">
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_feb}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/> 
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_feb}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_feb}</Text>
              </View>
           </View>

        </Card>

        <Card title="March">
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_mar}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_mar}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_mar}</Text>
              </View>
           </View>

        </Card>

        <Card title="April">
          <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_apr}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_apr}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_apr}</Text>
              </View>
           </View>

        </Card>

        <Card title="May">
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_may}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/> 
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_may}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_may}</Text>
              </View>
           </View>

        </Card>

        <Card title="June">
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_jun}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_jun}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_jun}</Text>
              </View>
           </View>

        </Card>

        <Card title="July">
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_july}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_july}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_july}</Text>
              </View>
           </View>

        </Card>

        <Card title="August">
          <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_aug}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_aug}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_aug}</Text>
              </View>
           </View>

        </Card>

        <Card title="September">
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_sep}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_sep}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_sep}</Text>
              </View>
           </View>

        </Card>

        <Card title="October">
          <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_jan}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/> 
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_jan}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_jan}</Text>
              </View>
           </View>

        </Card>

        <Card title="November">
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_nov}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/> 
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_nov}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_nov}</Text>
              </View>
           </View>
        </Card>

        <Card title="December">
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${total_dec}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/> 
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalp_dec}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.headerTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalu_dec}</Text>
              </View>
           </View>
        </Card>

        <Card title="Total Year Summary">
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.totalTxtColor}>Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalIncome}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/> 
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.totalTxtColor}>Paid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalPaidIncome}</Text>
              </View>
           </View>
           <Divider style={{backgroundColor:'#F6FBF9'}}/>
           <View style={styles.columDirection}>
              <View style={styles.columnWidth}>
                <Text style={styles.totalTxtColor}>UnPaid Income:</Text>
              </View>

              <View style={styles.columnWidth}>
                <Text>${totalUnpaidIncome}</Text>
              </View>
           </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:30
  },
  columDirection:{
    flexDirection:'row'
  },
  columnWidth:{
    flex:1,
    
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   },
   headerTxtColor:{
     color:'#99BCF9'
   },
   totalTxtColor:{
    color:'#FA2C54'
  }
})
