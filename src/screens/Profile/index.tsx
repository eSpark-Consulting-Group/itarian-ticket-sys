import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {useTheme, Theme} from '@react-navigation/native';
import {AvatarContainer, SingleLineField} from '../../components';

import {State, useHookstate} from '@hookstate/core';
import Images from '../../assets/images';
import {userStore} from '../../stores/userStore';

const Profile = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const currStatus: State<boolean> = useHookstate(userStore.currentStatus);
  const user: State<any> = useHookstate(userStore.user);

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
