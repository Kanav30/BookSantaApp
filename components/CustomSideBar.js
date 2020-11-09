import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {firebase} from 'firebase';

export default class CustomSideBar extends React.Component {
  render(){
  return (
    <View
    style={{flex: 1}}
    >
    <View>
    <DrawerItems {...this.props} />
    </View>
    <View>
        <TouchableOpacity
        onPress={()=>{
            this.props.navigation.navigate('WelcomeScreen')
            firebase.auth().signOut()
        }}
        >
            <Text>Log Out</Text>
        </TouchableOpacity>
    </View>

    </View>
  );
  }

}

const styles = StyleSheet.create({
 
});
