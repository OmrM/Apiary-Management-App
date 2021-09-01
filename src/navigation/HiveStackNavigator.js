import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';


import { DrawerActions } from '@react-navigation/routers';
import Home from '../screens/Home';
import NewHiveScreen from '../screens/NewHive';
import DetailsScreen from '../screens/Details';
import NewApiaryScreen from '../screens/NewApiary';
import HiveDetailsScreen from '../screens/HiveDetails';
import HivesScreen from '../screens/Hives';


const Stack = createStackNavigator();

const HiveStackNavigator = () =>{
  return(
  <Stack.Navigator initialRouteName="Hives" screenOptions={({}) => ({ 
   headerStyle: { backgroundColor: '#2AABE4',},headerTintColor: '#fff',headerTitleStyle:{fontWeight: 'bold',fontSize:24},
   headerTitleAlign:'center',headerTitleContainerStyle:{paddingLeft:0},
   })}>

    {/* route is specified using Screen component */}
    {/* screen accepts name prop (of route used to nav) and component prop (corresponding to the component it'll render)*/}

    <Stack.Screen name="Hives" component={HivesScreen} options={({navigation}) => ({
        title: 'Hives', headerRight:()=><Button onPress={()=> alert('OwO')} title='owo' color='#fff'/>,
        headerLeft:()=> 
        <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer())} color='#fff' style={styles.TouchableOpacity}>
          <Image source ={require('../assets/sidebar.png')} style = {styles.sideBar} />
        </TouchableOpacity>
    })}/>
    {/* using options to dynamically change the title on the navigation bar */}
    <Stack.Screen name="Details" component={DetailsScreen} options = {({route}) => ({title: route.params.navBarName})} />
    <Stack.Screen name="Hive Details" component={HiveDetailsScreen} options = {({route}) => ({title: route.params.navBarName})} />
    <Stack.Screen name="New Hive" component={NewHiveScreen} options = {({route}) => ({title: route.params.navBarName})}/>
    <Stack.Screen name="New Apiary" component={NewApiaryScreen}/>
  {/*   <Stack.Screen name = "Hives" component = {Hives} /> */}
   
  </Stack.Navigator>

  );
}




export {HiveStackNavigator};

const styles = StyleSheet.create({
sideBar:{
  height:25,
  width:25,
  /* resizeMode: 'stretch', */
  
},
TouchableOpacity:{
  paddingLeft:20,
}
})

