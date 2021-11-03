// The application’s start screen that loads and renders first

import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Button } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", bgColor: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/BackgroundImage.png")} resizeMode="cover" style={styles.bgImage}>
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
                <TouchableOpacity style={styles.bgColor1} onPress={() => this.setState({bgColor: '#090C08'})} />
                <TouchableOpacity style={styles.bgColor2} onPress={() => this.setState({bgColor: '#474056'})} />
                <TouchableOpacity style={styles.bgColor3} onPress={() => this.setState({bgColor: '#8A95A5'})} />
                <TouchableOpacity style={styles.bgColor4} onPress={() => this.setState({bgColor: '#B9C6AE'})} />
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
    color: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center',
    paddingTop: 100
  },
  startBox: {
    flex: 0.44,
    flexGrow: 1,
    flexShrink: 0, 
    width: '88%',
    justifyContent: "space-evenly",
    alignItems: 'center', 
    backgroundColor: '#FFF',
    marginBottom: 40
  },
  nameInput: {
    height: 40, 
    width: '88%', 
    borderColor: 'black', 
    borderWidth: 1, 
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '300',
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
    paddingBottom: 10,
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
    margin: 5,
    backgroundColor: '#090C08'
  },
  bgColor2: {
    height: 60, 
    width: 60, 
    borderRadius: 30,
    margin: 5,
    backgroundColor: '#474056'
  },
  bgColor3: {
    height: 60, 
    width: 60, 
    borderRadius: 30,
    margin: 5,
    backgroundColor: '#8A95A5'
  },
  bgColor4: {
    height: 60, 
    width: 60, 
    borderRadius: 30,
    margin: 5,
    backgroundColor: '#B9C6AE'
  },
  startButton: {
    width: '88%', 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#FFF', 
    backgroundColor: '#757083'
  }
});
