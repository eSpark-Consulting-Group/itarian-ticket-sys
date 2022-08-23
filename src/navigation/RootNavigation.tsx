import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useState as useHState, State} from '@hookstate/core';
import QuickActions, {ShortcutItem} from 'react-native-quick-actions';

//@ts-ignore
import store from 'react-native-simple-store';

import {Login, Profile, SignUp} from '../screens/index';
import {DarkTheme, LightTheme} from '../theme/colors';
import Drawer from './Drawer';
import {globalState} from '../utils/globalState';
import StackLvl1 from './StackLvl1';
import StackLvl2 from './StackLvl2';
import Splash from '../screens/Splash/Splash';

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
  const themeValue: State<string> = useHState(globalState.theme);
  const user: State<boolean> = useHState(globalState.user);
  const shortCutScreen: State<any> = useHState(globalState.shortCutScreen);

  //! ----------------------------------------------------

  //! ---------------------------------------------------

  useEffect(() => {
    store.get('user')
    .then((res: any) => {
        if(res) user.set(res) 
    })
    console.log('Theme State', themeValue.get());
  }, [themeValue.get()]);

  const handleColdBoot = (data: ShortcutItem) => {
    const {userInfo} = data;
    shortCutScreen.set(data.type)
    console.log('chala coldboot', userInfo?.url, data.type);
  };

  QuickActions.popInitialAction()
    .then(data => {
      if (data != null) handleColdBoot(data);
    })
    .catch(err => console.log('err', err));

  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={{
          prefixes: ['app://'],
          config,
        }}
        fallback={<Splash />}
        theme={themeValue.get() === 'light' ? LightTheme : DarkTheme}>
        <Stack.Navigator >
          {!user.get() ? <>
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
          </>
          :
          <Stack.Group
            screenOptions={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}>
            <Stack.Screen
              name="Draw"
              component={Drawer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Stack1"
              component={StackLvl1}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Stack2"
              component={StackLvl2}
              options={{headerShown: false}}
            />
          </Stack.Group>}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
