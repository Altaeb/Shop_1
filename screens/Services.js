import React from "react";
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator,
  Alert,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
 } 
 from "react-native";

import { Card } from "react-native-elements";
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';

export default class Services extends React.PureComponent {
  
    static navigationOptions = ({ navigation }) => {
		return {
			title: null,
		};
	};
  

  state = {
    loading: false,
    data: [],
    error: null,
    refreshing: false,
    service:'',
    userid:'' 
  };  
  
    
componentDidMount() {
  this.getUserId();
}

handleRefresh() {  
  this.getUserId();  
} 

getUserId = async () => {
  const userid = await AsyncStorage.getItem('userid') ;
  //const userid ="wpiusa@gmail.com" ;
  this.makeRemoteRequest(userid);
  return;
}


makeRemoteRequest =  (userid) => {
  
  const url=`https://time-payroll.herokuapp.com/api/service/user/${userid}`;
  axios(url)
 // .then(resp => console.log(resp.data))
  .then(res => {
      this.setState({
        data: [...res.data],
        error: res.error || null,
        loading: false,
        refreshing: false,
        userid
      });
    })
    .catch(error => {
      this.setState({ error, loading: false });
    });
};

deleteService(item){
   
  const {
    navigation: { navigate },
  } = this.props;

   const { navigation } = this.props;

   Alert.alert(
     'Delete Service',
     'Are you sure delete the service ? ',
     [
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'OK', onPress: () => this.confirmOK(item)},
     ],
     { cancelable: false }
   )

  }
 
 confirmOK(item) {
   const {
    navigation: { navigate },
  } = this.props;


    axios.delete(`https://time-payroll.herokuapp.com/api/service/${item._id}`)
   .then(res => {
   //console.log(res);
   // navigate('Clients') 
    this.setState({refreshing:true});
    this.makeRemoteRequest(item.userid);
   })
 }

_keyExtractor = (item, index) => item._id;
  
  render(){
   // console.log(this.state.service)
    return(
      <View>
        
        <Card
           containerStyle={{marginTop:60}}
        >
         <Text style={{color:'#4D191F', fontSize:16, fontWeight:'600',textAlign:'center'}}>Click Service to Delete</Text>
        </Card>
        <FlatList
            data={this.state.data}
            renderItem={({item}) => 
                
                <Text style={styles.item} onPress={this.deleteService.bind(this, item)} > 
                   {item.value}   
                </Text>}
                
            extraData={this.state}
            keyExtractor={this._keyExtractor}
          />       
      </View>
    );
  }
}  

const styles = StyleSheet.create({
 
  buttonContainer: {
    height:50,
    justifyContent: 'center',
    width:320,
    borderRadius:10,
    backgroundColor:'#E3FAFA'
  },
  txtStyle:{
    width:200, 
  },
  item: {
    padding: 30,
    fontSize: 18,
    height: 60,
    width:300,
    borderBottomWidth:0.5,
  }, 
});