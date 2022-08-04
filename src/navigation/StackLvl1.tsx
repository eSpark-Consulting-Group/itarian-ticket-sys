import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';

import MyStatus from '../forms/MyStatus';
import {Theme, useTheme} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const StackLvl1 = () => {
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
        name="MyStatus"
        component={MyStatus}
        options={{
          title: 'My Status',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II size={30} name="close" style={{right: 6}} color={'#fff'} />
          ),
          headerRight: () => <FA size={27} name="save" color={'#fff'} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackLvl1;
