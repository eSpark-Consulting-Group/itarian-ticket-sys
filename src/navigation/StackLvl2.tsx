import React from 'react';
import {Theme, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';

import GoneTo from '../forms/GoneTo';

const Stack = createNativeStackNavigator();

const StackLvl2 = () => {
  const {colors}: Theme = useTheme();

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
        name="GoneTo"
        component={GoneTo}
        options={{
          title: 'Gone To',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II size={30} name="close" style={{right: 6}} color={'#fff'} />
          ),
          headerRight: () => <FA size={27} name="check" color={'#fff'} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackLvl2;
