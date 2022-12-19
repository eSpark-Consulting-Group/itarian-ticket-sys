import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Theme, useTheme} from '@react-navigation/native';

import ScheduledTab from './Scheduled';
import UnscheduledTab from './Unscheduled';

const Tab = createMaterialTopTabNavigator();

const AgendaScreen = ({route}: any) => {
  const {colors}: Theme = useTheme();
  return (
    <ScheduledTab />
  );
};

export default AgendaScreen;
