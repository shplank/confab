# confab

![confab screenshot](https://github.com/shplank/confab/blob/master/confabshot.png?raw=true)

A chat app for mobile devices built using React Native and Gifted Chat. Expo and Android Studio were used in the development process.

## Required libraries:

- React Native
- React Navigator
- Gifted Chat
- Firebase
- Asynch Storage
- NetInfo

## For development:

- Expo
- Android Studio

## To set up app:

Enter the following in your command terminal:

```console
git clone https://github.com/shplank/confab.git
cd confab/
npm install
```

## Install Expo

You can check out the React Native [website](https://reactnative.dev/docs/environment-setup) for more detailed instructions. Below is a simplified version.

In your command terminal (I recommend the terminal built into VS Code), type the following:

```console
npm install expo-cli --global
```

Also download the Expo app on your smartphone.

## Simulator/Emulator

To set up the iOS simulator, you need XCode on your Mac (not available for Windows). It’s available to download from the App Store. After installing XCode, open it up and head over to Preferences. From there, click Components and install a simulator from the list. Open the simulator, start your Expo project, and click Run on iOS simulator.

If you are using Windows 10, you can set up Android Emulator. To do so, you first need to download and install Android Studio. To do this, follow the on-screen installation instructions and make sure you don’t untick the Android Virtual Device option in the installation dialog. Consult this [page](https://docs.expo.dev/workflow/android-studio-emulator/) for more information on how to set up your Android Emulator. I recommend choosing a device that uses Google Play.

## Database setup

This app uses Cloud Firestore, a real-time database that uses WebSocket protocol.

- Create the database

  - Sign into [Google Firebase](https://firebase.google.com/), click on "Go to console" and click "create project" or "add project". Choose any name.
  - Click through all defaults to "create project".
  - Click on "Cloud Firestore" from the menu on the left, then "Create database". Create the database in test mode and select an appropriate region for your app users.
  - Click the "Start collection" button to launch a modal and type in the collection name "messages". Allow the collection to use "Auto-ID".
  - Create a document in the newly created collection. It should have the following fields:

  ```javascript
  _id: [string];
  createdAt: [timestamp];
  text: [string];
  image: [string];
  location: [map];
  uid: [string];
  user: [string];
  uid: [string];
  name: [string];
  avatar: [string];
  ```

- Connect the app to your DB

  - Click the gear icon to open your "Project Settings". Then go to the "General" tab and under "Your apps" and select "Firestore for Web" (</> icon.).
  - Copy the config object

    ```javascript
    const firebaseConfig = {...}
    ```

  - This is the config that connects the app to your database. Copy and paste these lines and replace the firebaseConfig object at the top of **components/Chat.js**, just below the imports.

- DB Authentication
  - In testing/development mode, **anonymous** is used for this app.
  - From the "Build" section of sidebar in the Firebase console, select "Authentication" and then "Get started".
  - Under the "Sign-in method" tab select "Anonymous" from the "Native providers" column. Click save.

## Start app

Navigate to the app's base file in your terminal and type:

```console
npm start
```

or

```console
expo start
```

This will start Expo in a browser. From there you can run iOS simulator, Android emulator, or use the QR code in the browser or terminal to run the app via Expo on a smartphone.
