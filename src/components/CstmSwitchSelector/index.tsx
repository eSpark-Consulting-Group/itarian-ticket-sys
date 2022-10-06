import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import styles from './style';

const CstmSwitchSelector = ({
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
}: {
  selectionMode: number;
  roundCorner: boolean;
  option1: string;
  option2: string;
  onSelectSwitch: (val: number) => void;
  selectionColor: string;
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const {colors} = useTheme();

  const updatedSwitchData = (val: number) => {
    setSelectionMode(val);
    if (selectionMode !== val) {
      onSelectSwitch(val);
      console.log('val', val);
    }
  };

  return (
    <View>
      <View
        style={{
          borderRadius: roundCorner ? 5 : 0,
          borderColor: selectionColor,
          backgroundColor: colors.background,
          ...styles.container,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            backgroundColor:
              getSelectionMode == 1 ? selectionColor : colors.background,
            borderRadius: roundCorner ? 5 : 0,
            ...styles.option,
          }}>
          <Text
            style={{
              color: getSelectionMode == 1 ? 'white' : selectionColor,
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            backgroundColor:
              getSelectionMode == 2 ? selectionColor : colors.background,
            borderRadius: roundCorner ? 5 : 0,
            ...styles.option,
          }}>
          <Text
            style={{
              color: getSelectionMode == 2 ? 'white' : selectionColor,
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CstmSwitchSelector;
