import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput,
    KeyboardAvoidingView, ScrollView, Alert
} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config'
import firebase from 'firebase';

export default class Profile extends React.Component {
    constructor(){
        super()
        this.state= {
            emailId: '',
            FirstName: '',
            LastName: '', 
            Address: '',
            MobileNumber: '',
            docId: ''
        }
    }

    getUserDetails = ()=>{
      var user = firebase.auth().currentUser;
      var email = user.email
      db.collection('Users').where('emailId','==',email).get()
      .then(snapshot=>{
          snapshot.forEach(doc =>{
            var data = doc.data()
            this.setState({
                emailId: data.emailId,
                FirstName: data.FirstName,
                LastName: data.LastName,
                Address: data.Address,
                MobileNumber: data.MobileNumber,
                docId: doc.id
            })
        })
      })
    }

    updateUserDetails = ()=>{
      db.collection('Users').doc(this.state.docId).update({
          "FirstName" : this.state.FirstName,
          "LastName" : this.state.LastName,
          "Address" : this.state.Address,
          "MobileNumber" : this.state.MobileNumber,
          })
          Alert.alert("Profile Updated Successfully")
    }

    componentDidMount(){
        this.getUserDetails()
    }

  render(){
  return (
    <View>
      <MyHeader title = "Profile" navigation = {this.props.navigation} />
      <View>
      <TextInput
      style={styles.Textinput}
      placeholder={"First Name"}
      onChangeText = {(text)=>{
          this.setState({
              FirstName: text
          })
      }}
      value = {this.state.FirstName}
      />
      <TextInput
      style={styles.Textinput}
      placeholder={"Last Name"}
      onChangeText = {(text)=>{
        this.setState({
            LastName: text
        })
    }}
    value = {this.state.LastName}
    />
      <TextInput
      style={styles.Textinput}
        placeholder={"MobileNumber"}
        maxLength={10}
        keyboardType = {'numeric'}
        onChangeText = {(text)=>{
            this.setState({
                MobileNumber: text
            })
        }}
        value = {this.state.MobileNumber}
      />
      <TextInput
    style={styles.Textinput2}
      placeholder = {"Address"}
      multiline = {true}
      onChangeText = {(text)=>{
        this.setState({
            Address: text
        })
    }}
    value = {this.state.Address}
      />

      <TouchableOpacity
      style={styles.button}
      onPress = {()=>{this.updateUserDetails()}}
      >
      <Text style={styles.buttonText}>Update Changes</Text>
    </TouchableOpacity>

    </View>
      
    </View>
  );
  }

}

const styles = StyleSheet.create({
    Textinput:{
        height : 38,
        fontSize: 28,
        width: 300,
        height: 45,
        alignSelf: "center",
        textAlign: "center",
        margin: 10,
        borderWidth: 2.5 
    },
    Textinput2:{
        height : 38,
        fontSize: 28,
        width: 300,
        height: 100,
        alignSelf: "center",
        textAlign: "center",
        margin: 10,
        borderWidth: 2.5 
    },
    button:{
        margin: 20,
        backgroundColor: '#9212e8',
        width: 80,
        height: 60,
        alignSelf: 'center'
    },
    buttonText:{
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center',
    color: 'white',
    fontSize: 20,
    margin:3
    }
});
