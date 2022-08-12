import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import MI from 'react-native-vector-icons/MaterialIcons';
import {Theme, useTheme} from '@react-navigation/native';

import MyStatus from '../forms/MyStatus';
import STickets from '../forms/ServiceTickets';
import Contact1 from '../forms/Contacts';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  MyStatus: undefined;
  STickets: {title: string};
  Contact1: undefined;
};

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
        options={({navigation, route}) => ({
          title: 'My Status',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II size={30} name="close" style={{right: 6}} color={'#fff'} />
          ),
          headerRight: () => <FA size={27} name="save" color={'#fff'} />,
        })}
      />
      <Stack.Screen
        name="STickets"
        component={STickets}
        options={({route, navigation}) => ({
          title: route?.params?.title,
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
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
      <Stack.Screen
        name="Contact1"
        component={Contact1}
        options={({route, navigation}) => ({
          title: 'Contact',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => null,
        })}
      />
    </Stack.Navigator>
  );
};

export default StackLvl1;
