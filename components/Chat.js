import React from 'react';
import { View, Text, Button} from 'react-native';


export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Let's confab!</Text>
        <Button
          title="go to hello"
          onPress={() => this.props.navigation.navigate('Hello')}
        />
      </View>
    )
  }
}
