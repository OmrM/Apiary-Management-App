  /* NewApiary.js Screen. 
  --------------------------------------------------------------------
   -input data through textInput
   -press button to send data to database and navigate back to home page
   -home page should automatically refresh with new content 
   */


import { View, Text, TouchableOpacity, StyleSheet, TextInput,KeyboardAvoidingView, Button, Image, Platform } from 'react-native';
import React from 'react';
import { useState,useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation, Storage} from 'aws-amplify';
import {createApiary} from '../src/graphql/mutations';
import * as ImagePicker from 'expo-image-picker';
import Auth from '@aws-amplify/auth';
import { ConsoleLogger } from '@aws-amplify/core';
import uuid from 'react-native-uuid';

/* initial state of form Data: blank text boxes  */
const initialState = {name: '', description: '', location: '', image: ''}
const initialImageState = {showForm: false, imageURI: ''}

const NewApiaryScreen = ({navigation}) => {

  /* create an empty array in our state called formState. usestate returns data and function that can change that data(setFormState) */

  const [formState, setFormState] = useState(initialState)
  const [apiaryState, setApiaryState] = useState([])
  const [imageState, setImageState] = useState(initialImageState);



  //STATE updater functions: 
  function updateFormState(key, value){
    setFormState({ ...formState, [key]: value})
  }

  function updateImgState(key, value){
    setImageState({ ...imageState, [key]: value})
  }

/*   function setInput(key, value){
    /// I think this appends the input data from the TextInput into the form, using the formState update function 
    setFormState({ ...formState, [key]:value})
  }
 */
  useEffect(() => {
    //check to make sure app has permission to access user's camera roll and to camera 
    //https://forums.expo.dev/t/imagepicker-not-opening-in-android-production-builds-works-fine-in-expo-client-app/37878
   
    (async () => {
      if (Platform.OS !=='web') {
        const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== 'granted' ||
          cameraStatus.status !== 'granted'
        ) {
          alert('Sorry, we need these permissions to make this work!');
        }
      }
    })();
  
  
  }, []);
  


async function addApiary(){
  try{
    //saves input form information into an array named apiary
    const photo = await fetch(imageState.imageURI)
    const photoBlob = await photo.blob();
    await Storage.put(formState.image, photoBlob, {
      level: 'private',
      contentType: 'image/jpg'
    })    
      
    const apiary = { ...formState}
    //adding new data to the apiary form state
    setApiaryState([ ...apiaryState, apiary])
    console.log('creating apiary: ' + apiary)
    //sends the apiary info to the database
    await API.graphql(graphqlOperation(createApiary, {input: apiary}))
    //clears the formState, so that the rendered screen clears the information in the text boxes. 
    setFormState(initialState) 
    //clears image state so that it doesnt display the image again when reloading the screen  
    setImageState(initialImageState)

    navigation.goBack()                   
  }
  catch(error){
    console.log("error creating apiary", error)
    
  }
}




const handleChoosePhoto = async () => { 
  try{
    const result = await ImagePicker. launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: .5
    })
    if(!result.cancelled){
      console.log('uri: ' + result.uri)
      updateImgState('imageURI', result.uri)
      const fileName = uuid.v4() + '_apiaryPhoto.jpg'
      updateFormState('image', fileName)
      }
  } catch(error){
    console.log(error)
    }
}

const handleTakePhoto = async () => {
  try{
    const result = await ImagePicker.launchCameraAsync(({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,2],
      quality: .5,
    }));
    if(!result.cancelled) {
      console.log('uri: ' + result.uri)
      updateImgState('imageURI', result.uri)
      const filename = uuid.v4() + '_ApiaryPhoto.jpg'
      updateFormState('image', filename)
    }
  } catch (error){
    console.log(errror)
  }
}









  return (
    
      <View style={styles.ScreenParent}>
          <ScrollView style={styles.listBorder}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

          <View style = {styles.textInputWrapper}>
            <Text style = {styles.inputLabel}>Name:</Text>
            <TextInput onChangeText = {val => updateFormState('name', val)} value = {formState.name} style = {styles.textInput}/>
          </View>

          <View style = {styles.textInputWrapper}>
            <Text style = {styles.inputLabel}>Description:</Text>
            <TextInput onChangeText = {val => updateFormState('description', val)} value = {formState.description} style = {styles.textInput}/>
          </View>

          <View style = {styles.textInputWrapper}>
            <Text style = {styles.inputLabel}>Location:</Text>
            <TextInput onChangeText = {val => updateFormState('location', val)} value = {formState.location} style = {styles.textInput}/>
            {/* maybe make this text input dynamically paste the address of the location from a location . using a map button that points to an address. maybe have to set it as a placeholder?*/}
            
          </View>

          
          <View style = {styles.textInputWrapper}>
            <Text style = {styles.inputLabel}>Photo:</Text>
            <View style = {{flexDirection: 'row', justifyContent: 'space-around', }}>
              
              <View>
{/*               <TouchableOpacity onpress = {takePicture} style = {styles.buttons} >
                <Text style = {styles.buttonTxt}>Open Camera</Text>
                </TouchableOpacity> */}
                <Button title = "camera" onPress = {handleTakePhoto}></Button>
              </View>

              <View>
{/*               <TouchableOpacity  onPress={pickImage}  style = {styles.buttons}>
                 <Text style = {styles.buttonTxt}>Select Image</Text>
                </TouchableOpacity>   */}
                <Button title = "Select Image" onPress = {handleChoosePhoto}></Button>
              </View>
     

            </View>



          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
              {imageState.imageURI.blob && <Image source={{ uri: imageState.imageURI }} style={{ width: 200, height: 200 }} />}
{/*               <Button onPress = {downloadImage(uri)}></Button>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
            </View>

          <View style = {{ flex: 1, alignItems: 'stretch', paddingHorizontal: 15 }}>
            <TouchableOpacity onPress = {() =>  addApiary()} style = {styles.submitButton}>
              <Text style = {styles.buttonTxt}>Create Apiary</Text>
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
   /*  alignSelf: 'flex-end', */
    alignItems:'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffcd24',
    

  },
  buttonTxt:{
    color:'#4d4d4d', 
    fontWeight: 'bold', 
    fontSize: 16,

  },
  buttons:{
      flex: .5,
     /*  alignSelf: 'flex-end', */
      alignItems:'center',
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#ffcd24',
      
    
  }

});





