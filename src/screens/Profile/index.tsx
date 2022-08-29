import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';
import {AvatarContainer, SingleLineField} from '../../components';
import II from 'react-native-vector-icons/Ionicons';

import {State, useState as hookState} from '@hookstate/core';
import {globalState} from '../../utils/globalState';
import Images from '../../assets/images';

const Profile = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const currStatus: State<boolean> = hookState(globalState.currentStatus);
  const user: State<any> = hookState(globalState.user);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}>
      <View
        style={{
          ...styles.infoHolder,
          backgroundColor: dark ? '#0000008a' : '#ffffff8a',
        }}>
        <AvatarContainer source={Images.Avatar} />
        <Text style={{fontWeight: 'bold', color: colors.text}}>
          {user.get()?.user?.username}
        </Text>
        <Text style={{color: colors.text}}>education_c</Text>
      </View>
      <SingleLineField
        subTitle="My Status"
        title={currStatus.get() == false ? 'In Office' : 'Out of the Office'}
        onPress={() => navigation.navigate('Stack1', {screen: 'MyStatus'})}
        rightIcon="chevron-right"
      />
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Stack1', {screen: 'MyStatus'})}
        style={{
          ...styles.statusButton,
          backgroundColor: dark ? '#0000008a' : '#ffffff8a',
        }}>
        <View>
          <Text style={{color: colors.text}}>My Status</Text>
          <Text style={{fontWeight: 'bold', color: colors.text}}>
            {route.params.status == false ? 'In Office' : 'Out of the Office'}
          </Text>
        </View>
        <II name="chevron-forward" color={colors.text} size={20} />
      </TouchableOpacity> */}
    </View>
  );
};

export default Profile;
