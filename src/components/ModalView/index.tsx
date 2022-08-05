import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Theme} from '../../theme/colors';

const ModalView = ({children}: {children?: ReactNode}) => {
  const {colors, dark}: Theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: colors.background,
      }}>
      {children}
    </View>
  );
};

export default ModalView;
