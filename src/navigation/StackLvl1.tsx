import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';

import MyStatus from '../forms/MyStatus';
import {Theme, useTheme} from '@react-navigation/native';
import {
  backStatus,
  saveGoneTo,
  saveStatus,
} from '../forms/utils/headerFunctions';

const Stack = createNativeStackNavigator();

const StackLvl1 = ({navigation}: any) => {
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
        initialParams={{status: false}}
        options={{
          title: 'My Status',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: props => {
            console.log('Stack Props', props);
            return (
              <II
                size={30}
                name="close"
                style={{right: 6}}
                color={'#fff'}
                onPress={() => backStatus(navigation)}
              />
            );
          },
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => saveStatus(navigation)}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackLvl1;
