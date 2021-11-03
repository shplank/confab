// The application’s start screen that loads and renders first

import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TextInput, Button } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../BackgroundImage.png")} resizeMode="cover" style={styles.bgImage}>
          <Text style={styles.title}>confab</Text>
          <View style={styles.startBox}>
            <TextInput
              style={styles.nameInput}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              placeholder="your name"
            />
            <View style={styles.bgChoice}>
              <Text style={styles.chooseText}>choose background color:</Text>
              <View style={styles.bgChoices}>
                <View title="" style={styles.bgColor1} />
                <View title="" style={styles.bgColor2} />
                <View title="" style={styles.bgColor3} />
                <View title="" style={styles.bgColor4} />
              </View>
            </View>
            <Button
              title="start chatting"
              style={styles.startButton}
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name  })}
            />
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly', 
    alignItems: 'center'
  },
  bgImage: {
    flex: 1, 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontSize: 45, 
    fontWeight: '600', 
    color: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center'
  },
  startBox: {
    flex: 0.44, 
    width: '88%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF'
  },
  nameInput: {
    height: 40, 
    width: '88%', 
    borderColor: 'black', 
    borderWidth: 1, 
    alignSelf: 'center', 
    color:'#757083', 
    opacity: 50, 
    padding: 10
  },
  bgChoice: {
    width: '88%', 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  chooseText: {
    fontSize: 16, 
    fontWeight: '300', 
    color: '#757083', 
    opacity: 100, 
    justifyContent: 'center', 
    textAlign: 'left'
  },
  bgChoices: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  bgColor1: {
    height: 60, 
    width: 60, 
    borderRadius: 30, 
    backgroundColor: '#090C08'
  },
  bgColor2: {
    height: 60, 
    width: 60, 
    borderRadius: 30, 
    backgroundColor: '#474056'
  },
  bgColor3: {
    height: 60, 
    width: 60, 
    borderRadius: 30, 
    backgroundColor: '#8A95A5'
  },
  bgColor4: {
    height: 60, 
    width: 60, 
    borderRadius: 30, 
    backgroundColor: '#B9C6AE'
  },
  startButton: {
    width: '88%', 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#FFFFFF', 
    backgroundColor: '#757083'
  }
});
