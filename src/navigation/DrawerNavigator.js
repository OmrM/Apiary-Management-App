import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator } from "./MainStackNavigator";
import AccountScreenNavigator from '../screens/Account';
import Details from "../screens/Details";
import { withSSRContext } from "aws-amplify";
import BottomTabNavigator from "./BottomTabNavigator";

/* need named import for the accountScreenNavigator 
import AccountScreen from "../screens/Account";*/


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  return (

    <Drawer.Navigator initialRouteName= "Home"  drawerStyle={styles.drawer} drawerContentOptions={{activeTintColor:'#2AABE4', inactiveTintColor:'#787878'}}>

      <Drawer.Screen name = "Home" component = {BottomTabNavigator}
      
      
      />
      {/* needed to move the MainStackNavigator inside of the tabs navigator */}
      {/* <Drawer.Screen name = "Home" component={MainStackNavigator}/> */}
    
      <Drawer.Screen name="Account" component={AccountScreenNavigator} 
      
      
      />
      
          

    </Drawer.Navigator>

  );

};

export default DrawerNavigator;



 const styles= StyleSheet.create({
  drawer:{
    backgroundColor:'#FFF',
    
  },


 })