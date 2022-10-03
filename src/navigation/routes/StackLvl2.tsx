import React from 'react';
import {Theme, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {State, useHookstate} from '@hookstate/core';

import {onSave, goBack} from '../utils/headerFunctions';
import ComposeNote from '../../forms/ComposeNote';
import QNAs from '../../forms/QNAs';
import {globalState} from '../../stores/globalAppState';
import {EditTicket} from '../../forms/EditTicket';
import {AddResource} from '../../forms/AddResource';
import {AddTaxType} from '../../forms/AddTaxType';

import {
  TimeEntries,
  Expenses,
  Attachments,
  CstmItemSelector,
  AttachmentDetails,
} from '../../components';
import TicketListing from '../../components/Ticketlisting';
import ConfigurationListing from '../../components/ConfigurationListing';
import {Contacts} from '../../screens';
import ContactListing from '../../components/ContactsListing';
import Sites from '../../components/Sites';
import {checkValidations} from '../../utils/helperFunctions';
import Resources from '../../components/Resources';
import {Tasks} from '../../components/Tasks';
import {ProductListing} from '../../components/ProductListing';

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
        name="ComposeNote"
        component={ComposeNote}
        options={({route, navigation}: any) => ({
          title: 'Compose Note',
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
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => onSave(navigation, route)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="QNA"
        component={QNAs}
        options={({route, navigation}: any) => ({
          title: 'Configuration Questions',
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
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => onSave(navigation, route)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Attachments"
        component={Attachments}
        options={({route, navigation}: any) => ({
          title: 'Attachments',
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
        name="AttachmentDetails"
        component={AttachmentDetails}
        options={({route, navigation}: any) => ({
          title: 'Attachments',
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
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => onSave(navigation, route)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="TimeEntries"
        component={TimeEntries}
        options={({route, navigation}: any) => ({
          title: 'TimeEntries',
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
        name="Expenses"
        component={Expenses}
        options={({route, navigation}: any) => ({
          title: 'Expenses',
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
        name="AddTaxType"
        component={AddTaxType}
        options={({route, navigation}: any) => ({
          title: route?.params?.title || 'Add Tax Type',
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
          title: 'Contacts',
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
        name="Sites"
        component={Sites}
        options={({route, navigation}: any) => ({
          title: 'Sites',
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
        name="ConfigurationListing"
        component={ConfigurationListing}
        options={({route, navigation}: any) => ({
          title: 'Configurations',
          headerStyle: {backgroundColor: colors.primary},
          headerRight: () => (
            <II
              size={30}
              name="barcode-outline"
              color={'#ffffff'}
              onPress={() =>
                navigation.navigate('Stack3', {
                  screen: 'BarcodeScanner',
                  params: {
                    from: 'ConfigurationListing',
                    stack: 'Stack2',
                  },
                })
              }
              style={{left: 5}}
            />
          ),
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
        name="Tasks"
        component={Tasks}
        options={({route, navigation}: any) => ({
          title: 'Tasks',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <>
              {!route?.params?.deleteEnabled ? (
                <II
                  size={30}
                  name="chevron-back"
                  style={{right: 6}}
                  color={'#fff'}
                  onPress={() => goBack(navigation)}
                />
              ) : (
                <II
                  size={30}
                  name="close"
                  style={{right: 6}}
                  color={'#fff'}
                  onPress={() => route?.params?.onClear()}
                />
              )}
            </>
          ),
          headerRight: () => (
            <>
              {route?.params?.deleteEnabled && (
                <MCI
                  size={27}
                  name="delete"
                  color={'#fff'}
                  onPress={() => route?.params?.onDelete()}
                />
              )}
            </>
          ),
        })}
      />
      <Stack.Screen
        name="ProductListing"
        component={ProductListing}
        options={({route, navigation}: any) => ({
          title: 'Products',
          headerStyle: {backgroundColor: colors.primary},
          headerRight: () => (
            <II
              size={30}
              name="barcode-outline"
              color={'#ffffff'}
              onPress={() =>
                navigation.navigate('Stack3', {
                  screen: 'BarcodeScanner',
                  params: {
                    from: 'ProductListing',
                    stack: 'Stack2',
                  },
                })
              }
              style={{left: 5}}
            />
          ),
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
    </Stack.Navigator>
  );
};

export default StackLvl2;
