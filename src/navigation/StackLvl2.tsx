import React from 'react';
import {Theme, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';

import GoneTo from '../screens/Profile/View/Profile/GoneTo';
import {onSave, goBack} from '../forms/utils/headerFunctions';
import CstmItemSelector from '../components/CstmItemSelector';
import ComposeNote from '../forms/ComposeNote';
import QNAs from '../forms/QNAs';
import {State, useState} from '@hookstate/core';
import {Attachments} from '../components/Attachments/index';
import {AttachmentDetails} from '../components/Attachments/view/attachmentDetails';
import {globalState} from '../stores/globalAppState';
import { EditTicket } from '../forms/EditTicket';

const Stack = createNativeStackNavigator();

const StackLvl2 = ({navigation, route}: any) => {
  const {colors}: Theme = useTheme();
  const activeStatus: State<any> = useState(globalState);

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
              onPress={() => onSave(navigation, route, activeStatus)}
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
        name="EditTicket"
        component={EditTicket}
        options={({route, navigation}: any) => ({
          title: "Edit Ticket",
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
    </Stack.Navigator>
  );
};

export default StackLvl2;
