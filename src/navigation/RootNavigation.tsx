import React, {useEffect, useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useState as useHookState, State} from '@hookstate/core';

import {Login, Profile, SignUp} from '../screens/index';
import {DarkTheme, LightTheme} from '../theme/colors';
import Drawer from './Drawer';
import {globalState} from '../utils/globalState';

const Stack = createNativeStackNavigator();

const config: any = {
  screens: {
    Draw: {
      screens: {
        SBoard: 'D/SB',
        TimeSheets: 'D/TS',
        ExpReports: 'D/ER',
      },
    },
  },
};

const App = () => {
  const themeValue: State<string> = useHookState(globalState.theme);

  //! ----------------------------------------------------

  //! ---------------------------------------------------

  useEffect(() => {
    console.log('Theme State', themeValue.get());
  }, [themeValue.get()]);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={{
          prefixes: ['app://'],
          config,
        }}
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
