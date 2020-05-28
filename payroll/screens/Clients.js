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
  AsyncStorage
 } 
 from "react-native";

import { Avatar,Card } from "react-native-elements";
import axios from 'axios';
import Client from '../components/Client';


export default class Clients extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
		return {
			title: null,
		};
	};


  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      
    };  
    
  }
      
  componentDidMount() {
    this.getUserId();
  }
 
  getUserId = async () => {
    const userid = await AsyncStorage.getItem('userid') ;
    //console.log('user id');
    //console.log(userid);

    this.makeRemoteRequest(userid);
    return;
  }

  handleRefresh() {  
    this.getUserId();  
  } 

  handleRefresh2() { 
    this.getUserId();     
  } 
 
  _keyExtractor = (item, index) => item._id;
 
  makeRemoteRequest =  (userid) => {
    
    const url=`https://time-payroll.herokuapp.com/api/org/user/${userid}`;
    axios(url)
   // .then(resp => console.log(resp.data))
    .then(res => {
        this.setState({
          data: [...res.data],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


  renderItem = ({ item }) => {
    const {
      navigation: { navigate },
    } = this.props;
    const { _id,org,subject,rate } = item;
   
    return (
      <Client
          client={item}
          //onPress={() => navigate('ClientDetail',{client:item,onSelect: this.onSelect})}
          onPress={() => navigate('ClientDetail',{
            client:item,
            'handleRefresh':() =>this.handleRefresh()
            })}
       />
    );
  };
  
  addService() {

  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
   
    return(
      <View>
        <View 
          style={{alignItems:'center',justifyContent:'center', flexDirection:'row',marginBottom:10}}>
        <TouchableHighlight  
           style={styles.buttonContainer}
           onPress={() => navigate('Client')}
           
         >
            <Text style={
              {
                color:'#A9ADB0', 
                fontSize:20, 
                fontWeight:'600', 
                alignItems:'center',
                justifyContent:'center'
               }
              }>Add New Client</Text>
         </TouchableHighlight>     

         <TouchableHighlight
              onPress={() => this.getUserId()}
            >          
              <View>
                <Image 
                    source ={require('./images/refresh.png')}
                    style={{
                      width:48, 
                      height:48, 
                      alignItems:"center", 
                      justifyContent:'center',
                      marginLeft:30,
                      marginTop:20,
                    }}
                    
                />
                 
             </View> 

        </TouchableHighlight>
        
        
        </View>
        
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
            keyExtractor={this._keyExtractor}
          />       
       
     </View> 
    );
  }
}

const styles = StyleSheet.create({
 
  buttonContainer: {
    height:55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    width:250,
    borderRadius:10,
    backgroundColor:'#E3FAFA'
  },
  
});
