import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import các màn hình
import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import HomeScreen from './src/HomeScreen';
import AddDeviceScreen from './src/AddDeviceScreen';
import SwitchScreen from './src/SwitchScreen';
import HomeScreen1 from './src/HomeScreen1';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        {/* <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
        <Stack.Screen name="SwitchScreen" component={SwitchScreen} /> */}
        <Stack.Screen name="APP-CONFIG" component={HomeScreen1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}