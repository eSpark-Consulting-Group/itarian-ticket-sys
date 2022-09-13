import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {Theme, useTheme} from '@react-navigation/native';

import styles from './style';

const CstmButton = ({
  title,
  loader,
  onPress,
}: {
  title: string;
  loader: boolean;
  onPress: () => void;
}) => {
  const {colors}: Theme = useTheme();
  return (
    <View>
      <View style={styles.container}>
        {/* <---- Adjuster from Left ---> */}
        <View style={styles.adjuster} />

        {/* <---- Center ---> */}
        <TouchableOpacity
          disabled={loader}
          onPress={onPress}
          style={{...styles.button, backgroundColor: colors.primary}}>
          {loader ? (
            <ActivityIndicator color={'#fff'} size={'large'} />
          ) : (
            <Text style={styles.text}>{title}</Text>
          )}
        </TouchableOpacity>

        {/* <---- Adjuster from Right ---> */}
        <View style={styles.adjuster} />
      </View>
    </View>
  );
};

CstmButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CstmButton;
