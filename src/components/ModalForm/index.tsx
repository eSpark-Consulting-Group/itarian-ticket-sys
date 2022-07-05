import {View, Text, TouchableOpacity, ViewProps, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Switch, TextInput} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import II from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../theme/colors';
import {State, useState as hookState} from '@hookstate/core';
import {globalState} from '../../utils/globalState';

const ModalForm = ({fieldsArray}: any) => {
  const {colors}: Theme = useTheme();
  const switchValue: State<boolean> = hookState(globalState.statusSwitch);

  const onToggleSwitch = () => {
    switchValue.set(!switchValue.get());
  };

  const ParallelContainer = (props: ViewProps) => {
    return <View {...props}>{props.children}</View>;
  };

  const checkType = (type: any, visible: any) => {
    let containerStyle = {};
    const getInline = () => {
      containerStyle = styles.inllineDisplay;
    };
    const getBlock = () => {
      containerStyle = styles.blockDisplay;
    };
    const getMultiline = () => {
      containerStyle = styles.multilineDisplay;
    };

    switch (type) {
      case 'inline':
        visible && getInline();
        break;
      case 'inline-icon':
        visible && getInline();
        break;
      case 'inline-switch':
        getInline();
        break;
      case 'block':
        visible && getBlock();
        break;
      case 'iconBlock':
        visible && getBlock();
        break;
      case 'multiline':
        visible && getMultiline();
        break;

      default:
        break;
    }
    return containerStyle;
  };

  const checkContentType = (type: any, data: any, visible: any) => {
    let contentType;

    const getInlineContent = () => {
      contentType = (
        <>
          <Text style={{color: colors.text}}>{data.content_1}</Text>
          <Text
            style={{color: colors.text, fontWeight: 'bold', marginRight: 20}}>
            {data.content_2}
          </Text>
        </>
      );
    };

    const getIconInlineContent = () => {
      contentType = (
        <>
          <Text style={{color: colors.text}}>{data.content_1}</Text>
          <TouchableOpacity
            style={{
              borderRadius: 1000,
              borderWidth: 1,
              width: moderateScale(40, 0),
              height: moderateScale(40, 0),
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MCI name="table-large-plus" size={moderateScale(20, 0)} />
          </TouchableOpacity>
        </>
      );
    };

    const getInlineSwitchContent = () => {
      contentType = (
        <>
          <Text style={{color: colors.text, fontWeight: 'bold'}}>
            {data.content_1}
          </Text>
          <Switch
            value={switchValue.get()}
            style={{marginRight: 5}}
            color={colors.primary}
            thumbColor={colors.primary}
            onValueChange={onToggleSwitch}
            trackColor={{true: '#5b57578f', false: '#5b57578f'}}
          />
        </>
      );
    };

    const getBlockContent = () => {
      contentType = (
        <TouchableOpacity>
          <Text style={{color: colors.text}}>{data.content_1}</Text>
          <Text style={{color: colors.text, fontWeight: 'bold'}}>
            {data.content_2}
          </Text>
        </TouchableOpacity>
      );
    };

    const getBlockIconContent = () => {
      contentType = (
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <II name={data.icon} size={15} />
            <Text
              style={{color: colors.text, fontWeight: 'bold', marginLeft: 10}}>
              {data.content_1}
            </Text>
          </View>
          {data.content_2 && (
            <Text style={{color: colors.text, marginLeft: 25}}>
              {data.content_2}
            </Text>
          )}
        </>
      );
    };

    const getMultilineContent = () => {
      contentType = (
        <>
          <Text>{data.content_1}</Text>
          <TextInput
            mode="outlined"
            multiline
            style={{flex: 0.9}}
            theme={{colors: {primary: colors.primary}}}
          />
        </>
      );
    };

    switch (type) {
      case 'inline':
        visible && getInlineContent();
        break;
      case 'inline-icon':
        visible && getIconInlineContent();
        break;
      case 'inline-switch':
        getInlineSwitchContent();
        break;
      case 'block':
        visible && getBlockContent();
        break;
      case 'iconBlock':
        visible && getBlockIconContent();
        break;
      case 'multiline':
        visible && getMultilineContent();
        break;

      default:
        break;
    }

    return contentType;
  };

  return (
    <FlatList
      data={fieldsArray}
      renderItem={({item}) => {
        return (
          <ParallelContainer style={checkType(item.type, item.visible)}>
            {checkContentType(item.type, item.data, item.visible)}
          </ParallelContainer>
        );
      }}
    />
  );
};

export default ModalForm;
