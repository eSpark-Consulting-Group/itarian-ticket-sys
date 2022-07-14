import React from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';

import FA from 'react-native-vector-icons/FontAwesome';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Fthr from 'react-native-vector-icons/Feather';
import MI from 'react-native-vector-icons/MaterialIcons';
import FD from 'react-native-vector-icons/Foundation';

import styles from './style';
import {Theme} from '../../theme/colors';
import {
  Tickets as TicketsType,
  ticketsList,
} from '../../constants/SampleArrays';
import {EmptyListMsg} from '../../components';

const ServiceBoard = () => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: TicketsType; index: number}) => {
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
        <Pressable
          onPress={() => console.log('Hello')}
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View
            style={{
              padding: moderateScale(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: renderColor(),
                  width: 20,
                  height: 20,
                  borderWidth: 1,
                }}
              />
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{...styles.title, color: colors.text}}>
                    Ticket #{item.ticket_no}
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#000',
                      paddingHorizontal: 8,
                      justifyContent: 'center',
                      borderRadius: 50,
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
                        alignSelf: 'center',
                        paddingRight: 5,
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
                      alignSelf: 'center',
                      paddingRight: 5,
                    }}
                  />
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    {item.company}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <FD
                      name="wrench"
                      color={colors.text}
                      size={12}
                      style={{
                        alignSelf: 'center',
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
                        opacity: 1,
                        fontWeight: 'bold',
                      }}>
                      {renderPriorityText(item.priority)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
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

export default ServiceBoard;
