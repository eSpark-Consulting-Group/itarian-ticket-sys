import React from 'react';
import {Linking, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {Theme, useTheme} from '@react-navigation/native';
import {State, useHookstate} from '@hookstate/core';

import {
  goBack,
  handleStopwatch,
  onSave,
  saveStatus,
  clearFunc,
} from '../utils/headerFunctions';

import STickets from '../../forms/ServiceTickets';
import Contact1 from '../../screens/Contacts/View/Contacts';
import Configuration1 from '../../screens/Configurations/View/Configuration';
import Company from '../../screens/Companies/View/Company';
import NewCompany from '../../forms/NewCompany';
import MyStatus from '../../screens/Profile/View/Profile/MyStatus';
import Filters from '../../forms/Filters';
import NewConfiguration from '../../forms/NewConfiguration/CreateConfigurations';
import Activities from '../../screens/MyActivities/View/Activity/index';
import Opportunity from '../../screens/Oppurtunities/View/Opportunity';

import NewActivity from '../../forms/NewActivity';
import NewExpenseReport from '../../forms/NewExpenseReport';
import NewOpportunity from '../../forms/NewOpportunity';
import NewTimeSheet from '../../forms/NewTimeSheet';
import NewTicket from '../../forms/NewTicket';
import AddMiscSchedule from '../../forms/AddMiscSchedule';
import CreatePost from '../../forms/CreatePost';
import {userStore} from '../../stores/userStore';
import {BarcodeScanner} from '../../components';
import {checkValidations} from '../../utils/helperFunctions';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  MyStatus: {status: boolean};
  STickets: {title: string};
  Company: {title: string};
  NewCompany: {title: string};
  Contact1: undefined;
  Configure1: undefined;
  Filters: undefined;
  NewConfigure: undefined;
  Activities: undefined;
  Opportunity: undefined;
  NewActivity: undefined;
  NewExpenseReport: undefined;
  NewOpportunity: undefined;
  NewTimeSheet: undefined;
  NewTicket: undefined;
  AddMiscSchedule: undefined;
  BarcodeScanner: undefined;
  CreatePost: undefined;
};

const StackLvl1 = ({route, navigation}: any) => {
  const {colors}: Theme = useTheme();
  const globalStates: State<any> = useHookstate(userStore);

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
            return (
              <II
                size={30}
                name="close"
                style={{right: 6}}
                color={'#fff'}
                onPress={() => goBack(navigation)}
              />
            );
          },
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => saveStatus(navigation, route, globalStates)}
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
              {/* <II
                size={30}
                name="stopwatch-outline"
                color={'#fff'}
                onPress={() => handleStopwatch(route?.params)}
              /> */}
              <View style={{width: 15}} />
              <MI
                onPress={() =>
                  navigation.navigate('Stack2', {
                    screen: 'EditTicket',
                    params: route?.params,
                  })
                }
                size={30}
                name="edit"
                color={'#fff'}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Company"
        component={Company}
        options={({route, navigation}) => ({
          title: 'Organization',
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
          title: 'New Organization',
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
              onPress={() => checkValidations(navigation, route, globalStates)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Contact1"
        component={Contact1}
        options={({route, navigation}) => ({
          title: 'User',
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
      {/* <Stack.Screen
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
          headerRight: () => (
            <FA
              size={30}
              name="save"
              color={'#fff'}
              onPress={() => checkValidations(navigation, route, globalStates)}
            />
          ),
        })}
      /> */}
      <Stack.Screen
        name="Filters"
        component={Filters}
        options={({route, navigation}) => ({
          title: 'Filters',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <MCI
              size={30}
              name="filter-remove-outline"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => clearFunc(navigation, route)}
            />
          ),
          headerRight: () => (
            <II
              size={30}
              name="checkmark"
              color={'#fff'}
              onPress={() => {
                onSave(navigation, route);
              }}
            />
          ),
        })}
      />
      {/* <Stack.Screen
        name="NewConfigure"
        component={NewConfiguration}
        options={({route, navigation}) => ({
          title: 'New Configuration',
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
            <>
              <II
                size={30}
                name="barcode-outline"
                color={'#ffffff'}
                onPress={() =>
                  navigation.navigate('Stack3', {
                    screen: 'BarcodeScanner',
                    params: {
                      from: 'NewConfigure',
                      stack: 'Stack1',
                    },
                  })
                }
                style={{right: 10}}
              />
              <FA
                size={30}
                name="save"
                color={'#fff'}
                onPress={() =>
                  checkValidations(navigation, route, globalStates)
                }
              />
            </>
          ),
        })}
      /> */}
      {/* <Stack.Screen
        name="Activities"
        component={Activities}
        options={({route, navigation}) => ({
          title: 'Activity ',
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
              <MCI
                size={30}
                name="phone"
                color={'#fff'}
                onPress={() => Linking.openURL(`tel:090078601`)}
              />
              <View style={{width: 15}} />
              <FA
                size={30}
                name="save"
                color={'#fff'}
                onPress={() =>
                  checkValidations(navigation, route, globalStates)
                }
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Opportunity"
        component={Opportunity}
        options={({route, navigation}) => ({
          title: 'Opportunity',
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
              onPress={() => checkValidations(navigation, route, globalStates)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewActivity"
        component={NewActivity}
        options={({route, navigation}) => ({
          title: 'New Activity',
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
              onPress={() => checkValidations(navigation, route, globalStates)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewExpenseReport"
        component={NewExpenseReport}
        options={({route, navigation}: any) => ({
          title: route?.params?.title || 'Add Expense',
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
              onPress={() => checkValidations(navigation, route, globalStates)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewOpportunity"
        component={NewOpportunity}
        options={({route, navigation}) => ({
          title: 'New Opportunity',
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
              onPress={() => checkValidations(navigation, route, globalStates)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewTimeSheet"
        component={NewTimeSheet}
        options={({route, navigation}: any) => ({
          title: route?.params?.title || 'Add Time',
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
              onPress={() => checkValidations(navigation, route, globalStates)}
            />
          ),
        })}
      /> */}
      <Stack.Screen
        name="NewTicket"
        component={NewTicket}
        options={({route, navigation}) => ({
          title: 'New Ticket',
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
              onPress={() => checkValidations(navigation, route, globalStates)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={({route, navigation}) => ({
          title: 'Create Post',
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
        })}
      />
      {/* <Stack.Screen
        name="AddMiscSchedule"
        component={AddMiscSchedule}
        options={({route, navigation}) => ({
          title: 'Add Misc Schedule',
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
              onPress={() => checkValidations(navigation, route, globalStates)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={({route, navigation}) => ({
          title: 'Barcode Scanner',
          headerShown: false,
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
      /> */}
    </Stack.Navigator>
  );
};

export default StackLvl1;
