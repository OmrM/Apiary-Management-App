
import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet,FlatList, RefreshControl, Image} from 'react-native';
import { useState,State,initialFormState,useEffect } from 'react';
import ApiaryComponent from '../components/ApiaryComponent';
import { API, graphqlOperation } from 'aws-amplify';
/* import * as queries from '../src/graphql/queries'; */
import {listAlbums, listApiarys} from '../src/graphql/queries';




/* const HomeScreen = ({navigation}) =>{ */
export default HomeScreen = ({navigation}) =>{  /*navigation prop is passed into every screen component */
    


    /* creates an empty array in our state called albums. usestate returns data and function that can change that data(updateAlbums) */
    const [albums, updateAlbums] = useState([])
    const [apiaries, updateApiaries] = useState([])
    
  
    useEffect( () => {
      /* useEffect (or componentDidMount() in class implmentation) is triggered when the component renders */
      /* listener method from https://stackoverflow.com/questions/46504660/refresh-previous-screen-on-goback. original useffect: */
      /*useEffect(() => {getApiaries()}, []) */
       getApiaries();
       const willFocusSubscription = navigation.addListener('focus', () => {
        getApiaries();
        });
        return willFocusSubscription;
      }, [] );
      const wait = (timeout)=>{
        return new Promise(resolve=> setTimeout(resolve, timeout));
      }


    async function getApiaries(){
      try{
        const apiaryData = await API.graphql(graphqlOperation(listApiarys));

        const apiaryDataItems = apiaryData.data.listApiarys.items
        
/*         console.log("\n")
        console.log(apiaryDataItems) */

        //calls useState Function to update apiaries state. (updates screen content)
        updateApiaries(apiaryDataItems);   
        
 
        
      }
      catch(error){
        console.log("error on fetching apiaries")
      }
    }
    

    

    //refresh control state and refresh method. I don't really understand this. lol
    const[refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
     setRefreshing(true);
     getApiaries();
     wait(1000).then(() => setRefreshing(false));
     
   }, []);

   const handleAddTask = () => {
    console.log('owo');
  }
  
  const emptyComponent =() => {
    return(
      <View style={{flex: 1, alignSelf: 'center', justifyContent: 'space-evenly'}}>
      <Text style={styles.titleStyle}>No Apiaries found!</Text>
      </View>
    )
  }





    return (
      
      <View style={styles.homeScreenParent}>

      <View style={styles.cardContainer}>
      <FlatList data = {apiaries} 
      
        renderItem={
        ({item}) => 
        /* Pass params to a route by putting them in an object as a second parameter to the navigation.navigate function: 
            navigation.navigate('RouteName', { /* params go here  })
            from: https://reactnavigation.org/docs/params/  
        */
        <TouchableOpacity onPress={() => {navigation.push('Details', {selectedApiaryData:item, navName: item.name});}} style = {styles.listItemButton}>
          <Text style = {styles.itemTitle}>{item.name}</Text>
          <Text style = {styles.itemSubTitle}>{item.description}</Text>
          {<Image source={{ uri: 'https://basicnave598a12f03ec47ca9928f22e6cb80f2b130106-dev.s3.amazonaws.com/public/37013423-F0C3-4361-878C-6DF485BAC7D4.jpg' }} style={{ width: 20, height: 20 }} />}

        </TouchableOpacity>
        } 
        keyExtractor={({id}) => id}
        ListEmptyComponent={emptyComponent}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />

      </View>


  
       
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('New Apiary')} style = {styles.addItemButton}> 
              <View style={styles.addButton}>
                <Text style={styles.buttonText}>+</Text>
              </View> 
            </TouchableOpacity>
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
      borderRadius:18,

    },
    listItemButton:{
      padding: 15,
    },

    addButton:{
/*       width: 60,
      height: 60,
      backgroundColor: '#ffcd24',
      borderRadius: 60,
      justifyContent: 'space-around',
      borderColor: '#C0C0C0',
      alignSelf:'flex-end', /* this is the thing i wanted. smh */ 
      width: 60,
      height: 60,
      backgroundColor: '#ffcd24',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      position: 'absolute',
      right: 30,
      bottom: 60,
      shadowColor: 'black',
      shadowRadius: 10,
      shadowOpacity: 0.2,
      shadowOffset: {width: 0 , height: 4},
      
    },
    buttonText:{
      color:'#FFF',
      fontSize:30,
      alignSelf:'center',    /*centers the plus sign */
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
      /* paddingBottom: 30, */
    
    }, 
    addItemButton:{
      padding:15,
      

    }
  
  
  });










