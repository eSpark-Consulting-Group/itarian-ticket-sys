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
import {Checkbox, Switch} from 'react-native-paper';
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
  pressEnable,
  onPress,
  pressEnableRight,
  onPressRight,
  subIconLeft,
  subIconRight,
  checkBoxRight,
  checkBox_Val,
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
  iconLeft?: string;
  pressEnable?: boolean;
  onPress?: () => void;
  pressEnableRight?: boolean;
  onPressRight?: () => void;
  subIconLeft?: string;
  subIconRight?: string;
  checkBoxRight?: boolean;
  checkBox_Val?: string;
  navigateTo?: string;
  visible?: boolean;
  input_Val?: string;
  select_Date?: boolean;
  select_Time?: boolean;
}) => {
  const {colors}: Theme = useTheme();

  return (
    <View
      style={
        mode == 'inlined' ? styles.inllineDisplay : styles.multilineDisplay
      }>
      {/* {showTime && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          onChange={() => console.log('Time changed..!')}
        />
      )}
      {showDate && (
        <DateTimePicker
          mode="date"
          value={currDate}
          onChange={closeDatePicker}
        />
      )} */}
      <TouchableOpacity
        disabled={!pressEnable}
        onPress={
          // navigateTo
          //   ? () => navigation.navigate(navigateTo)
          //   : select_Date != undefined
          //   ? openDatePicker
          //   :
          onPress
        }>
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
            // value={switchValue.get()}
            // style={{marginRight: 5}}
            // color={colors.primary}
            // thumbColor={colors.primary}
            // onValueChange={onToggleSwitch}
            trackColor={{true: '#5b57578f', false: '#5b57578f'}}
          />
        )}
        {checkBoxRight && (
          <View>
            <Checkbox
              status="checked"
              // status={
              //   goneToValue.get() == headingLeft ? 'checked' : 'unchecked'
              // }
              // onPress={() => goneToValue.set(headingLeft)}
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
  );
};

export default ModalField;
