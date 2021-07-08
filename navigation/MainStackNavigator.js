import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';


import { DrawerActions } from '@react-navigation/routers';
import Home from '../screens/Home';
import NewHiveScreen from '../screens/NewHive';
import DetailsScreen from '../screens/Details';
import NewApiaryScreen from '../screens/NewApiary';

const Stack = createStackNavigator();

const MainStackNavigator = () =>{
  return(
  <Stack.Navigator initialRouteName="Home" screenOptions={({}) => ({ 
   headerStyle: { backgroundColor: '#2AABE4',},headerTintColor: '#fff',headerTitleStyle:{fontWeight: 'bold',fontSize:24},
   headerTitleAlign:'center',headerTitleContainerStyle:{paddingLeft:0} 
   })}>

    {/* route is specified using Screen component */}
    {/* screen accepts name prop (of route used to nav) and component prop (cor. to the component it'll render)*/}

    <Stack.Screen name="Home" component={Home} options={({navigation}) => ({
        title: 'Apiaries', headerRight:()=><Button onPress={()=> alert('OwO')} title='owo' color='#fff'/>,
        headerLeft:()=> 
        <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer())} color='#fff' style={styles.TouchableOpacity}>
          <Image source ={require('../assets/sidebar.png')} style = {styles.sideBar} />
        </TouchableOpacity>
    })}/>
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="New Hive" component={NewHiveScreen} />
    <Stack.Screen name="New Apiary" component={NewApiaryScreen}/>
   
  </Stack.Navigator>

  );
}




export {MainStackNavigator};

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

