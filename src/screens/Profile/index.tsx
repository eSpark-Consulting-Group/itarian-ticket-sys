import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';
import {AvatarContainer} from '../../components';
import {moderateScale} from 'react-native-size-matters';
import {NativeStackHeaderProps} from '@react-navigation/native-stack/lib/typescript/src/types';

const Profile = ({navigation}: NativeStackHeaderProps) => {
  const {colors}: Theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.infoHolder}>
        <AvatarContainer source={require('../../assets/images/avatar.png')} />
        <Text style={{fontWeight: 'bold', color: colors.text}}>
          Johnny Bravo
        </Text>
        <Text style={{color: colors.text}}>education_c</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Forms')}
        style={styles.statusButton}>
        <Text style={{color: colors.text}}>My Status</Text>
        <Text style={{fontWeight: 'bold', color: colors.text}}>In Office</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
