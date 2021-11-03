// The application’s main Chat component that renders the chat UI

import React from 'react';
import { View, Text, Pressable } from 'react-native';


export default class Chat extends React.Component {
  render() {
    let { name, bgColor } = this.props.route.params;

    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
        <Text style={{fontSize:48, color: '#FFF', paddingBottom: 20}}>Let's confab!</Text>
        <Pressable style={{width: '40%', height: 48, backgroundColor: '#757083', justifyContent: 'center', alignItems: 'center'}}
          onPress={() => this.props.navigation.navigate('Start')} >
          <Text style={{fontSize: 16, fontWeight: '600', color: '#FFF'}}>go to start</Text>
        </Pressable>
      </View>
    )
  }
}
