
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


    //refresh control state and refresh method. I don't really understand this. lol
    const[refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
     setRefreshing(true);
     getApiaries();
     wait(1000).then(() => setRefreshing(false));
     
   }, []);    
    
  
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

/*   const downloadImage = (uri) => {
    Storage.get(uri)
      .then((result) => setImage(result))
      .catch((err) => console.log(err));
  };
 */


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
        <TouchableOpacity onPress={() => {navigation.push('Details', {selectedApiaryData:item, navBarName: item.name});}} style = {styles.listItemBttn}>
          <View style = {styles.listItemBttnSub}>
            {<Image source={{ uri: 'https://basicnave598a12f03ec47ca9928f22e6cb80f2b130106-dev.s3.us-east-1.amazonaws.com/public/C893B47F-44FE-4E97-9EF7-1968F7BAC79A.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIBU6JOKJz5j8ulyuKZGFg7rho8mzKkT0kf9%2BVT74UItDAiEAwPkjJNsBJ77kAiiFPdXpTmkW%2FHqoQobFIiUbscIkMB8q%2FwIIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw0OTc3MDM0MDc3MzEiDPeI95tFE0k7CL9vTSrTAr7HMVEyHQyMtKzIncoY5U1%2BGTyOJ5XfxbPFCMDa%2B6sgbnXco1o1Stu%2FeiZgrEU93uUrXOUIWaq61D2Hk7cc3ZSux5j%2FuJGCVlHXiw31lRZ97Kne6On5s8MAhYTG2DxeHi8t96P%2BLCLqz5magHUwNIMWarsvOvIhJ6t7Qk0rM6bA9l4u57W%2BNoJVHutxlj43JvCxEocquzyO4aEyJrjzI1w9y5FyEZTW%2FS9QpJTTsPHWpeqooni9PDQ54Zhjp0r%2F4q4TGQObUREW0EWtsCX2x2IOgefZ2ddr%2Fx5fYhYJCoe5PuiipfgvJr2%2FYx6NcBz%2FrBV9LyOoXlHoKcpjgUmdtRAmL3vW5%2BWpgVpQMypKHYbhPThW%2Bf85aT6f3n36dfX9lRWfyuXC0VTlEtTAHXZ1we%2FwHYygfCNzEA4LNkX6P9UydxfUEmXsrm6Qg%2FZk7IUjpllPajDQuI6IBjqzArTySm3rB7bEdblCjCBgmHHbFwTx949zG0rhNslW625G4oNOCcLq0KJ4%2Fps6bY2%2BwnbMnoppNcIhtbPbVK99%2BD3x%2FAd5M41lIAErm44U%2BRZ63hnQH30qk30Mpl70t4kAfEEu1HkkIVFdBeIR8VPy7CXaJIfWTF97eWCvs63fuFByYugpVkYI4zBN6RZSiyqPKo8LbyqaT3L%2FOpJ9yCNbzxDd7c5krYvMvYMr4BmH27o9OoW%2BsxS5C70NihvBCPT6Hz0JEjLxAsPWEHrQzk4ziHkBCbk2UOfR00C1neAqFQrCUrdU1nkdnKKubt8C%2F4Y7XIot83cXcy1gREB8NtwKbHCC9fkvQB22u0aiN66gXLuBoNs8C50X6ycgmB17w1rRJ94cUW0gLOS3SCaZD%2F0J0r1%2BGCs%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210730T105329Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXHYLPKBZ3ZSKCS4M%2F20210730%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1bc1d6eaee584fee4b088ae4943c4a83083d0c5e68bda2f9717e1cba3bdf5f7c' }} style={{ width: 50, height: 50, borderRadius: 40, borderWidth:1, borderColor: 'gray', backgroundColor: '#d4d4d4'}} />}
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










