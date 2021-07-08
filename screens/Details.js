import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/* const DetailsScreen =() =>  */
export default DetailsScreen = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
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