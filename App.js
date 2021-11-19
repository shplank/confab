import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import the screens we want to navigate

import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start" >
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ title: '', 
            headerTransparent: true, 
          }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              title: '',
              headerStyle: { backgroundColor: '#333', },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
