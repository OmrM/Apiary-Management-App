  /* NewHive.js Screen. 
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
   import {createHive, getApiary} from '../graphql/mutations';
   import * as ImagePicker from 'expo-image-picker';
   import Auth from '@aws-amplify/auth';
   import config from '../aws-exports';
   import uuid from 'react-native-uuid';
   const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
  } = config
  



   /* initial state of form Data: blank text boxes  */
   const initialFormState = {ApiaryID: '', name: '', description: '', location: '', image: ''}
   const initialAppState = {showForm: false, imageURI: ''}
   
   const NewHiveScreen = ({route, navigation}) => {
   
     /* create an empty array in our state called albums. usestate returns data and function that can change that data(updateAlbums) */
 
   
     const [formState, setFormState] = useState(initialFormState)
     const [hiveState, setHiveState] = useState([])
     const [appState, setAppState] = useState(initialAppState)
     
     //const [image, setImage] = useState(null);
   
    //STATE updater functions:
    function updateFormState(key,value){
      setFormState({ ...formState, [key]: value})
    }
    
    function updateAppState(key,value){
      setAppState({ ...appState, [key]: value})
    }

     //apiary id being sent from the apiary screen. I can use apiary.id to query the db for that apiary's hives
    const {currentApiary} = route.params;

   
     useEffect(() => {
       //check to make sure app has permission to access user's camera roll and to camera 
       //https://forums.expo.dev/t/imagepicker-not-opening-in-android-production-builds-works-fine-in-expo-client-app/37878
       //wasn't asking for camera permissions at first. buggy if I use touchable opacity to take pictures
       (async () => {    

       
        
        console.log("\n")
        //updateFormState("ApiaryID: ", currentApiary.id)
        updateFormState("ApiaryID", currentApiary.id)
        console.log("updating apiary id: " + formState.ApiaryID)
        console.log(formState)
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
   
   
    //code to upload and download images from : https://github.com/deekob/amplify-react-native-storage/blob/completed/App.js    
     async function addHive() { 
      try {
        // new code for images
        const photo = await fetch(appState.imageURI)
        const photoBlob = await photo.blob();
        await Storage.put(formState.image, photoBlob, {
          level: 'private',
          contentType: 'image/jpg'
        })
  
        //existing api code
        //copy of hive 
/*         console.log(currentApiary.id)
        updateFormState('ApiaryID',currentApiary.id) */
        
        const hive = { ...formState}
        
        //adding new data to hive State
        setHiveState([...hiveState, hive])
        
        console.log('creating hive: ' + hive.ApiaryID)
        //sends the Hive info to the database
        await API.graphql(graphqlOperation(createHive, {input: hive})) 
        
        //clearing state for the new hive form and for the image
        setFormState(initialFormState)
        setAppState(initialAppState)

        navigation.goBack()   
       
      } catch (err) {
        console.log('error creating hive:', err)
      }
    }
   

      
  const handleChoosePhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: .2,
      })
      if (!result.cancelled) {
        console.log('uri: ' + result.uri)
        updateAppState( 'imageURI', result.uri )
        const filename = uuid.v4() + '_hivePhoto.jpg'
        console.log(filename)
        updateFormState('image', filename)
      }     
    } catch (error) {
      console.log(error)
    }
  }


 const handleTakePhoto = async () =>{
  try {
  const result = await ImagePicker.launchCameraAsync(({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [4, 3],
     quality: .5,
  }));
  
      if (!result.cancelled) {
        console.log('uri: ' + result.uri)
        updateAppState('imageURI', result.uri )
        const filename = uuid.v4() + '_hivePhoto.jpg'
        updateFormState('image', filename)
      }

    } catch (error) {
      console.log(error)
    }
}
  
  
   
     return (
       
         <View style={styles.ScreenParent}>
           <View style = {styles.cardContainer}>
             <ScrollView style={styles.scrollViewChild}>
               
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
                   <Button title = "camera" onPress = {() =>handleTakePhoto()} ></Button>
                 </View>
   
                 <View>
   {/*               <TouchableOpacity  onPress={pickImage}  style = {styles.buttons}>
                    <Text style = {styles.buttonTxt}>Select Image</Text>
                   </TouchableOpacity>   */}
                   <Button title = "Select Image" onPress = {() =>handleChoosePhoto()}></Button>
                 </View>
        
   
               </View>
   
   
   
             </View>
             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                {/*  <Image source={{ uri:appState.imageUri ? appState.imageURI: null }} style={{ width: 200, height: 200 }} /> */}
                
                 <Image source={{ uri: appState.imageURI }} style={{ width: 200, height: 200 }}/>
                 <Text>{appState.imageURI}</Text>
               </View>
   
             <View style = {{ flex: 1, alignItems: 'stretch', paddingHorizontal: 15 }}>
               <TouchableOpacity onPress = {() =>  addHive()} style = {styles.submitButton}>
                 <Text style = {styles.buttonTxt}>Create Hive</Text>
               </TouchableOpacity>
             </View>
   
             </KeyboardAvoidingView>
             </ScrollView>
             </View>
         </View>
     );
   }
   
   
   
   export default NewHiveScreen;
   
   
   
   const styles = StyleSheet.create({
     
     ScreenParent:{
       flexGrow:1,
       flexDirection: 'column',
       paddingBottom:20,
       padding:10,
       backgroundColor: '#e6e6e6'
     },
     cardContainer:{
      flex:1,
      backgroundColor: '#FFF',
      padding:10,
      margin:10,
      borderRadius:18,
      shadowColor: 'black',
      shadowRadius: 10,
      shadowOpacity: 0.2,
      shadowOffset: {width: 0 , height: 4},
  
    },
  
    scrollViewChild:{
      flexGrow:1,
      flexDirection: 'column',
      backgroundColor:'#FFF',
      
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