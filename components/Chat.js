// The application’s main Chat component that renders the chat UI

import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView, { Marker } from "react-native-maps";
import firebase from 'firebase';
import 'firebase/firestore';
import CustomActions from './CustomActions';

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

export default class Chat extends React.Component {
  constructor() {
    super();

  // Your web app's Firebase configuration
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyCUP4vyShpGOlZ_SolyN1uuA8EX4E24fuw",
      authDomain: "confab-16900.firebaseapp.com",
      projectId: "confab-16900",
      storageBucket: "confab-16900.appspot.com",
      messagingSenderId: "694295310457",
      appId: "1:694295310457:web:12429a9e0dc85ffa53e4a8",
      measurementId: "G-V9BJ02H537"
    });
  }

  this.referenceMessages = firebase.firestore().collection("messages");

  this.state = {
    messages: [],
    uid: 0,
    user: {
      _id: '',
      name: '',
      avatar: '',
    },
    image: null,
    location: null,
    isConnected: false
    };
  }

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');

        // anonymous authentication
      this.authUnsubscribe = firebase.auth().onAuthStateChanged( async (user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }

      this.setState({
        uid: user.uid,
        user: {
          _id: user.uid,
          name: name,
          avatar: 'https://placeimg.com/140/140/any',
        },
        messages: [],
      });
      
      // listen for changes to the collection
      this.unsubscribe = this.referenceMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
    });
      } else {
        console.log('offline');
        this.setState({ isConnected: false })
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    // stop listening for authentication
    this.authUnsubscribe();
  }

  // loads messages from AsyncStorage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // saves messages in AsyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // deletes messages from AsyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text || "",
        user: data.user,
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({ messages });
  };

  handleConnectivityChange = (state) => {
    const isConnected = state.isConnected;
    if (isConnected == true) {
      this.setState({
        isConnected: true,
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    } else {
      this.setState({
        isConnected: false,
      });
    }
  };

  // updates state when message is sent
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
      this.saveMessages();
    });
  };

  // adds new message to database
  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      uid: this.state.uid,
      createdAt: message.createdAt,
      text: message.text || "",
      user: message.user,
      image: message.image || null,
      location: message.location || null
    });
  }

  // custom text bubble styling
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#626262' }, 
          left: { backgroundColor: '#EEE' }
        }}
      />
    )
  }

  // disable InputToolbar when offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar {...props} />
      );
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };


  // custom map view
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150, height: 100, borderRadius: 12, margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker 
              coordinate={{
                latitude: currentMessage.location.latitude,
                longitude: currentMessage.location.longitude,
              }}
            />
          </MapView>
      );
    }
    return null;
  }

  render() {
    let { theme } = this.props.route.params;

    return (
      <View style={styles.container}>
        <ImageBackground source={theme} resizeMode="cover" style={styles.theme} >
        <GiftedChat 
          isConnected={this.state.isConnected}
          messages={this.state.messages}
          user={this.state.user}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          onSend={(messages) => this.onSend(messages)}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',    
  },
  theme: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
});
