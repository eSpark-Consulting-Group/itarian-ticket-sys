import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../theme/colors';

const CstmMultiLine = ({title}: {title?: string}) => {
  const {colors, dark}: Theme = useTheme();

  return (
    <View style={styles.container}>
      {title && (
        <Text
          style={{
            color: colors.text,
            ...styles.labelStyle,
          }}>
          {title}
        </Text>
      )}
      <TextInput
        multiline
        // value={inputVal.get()}
        style={{
          color: colors.text,
          backgroundColor: colors.background,
          ...styles.multilineDisplay,
          borderColor: dark ? '#ffffff80' : '#00000080',
        }}
        returnKeyType="send"
        autoCorrect={false}
        // onChangeText={txt => inputVal.set(txt)}
      />
    </View>
  );
};

export default CstmMultiLine;
