import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import Clients from "../screens/Clients";
import Client from '../screens/Client';
import ClientDetail from '../screens/ClientDetail';
import EditClient from '../screens/EditClient';

import Income from "../screens/Income";
import Report from "../screens/Report";
import Invoice from '../screens/Invoice';
import EditInvoice from '../screens/EditInvoice';
import DisplayInvoice from '../screens/DisplayInvoice';
import Service from '../screens/Service';
import Services from '../screens/Services';
import { Icon } from 'react-native-elements';

export default class AppTab extends Component {

  render(){
    const ClientStackNav = createStackNavigator(
      {
          Clients: { 
            screen: Clients,
            
          },
          Client: { 
            screen: Client,
           
          },
          ClientDetail: { 
            screen: ClientDetail,
            
          },
             
          EditClient: { 
            screen: EditClient,
          },
          Invoice: {
            screen: Invoice,
          },
          EditInvoice: {
            screen: EditInvoice,
          },
      }     
   );
   
   const ServiceStackNav = createStackNavigator(
    {
        Service: { 
          screen: Service,
          
        },
        Services: { 
          screen: Services,
         
        },
       
    }     
 );
   const AccountTabNav = createBottomTabNavigator(
    {
      Clients: {
        screen: ClientStackNav,
        navigationOptions: {
          title:null,
          tabBarIcon: ({ tintColor }) => <Icon name="person" size={35} color={tintColor} />
        }
      },    
      DisplayInvoice: { 
        screen: DisplayInvoice,
        navigationOptions: {
          title: 'Invoices',
          tabBarIcon: ({ tintColor }) => <Icon name="event" size={35} color={tintColor} />
        } 
      },    
      Report: {
        screen: Report,
        navigationOptions: {
          title: null,
          tabBarIcon: ({ tintColor }) => <Icon name="description" size={35} color={tintColor} />
        }
      },
      Service: {
        screen: ServiceStackNav,
        navigationOptions: {
          title: "Set Up",
          tabBarIcon: ({ tintColor }) => <Icon name="settings" size={35} color={tintColor} />
        }
      },
    },

    {
      backBehavior: "none",
      tabBarPosition: "bottom"
    }
);

    return(
      <AccountTabNav />
    )
  }
}

