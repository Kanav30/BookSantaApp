import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert,
  ScrollView, KeyboardAvoidingView } from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';


export default class BookRequestScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookName: "",
      reasonToRequest: "",
      
    }
  }
  createUniqueId(){
    return Math.random().toString(36).substring(6);
  }

  addRequest = (bookName, reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('RequestedBook').add({
      "userId": userId,
      "bookName": bookName,
      "reasonToRequest": reasonToRequest,
      "requestId": randomRequestId
    })
    this.setState({
      bookName: '',
      reasonToRequest: ''
    })
    return Alert.alert("Book Requested Successfully")
  }

  render(){
  return (
    <View>
      <MyHeader title = "Request Book" navigation = {this.props.navigation} />
      <KeyboardAvoidingView style = {styles.keyboardStyle}>
      <TextInput
      style={styles.Textinput}
      placeholder = {'Enter Book Name'}
      onChangeText = {(text)=>{
        this.setState({bookName: text})
      }}
      value = {this.state.bookName}
      />
      <TextInput 
      style={styles.Textinput2}
      multiline
      numberOfLines = {10}
      placeholder = {'Why Do You Need This Book'}
      onChangeText = {(text)=>{
        this.setState({reasonToRequest: text})
      }}
      value = {this.state.reasonToRequest}
      />
      <TouchableOpacity
      style={{
      backgroundColor: '#3282b8',
      height: 40,
      width: 80,
      height: 60,
      alignSelf: 'center'}}
      onPress={()=>{
        this.addRequest(this.state.bookName, this.state.reasonToRequest)
      }}
      >
        <Text
        style={{alignSelf: 'center',
        textAlign: 'center',
        alignContent: 'center',
        color: 'white',
        fontSize: 20,
        margin:3,
        color: 'black',
        fontWeight: 'bold'
      }}
        >
         Submit Request
        </Text>
      </TouchableOpacity>
  </KeyboardAvoidingView>
 
    </View>
  );
  }

}

const styles = StyleSheet.create({
 keyboardStyle: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center'
 },
 Textinput:{
  height : 38,
  fontSize: 28,
  width: 300,
  alignSelf: "center",
  textAlign: "center",
  margin: 10,
  borderWidth: 2.5 
},
Textinput2:{
 height : 38,
 fontSize: 28,
 width: 300,
 height: 300,
 alignSelf: "center",
 textAlign: "center",
 margin: 10,
 borderWidth: 2.5 
}
});
