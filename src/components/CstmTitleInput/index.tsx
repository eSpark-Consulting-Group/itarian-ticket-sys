import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import GapView from '../GapView';
import {Theme, useTheme} from '@react-navigation/native';
import styles from './style';
import ModalView from '../ModalView';

const CstmTitleInput = ({
  title,
  value,
  onChangeText,
  width = '100%',
}: {
  title?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  width?: string | number;
}) => {
  const {colors, dark}: Theme = useTheme();
  const [val, setVal] = useState();

  return (
    <View style={{width: width}}>
      {title && (
        <>
          <GapView mode="vertical" />
          <Text style={{color: colors.text, opacity: 0.8}}>{title}</Text>
        </>
      )}
      <GapView mode="vertical" />
      <TextInput
        value={val ?? value}
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
