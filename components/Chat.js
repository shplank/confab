// The application’s main Chat component that renders the chat UI

import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
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

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
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
      <View style={{flex: 1, backgroundColor: theme }}>
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
