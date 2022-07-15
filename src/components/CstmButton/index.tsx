import React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../theme/colors';

const CstmButton = ({title, onPress}: {title: string; onPress: () => void}) => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      {/* <---- Adjuster from Left ---> */}
      <View style={styles.adjuster} />

      {/* <---- Center ---> */}
      <TouchableOpacity
        onPress={onPress}
        style={{...styles.button, backgroundColor: colors.primary}}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>

      {/* <---- Adjuster from Right ---> */}
      <View style={styles.adjuster} />
    </View>
  );
};

CstmButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CstmButton;
