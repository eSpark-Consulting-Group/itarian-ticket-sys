import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useState, State} from '@hookstate/core';

import {Login, Profile, SignUp} from '../screens/index';
import {DarkTheme, LightTheme} from '../theme/colors';
import Drawer from './Drawer';
import {globalState} from '../utils/globalState';

const Stack = createNativeStackNavigator();

const App = () => {
  const themeValue: State<string> = useState(globalState.theme);
  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={themeValue.get() === 'light' ? LightTheme : DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Draw"
            component={Drawer}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
