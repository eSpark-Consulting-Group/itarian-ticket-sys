import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useHookstate, State} from '@hookstate/core';
import QuickActions, {ShortcutItem} from 'react-native-quick-actions';

//@ts-ignore
import store from 'react-native-simple-store';

import {Login, OTPScreen, PinScreen} from '../../screens/index';
import {DarkTheme, LightTheme} from '../../theme/colors';
import Drawer from './Drawer';
import {globalState} from '../../stores/globalAppState';
import StackLvl1 from './StackLvl1';
import StackLvl2 from './StackLvl2';
import StackLvl3 from './StackLvl3';
import {userStore} from '../../stores/userStore';

export type RootStackParamList = {
  Login: undefined;
  Draw: undefined;
  Stack1: undefined;
  Stack2: {screen: string; params?: object};
  Stack3: undefined;
  OTPScreen: undefined;
  Pin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
  const themeValue: State<string> = useHookstate(globalState.theme);
  const biometricState: State<boolean> = useHookstate(globalState.useBiometric);
  const user: State<any> = useHookstate(userStore.user);
  const shortCutScreen: State<any> = useHookstate(globalState.shortCutScreen);
  const dSName: State<string> = useHookstate(globalState.defaultScreenName);
  const dScreen: State<any> = useHookstate(globalState.defaultScreenId);
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );
  const globalStopwatch: State<any> = useHookstate(globalState.stopwatch);

  //! ----------------------------------------------------

  //! ---------------------------------------------------

  useEffect(() => {
    store.get('user').then((res: any) => {
      console.log('user', res);
      if (res) user.set(res);
    });
    store.get('dSName').then((res: any) => {
      if (res) {
        dSName.set(res?.dSName);
        dScreen.set(res?.dSId);
      }
    });
    store.get('dNavName').then((res: any) => {
      if (res) {
        dNavName.set(res?.dNavName);
      }
    });
    store.get('stopwatch').then((res: any) => {
      if (res) {
        globalStopwatch.set(res?.stopwatch);
      }
    });
    store.get('bioMetric').then((res: any) => {
      if (res) {
        biometricState.set(res?.bioMetric);
      }
    });
  }, [themeValue.get()]);

  useEffect(() => {
    store.get('theme').then((res: any) => {
      if (res) {
        themeValue.set(res?.theme);
      }
    });
  }, []);

  const handleColdBoot = (data: ShortcutItem) => {
    const {userInfo} = data;
    shortCutScreen.set(data.type);
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
        // fallback={<Splash />}
        theme={themeValue.get() === 'light' ? LightTheme : DarkTheme}>
        <Stack.Navigator>
          {!user.get() ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Pin"
                component={PinScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="OTPScreen"
                component={OTPScreen}
                options={{headerShown: false}}
              />
            </>
          ) : (
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
              <Stack.Screen
                name="Stack3"
                component={StackLvl3}
                options={{headerShown: false}}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
