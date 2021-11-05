// The application’s main Chat component that renders the chat UI

import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCUP4vyShpGOlZ_SolyN1uuA8EX4E24fuw",
    authDomain: "confab-16900.firebaseapp.com",
    projectId: "confab-16900",
    storageBucket: "confab-16900.appspot.com",
    messagingSenderId: "694295310457",
    appId: "1:694295310457:web:12429a9e0dc85ffa53e4a8",
    measurementId: "G-V9BJ02H537"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  this.referenceMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    
    this.setState({
      messages: [
        {
          _id: 1,
         text: 'Hello developer',
         createdAt: new Date(),
         user: {
           _id: 2,
           name: 'React Native',
           avatar: 'https://placeimg.com/140/140/any',
         },
        },
        {
          _id: 2,
          text: `${name} has joined the chat`,
          createdAt: new Date(),
          system: true,
         },
      ],
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
       text: data.text,
       createdAt: data.createdAt.toDate(),
       user: data.user,
      });
    });
    this.setState({ messages });
  };

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt.toDate(),
      user: message.user,
    });
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#5060E0' }, 
          left: { backgroundColor: '#F5F5F5' }
        }}
      />
    )
  }

  render() {
    let { theme } = this.props.route.params;

    return (
      <View style={[styles.container, { backgroundColor: theme }]}>
        <GiftedChat 
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{ _id: 1, }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,     
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  }
});
