import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet,FlatList, RefreshControl, Image} from 'react-native';
import { useState,State,initialFormState,useEffect } from 'react';
import { Connect } from 'aws-amplify-react-native';
import { withAuthenticator, AmplifySignOut, Authenticator} from 'aws-amplify-react-native/dist/Auth';
import { API, graphqlOperation, Storage} from 'aws-amplify';
import {listHives, getHive, listApiarys, getApiary} from '../graphql/queries';

import CachedImage from 'react-native-expo-cached-image';




/* const DetailsScreen =() =>  */
export default DetailsScreen = ({route, navigation}) => {
  const [hives, setHives] = useState([])

  //apiary id being sent from the apiary screen. I can use apiary.id to query the db for that apiary's hives
  const {selectedApiaryData} = route.params;
  const apiaryImgData = route.params.image
  
  function updateHivesState(key, value) {
    setHives({...hives, [key]: value})
  }

  //refresh control state and refresh method. 
  const[refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getHives();
    wait(1000).then(() => setRefreshing(false));   
  }, []);  

  

 
  //useEffect (or componentDidMount() in class implmentation) is triggered when the component renders */
  ///listener method. autorefreshes when navigating back to this page. from https://stackoverflow.com/questions/46504660/refresh-previous-screen-on-goback. original useffect: 
  //useEffect(() => {getApiaries()}, [])
  useEffect( () => {
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
      const apiaryData = await API.graphql(graphqlOperation(getApiary, {id: selectedApiaryData.id}))
      /* const hiveDataItems = apiary.data.getApiary.items */
      let hivesData = apiaryData.data.getApiary.hives.items

      //for all hivesData get the pre-signed url and store in images field
      hivesData = await Promise.all(hivesData.map(async (hive) => {
        const imageKey = await Storage.get(hive.image, {level: 'private'})   
        hive.image = imageKey
        return hive;
      }))
      setHives(hivesData)

      
    }
    catch(error){
    console.log("error on fetching apiary hives")
    }
  }


  const emptyComponent =() => {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 200}}>
      <Text style = {{}}>No hives found!</Text>
      </View>
    )
  }

/* const topImageBar = () =>{
  return(
    <Image source  = {{uri: apiaryImgData}} style={{flex: .3,   borderRadius: 10, backgroundColor: '#d4d4d4',}}/>
  )
} */

    return (
      <View style={styles.homeScreenParent}>
{/*         <View style = {{flex: .2, flexDirection: 'row', alignContent: 'stretch', paddingHorizontal: 10, shadowColor: 'black',shadowRadius: 10,shadowOpacity: 0.2, shadowOffset: {width: 0 , height: 4},}}>
          <Image source  = {{uri: apiaryImgData}} style={{flex: 1,   borderRadius: 10, backgroundColor: '#d4d4d4',}}/>
        </View> */}
        
      <View style = {styles.cardContainer}>
      <View style = {{flex: .2, flexDirection: 'row', alignContent: 'stretch', paddingHorizontal: 0, shadowColor: 'black',shadowRadius: 10,shadowOpacity: 0.2, shadowOffset: {width: 0 , height: 4},}}>
          {/* <Image source  = {{uri: apiaryImgData}} style={{flex: 1,   borderRadius: 10, backgroundColor: '#d4d4d4',}}/> */}
          {/* <CachedImage source  = {{uri: apiaryImgData}} style={{flex: 1,   borderRadius: 10, backgroundColor: '#d4d4d4',}}/> */}
          <CachedImage defaultSource = {require('/Users/omarmuniz/Documents/React Native/BasicNavigationAWS/BasicNav/assets/beewellApiary.jpg')} source  = {{uri: apiaryImgData}} defaultSource = {require('/Users/omarmuniz/Documents/React Native/BasicNavigationAWS/BasicNav/assets/beewellApiary.jpg')}style={{flexGrow: 1,   borderRadius: 10, backgroundColor: '#d4d4d4',}}/>
        </View>
        <FlatList data = {hives}
        
          renderItem = {
            ({item}) =>
          
          <TouchableOpacity onPress={() => { navigation.push('Hive Details', {selectedHiveData:item, navBarName:item.name, image:item.image} )}} style = {styles.listItemBttn} >
            
            <View style = {styles.listItemBttnSub}>


             {/*  <Image source={{ uri: item.image}} style={{  width: 50, height: 50, borderRadius: 40, borderWidth:1, borderColor: 'gray', backgroundColor: '#d4d4d4'}} /> */}
             {/* a uri is provided for each item even if there isn't an image in the server. since the uri is provided, the ternary operator won't work. it will always load the uri from the server even if there is no image at that url.*/}
             {/*  <Image source={item.image ? { uri: item.image} : require('/Users/omarmuniz/Documents/React Native/BasicNavigationAWS/BasicNav/assets/beewellApiary.jpg')} style={{  width: 50, height: 50, borderRadius: 40, borderWidth:1, borderColor: 'gray', backgroundColor: '#d4d4d4'}}/> */}
              {/* <CachedImage source = {item.image? {uri:item.image} : require('/Users/omarmuniz/Documents/React Native/BasicNavigationAWS/BasicNav/assets/hive.png')}  /> */}
              <CachedImage defaultSource = {require('../assets/beewellApiary.jpg')} source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 40, borderWidth:1, borderColor: 'gray', backgroundColor: '#d4d4d4'}} />
            </View>
           
          <View style = {styles.listItemBttnSub}>
            <Text style = {styles.itemTitle}>{item.name}</Text>
            <Text style = {styles.itemSubTitle}>{item.description}</Text>
          </View>
          </TouchableOpacity>
          }
          KeyExtractor={({id}) => id}
          ListEmptyComponent={emptyComponent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />



      </View>
     
            <TouchableOpacity onPress={() => {navigation.push('New Hive', {currentApiary:selectedApiaryData});}}style = {styles.addItemButton}> 
              <View style={styles.addButton}>
                <Text style={styles.buttonText}>+</Text>
              </View> 
            </TouchableOpacity>
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
    padding:0,
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
      bottom: 30,
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
    
  
  }, 
  addItemButton:{
    padding:0,
    

  }
  
  });


 