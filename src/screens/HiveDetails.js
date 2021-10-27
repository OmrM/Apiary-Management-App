import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet,FlatList, RefreshControl, Image} from 'react-native';
import { useState,State,initialFormState,useEffect } from 'react';
import { Connect } from 'aws-amplify-react-native';
import { withAuthenticator, AmplifySignOut, Authenticator} from 'aws-amplify-react-native/dist/Auth';
import { API, graphqlOperation, Storage} from 'aws-amplify';
import {listHives, getHive, listApiarys, getApiary} from '../graphql/queries';

import CachedImage from 'react-native-expo-cached-image';


export default HiveDetailsScreen = ({navigation, route}) => {
    const [hives, setHives] = useState([])



  //hive id being sent from the apiary details screen. I can use hive.id to query the db for that hive's info
  const selectedHiveData = route.params;
  const hiveImgData = route.params.image

    //refresh control state and refresh method. I don't really understand this. lol
    const[refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
     setRefreshing(true);
     getApiaries();
     wait(1000).then(() => setRefreshing(false));
     
   }, []);   






    return(
        <View style={styles.homeScreenParent}>
            <View style={styles.cardContainer}>
                <CachedImage source = {{uri: hiveImgData}} defaultSource = {require('../assets/beewellApiary.jpg')} style={styles.hiveImage}/>
                
            </View>
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
      padding:0,
      margin:10,
      borderRadius:18,
      shadowColor: 'black',
      shadowRadius: 10,
      shadowOpacity: 0.2,
      shadowOffset: {width: 0 , height: 4},

    },
    hiveImage:{
      /* flex: .2, */   
      flexGrow: .2, 
      borderRadius: 10, 
      backgroundColor: '#d4d4d4',
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
      padding:0,
      

    }
  
  
  });







