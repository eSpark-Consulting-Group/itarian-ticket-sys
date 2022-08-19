/**
 * @format
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {AppRegistry, DeviceEventEmitter, Linking} from 'react-native';
import App from './App';
import {Provider} from 'react-native-paper';
import Splash from './src/screens/Splash/Splash';
import {name as appName} from './app.json';
import RNBootSplash from 'react-native-bootsplash';
import QuickActions, {ShortcutItem} from 'react-native-quick-actions';

QuickActions.setShortcutItems([
  {
    type: 'TimeSheets', // Required
    title: 'Time Sheet', // Optional, if empty, `type` will be used instead
    subtitle: 'Go to Time Sheet Screen',
    icon: 'ic_file_clock', // Icons instructions below
    userInfo: {
      url: 'app://D/TS', // Provide any custom data like deep linking URL
    },
  },
  {
    type: 'SBoard', // Required
    title: 'Service Board', // Optional, if empty, `type` will be used instead
    subtitle: 'Go to Service Board Screen',
    icon: 'ic_support', // Icons instructions below
    userInfo: {
      url: 'app://D/SB', // Provide any custom data like deep linking URL
    },
  },
  {
    type: 'ExpReports', // Required
    title: 'Expense Report', // Optional, if empty, `type` will be used instead
    subtitle: 'Go to Expense Report Screen',
    icon: 'ic_coins', // Icons instructions below
    userInfo: {
      url: 'app://D/ER', // Provide any custom data like deep linking URL
    },
  },
]);

DeviceEventEmitter.addListener('quickActionShortcut', data => {
  const {userInfo} = data;
  console.log('chala');
  Linking.openURL(userInfo?.url);
});

const Screen = () => {
  const [state, setState] = useState(false);
  useEffect(() => {
    RNBootSplash.hide();

    setTimeout(() => {
      setState(true);
    }, 3000);
  }, []);
  return state === true ? (
    <Provider>
      <App />
    </Provider>
  ) : (
    <Splash />
  );
};

AppRegistry.registerComponent(appName, () => Screen);
