import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import 'firebase/firestore';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default class CustomActions extends React.Component {
  constructor(props) {
    super(props);
  }

  onActionPress = () => {
    const options = ['choose image', 'take photo', 'send location', 'cancel'];
    const cancelButtonIndex = options.length - 1;

    this.context.actionSheet().showActionSheetWithOptions (
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image'); 
            return this.pickImage();
          case 1:
            console.log('user wants to take a photo');
            return this.takePhoto();
          case 2:
            console.log('user wants to get their location');
            return this.getLocation();
          default:
            return;
        }
      },
    );
  };

  pickImage = async () => {
     const { permission } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (!permission) {
        alert('Permission to access photos is required');
      };
  
      let imageChoice = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: undefined,
      }).catch(error => console.log(error));
  
    if(!imageChoice.cancelled) {
      const imageUrl = await this.uploadImageFetch(imageChoice.uri)
      this.props.onSend({ image: imageUrl });
    };
  };

  takePhoto = async () => {
    const { permission } = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission) {
        alert('Permission to access camera is required');
      };
      
      let newPhoto = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }).catch(error => console.log(error));
 
      if (!newPhoto.cancelled) {
        const imageUrl = await this.uploadImageFetch(newPhoto.uri);
        this.props.onSend({ image: imageUrl });
      };
    };

  getLocation = async () => {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.granted) {
        const result = await Location.getCurrentPositionAsync()
          .catch((error) => console.log(error));
        const longitude = JSON.stringify(result.coords.longitude);
        const latitude = JSON.stringify(result.coords.latitude);
        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude,
            },
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // uploads image to firebase as blob
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
};

render() {
  return(
    <TouchableOpacity 
      style={ [styles.container] } 
      onPress={ this.onActionPress }
      accessible={ true }
      accessibilityLabel="More actions"
      accessibilityHint="Lets you send an image or your location"
      accessibilityRole="button"
    >
      <View style={ [styles.wrapper, this.props.wrapperStyle] }>
        <Text style={ [styles.iconText, this.props.iconTextStyle] }>+</Text>
      </View>
    </TouchableOpacity>
  )}
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
 });

 CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};