import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Theme, useTheme} from '@react-navigation/native';

import ScheduledTab from './Scheduled';
import UnscheduledTab from './Unscheduled';
import { getAllUsers } from './utils/functions';

const Tab = createMaterialTopTabNavigator();

const AgendaScreen = ({route}: any) => {
  const {colors}: Theme = useTheme();
  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          color: '#ffffff',
        },
        tabBarStyle: {
          backgroundColor: colors.primary,
        },
        tabBarIndicatorStyle: {backgroundColor: '#ffffff'},
      }}>
      <Tab.Screen name="Scheduled" component={ScheduledTab} />
      <Tab.Screen name="Unscheduled" component={UnscheduledTab} />
    </Tab.Navigator>
  );
};

export default AgendaScreen;
