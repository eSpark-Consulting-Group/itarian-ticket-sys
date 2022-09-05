import React from 'react';
import {View, Text} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import {State, useState as hookState} from '@hookstate/core';

import {AvatarContainer, SingleLineField} from '../../components';
import styles from './style';
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
    </View>
  );
};

export default Profile;
