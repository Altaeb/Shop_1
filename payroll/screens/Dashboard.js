import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

import AccountTabNav from "../navigators/AccountTabNav";


export default class Dashboard extends Component {
	static router = AccountTabNav.router;

  static navigationOptions = ({ navigation,navigate }) => ({
      
  }); 


	render() {
		const { navigation }=this.props;
		const email2 = navigation.getParam('email');
	
		return <AccountTabNav navigation={this.props.navigation} email={email2}/>;
	}
}
