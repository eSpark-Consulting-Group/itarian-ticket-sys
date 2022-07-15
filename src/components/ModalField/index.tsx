import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Theme} from '../../theme/colors';
import ModalForm from '../ModalForm';
import {Checkbox, Switch, TextInput} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import styles from './style';

const Stack = createNativeStackNavigator();

const ModalField = ({
  mode,
  headingRight,
  subHeadingRight,
  headingLeft,
  subHeadingLeft,
  iconRight,
  switchRight,
  switch_val,
  iconLeft,
  pressEnableLeft,
  onPressLeft,
  pressEnableRight,
  onPressRight,
  subIconLeft,
  subIconRight,
  checkBoxRight,
  onToggleSwitch,
  checkBox_Val,
  onCheckPress,
  navigateTo,
  visible,
  input_Val,
  select_Date,
  select_Time,
}: {
  mode: 'inlined' | 'multiline';
  headingRight?: string;
  subHeadingRight?: string;
  headingLeft?: string;
  subHeadingLeft?: string;
  iconRight?: string;
  switchRight?: boolean;
  switch_val?: boolean;
  onToggleSwitch?: () => void;
  iconLeft?: string;
  pressEnableLeft?: boolean;
  onPressLeft?: () => void;
  pressEnableRight?: boolean;
  onPressRight?: () => void;
  subIconLeft?: string;
  subIconRight?: string;
  checkBoxRight?: boolean;
  checkBox_Val?: 'checked' | 'unchecked';
  onCheckPress?: () => void;
  navigateTo?: string;
  visible?: boolean;
  input_Val?: string;
  select_Date?: boolean;
  select_Time?: boolean;
}) => {
  const {colors}: Theme = useTheme();

  return (
    <>
      {mode == 'inlined' && (
        <View style={styles.inllineDisplay}>
          <TouchableOpacity disabled={!pressEnableLeft} onPress={onPressLeft}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {iconLeft && <II name={iconLeft} color={colors.text} size={15} />}
              {headingLeft && (
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: 'bold',
                    marginLeft: iconLeft ? 10 : 0,
                  }}>
                  {headingLeft}
                </Text>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {subIconLeft && (
                <II name={subIconLeft} color={colors.text} size={15} />
              )}
              {subHeadingLeft && (
                <Text
                  style={{
                    color: colors.text,
                    marginLeft: iconLeft ? 25 : subIconLeft ? 5 : 0,
                  }}>
                  {subHeadingLeft}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity disabled={!pressEnableRight} onPress={onPressRight}>
            {headingRight && (
              <Text style={{color: colors.text, fontWeight: 'bold'}}>
                {headingRight}
              </Text>
            )}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {subIconRight && (
                <II name={subIconRight} color={colors.text} size={15} />
              )}
              {subHeadingRight && (
                <Text
                  style={{
                    color: colors.text,
                    marginLeft: subIconRight ? 5 : 0,
                  }}>
                  {subHeadingRight}
                </Text>
              )}
            </View>
            {switchRight && (
              <Switch
                value={switch_val}
                // style={{marginRight: 5}}
                // color={colors.primary}
                // thumbColor={colors.primary}
                onValueChange={onToggleSwitch}
                trackColor={{true: '#5b57578f', false: '#5b57578f'}}
              />
            )}
            {checkBoxRight && (
              <View>
                <Checkbox
                  status={checkBox_Val ? checkBox_Val : 'unchecked'}
                  onPress={onCheckPress}
                />
              </View>
            )}
            {iconRight && (
              <TouchableOpacity style={styles.inlineIconBtn}>
                <II
                  name={iconRight}
                  color={colors.text}
                  size={moderateScale(20, 0)}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      )}
      {mode == 'multiline' && (
        <View style={styles.multilineDisplay}>
          <Text style={{marginTop: 5, color: colors.text}}>{headingLeft}</Text>
          <TextInput
            mode="outlined"
            multiline
            // value={inputVal.get()}
            style={{flex: 0.9, backgroundColor: colors.background}}
            theme={{colors: {primary: colors.primary}}}
            // onChangeText={txt => inputVal.set(txt)}
          />
        </View>
      )}
    </>
  );
};

export default ModalField;
