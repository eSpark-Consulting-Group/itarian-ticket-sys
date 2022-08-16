import {View, Text, TextInput} from 'react-native';
import React from 'react';
import GapView from '../GapView';
import {Theme, useTheme} from '@react-navigation/native';
import styles from './style';
import ModalView from '../ModalView';

const CstmTitleInput = ({
  title,
  value,
  onChangeText,
  width,
}: {
  title: string;
  value?: string;
  onChangeText?: (text: string) => void;
  width?: string;
}) => {
  const {colors, dark}: Theme = useTheme();

  return (
    <View style={{width: width}}>
      <GapView mode="vertical" />
      <Text>{title}</Text>
      <GapView mode="vertical" />
      <TextInput
        value={value}
        style={{
          ...styles.input,
          width: '100%',
          color: colors.text,
          borderColor: colors.text + '73',
        }}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        selectionColor={colors.primary}
      />
    </View>
  );
};

export default CstmTitleInput;
