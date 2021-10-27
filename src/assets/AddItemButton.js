import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';


//needs to take in 
const AddItemButton = ({onPress}) => {

    return(
    
        <TouchableHighlight onPress = {onPress}> 
          <View style={styles.addButton}>
            <Text style={styles.buttonText}>+</Text>
          </View> 
        </TouchableHighlight>
    
    )
}

//onPress = { () => onPress()} style = {styles.addItemButton}
/* onPress={() => {navigation.push('New Hive', {currentApiary:selectedApiaryData});}} */

export default AddItemButton;

const styles = StyleSheet.create({
    addItemButton:{
        padding:0,
      },
    addButton:{
        width: 60,
        height: 60,
        backgroundColor: '#ffcd24',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        position: 'absolute',
        right: 30,
        bottom: 30,
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0 , height: 4},
      },
      buttonText:{
        color:'#FFF',
        fontSize:30,
        alignSelf:'center',  
      },
})