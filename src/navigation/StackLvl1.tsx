import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import MI from 'react-native-vector-icons/MaterialIcons';
import {Theme, useTheme} from '@react-navigation/native';
import {
  backStatus,
  saveGoneTo,
  saveStatus,
} from '../forms/utils/headerFunctions';

import MyStatus from '../forms/MyStatus';
import STickets from '../forms/ServiceTickets';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  MyStatus: {status: boolean};
  STickets: {title: string};
};

const StackLvl1 = ({route, navigation}: any) => {
  const {colors}: Theme = useTheme();
  console.log('route Props', route);

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
        options={({route}) => ({
          title: 'My Status',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => {
            console.log('Options Props', route.params);

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
              onPress={() => saveStatus(navigation, route)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="STickets"
        component={STickets}
        options={({route}) => ({
          title: route?.params?.title,
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
            />
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <II size={30} name="stopwatch-outline" color={'#fff'} />
              <View style={{width: 15}} />
              <MI size={30} name="edit" color={'#fff'} />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackLvl1;
