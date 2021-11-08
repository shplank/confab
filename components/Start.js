// The application’s start screen that loads and renders first

import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

// Importing theme images
import clouds from "../assets/clouds.png";
import colorful from "../assets/colorful.png";
import machine from "../assets/machine.png";
import wood from "../assets/wood.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", theme: "#FFF" };
  }

  setTheme = (color) => {
    this.setState({ theme: color });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/start.png")} resizeMode="cover" style={styles.bgImage}>
          <Text style={styles.title}>confab</Text>
          <View style={styles.startBox}>
            <TextInput
              accessible={true}
              accessibilityLabel="Name input"
              accessibilityHint="Lets you type your name to diplay in your chats."
              accessibilityRole="button"
              style={styles.nameInput}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              placeholder="your name"
            />
            <View style={styles.bgChoice}>
              <Text style={styles.chooseText}>choose theme:</Text>
              <View style={styles.bgChoices}>
                <TouchableOpacity>
                  accessible={true}
                  accessibilityLabel="Choose black theme"
                  accessibilityHint="Sets the color theme on your chat screen."
                  accessibilityRole="button"
                  style={styles.themeBtn} 
                  onPress={() => this.setTheme(wood)}
                  <Image source={require("../assets/wood.png")} />
                </TouchableOpacity>
                <TouchableOpacity>
                  accessible={true}
                  accessibilityLabel="Choose eggplant theme"
                  accessibilityHint="Sets the color theme on your chat screen."
                  accessibilityRole="button"
                  style={styles.themeBtn} 
                  onPress={() => this.setTheme(colorful)} 
                  <Image source={require("../assets/colorful.png")} />
                </TouchableOpacity>
                <TouchableOpacity>
                  accessible={true}
                  accessibilityLabel="Choose gray theme"
                  accessibilityHint="Sets the color theme on your chat screen."
                  accessibilityRole="button"
                  style={styles.themeBtn}
                  onPress={() => this.setTheme(clouds)}
                  <Image source={require("../assets/clouds.png")} />
                </TouchableOpacity>
                <TouchableOpacity>
                  accessible={true}
                  accessibilityLabel="Choose slate theme"
                  accessibilityHint="Sets the color theme on your chat screen."
                  accessibilityRole="button"
                  style={styles.themeBtn} 
                  onPress={() => this.setTheme(machine)}
                  <Image source={require("../assets/machine.png")} />
                </TouchableOpacity>
              </View>
            </View>
            <Pressable
              accessible={true}
              accessibilityLabel="Go to chat"
              accessibilityHint="Takes you to the chat screen."
              accessibilityRole="button"
              style={styles.startButton}
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, theme: this.state.theme })} >
                <Text style={styles.startButtonText}>start chat</Text> 
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
  themeBtn: {
    height: 48, 
    width: 48, 
    borderRadius: 24,
    marginHorizontal: 8
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
