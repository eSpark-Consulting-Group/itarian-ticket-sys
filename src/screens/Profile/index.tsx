import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';
import {AvatarContainer} from '../../components';
import {moderateScale} from 'react-native-size-matters';

const Profile = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <AvatarContainer source={require('../../assets/Images/avatar.png')} />
      <Text style={{fontWeight: 'bold', color: colors.text}}>Johnny Bravo</Text>
    </View>
  );
};

export default Profile;
