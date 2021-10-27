import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { MainStackNavigator } from './MainStackNavigator';
import Hives from '../screens/Hives';
import { HiveStackNavigator } from './HiveStackNavigator';
import {SvgUri} from 'react-native-svg';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () =>{
    return(
        <Tab.Navigator
        tabBarOptions={{ activeTintColor: '#2AABE4', style:{backgroundColor: 'white',}}}
          screenOptions={{

            tabBarStyle: { position: 'absolute', }
          }}
          >
            <Tab.Screen name = "Apiaries" component = {MainStackNavigator}
            
            />
            <Tab.Screen name = "Hives" component  = {HiveStackNavigator}
                options = {{
                    tabBarIcon: ({size,focused, color}) =>{

                    }
                }}
            />
            
        </Tab.Navigator>
    )
}


export default BottomTabNavigator;