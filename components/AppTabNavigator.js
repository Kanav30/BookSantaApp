import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator} from './AppStackNavigator';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks: {
        screen:AppStackNavigator,
        navigationOptions: {
            tabBarIcon:<Image source = {require("../assets/request-list.png")}
             style={{width: 20, height: 20}} 
             />,
            tabBarLabel: "BookDonateList"
        }
    },
    RequestBooks: {
        screen:BookRequestScreen,
        navigationOptions: {
            tabBarIcon:<Image source = {require("../assets/request-book.png")}
             style={{width: 20, height: 20}} 
             />,
            tabBarLabel: "Request Books"
        }
    }
})