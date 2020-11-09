import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import BookDonateScreen from '../screens/BookDonateScreen';
import RecieverDetailScreen from '../screens/RecieverDetailScreen';

export const AppStackNavigator = createStackNavigator({
BookDonateList:{
    screen:BookDonateScreen,
    navigationOptions: {headerShown: false}
},
RecieverDetails:{
    screen: RecieverDetailScreen,
    navigationOptions: {headerShown: false}
}
},
{
    initialRouteName: 'BookDonateList'
}
)

