import { StyleSheet } from 'react-native';
/* import {useState,useEffect} from 'react-native'; */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavigator from "/Users/omarmuniz/Documents/React Native/BasicNavigationAWS/BasicNav/src/navigation/DrawerNavigator.js"

import Amplify from 'aws-amplify';
import awsconfig from '/Users/omarmuniz/Documents/React Native/BasicNavigationAWS/BasicNav/src/aws-exports.js';
import{withAuthenticator} from 'aws-amplify-react-native';
import uuid from 'react-native-uuid';
/* import { SafeAreaInsetsContext } from 'react-native-safe-area-context'; */
/* Amplify.configure(config); */





Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});
const Drawer = createDrawerNavigator();

/* export function App()  */
const App = () =>{
  return (
    <NavigationContainer>

      <DrawerNavigator/>
      
          

    </NavigationContainer>
  );
}







const styles = StyleSheet.create({
  homeScreenParent:{
    flexGrow:1,
    flexDirection: 'column',
    paddingBottom:20,
    padding:10},

  scrollViewChild:{
    /* flex:3, */
    flexGrow:1,
    flexDirection: 'row',
    /* justifyContent:"space-between", */
    backgroundColor:'#EFEFEF',
    /* justifyContent:'space-between', */   
  }, 
  listBorder:{
    flex:1,
    backgroundColor: '#FFF',
    padding:20,
    margin:10,
    borderRadius:8,
  },

  homeBottom:{
    flexGrow:1,
    flexDirection: 'row',  
  },
  addButton:{
    /* flexGrow:1, */
    width: 60,
    height: 60,
    backgroundColor: '#FF9900',
    borderRadius: 60,
    justifyContent: 'space-around',
    borderColor: '#C0C0C0',
    alignSelf:'flex-end', /* this is the thing i wanted. smh */
  },
  buttonText:{
    color:'#FFF',
    fontSize:30,
    alignSelf:'center',    /*centers the plus sign */
      

  },
  hiveButton:{
    borderWidth:5,
    borderRadius:5,
    
  }


});

export default withAuthenticator(App);



