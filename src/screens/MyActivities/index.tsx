import React from 'react';
import {View, Text, Pressable, FlatList, ToastAndroid} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Button, Divider} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import {Theme} from '../../theme/colors';
import {EmptyListMsg} from '../../components';
import {
  activitiesList,
  Activity as ActivityType,
} from '../../constants/SampleArrays';

const MyActivities = () => {
  const {colors, dark}: Theme = useTheme();
  return (
    <>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <Button mode="contained">Closed Activities</Button>
      </View>
      <View style={styles.container}>
        {/* {activitiesList.length !== 0 ? (
        <FlatList data={activitiesList} renderItem={renderList} />
      ) : (
        <NotFound />
      )} */}
      </View>
    </>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Contacts" />
    </View>
  );
};

export default MyActivities;
