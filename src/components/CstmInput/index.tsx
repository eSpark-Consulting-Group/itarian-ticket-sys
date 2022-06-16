import {Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import PropTypes from 'prop-types';

import styles from './style';

const CstmInput = ({
  title,
  placeholder,
}: {
  title: string;
  placeholder: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.adjuster} />
      <View style={styles.center}>
        <Text style={{fontWeight: '700'}}>{title}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          activeUnderlineColor="#bbb"
          placeholderTextColor={'#aaa'}
          dense
        />
      </View>
      <View style={styles.adjuster} />
    </View>
  );
};

CstmInput.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CstmInput;
