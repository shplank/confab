// The application’s start screen that loads and renders first

import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 45, fontWeight: 600, fontColor: '#FFFFFF'}}>confab</Text>
        <View>
          <TextInput
            style={{height: 40, borderColor: 'black', borderWidth: 1, alignSelf: 'center', padding: 10}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder="what's your name?"
          />
          <Button
            title="start chatting"
            style={{fontSize: 16, fontWeight: 600, fontColor: '#FFFFFF', buttonColor: '#757083'}}
            onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name  })}
          />
        </View>
      </View>
    )
  }
}
