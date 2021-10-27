
import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet,FlatList, RefreshControl, Image} from 'react-native';
import { useState,State,initialFormState,useEffect } from 'react';
import { API, graphqlOperation, Storage} from 'aws-amplify';
import {listHives} from '../graphql/queries';
import CachedImage from 'react-native-expo-cached-image';
import AddItemButton from '../assets/AddItemButton';



export default HivesScreen = ({navigation}) =>{  /*navigation prop is passed into every screen component */
    


    /* creates an empty array in our state called albums. usestate returns data and function that can change that data(updateAlbums) */
    const [hives, setHives] = useState([])


    //refresh control state and refresh method. I don't really understand this. lol
    const[refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
     setRefreshing(true);
     getHives();
     wait(1000).then(() => setRefreshing(false));
     
   }, []);    
    
  
    useEffect( () => {
      /* useEffect (or componentDidMount() in class implmentation) is triggered when the component renders */
      /* listener method from https://stackoverflow.com/questions/46504660/refresh-previous-screen-on-goback. original useffect: */
      /*useEffect(() => {getApiaries()}, []) */
       getHives();
       const willFocusSubscription = navigation.addListener('focus', () => {
        getHives();
        });
        return willFocusSubscription;
      }, [] );
      const wait = (timeout)=>{
        return new Promise(resolve=> setTimeout(resolve, timeout));
      }



      async function getHives(){
        try{
          const hiveData = await API.graphql(graphqlOperation(listHives));
            
          let hiveDataItems = hiveData.data.listHives.items
          console.log( hiveDataItems)
          
          //for all apiaryDataItem, get the presigned url and store in images field
          hiveDataItems = await Promise.all(hiveDataItems.map(async (hive) => {
            const imageKey = await Storage.get(hive.image, {level: 'private'})
            hive.image = imageKey
            return hive;
          }))
          
          //calls useState Function to update apiaries state. (updates screen content)
          setHives(hiveDataItems)
        }
        catch(error){
          console.log("error on fetching apiaries")
        }
      }
  
    



   const handleAddTask = () => {
    console.log('owo');
  }
  
  const emptyComponent =() => {
    return(
      <View style={{flex: 1, alignSelf: 'center', justifyContent: 'space-evenly'}}>
      <Text style={styles.titleStyle}>No Hives found!</Text>
      </View>
    )
  }

/*   const downloadImage = (uri) => {
    Storage.get(uri)
      .then((result) => setImage(result))
      .catch((err) => console.log(err));
  };
 */


    return (
      
      <View style={styles.homeScreenParent}>

      <View style={styles.cardContainer}>
      <FlatList data = {hives} 
      
        renderItem={
        ({item}) => 
        /* Pass params to a route by putting them in an object as a second parameter to the navigation.navigate function: 
            navigation.navigate('RouteName', { /* params go here  })
            from: https://reactnavigation.org/docs/params/  
        */
        <TouchableOpacity onPress={() => {navigation.push('Hive Details', {selectedHiveData:item, navBarName: item.name, image: item.image});}}  style = {styles.listItemBttn}>
          <View style = {styles.listItemBttnSub}>
           {/*  <Image defaultSource = {require('/Users/omarmuniz/Documents/React Native/BasicNavigationAWS/BasicNav/assets/beewellApiary.jpg')} source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 40, borderWidth:1, borderColor: 'gray', backgroundColor: '#d4d4d4'}} /> */}
            <CachedImage defaultSource = {require('../assets/beewellApiary.jpg')} source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 40, borderWidth:1, borderColor: 'gray', backgroundColor: '#d4d4d4'}} />
          </View>
          
          <View style = {styles.listItemBttnSub}>
            <Text style = {styles.itemTitle}>{item.name}</Text>
            <Text style = {styles.itemSubTitle}>{item.description}</Text>
          </View>         

        </TouchableOpacity>
        } 
        keyExtractor={({id}) => id}
        ListEmptyComponent={emptyComponent}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />

      </View>
       
      <AddItemButton onPress={() => navigation.navigate('New Hive')} />

      </View>
    );
  }


  


  const styles = StyleSheet.create({
    homeScreenParent:{
      flexGrow:1,
      flexDirection: 'column',
      paddingBottom:0,
      padding:2,
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
    listItemBttn:{
      flexDirection: 'row',
      padding: 10,
      
    },
    listItemBttnSub:{
      padding: 15,
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
    
    }, 
    addItemButton:{
      padding:0,
      

    }
  
  
  });










