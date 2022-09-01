import React from 'react';
import {View} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';

import {ModalField, CstmMultiLine} from '..';

const MultiLineField = ({title}: {title?: string; subTitle?: string}) => {
  const {dark}: Theme = useTheme();
  return (
    <ModalField pressEnable={false}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
        }}>
        <CstmMultiLine title={title} />
      </View>
    </ModalField>
  );
};

export default MultiLineField;
