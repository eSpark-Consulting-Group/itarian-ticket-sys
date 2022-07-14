import {View, Text, TouchableOpacity, ViewProps, FlatList} from 'react-native';
import React, {Children, ReactChildren, useEffect, useState} from 'react';
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
  children?: ReactChildren;
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

  const openDatePicker = () => {
    console.log('Pressed Date');
    setShowDate(true);
  };

  const closeDatePicker = (event: any, date: any) => {
    console.log('Pressed Date', event, date.toString());
    setCurrDate(date);
    setShowDate(false);
  };

  const openTimePicker = () => {
    console.log('Pressed Date');
    setShowTime(true);
  };

  const onToggleSwitch = () => {
    switchValue.set(!switchValue.get());
  };

  const ParallelContainer = (props: ViewProps) => {
    return <View {...props}>{props.children}</View>;
  };

  const checkType = (type: any, data: any) => {
    let containerStyle = {};
    const getInline = () => {
      containerStyle = styles.inllineDisplay;
    };

    const getMultiline = () => {
      containerStyle = styles.multilineDisplay;
    };

    switch (type) {
      case 'inlined':
        data.visible != undefined ? data.visible && getInline() : getInline();
        break;

      case 'multiline':
        data.visible != undefined
          ? data.visible && getMultiline()
          : getMultiline();
        break;

      default:
        break;
    }
    return containerStyle;
  };

  const checkContentType = (type: any, data: any) => {
    let contentType;

    const renderFormItem = () => {
      contentType = (
        <>
          {showTime && (
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
          )}
          <TouchableOpacity
            disabled={!data.pressEnable}
            onPress={
              data.navigateTo
                ? () => navigation.navigate(data.navigateTo)
                : data.select_Date != undefined
                ? openDatePicker
                : data.onPress
            }>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {data.iconLeft && (
                <II name={data.iconLeft} color={colors.text} size={15} />
              )}
              {data.headingLeft && (
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: 'bold',
                    marginLeft: data.iconLeft ? 10 : 0,
                  }}>
                  {data.headingLeft}
                </Text>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {data.subIconLeft && (
                <II name={data.subIconLeft} color={colors.text} size={15} />
              )}
              {data.subHeadingLeft && (
                <Text
                  style={{
                    color: colors.text,
                    marginLeft: data.iconLeft ? 25 : data.subIconLeft ? 5 : 0,
                  }}>
                  {data.subHeadingLeft}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!data.pressEnableRight}
            onPress={data.onPressRight}>
            {data.headingRight && (
              <Text style={{color: colors.text, fontWeight: 'bold'}}>
                {data.headingRight}
              </Text>
            )}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {data.subIconRight && (
                <II name={data.subIconRight} color={colors.text} size={15} />
              )}
              {data.subHeadingRight && (
                <Text
                  style={{
                    color: colors.text,
                    marginLeft: data.subIconRight ? 5 : 0,
                  }}>
                  {data.subHeadingRight}
                </Text>
              )}
            </View>
            {data.switchRight && (
              <Switch
                value={switchValue.get()}
                style={{marginRight: 5}}
                color={colors.primary}
                thumbColor={colors.primary}
                onValueChange={onToggleSwitch}
                trackColor={{true: '#5b57578f', false: '#5b57578f'}}
              />
            )}
            {data.checkBoxRight && (
              <View>
                <Checkbox
                  status={
                    goneToValue.get() == data.headingLeft
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => goneToValue.set(data.headingLeft)}
                />
              </View>
            )}
            {data.iconRight && (
              <TouchableOpacity style={styles.inlineIconBtn}>
                <II
                  name={data.iconRight}
                  color={colors.text}
                  size={moderateScale(20, 0)}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </>
      );
    };

    const getMultilineContent = () => {
      contentType = (
        <>
          <Text style={{marginTop: 5, color: colors.text}}>
            {data.headingLeft}
          </Text>
          <TextInput
            mode="outlined"
            multiline
            value={inputVal.get()}
            style={{flex: 0.9, backgroundColor: colors.background}}
            theme={{colors: {primary: colors.primary}}}
            onChangeText={txt => inputVal.set(txt)}
          />
        </>
      );
    };

    switch (type) {
      case 'inlined':
        data.visible != undefined
          ? data.visible && renderFormItem()
          : renderFormItem();
        break;
      case 'multiline':
        data.visible != undefined
          ? data.visible && getMultilineContent()
          : getMultilineContent();
        break;

      default:
        break;
    }

    return contentType;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: dark ? '#0000008a' : '#ffffff8a',
      }}>
      {children}
      {/* <FlatList
        data={fieldsData}
        style={{backgroundColor: colors.background}}
        renderItem={({item, index}) => {
          return (
            <ParallelContainer
              style={{
                ...checkType(item.type, item.data),
                backgroundColor: dark ? '#0000008a' : '#ffffff8a',
              }}>
              {checkContentType(item.type, item.data)}
            </ParallelContainer>
          );
        }}
      /> */}
    </View>
  );
};

export default ModalForm;
