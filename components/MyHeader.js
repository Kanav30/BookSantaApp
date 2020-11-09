import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Header, Icon} from 'react-native-elements';

const MyHeader = props => {
return (
    
    <Header 
    leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = '#696969' onPress = {()=>props.navigation.toggleDrawer()} />}
    centerComponent = {{text: props.title, style: {color: '#90a5a9', fontSize: 30, fontWeight: "bold"}}}
    backgroundColor = "#eaf8fe"
    />
 );
  }
export default MyHeader
