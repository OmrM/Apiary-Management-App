
import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet,FlatList} from 'react-native';
import { useState,State,initialFormState,useEffect } from 'react';
import { Connect } from 'aws-amplify-react-native';

import { Grid, Header, Input, List, Segment } from 'semantic-ui-react';
import { withAuthenticator, AmplifySignOut, Authenticator} from 'aws-amplify-react-native/dist/Auth';
import ApiaryComponent from '../components/ApiaryComponent';

 import { API, graphqlOperation } from 'aws-amplify';

/* import * as queries from '../src/graphql/queries'; */
import {listAlbums, listApiarys} from '../src/graphql/queries';
/* const HomeScreen = ({navigation}) =>{ */
export default HomeScreen = ({navigation}) =>{  /*navigation prop is passed into every screen component */
    /* HOME PAGE FUNCTIONS */
  
    const handleAddTask = () => {
      console.log('owo');
    }

    /* creates an empty array in our state called albums. usestate returns data and function that can change that data(updateAlbums) */
    const [albums, updateAlbums] = useState([])
    /* useEffect (or componentDidMount() in class implmentation) is triggered when the component renders */
  


    const [apiaries, updateApiaries] = useState([])

    /*useEffect(() => {getApiaries()}, []) */
    useEffect( () => {
      /* got this listener method from https://stackoverflow.com/questions/46504660/refresh-previous-screen-on-goback */
       getApiaries();
       const willFocusSubscription = navigation.addListener('focus', () => {
        getApiaries();
        });

        return willFocusSubscription;
      }, [] );
   


    async function getApiaries(){
      try{
        const apiaryData = await API.graphql(graphqlOperation(listApiarys));

        const apiaryDataItems = apiaryData.data.listApiarys.items
        updateApiaries(apiaryDataItems);        //calls useState Function to update apiaries state
      }
      catch(error){
        console.log("error on fetching apiaries")
      }
    }
    


  





    /* HOME PAGE */
    return (
      
      <View style={styles.homeScreenParent}>

      <View style={styles.cardContainer}>
      <FlatList data = {apiaries} 
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <Text style = {styles.itemTitle}>{item.name}</Text>
        <Text style = {styles.itemSubTitle}>{item.description}</Text>
        </TouchableOpacity>} 
        keyExtractor={({id}) => id}/>

      </View>


  
        <View styles={styles.homeBottom}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('New Apiary')} style = {styles.itemButton}> 
              <View style={styles.addButton}>
                <Text style={styles.buttonText}>+</Text>
              </View> 
            </TouchableOpacity>
            </View>
        </View>

      </View>
    );
  }


  


  const styles = StyleSheet.create({
    homeScreenParent:{
      flexGrow:1,
      flexDirection: 'column',
      paddingBottom:0,
      padding:10,
      backgroundColor: '#e6e6e6'
    },
  

    cardContainer:{
      flex:1,
      backgroundColor: '#FFF',
      padding:10,
      
      margin:10,
      borderRadius:8,
  /*     shadowOffset:{
        width:0,height:1
      },
      shadowOpacity:0.1,
      shadowRadius:2, */
    },
  
    homeBottom:{
      flex:1,
      flexDirection: 'row',
      alignItems: 'flex-end'  
    },
    addButton:{
      
      width: 60,
      height: 60,
      /* backgroundColor: '#FF9900', */
      backgroundColor: '#ffcd24',
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
      flexGrow:1,
      borderWidth:5,
      borderRadius:5,
    },

    itemBottomRow:{
      flexDirection: 'row',
    },
    

    itemTitle:{
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 3,
      color: '#373737'
    },
    itemSubTitle:{
      fontSize: 12,
      color: '#373737',
      paddingBottom: 30,
    
    }, 
    itemButton:{
      padding:15,
      

    }
  
  
  });










