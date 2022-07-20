import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import PropTypes from 'prop-types';

import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';

const CstmInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  onBlur,
  onChange,
  keyType,
  textHidden,
}: {
  title: string;
  placeholder: string;
  value?: string;
  onChangeText?: (field: string) => void;
  onBlur?: () => void | undefined;
  onChange?: () => void | undefined;
  keyType?: KeyboardTypeOptions | undefined;
  textHidden?: boolean;
}) => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.adjuster} />
      <View style={styles.center}>
        <Text style={{fontWeight: '700', color: colors.text}}>{title}</Text>
        <TextInput
          value={value}
          style={{
            ...styles.input,
          }}
          theme={{colors: {text: colors.text}}}
          placeholder={placeholder}
          activeUnderlineColor={'#bbb'}
          placeholderTextColor={'#aaa'}
          secureTextEntry={textHidden}
          underlineColor={colors.text}
          underlineColorAndroid={'#F00'}
          keyboardType={keyType}
          dense
          onChangeText={onChangeText}
          onBlur={onBlur}
          onChange={onChange}
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
