import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator,StyleSheet } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

class Income extends Component {
  static navigationOptions = ({ navigation,navigate }) => ({
    title:"Income",
    headerTintColor: 'white',
    
  }); 

  render() {
    return (
      <View style={styles.container}>
        <Text>Income</Text>
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

export default Income;