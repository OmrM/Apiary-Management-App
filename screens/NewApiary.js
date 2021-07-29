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
/* initial state of form Data: blank text boxes  */
const initialState = {name: '', description: '', location: '', image: ''}
const initialAppState = {showForm: false, imageURI: ''}

const NewApiaryScreen = ({navigation}) => {

  /* create an empty array in our state called albums. usestate returns data and function that can change that data(updateAlbums) */
  const [albums, updateAlbums] = useState([])

  const [formState, setFormState] = useState(initialState)
  
  const [image, setImage] = useState(null);


  useEffect(() => {
    //check to make sure app has permission to access user's camera roll and to camera 
    //https://forums.expo.dev/t/imagepicker-not-opening-in-android-production-builds-works-fine-in-expo-client-app/37878
    //wasn't asking for camera permissions at first. 
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







/* handleChoosePhoto = async () =>
   {
    try {
      launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      }, (response) => {
        if (response.uri) {
          updateAppState( 'imageURI', response.uri )
          const filename = uuid.v4() + '_todoPhoto.jpg'
          updateTodoState('image', filename)
        }
      })
    } catch (error) {
      console.log(error)
    }
  } */





  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      handleImagePicked(result);
    }
  };



  const takePicture = async () => {
    // Ask the user for the permission to access the camera
/*     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    } */

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
      handleImagePicked(result);
    }
  }

const handleImagePicked = async (pickerResult) => {
    try {
      //create a unique name for each picture that is uploaded. get rid of spaces. 
        // using reg expressions to delete spaces
       // const imageName =  formState.name.replace(/\s/g, "").toLowerCase();
      //I decided to keep the original image's name. that way we know it's unique. 
      
        const imageName = pickerResult.uri.substr(-40);

        const img = await fetchImageFromUri(pickerResult.uri);
        const uploadUrl = await uploadImage(imageName, img);
        console.log('upload url: ' + uploadUrl)

        console.log("original form state: " + formState)
        //const updateFormImg = {image: uploadUrl}
        setInput('image', uploadUrl)

        downloadImage(uploadUrl);
        console.log(formState)
      
    } catch (e) {
      console.log(e);
      alert('Upload failed');
    }
  };

const uploadImage = (filename, img) => {
    Auth.currentCredentials();
    console.log('name of photo file: ' + filename)
    return Storage.put(filename, img, {
      level: 'public',
      contentType: 'image/jpeg',
/*       progressCallback(progress) {
        setLoading(progress);
      }, */
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

 const downloadImage = (uri) => {
    Storage.get(uri)
      .then((result) => setImage(result))
      .catch((err) => console.log(err));
  };


  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };



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

          
          <View style = {styles.textInputWrapper}>
            <Text style = {styles.inputLabel}>Photo:</Text>
            <View style = {{flexDirection: 'row', justifyContent: 'space-around', }}>
              
              <View>
{/*               <TouchableOpacity onpress = {takePicture} style = {styles.buttons} >
                <Text style = {styles.buttonTxt}>Open Camera</Text>
                </TouchableOpacity> */}
                <Button title = "camera" onPress = {takePicture}></Button>
              </View>

              <View>
{/*               <TouchableOpacity  onPress={pickImage}  style = {styles.buttons}>
                 <Text style = {styles.buttonTxt}>Select Image</Text>
                </TouchableOpacity>   */}
                <Button title = "Select Image" onPress = {pickImage}></Button>
              </View>
     

            </View>



          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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





