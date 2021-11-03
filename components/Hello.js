import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>hello</Text>
        <TextInput
            style={{height: 40, borderColor: 'black', borderWidth: 1, alignSelf: 'center', padding: 10}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder="what's your name?"
          />
        <Button
          title="go to chat"
          onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name  })}
        />
      </View>
    )
  }
}
