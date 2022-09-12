import React from 'react';
import {Theme, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';

import GoneTo from '../screens/Profile/View/Profile/GoneTo';
import {onSave, goBack} from '../forms/utils/headerFunctions';
import CstmItemSelector from '../components/CstmItemSelector';
import ComposeNote from '../forms/ComposeNote';
import QNAs from '../forms/QNAs';
import {State, useState} from '@hookstate/core';
import {globalState} from '../stores/globalAppState';
import {Signature} from '../forms/Signature';

const Stack = createNativeStackNavigator();

const StackLvl2 = ({navigation, route}: any) => {
  const {colors}: Theme = useTheme();
  const activeStatus: State<any> = useState(globalState);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
        },
        animation: 'slide_from_bottom',
      }}>
      <Stack.Screen
        name="Signature"
        component={Signature}
        options={({route, navigation}) => ({
          title: 'Sign Off',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackLvl2;
