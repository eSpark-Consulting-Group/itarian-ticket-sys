import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import MI from 'react-native-vector-icons/MaterialIcons';
import {Theme, useTheme} from '@react-navigation/native';
import {State, useHookstate} from '@hookstate/core';

import {goBack, saveStatus} from '../utils/headerFunctions';

import STickets from '../../forms/ServiceTickets';
import Contact1 from '../../screens/Contacts/View/Contacts';
import TeamDetails from '../../screens/Teams/View/Teams';
import Company from '../../screens/Companies/View/Company';
import NewCompany from '../../forms/NewCompany';
import MyStatus from '../../screens/Profile/View/Profile/MyStatus';
import NewTicket from '../../forms/NewTicket';
import CreatePost from '../../forms/CreatePost';
import {userStore} from '../../stores/userStore';
import {checkValidations, dataFormatter} from '../../utils/helperFunctions';
import {Post} from '../../screens';
import NewTeam from '../../forms/NewTeam';
import {addTeam, updateTeam} from '../../screens/Teams/utils/functions';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  MyStatus: {status: boolean};
  STickets: {title: string};
  Company: {title: string};
  NewCompany: {title: string};
  Contact1: undefined;
  Activities: undefined;
  NewTicket: undefined;
  CreatePost: undefined;
  Post: {id: string};
  TeamDetails: undefined;
  NewTeam: {title: string};
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
      <Stack.Screen
        name="TeamDetails"
        component={TeamDetails}
        options={({route, navigation}: any) => ({
          title: 'Teams Details',
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
              onPress={() => {
                const data = dataFormatter(route?.params?.data);
                const obj = {
                  data: {
                    id: data?.id,
                    type: 'teams',
                    attributes: {
                      name: data?.TeamName,
                      status: Boolean(data?.Status),
                      admin_notes: data?.AdminNotes,
                    },
                    relationships: {
                      teamlead: {
                        data: {
                          type: 'users',
                          id: data?.TeamLead[0]?.id,
                        },
                      },
                    },
                  },
                };
                checkValidations(navigation, route, globalStates, updateTeam, obj, "Team updated successfully");
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={({route, navigation}) => ({
          title: 'View Post',
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
              onPress={() => console.log('abc')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewTeam"
        component={NewTeam}
        options={({route, navigation}: any) => ({
          title: 'New Team',
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
              onPress={() => {
                const data = dataFormatter(route?.params?.data);
                const obj = {
                  data: {
                    type: 'teams',
                    attributes: {
                      name: data?.TeamName,
                      status: data?.Status,
                      admin_notes: data?.AdminNotes,
                    },
                    relationships: {
                      teamlead: {
                        data: {
                          type: 'users',
                          id: data?.TeamLead?.id,
                        },
                      },
                    },
                  },
                };
                checkValidations(navigation, route, globalStates, addTeam, obj);
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackLvl1;
