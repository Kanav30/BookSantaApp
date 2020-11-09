import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBar from './CustomSideBar';
import Profile from '../screens/Profile';
import MyDonations from '../screens/MyDonations';
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen:AppTabNavigator
    },
    MyDonations:{
        screen:MyDonations
    },
    Notifications:{
        screen: NotificationScreen
    },
    SetProfile: {
        screen:Profile
    }
},
{
    contentComponent:CustomSideBar
},
{
    initialRouteName: 'Home'
}

)
const styles = StyleSheet.create({
 
});
