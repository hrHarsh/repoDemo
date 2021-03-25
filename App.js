import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IncomingCall from './src/incomingCall';
import PushNotification from './src/pushNotification';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Video from './src/video';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PushNotification navigation={navigation} />
      <Text onPress={() => ReactNativeForegroundService.stop()}>Homeasd Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="IncomingCall" component={IncomingCall} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

