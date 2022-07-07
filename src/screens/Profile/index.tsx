import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';
import {AvatarContainer} from '../../components';
import II from 'react-native-vector-icons/Ionicons';
import {NativeStackHeaderProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {State, useState as hookState} from '@hookstate/core';
import {globalState} from '../../utils/globalState';

const Profile = ({navigation}: NativeStackHeaderProps) => {
  const {colors, dark}: Theme = useTheme();
  const currStatus: State<boolean> = hookState(globalState.currentStatus);
  console.log('Current Status', currStatus.get());
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
        <AvatarContainer source={require('../../assets/images/avatar.png')} />
        <Text style={{fontWeight: 'bold', color: colors.text}}>
          Johnny Bravo
        </Text>
        <Text style={{color: colors.text}}>education_c</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Forms')}
        style={{
          ...styles.statusButton,
          backgroundColor: dark ? '#0000008a' : '#ffffff8a',
        }}>
        <View>
          <Text style={{color: colors.text}}>My Status</Text>
          <Text style={{fontWeight: 'bold', color: colors.text}}>
            {currStatus.get() == true ? 'In Office' : 'Out of the Office'}
          </Text>
        </View>
        <II name="chevron-forward" color={colors.text} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
