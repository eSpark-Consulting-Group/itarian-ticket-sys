import React, {useReducer} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import _ from 'lodash';

import styles from './styles';
import {ModalField, ModalView} from '..';
import {WINDOW_WIDTH} from '../../constants';

type Item = {key: string; title: string};

export default function CstmTabBar(props: any) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const {dark, colors}: Theme = useTheme();
  const {routes, index: routeIndex} = props.navigationState;
  console.log('kia ha props', props.navigationState);

  const renderList = (item: Item, index: number) => {
    const highlight =
      index == routeIndex ? (dark ? '#000000' : '#FFFFFF') : 'transparent';
    const elevation = index == routeIndex ? 2 : 0;
    const pressColor = dark ? '#ffffff0e' : '#0000000e';

    const handleTabNavigation = (hitIndex: number) => {
      switch (hitIndex) {
        case 0:
          props.jumpTo('first');
          return;
        case 1:
          props.jumpTo('second');
          return;
        case 2:
          props.jumpTo('third');
          return;
      }
    };

    const handleWidth =
      routes?.length < 3 ? (WINDOW_WIDTH * 4) / 10 : (WINDOW_WIDTH * 3) / 10;

    return (
      <View
        key={item?.key}
        style={{
          flexDirection: 'row',
          backgroundColor: colors.background,
        }}>
        <Pressable
          onPress={() => {
            // LayoutAnimation.configureNext(
            //   LayoutAnimation.Presets.easeInEaseOut,
            // );
            handleTabNavigation(index);
            // forceUpdate();
          }}
          android_ripple={{color: pressColor}}>
          <View
            style={{
              width: handleWidth,
              ...styles.itemStyle,
              backgroundColor: highlight,
              elevation,
            }}>
            <Text style={{...styles.textStyle, color: colors.text}}>
              {item.title}
            </Text>
          </View>
        </Pressable>
        {index !== routes?.length - 1 && <View style={styles.dividerStyle} />}
      </View>
    );
  };

  return (
    <ModalField mode="none" pressEnable={false}>
      <View
        style={{
          ...styles.container,
          backgroundColor: dark ? colors.background : '#EEEEEE',
        }}>
        {!_.isUndefined(routes) && routes?.map(renderList)}
      </View>
    </ModalField>
  );
}
