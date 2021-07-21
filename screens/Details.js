import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet,FlatList, RefreshControl} from 'react-native';
import { useState,State,initialFormState,useEffect } from 'react';
import { Connect } from 'aws-amplify-react-native';
import { withAuthenticator, AmplifySignOut, Authenticator} from 'aws-amplify-react-native/dist/Auth';
import { API, graphqlOperation } from 'aws-amplify';
import {listHives, getHive, listApiarys, getApiary} from '../src/graphql/queries';




/* const DetailsScreen =() =>  */
export default DetailsScreen = ({route, navigation}) => {
  const [hives, updateHives] = useState([])

 /*  useEffect( () => { */
    /* listener method from https://stackoverflow.com/questions/46504660/refresh-previous-screen-on-goback. original useffect: */
    useEffect(() => {getHives()}, [])
/*      getHives();
     const willFocusSubscription = navigation.addListener('focus', () => {
      getHives();
      });
      return willFocusSubscription;
    }, [] ); */

     //refresh control state and refresh method. I don't really understand this. lol
     const[refreshing, setRefreshing] = useState(false);
     const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getHives();
      wait(1000).then(() => setRefreshing(false));
      
    }, []);  
    const wait = (timeout)=>{
      return new Promise(resolve=> setTimeout(resolve, timeout));
    }

  //apiary id being sent from the apiary screen. I can use apiary.id to query the db for that apiary's hives
  const {selectedApiaryData} = route.params;



  async function getHives(){
    try{
      const apiaryData = await API.graphql(graphqlOperation(getApiary, {id: selectedApiaryData.id}))
      /* const hiveDataItems = apiary.data.getApiary.items */
      const hivesData = apiaryData.data.getApiary.hives.items
      console.log("\n")
      console.log(hivesData)
      updateHives(hivesData) 
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



    return (
      <View style={styles.homeScreenParent}>

      <View style = {styles.cardContainer}>
        <FlatList data = {hives}
          renderItem = {
            ({item}) =>
          <TouchableOpacity style = {styles.listItemButton}>
           
            <Text style = {styles.itemTitle}>{item.name}</Text>
            <Text style = {styles.itemSubTitle}>{item.description}</Text>
          </TouchableOpacity>
          }
          KeyExtractor={({id}) => id}
          ListEmptyComponent={emptyComponent}
          />
        


      </View>
     
            <TouchableOpacity onPress={() => navigation.navigate('New Hive')} style = {styles.addItemButton}> 
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
    padding:10, 
    margin:10,
    borderRadius:18,

  },
  listItemButton:{
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
    
  
  }, 
  addItemButton:{
    padding:15,
    

  }
  
  });