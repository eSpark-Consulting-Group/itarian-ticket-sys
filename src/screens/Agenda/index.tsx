import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Theme, useTheme} from '@react-navigation/native';

import ScheduledTab from './Scheduled';
import UnscheduledTab from './Unscheduled';

const Tab = createMaterialTopTabNavigator();

const AgendaScreen = ({route}: any) => {

  const {colors}: Theme = useTheme();

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
