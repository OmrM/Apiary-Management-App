  /* NewApiary.js Screen. 
  --------------------------------------------------------------------
   -input data through textInput
   -press button to send data to database and navigate back to home page
   -home page should automatically refresh with new content 
   */


import { View, Text, TouchableOpacity, StyleSheet, TextInput,KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { useState,useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation} from 'aws-amplify';
import {createApiary} from '../src/graphql/mutations';


/* initial state of form Data: blank text boxes  */
const initialState = {name: '', description: '', location: ''}

const NewApiaryScreen = ({navigation}) => {

  /* create an empty array in our state called albums. usestate returns data and function that can change that data(updateAlbums) */
  const [albums, updateAlbums] = useState([])

  const [formState, setFormState] = useState(initialState)
  


  async function getData(){
    try{
      const albumData = await API.graphql(graphqlOperation(listAlbums));
      console.log(albumData);  
    }
    catch(error){
      console.log("error on fetching")
    }
  }


function setInput(key, value){
  /* I think this appends the input data from the TextInput into the form, using the formState update function */
  setFormState({ ...formState, [key]:value})
}
  


async function addApiary(){
  try{
    //saves input form information into an array named apiary
    const apiary = { ...formState}           
    
    //clears the formState, so that the rendered screen clears the information in the text boxes. 
    setFormState(initialState)   

    console.log(apiary)

    //sends the apiary array to the database
    await API.graphql(graphqlOperation(createApiary, {input: apiary})) 
    navigation.goBack()                   
  }
  catch(error){
    console.log("error creating apiary", error)
    
  }
}

 



  return (
    
      <View style={styles.ScreenParent}>
          <ScrollView style={styles.listBorder}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

          <View style = {styles.textInputWrapper}>
            <Text style = {styles.inputLabel}>Name:</Text>
            <TextInput onChangeText = {val => setInput('name', val)} value = {formState.name} style = {styles.textInput}/>
          </View>

          <View style = {styles.textInputWrapper}>
            <Text style = {styles.inputLabel}>Description:</Text>
            <TextInput onChangeText = {val => setInput('description', val)} value = {formState.description} style = {styles.textInput}/>
          </View>

          <View style = {styles.textInputWrapper}>
            <Text style = {styles.inputLabel}>Location:</Text>
            <TextInput onChangeText = {val => setInput('location', val)} value = {formState.location} style = {styles.textInput}/>
            {/* maybe make this text input dynamically paste the address of the location from a location . using a map button that points to an address. maybe have to set it as a placeholder?*/}

          </View>
 
          <View style = {{padding:10}}>
          <TouchableOpacity onPress = {() =>  addApiary()} style = {styles.submitButton}>
            <Text style = {styles.submitButtonTxt}>Create Apiary</Text>

          </TouchableOpacity>
          </View>

          </KeyboardAvoidingView>
          </ScrollView>
      </View>
  );
}






export default NewApiaryScreen;





const styles = StyleSheet.create({
  
  ScreenParent:{
    flexGrow:1,
    flexDirection: 'column',
    paddingBottom:20,
    padding:10,
    backgroundColor: '#e6e6e6'
  },

  scrollViewChild:{
    flexGrow:1,
    flexDirection: 'column',
    backgroundColor:'#EFEFEF',
    
  },
  listBorder:{
    backgroundColor: '#FFF',
    padding:20,
    margin:10,
    borderRadius:8,
  },


  textInputWrapper:{
    flex:1,
    flexDirection: 'column',
    padding: 10,
  },
  inputLabel:{
   alignSelf:'flex-start',
   color: '#373737',
   paddingVertical: 5,
   fontSize: 16,
   fontWeight: 'bold'
  },
  textInput:{
   flex:1,
   alignSelf:'stretch',
   backgroundColor: '#e6e6e6',
   paddingVertical: 5,
   borderRadius:5,
  },


  submitButton:{
    flex:1,
    alignSelf: 'flex-end',
    alignItems:'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffcd24',
    

  },
  submitButtonTxt:{
    color:'#4d4d4d', 
    fontWeight: 'bold', 
    fontSize: 16,

  }
});





