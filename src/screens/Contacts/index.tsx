import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking, RefreshControl } from 'react-native';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import { useHookstate } from '@hookstate/core';

import styles from './style';
import {
  RoundedIcon,
  SearchBar,
  SimpleLoader,
  CstmPressable,
  FloatButton,
  NotFound,
  CstmTabBar,
} from '../../components';
import { contactsList } from '../../constants/SampleArrays';
import { Contact } from '../../types';
import { useUpdateEffect } from '../../utils/hooks';
import { searchFromArray } from '../../utils/helperFunctions';
import { userStore } from '../../stores/userStore';
import { getAllUsers } from './utils/functions';
import {TabView, SceneMap} from 'react-native-tab-view';
import Staffs from './Screens/staffs';
import Users from './Screens/users';

const renderScene = SceneMap({
  first: Users,
  second: Staffs,
});


const Contacts = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Users'},
    {key: 'second', title: 'Staffs'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => <CstmTabBar {...props} />}
    />
  );

};

export default Contacts;
