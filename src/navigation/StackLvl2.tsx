import React from 'react';
import {Theme, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';

import GoneTo from '../forms/Profile/GoneTo';
import {backGoneTo, onSave, saveGoneTo} from '../forms/utils/headerFunctions';
import CstmItemSelector from '../components/CstmItemSelector';

const Stack = createNativeStackNavigator();

const StackLvl2 = ({navigation}: any) => {
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
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => backGoneTo(navigation)}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="check"
              color={'#fff'}
              onPress={() => saveGoneTo(navigation)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CstmItemSelector"
        component={CstmItemSelector}
        options={({route, navigation}: any) => ({
          title: route?.params?.headerTitle,
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => backGoneTo(navigation)}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="check"
              color={'#fff'}
              onPress={() => onSave(navigation, route)}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackLvl2;
