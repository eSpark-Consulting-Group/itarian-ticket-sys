import {View, Text, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';

import styles from './style';

const CstmButton = ({title, onPress}: {title: string; onPress: () => void}) => {
  return (
    <View style={styles.container}>
      {/* <---- Adjuster from Left ---> */}
      <View style={styles.adjuster} />

      {/* <---- Center ---> */}
      <TouchableOpacity onPress={onPress} style={styles.button}>
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
