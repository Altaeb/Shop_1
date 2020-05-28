import React from 'react';
import { View, Linking, TouchableOpacity,StyleSheet } from 'react-native';
import { Text, Button, Card, Divider,Avatar } from 'react-native-elements';
//this is a client file 

export default class Client extends React.Component {
  
  render() {
    const {
      _id,
      org,
      subject,
      rate,
    } = this.props.client;
    
 
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
      >
        <Card>
            <View style={{flexDirection:"row"}}>
              <View>  
                <View style={{alignItems:'center', }}>
                    <Text style={styles.headerText}>{org}</Text>
                </View>  
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <Text style={{color:'#7E8287'}}>Subject:</Text>
                  </View>

                  <View style={{flex:1}}>  
                    <Text style={{color:'#2ccce4', fontWeight:'600'}}>{subject}</Text>
                  </View>  
                </View>  

                <View style={{flexDirection:'row'}}>
                  <View style={{flex:1}}>
                      <Text style={{color:'#7E8287'}}>Rate:</Text>
                  </View>

                  <View style={{flex:1}}>   
                    <Text style={{color:'#2ccce4', fontWeight:'600'}}>${rate}</Text>
                  </View>    
                </View>
              </View>  
            </View>
       </Card>          

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  
  avatarContainer: {
    justifyContent:'center', 
    alignItems:'center', 
    paddingLeft:10
  },
  headerText:{
    fontWeight:'600',
    fontSize:20,
    color:'#E5E7FA'
  }
});
