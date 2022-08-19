import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Fthr from 'react-native-vector-icons/Feather';
import FD from 'react-native-vector-icons/Foundation';
import AD from 'react-native-vector-icons/AntDesign';

import styles from './style';
import {Theme} from '../../theme/colors';
import {ticketsList} from '../../constants/SampleArrays';
import {Ticket} from '../../types';
import {EmptyListMsg} from '../../components';
import { CstmPressable } from '../../components/CstmPressable/indes';

const ProjectBoard = () => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: Ticket; index: number}) => {
    const renderPriorityText = (value: string) => {
      switch (value) {
        case 'DNR':
          return 'Do not Respond';
        case 'P1':
          return 'Priority 1 - Critical';
        case 'P2':
          return 'Priority 2 - High';
        case 'P3':
          return 'Priority 3 - Medium';
      }
    };

    return (
      <View style={styles.listContainer}>
        <CstmPressable
          onPress={() => console.log('Hello')}
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View
            style={{
              ...styles.listInner,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: '#f6b40e',
                  ...styles.priorityContainer,
                }}>
                <AD name="areachart" color={'#ffffff'} size={18} />
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
                  <View
                    style={{
                      ...styles.ageContainer,
                    }}>
                    <Text style={{color: '#fff', fontSize: 12}}>
                      {item.age.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.title, color: colors.text}}>
                    {item.ticket_summary}
                  </Text>
                </View>
                {item.contact && (
                  <View style={{flexDirection: 'row'}}>
                    <Fthr
                      name="user"
                      color={colors.text}
                      size={12}
                      style={{
                        ...styles.iconStyle,
                      }}
                    />
                    <Text style={{...styles.subTitle, color: colors.text}}>
                      {item.contact}
                    </Text>
                  </View>
                )}
                <View style={{flexDirection: 'row'}}>
                  <MCI
                    name="office-building-marker-outline"
                    color={colors.text}
                    size={12}
                    style={{
                      ...styles.iconStyle,
                    }}
                  />
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    {item.company}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <FD
                    name="wrench"
                    color={colors.text}
                    size={12}
                    style={{
                      ...styles.iconStyle,
                      paddingRight: 8,
                    }}
                  />
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    {item.phase}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.horizontalItemStyles,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <AD
                      name="areachart"
                      color={colors.text}
                      size={12}
                      style={{
                        ...styles.iconStyle,
                        paddingRight: 5,
                      }}
                    />
                    <Text style={{...styles.subTitle, color: colors.text}}>
                      {item.project}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        ...styles.subTitle,
                        color: colors.text,
                        ...styles.highlight,
                      }}>
                      {renderPriorityText(item.priority)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </CstmPressable>
        {index !== ticketsList.length - 1 && (
          <Divider
            style={{backgroundColor: colors.text, ...styles.dividerStyle}}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {ticketsList.length !== 0 ? (
        <FlatList data={ticketsList} renderItem={renderList} />
      ) : (
        <NotFound />
      )}
    </View>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Opportunities" />
    </View>
  );
};

export default ProjectBoard;
