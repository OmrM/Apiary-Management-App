import { View, Text, TouchableOpacity, StyleSheet, TextInput,KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { useState,useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { withAuthenticator, AmplifySignOut, Authenticator} from 'aws-amplify-react-native/dist/Auth';


import { API, graphqlOperation, selectInput } from 'aws-amplify';

/* import * as queries from '../src/graphql/queries'; */
import {listAlbums as listAlbums, listApiarys} from '../src/graphql/queries';
import {createApiary} from '../src/graphql/mutations';

/* initial state of albums?? */
const initialState = {name: '', description: ''}

const NewHiveScreen = ({navigation}) => {
  

 /*  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState([]); */

  /* create an empty array in our state called albums. usestate returns data and function that can change that data(updateAlbums) */
  const [albums, updateAlbums] = useState([])

  const [formState, setFormState] = useState(initialState)
  const [apiaries, updateApiaries] = useState([])

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
  /* I think this appends the input data from the TextInput into the form, using the formState update function? */
  setFormState({ ...formState, [key]: value})
}
  




async function addApiary(){
  try{
    const apiary = { ...formState}
    updateApiaries([ ...apiaries, apiary])  /* updateApiaries is a form state updater function */

    setFormState(initialState)              //don't know why we're doing this? like clears the formState array? maybe
    const apiaryData = await API.graphql(grahpqlOperation(createApiary, {input: apiary}))
    console.log(apiaryData)
    
    navigation.navigate('Home')
  }
  catch(error){
    console.log("error creating apiary")
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
          <TouchableOpacity onPress = {() => addApiary} style = {styles.submitButton}>
            <Text style = {styles.submitButtonTxt}>Create Hive</Text>
            {
              apiaries.map((apiary, index) => (
                <View key = {apiary.id? apiary.id : index} >
                  <Text>{apiary.name}</Text>
                  <Text>{apiary.description}</Text>
                  <Text>{apiary.location}</Text>
                </View>
              ))
            }
          </TouchableOpacity>
          </View>

          </KeyboardAvoidingView>
          </ScrollView>
      </View>
  );
}






/* input data,
   press button to send data to database
   onPress: navigate back to home page
   home page should automatically refresh with new content */



export default withAuthenticator(NewHiveScreen);










const styles = StyleSheet.create({
  

  TouchableOpacity:{
    paddingLeft:20,
  },
  ScreenParent:{
    flexGrow:1,
    flexDirection: 'column',
    paddingBottom:20,
    padding:10,
    backgroundColor: '#e6e6e6'
  },

  scrollViewChild:{
    /* flex:3, */
    flexGrow:1,
    flexDirection: 'column',
    /* justifyContent:"space-between", */
    backgroundColor:'#EFEFEF',
    /* justifyContent:'space-between', */   
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
  },







  submitButton:{
    flex:1,
    alignSelf: 'flex-end',
    alignItems:'center',
/*     borderWidth:1,
    borderColor: '#a6a6a6', */
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