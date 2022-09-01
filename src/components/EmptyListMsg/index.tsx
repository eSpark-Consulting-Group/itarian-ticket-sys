import React from 'react';
import {View, Text} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import styles from './styles';

const EmptyListMsg = ({label, iconName="selection-search"}: {label: string, iconName?: string}): JSX.Element => {
  const {colors, dark}: Theme = useTheme();
  return (
    <View style={styles.emptyListContainer}>
      <MCI name={iconName} color={'#8585858a'} size={100} />
      <Text style={{color: colors.text, ...styles.emptyListLabel}}>
        No {label} Found
      </Text>
      <View style={styles.emptyListAdjuster} />
    </View>
  );
};

EmptyListMsg.propTypes = {
  label: PropTypes.string.isRequired,
};

export default EmptyListMsg;
