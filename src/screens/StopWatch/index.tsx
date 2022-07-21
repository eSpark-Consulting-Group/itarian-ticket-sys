import React, {useState, useEffect, useReducer} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import AD from 'react-native-vector-icons/AntDesign';
import FD from 'react-native-vector-icons/Foundation';
import FT from 'react-native-vector-icons/Fontisto';
import Ions from 'react-native-vector-icons/Ionicons';
import {State, useState as useHookState} from '@hookstate/core';

import styles from './style';
import {Theme} from '../../theme/colors';
import {Stopwatch, stopWatchList} from '../../constants/SampleArrays';
import {EmptyListMsg} from '../../components';
import {globalState} from '../../utils/globalState';
import {useUpdateEffect} from '../../utils/hooks';

const StopWatchScreen = () => {
  const {colors, dark}: Theme = useTheme();

  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  const stopWatchDataList: State<any> = useHookState(globalState.stopwatch);
  const solidColor = dark ? '#000000' : '#ffffff';

  useEffect(() => {
    stopWatchDataList.set(stopWatchList);
  }, []);

  const renderList = ({item, index}: {item: Stopwatch; index: number}) => {
    const handlePlayPause = (value: boolean | undefined, index: number) => {
      // console.log('qqwww', value, index);

      if (value === true) {
        const temp = JSON.parse(JSON.stringify(stopWatchDataList.get()));
        temp[index].isPlaying = false;
        stopWatchDataList.set(temp);
        forceUpdate();
      } else if (value === false) {
        const temp = JSON.parse(JSON.stringify(stopWatchDataList.get()));
        temp[index].isPlaying = true;
        stopWatchDataList.set(temp);
        forceUpdate();
      }
    };

    const handleDelete = (index: number) => {
      const temp = JSON.parse(JSON.stringify(stopWatchDataList.get()));
      temp.splice(index, 1);
      console.log('xxxxx', temp);
      stopWatchDataList.set(temp);
      forceUpdate();
    };

    return (
      <View style={{...styles.listContainer, backgroundColor: solidColor}}>
        <View>
          <View
            style={{
              ...styles.listInner,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: colors.primary,
                  ...styles.priorityContainer,
                }}>
                <Ions name="pricetag" color={'#ffffff'} size={18} />
              </View>
              <View
                style={{
                  ...styles.listItemContainer,
                }}>
                <View
                  style={{
                    ...styles.horizontalItemStyles,
                  }}>
                  <Text style={{...styles.title, color: colors.text}}>
                    Ticket #{item.ticket_no}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.title, color: colors.text}}>
                    {item.ticket_summary}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    ...styles.horizontalItemStyles,
                  }}>
                  <View
                    style={{
                      ...styles.horizontalItemStyles,
                      flex: 0.35,
                      padding: 8,
                    }}>
                    <TouchableOpacity
                      style={{paddingHorizontal: 8}}
                      onPress={() => handleDelete(index)}>
                      <FD name="trash" size={20} color={colors.primary} />
                    </TouchableOpacity>
                    <View style={{width: 8}} />
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 8,
                      }}
                      onPress={() => handlePlayPause(item.isPlaying, index)}>
                      <FD
                        name={item.isPlaying ? 'pause' : 'play'}
                        size={22}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        ...styles.horizontalItemStyles,
                        justifyContent: 'flex-end',
                      }}>
                      <FT
                        name="stopwatch"
                        size={18}
                        color={colors.primary}
                        style={{alignSelf: 'center', marginRight: 5}}
                      />
                      <Text
                        style={{
                          color: colors.primary,
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}>
                        {item.timer}
                      </Text>
                    </View>
                    <TouchableOpacity disabled={item.isPlaying}>
                      <Text
                        style={{
                          color: colors.primary,
                          textAlign: 'right',
                        }}>
                        {item.isPlaying
                          ? item.created_at
                          : 'Create a Time Entry'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                ...styles.horizontalItemStyles,
              }}>
              <View></View>
            </View>
          </View>
        </View>
        {index !== stopWatchDataList.get()?.length - 1 && (
          <Divider
            style={{backgroundColor: colors.text, ...styles.dividerStyle}}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      {stopWatchDataList.get()?.length !== 0 ? (
        <FlatList data={stopWatchDataList.get()} renderItem={renderList} />
      ) : (
        <NotFound />
      )}
    </View>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Timers" />
    </View>
  );
};

export default StopWatchScreen;
