import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {Theme} from '../../theme/colors';
import styles from './styles';

const EmptyListMsg = ({label}: {label: string}): JSX.Element => {
  const {colors, dark}: Theme = useTheme();
  return (
    <View style={styles.emptyListContainer}>
      <MCI name="selection-search" color={'#8585858a'} size={100} />
      <Text style={{color: colors.text, ...styles.emptyListLabel}}>
        No {label} Found
      </Text>
      <View style={styles.emptyListAdjuster} />
    </View>
  );
};

export default EmptyListMsg;
