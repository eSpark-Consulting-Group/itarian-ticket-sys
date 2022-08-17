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

import STickets from '../forms/ServiceTickets';
import Contact1 from '../forms/Contacts';
import Configuration1 from '../forms/Configuration';
import Company from '../forms/Company';
import NewCompany from '../forms/NewCompany';
import MyStatus from '../forms/Profile/MyStatus';
import NewConfiguration from '../forms/Configuration/CreateConfigurations';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  MyStatus: {status: boolean};
  STickets: {title: string};
  Company: {title: string};
  NewCompany: {title: string};
  Contact1: undefined;
  Configure1: undefined;
  NewConfigure: undefined;
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
        options={({navigation, route}) => ({
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
        name="Company"
        component={Company}
        options={({route, navigation}) => ({
          title: 'Company',
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
        })}
      />
      <Stack.Screen
        name="NewCompany"
        component={NewCompany}
        options={({route, navigation}) => ({
          title: 'New Company',
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
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
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
      <Stack.Screen
        name="Configure1"
        component={Configuration1}
        options={({route, navigation}) => ({
          title: 'Configuration',
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
          headerRight: () => <FA size={30} name="save" color={'#fff'} />,
        })}
      />
      <Stack.Screen
        name="NewConfigure"
        component={NewConfiguration}
        options={({route, navigation}) => ({
          title: 'Create New Configuration',
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
          headerRight: () => <FA size={30} name="save" color={'#fff'} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default StackLvl1;
