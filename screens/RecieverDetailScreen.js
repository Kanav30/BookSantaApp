import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import {Card, Icon, Header} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class RecieverDetailScreen extends React.Component {
  constructor(props){
    super(props)
    if(!this.props.navgation)
    {
    var userid = this.props.navigation.getParam('details')["userId"]
    var requestedid = this.props.navigation.getParam('details')["requestId"]
    var bookname =  this.props.navigation.getParam('details')["bookName"]
    var reasonrequest =  this.props.navigation.getParam('details')["reasonToRequest"]
    console.log("usrid "+ userid )
    console.log("reqtid "+  requestedid)
    console.log("Bknm "+ bookname)
    console.log("Resn "+ reasonrequest)
    this.state={
      userId: firebase.auth().currentUser.email,
      userName: "Test",
      recieverId: this.props.navigation.getParam('details')["userId"],
      requestId: this.props.navigation.getParam('details')["requestId"],
      bookName: this.props.navgation.getParam('details')["bookName"],
      reasonForRequest: this.props.navgation.getParam('details')["reasonToRequest"],
      recieverName: '',
      recieverContact: '',
      recieverAddress: '',
      recieverRequestDocId: ''
    } 
    }
  }

  getRecieverDetails(){
    db.collection('Users').where('emailId','==',this.state.recieverId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          recieverName: doc.data().FirstName,
          recieverContact: doc.data().MobileNumber,
          recieverAddress: doc.date().Address,
          })
      })
    })
    db.collection('RequestedBook').where('requestId','==',this.state.requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          recieverRequestDocId:doc.id
        })
      })
    })
  }

  getUserDetails = (userId)=>{
    db.collection("Users").where('emailId', '==', userId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          userName: doc.data().FirstName + " " + doc.data().LastName
        })
      })
    })
  }

  updateBookStatus(){
    db.collection('AllDonations').add({
      "bookName": this.state.bookName,
      "requestId": this.state.requestId,
      "requestedBy": this.state.recieverName,
      "donorId": this.state.userId,
      "requestStatus": "donorInterested"
    })
}

addNotification =()=>{
  var message = this.state.userName + " has shown interest in donating the book "
  db.collection("AllNotifications").add({
    "targetedUserId": this.state.recieverId,
    "donorId": this.state.userId,
    "requestId": this.state.requestId,
    "bookName": this.state.bookName,
    "date": firebase.firestore.FieldValue.serverTimestamp(),
    "notificationStatus": "unread",
    "message": message
  })
}

componentDidMount(){
  this.getRecieverDetails();
}


  render(){
  return (
    <View>
      <View>
        <Header 
        leftComponent = {<Icon name = "arrow-left" type = 'feather' color = '#696969'
         onPress = {()=>this.props.navigation.goBack()}/>}
         centerComponent = {{
           text: "Donate Books" }}
           backgroundColor = "#eaf8fe"
         />
      </View>
      <View style={{flex: 0.3}}>
          <Card title = {"Book Information"} titleStyle = {{fontSize: 20}}>
            <Card>
              <Text style={{fontWeight: 'bold'}}>Name:{this.state.bookName}</Text>
            </Card>
            <Card>
         <Text style={{fontWeight: 'bold'}}>Reason: {this.state.reasonForRequest}</Text>
            </Card>
        </Card>
      </View>
      
      <View style={{flex: 0.3}}>
          <Card title = {"Reciever Information"} titleStyle = {{fontSize: 20}}>
            <Card>
              <Text style={{fontWeight: 'bold'}}>Name:{this.state.recieverName}</Text>
            </Card>
            <Card>
         <Text style={{fontWeight: 'bold'}}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
         <Text style={{fontWeight: 'bold'}}>Address: {this.state.recieverAddress}</Text>
            </Card>
            
        </Card>
      </View>
    
      <View>
      {this.state.recieverId !== this.state.userId
      ? (
        <TouchableOpacity
        onPress={()=>{
          this.updateBookStatus()
          this.addNotification()
          this.props.navigation.navigate('MyDonations')
        }}
        >
          <Text>I want to Donate</Text>
        </TouchableOpacity>
      )
      : null
      }
      </View>
    </View>
  );
  }

}

const styles = StyleSheet.create({
 
});
