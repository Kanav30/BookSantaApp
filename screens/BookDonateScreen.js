import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
//import RecieverDetailScreen from './RecieverDetailScreen';

export default class BookDonateScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestedBookList: []
    }
    this.requestRef = null
  }
  getRequestedBookList = ()=>{
    this.requestRef = db.collection("RequestedBook").onSnapshot((snapshot)=>{
      var requestedBookList = snapshot.docs.map((doc) => doc.data());
      this.setState({
        requestedBookList: requestedBookList
      })
    })
    console.log("RequestedBookList length " + this.state.requestedBookList.length)
  }

  componentDidMount(){
    this.getRequestedBookList()
  }

  componentWillUnmount(){
    this.requestRef()
  }

  keyExtractor = (item,index)=> index.toString()
  renderItem = ({item,i})=>{
   console.log("Each item is " + item)
    return(
      <ListItem
      key = {i}
      title = {item.bookName}
      subtitle = {item.reasonToRequest}
      titleStyle = {{color: 'black', fontWeight: 'bold'}}
      rightElement = {
      <TouchableOpacity
      onPress = {()=>{
        console.log("Button Pressed")
        console.log("Bookname" + item.bookName)
        this.props.navigation.navigate("RecieverDetails", {"details": item})
      }}
      >
        <Text>View</Text>
      </TouchableOpacity>
      }
      bottomDivider
      />
    )
  }

  render(){
  return (
    <View style = {{flex: 1}}>
    <MyHeader title = "Donate Books" navigation = {this.props.navigation} />
      <View style = {{flex: 1}}>
      {
        this.state.requestedBookList.length === 0
        ?(
          <View style = {{flex: 1, fontSize: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text>List Of All Requested Book</Text></View>
        )
        :(
          <FlatList
          keyExtractor = {this.keyExtractor}
          data = {this.state.requestedBookList}
          renderItem = {this.renderItem}
          />
        )
      }
      </View>
    </View>
  );
  }

}

const styles = StyleSheet.create({
 
});
