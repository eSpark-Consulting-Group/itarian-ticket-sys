import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Fthr from 'react-native-vector-icons/Feather';
import FD from 'react-native-vector-icons/Foundation';

import styles from './style';
import {ticketsList} from '../../constants/SampleArrays';
import {Ticket} from '../../types';
import {EmptyListMsg, FloatButton} from '../../components';
import {CstmPressable} from '../../components/CstmPressable';

const ServiceBoard = ({navigation}: any) => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: Ticket; index: number}) => {
    const renderColor = () => {
      switch (item.priority) {
        case 'DNR':
          return 'purple';
        case 'P1':
          return 'red';
        case 'P2':
          return 'darkorange';
        case 'P3':
          return 'gold';
      }
    };

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
          onPress={() => {
            navigation.navigate('Stack1', {
              screen: 'STickets',
              params: {title: item.ticket_no?.toString()},
            });
          }}>
          <View
            style={{
              ...styles.listInner,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: renderColor(),
                  ...styles.priorityContainer,
                }}
              />
              <View
                style={{
                  ...styles.listItemContainer,
                }}>
                <View
                  style={{
                    ...styles.horizontalItemStyles,
                  }}>
                  <Text style={{...styles.title, color: colors.text}}>
                    Ticket {item.ticket_no}
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
                    {item.summary}
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
                    {item.company_name}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.horizontalItemStyles,
                  }}>
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
                      {item.status}
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
      <FloatButton
        icon="tag-plus-outline"
        onPress={() => navigation.navigate('Stack1', {screen: 'NewTicket'})}
      />
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

export default ServiceBoard;
