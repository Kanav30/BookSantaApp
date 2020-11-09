import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {Card, Icon, ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import BookDonateScreen from './BookDonateScreen';

export default class MyDonations extends React.Component {
    constructor(){
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            AllDonations: []
        }
        this.requestRef = null
    }

    static navigationOptions = {header: null};

    getDonorDetails=(donorId)=>{
      db.collection("Users").where("emailId", "==", donorId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc)=>{
          this.setState({
            "donorName": doc.data().FirstName + " " + doc.data().LastName
          })
        })
      })
    }

    getAllDonations=()=>{
   this.requestRef = db.collection("AllDonations").where("donorId",'==',this.state.donorId)
   .onSnapshot((snapshot)=>{
       var AllDonations = []
       snapshot.docs.map((doc)=>{
         var Donations = doc.data()
         Donations["docId"] = doc.id
         AllDonations.push(Donations)
       })
       this.setState({
           AllDonations: AllDonations
       })
   })
 }

 sendBook = (bookDetails) =>{
   if(bookDetails.requestStatus === "bookSent"){
     var requestStatus = "Donor Interested"
     db.collection("AllDonations").doc(bookDetails.docId).update({
       "requestStatus": "donorInterested"
     })
     this.sendNotification(bookDetails,requestStatus)
   }
   else {
     var requestStatus = "bookSent"
     db.collection("AllDonations").doc(bookDetails.docId).update({
      "requestStatus": "bookSent"
    })
    this.sendNotification(bookDetails,requestStatus)
   }
 }

 sendNotification = (bookDetails, requestStatus)=>{
  var requestId = bookDetails.requestId
  var donorId = bookDetails.donorId
  db.collection("AllNotifications")
  .where("requestId","==", requestId)
  .where("donorId","==", donorId).get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
      var message = ""
      if(requestStatus === "bookSent"){
        message = this.state.donorName + " has sent you the book."
      }
      else{
        message = this.state.donorName + " has shown interest in donating the book."
      }
      db.collection("AllNotifications").doc(doc.id).update({
        "message": message,
        "notificationStatus": "unread",
        "date": firebase.firestore.FieldValue.serverTimestamp() 
      })
    })
  })
  
}


keyExtractor = (item,index)=>index.toString()
renderItem = ({item, i})=>(
  <ListItem
  key = {i}
  title = {item.bookName}
  subtitle = {"requestedBy:" + item.requestedBy + "\Nstatus:" + item.requestStatus}
  leftElement = {<Icon name = "Book" type = "font-awesome" />}
  titleStyle = {{color: 'black', fontWeight: 'bold'}}
  rightElement = {
  <TouchableOpacity
  style = {[styles.button,
    {backgroundColor: item.requestStatus === "bookSent"}
    ? "green"
    : "red"
  ]}
  onPress={()=>{
    this.sendBook(item)
  }}
  >
  <Text>{item.requestStatus === "bookSent"
          ? "Book Sent"
          : "Send Book"
    }
  </Text>
  </TouchableOpacity>
  } 
  bottomDivider
  />
)

componentDidMount(){
  this.getDonorDetails(this.state.donorId)
  this.getAllDonations()
}
componentWillUnmount(){
  this.requestRef()
}

  render(){
  return (
    <View>
      <MyHeader navigation = {this.props.navigation} title = "My Donations" />
      <View style = {{flex: 1}}>
        {this.state.AllDonations.length === 0
        ?(<Text>List of all Book Donations</Text>)
        :(<FlatList 
          keyExtractor = {this.keyExtractor}
          data = {this.state.AllDonations}
          renderItem = {this.renderItem}
        /> )
        }
      </View>
    </View>
  );
  }

}

const styles = StyleSheet.create({
 button:{
   width: 100,
   height: 20,
   justifyContent: 'center',
   alignItems: 'center',
   elevation: 16
 }
});
