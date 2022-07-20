import {View, Text, TouchableOpacity, ViewProps, FlatList} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Checkbox, Switch, TextInput} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import II from 'react-native-vector-icons/Ionicons';
import {State, useState as hookState} from '@hookstate/core';
// import DatePicker from 'react-native-modern-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Theme} from '../../theme/colors';
import {globalState} from '../../utils/globalState';
import styles from './style';

const ModalForm = ({
  fieldsArray,
  navigation,
  children,
}: {
  fieldsArray?: any;
  navigation?: any;
  children?: ReactNode;
}) => {
  const {colors, dark}: Theme = useTheme();
  const [fieldsData, setFieldsData] = useState(fieldsArray);
  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const switchValue: State<boolean> = hookState(globalState.statusSwitch);
  const oldGoneToValue: State<string> = hookState(globalState.prevGoneTo);
  const goneToValue: State<string> = hookState(globalState.currentGoneTo);
  const inputVal: State<string> = hookState(globalState.additionalInputVal);
  const oldDate: State<string> = hookState(globalState.oldStatusDate);

  useEffect(() => {
    let data = [...fieldsArray];
    if (data[0]?.formName == 'My Status') {
      myStatus(data);
    }
  }, [oldGoneToValue.get(), switchValue.get(), inputVal.get(), oldDate.get()]);

  const myStatus = (data: any) => {
    data.map((i: any) => {
      if (i.data.visible != undefined) {
        if (switchValue.get() == true) {
          i.data.visible = true;
          setFieldsData(data);
        } else if (switchValue.get() == false) {
          i.data.visible = false;
          setFieldsData(data);
        }
      }
      if (i.data.headingLeft == 'Gone To') {
        i.data.subHeadingLeft =
          oldGoneToValue.get() == '' ? 'Please Select' : oldGoneToValue.get();
        setFieldsData(data);
      }
      // if (i.data.headingLeft == 'Date Back' && showDate == true) {
      //   console.log('Date String', currDate.toDateString());
      //   i.data.subHeadingLeft = currDate.toDateString();
      // }
      console.log('i.select_Date showDate', i.data.select_Date, showDate);
    });
  };

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

export default ModalForm;
