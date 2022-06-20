import React from 'react';
import {View, Text} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../theme/colors';
import ScheduledTab from './Scheduled';
import UnscheduledTab from './Unscheduled';

const Tab = createMaterialTopTabNavigator();

const AgendaScreen = () => {
  const {colors}: Theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: 'powderblue'},
      }}>
      <Tab.Screen name="Scheduled" component={ScheduledTab} />
      <Tab.Screen name="Unscheduled" component={UnscheduledTab} />
    </Tab.Navigator>
  );
};

export default AgendaScreen;
