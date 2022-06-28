import {View, Text} from 'react-native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';

import {Theme} from '../../theme/colors';
import ModalForm from '../ModalForm';

const Stack = createNativeStackNavigator();

const ModalStack = () => {
  const {colors}: Theme = useTheme();

  return (
    <Stack.Screen
      name="My Status"
      component={ModalForm}
      options={{
        animation: 'slide_from_bottom',
        headerLeft: () => (
          <II
            size={30}
            name="close"
            style={{right: 5}}
            color={colors.background}
          />
        ),
      }}
    />
  );
};

export default ModalStack;
