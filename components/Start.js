// The application’s start screen that loads and renders first

import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", bgColor: "#FFF" };
  }

  setBgColor = (color) => {
    this.setState({ bgColor: color });
  };

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
                <TouchableOpacity style={[styles.bgColor, styles.bgColor1]} onPress={() => this.setBgColor('#090C08')} />
                <TouchableOpacity style={[styles.bgColor, styles.bgColor2]} onPress={() => this.setBgColor('#474056')} />
                <TouchableOpacity style={[styles.bgColor, styles.bgColor3]} onPress={() => this.setBgColor('#8A95A5')} />
                <TouchableOpacity style={[styles.bgColor, styles.bgColor4]} onPress={() => this.setBgColor('#B9C6AE')} />
              </View>
            </View>
            <Pressable
              style={styles.startButton}
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, bgColor: this.state.bgColor })} >
                <Text style={styles.startButtonText}>start chatting</Text>
            </Pressable>
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
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  bgImage: {
    flex: 1, 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title: {
    flex: 0.56,
    flexGrow: 1,
    flexShrink: 1,
    height: 'auto',
    fontSize: 45, 
    fontWeight: '600', 
    color: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center',
    paddingTop: 80
  },
  startBox: {
    flex: 0.44,
    flexGrow: 1,
    flexShrink: 1, 
    width: '88%',
    maxHeight: 250,
    minHeight:200,
    paddingVertical: 20,
    justifyContent: "space-evenly",
    alignItems: 'center', 
    backgroundColor: '#FFF',
    marginBottom: 24
  },
  nameInput: {
    height: 48,
    width: '88%', 
    borderColor: 'black', 
    borderWidth: 1, 
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '300',
    color:'#757083', 
    opacity: 50, 
    padding: 10,
    marginBottom: 10
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
  bgColor: {
    height: 48, 
    width: 48, 
    borderRadius: 24,
    marginHorizontal: 8
  },
  bgColor1: {
    backgroundColor: '#090C08'
  },
  bgColor2: {
    backgroundColor: '#474056'
  },
  bgColor3: {
    backgroundColor: '#8A95A5'
  },
  bgColor4: {
    backgroundColor: '#B9C6AE'
  },
  startButton: {
    width: '88%',
    height: 48,
    backgroundColor: '#757083',
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 12,
  },
  startButtonText: {
    fontSize: 16, 
    fontWeight: '600', 
    color: '#FFF'
  }
});
