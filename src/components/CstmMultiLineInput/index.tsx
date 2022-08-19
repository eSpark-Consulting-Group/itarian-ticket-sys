import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../theme/colors';
import GapView from '../GapView';

const CstmMultiLine = ({
  title,
  value,
  width = '100%',
  onChangeText,
}: {
  title?: string;
  value?: string;
  width?: string | number;
  onChangeText?: (text: string) => void;
}) => {
  const {colors, dark}: Theme = useTheme();

  return (
    <View style={{width: width}}>
      {title && (
        <Text
          style={{
            color: colors.text,
            ...styles.labelStyle,
          }}>
          {title}
        </Text>
      )}
      <GapView mode="vertical" />
      <TextInput
        multiline
        value={value}
        style={{
          color: colors.text,
          width: '100%',
          borderColor: dark ? '#ffffff80' : '#00000080',
          ...styles.multilineDisplay,
        }}
        onChangeText={onChangeText}
        returnKeyType="send"
        autoCorrect={false}
        maxLength={100}
        // onChangeText={txt => inputVal.set(txt)}
      />
    </View>
  );
};

export default CstmMultiLine;
