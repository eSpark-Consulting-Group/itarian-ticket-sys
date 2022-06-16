/**
 * @format
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
// import App from './src/navigation/RootNavigation';
import Splash from './src/screens/Splash/Splash';
import {name as appName} from './app.json';

const Screen = () => {
  const [state, setState] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setState(true);
    }, 3000);
  }, []);
  return state === true ? <App /> : <Splash />;
};

AppRegistry.registerComponent(appName, () => Screen);
