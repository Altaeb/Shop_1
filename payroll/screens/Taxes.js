import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator,StyleSheet } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

class Taxes extends Component {
  static navigationOptions = ({ navigation,navigate }) => ({
    title:"Taxes",
    headerTintColor: 'white',
    
  }); 

  render() {
    return (
      <View style={styles.container}>
        <Text>Taxes</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:30,
  }
})
export default Taxes;