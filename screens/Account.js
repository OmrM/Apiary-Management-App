import { withAuthenticator, AmplifySignOut} from 'aws-amplify-react-native/dist/Auth';
import {Authenticator} from 'aws-amplify-react-native';
import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity,Image,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/routers';


/* const DetailsScreen =() =>  */



const Stack = createStackNavigator();
/* navigation prop is passed into every screen component. it's passed into the AccountScreenNavigator component, since 
it's taking the form of a screen in the DrawerNavigator*/
const AccountScreenNavigator = ({navigation}) =>{
  return( 
     <NavigationContainer independent={true}>
      <Stack.Navigator  initialRouteName="Account" screenOptions={({}) => ({ 
      headerStyle: { backgroundColor: '#2AABE4',},headerTintColor: '#fff',headerTitleStyle:{fontWeight: 'bold',fontSize:24},
      headerTitleAlign:'center',headerTitleContainerStyle:{paddingLeft:0} 
      })}>

        <Stack.Screen name='Account' component={AccountScreen}  
        options={({}) => ({
        title: 'Account', 
        headerLeft:()=> 
        <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer())} color='#fff' style={styles.TouchableOpacity}>
          <Image source ={require('../assets/sidebar.png')} style = {styles.sideBar} />
        </TouchableOpacity>
        })}
        
        />

      </Stack.Navigator>
    </NavigationContainer>
);
}


function AccountAuth(props){
  if(props.authState === 'signedIn' ) 
  return <Text></Text>
  else return <></>
}
const AccountScreen = ({}) => {
    return (
        <View style={styles.ScreenParent}>
            <ScrollView style={styles.listBorder}>
            
            <Authenticator usernameAttributes="email">
              <AccountAuth/>
            </Authenticator>

            </ScrollView>
        </View>
    );
  }
 export default withAuthenticator(AccountScreenNavigator);







const styles = StyleSheet.create({
  
    sideBar:{
      height:25,
      width:25,
      /* resizeMode: 'stretch', */
      
    },

    TouchableOpacity:{
      paddingLeft:20,
    },
    ScreenParent:{
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
  
  
  });