// The application’s main Chat component that renders the chat UI

import React from 'react';
import { View, Text, Button } from 'react-native';


export default class Chat extends React.Component {
  render() {
    let { name, bgColor } = this.props.route.params;

    this.props.navigation.setOptions({ title: name, bgColor: bgColor });

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
        <Text>Let's confab!</Text>
        <Button
          title="go to start"
          onPress={() => this.props.navigation.navigate('Start')}
        />
      </View>
    )
  }
}
