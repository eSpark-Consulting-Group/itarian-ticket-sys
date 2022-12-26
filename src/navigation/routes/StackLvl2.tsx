import React from 'react';
import {Theme, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import {State, useHookstate} from '@hookstate/core';

import {onSave, goBack} from '../utils/headerFunctions';
import {globalState} from '../../stores/globalAppState';
import {EditTicket} from '../../forms/EditTicket';
import {AddResource} from '../../forms/AddResource';
import {CstmItemSelector} from '../../components';
import TicketListing from '../../components/Ticketlisting';
import ContactListing from '../../components/ContactsListing';
import {checkValidations} from '../../utils/helperFunctions';
import Resources from '../../components/Resources';
import {CreateComment} from '../../forms/CreateComment';

const Stack = createNativeStackNavigator();

const StackLvl2 = ({navigation, route}: any) => {
  const {colors}: Theme = useTheme();
  const globalStates: State<any> = useHookstate(globalState);

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
              onPress={() => goBack(navigation)}
            />
          ),
          headerRight: () => (
            <II
              size={30}
              name="checkmark"
              color={'#fff'}
              onPress={() => onSave(navigation, route, globalStates)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="EditTicket"
        component={EditTicket}
        options={({route, navigation}: any) => ({
          title: 'Edit Ticket',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => goBack(navigation)}
            />
          ),
          headerRight: () => (
            <II
              size={30}
              name="checkmark"
              color={'#fff'}
              onPress={() => onSave(navigation, route)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddResource"
        component={AddResource}
        options={({route, navigation}: any) => ({
          title: 'Add Resource',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => goBack(navigation)}
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
      />
      <Stack.Screen
        name="TicketListing"
        component={TicketListing}
        options={({route, navigation}: any) => ({
          title: 'Tickets',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => goBack(navigation)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ContactListing"
        component={ContactListing}
        options={({route, navigation}: any) => ({
          title: 'Users',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => goBack(navigation)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Resources"
        component={Resources}
        options={({route, navigation}: any) => ({
          title: 'Resources',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => goBack(navigation)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CreateComment"
        component={CreateComment}
        options={({route, navigation}) => ({
          title: 'Create Comment',
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
    </Stack.Navigator>
  );
};

export default StackLvl2;
