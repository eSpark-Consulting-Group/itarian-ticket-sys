import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Divider } from 'react-native-paper';

import {
  CstmPressable,
  GapView,
  SingleLineField,
  TicketComponent,
} from '../../components';
import { useHookstate } from '@hookstate/core';
import { ticketStore } from '../../stores/ticketStore';
import moment from 'moment';
// @ts-ignore
import HTMLView from 'react-native-htmlview';

type Item = {
  title: string;
  onPress?: () => void;
};

const Threads = () => {
  const { colors, dark }: Theme = useTheme();
  const route: any = useRoute();
  const ticketThreads: any = useHookstate(ticketStore?.ticketThreads).get();

  const ticketDetails = route?.params?.ticket_info?.data;

  const renderList = ({ item, index }: { item: any; index: number }) => {
    return (
      <View
        key={index}
        style={{
          borderBottomWidth: 0.2,
          padding: 5,
          borderBottomColor: colors.background,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                width: 20,
                height: 20,
                borderRadius: 20,
              }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>
                {item?.attributes?.user?.user_name
                  ?.substring(0, 1)
                  .toUpperCase()}
              </Text>
            </View>
            <GapView mode="horizontal" length={5} />
            <Text style={{ color: colors.text, fontSize: 12 }}>
              {item?.attributes?.user?.user_name}
            </Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 5,
                backgroundColor: 'grey',
                alignSelf: 'center',
                margin: 4,
                marginTop: 8,
              }}
            />
            <Text style={{ color: colors.text, fontSize: 12 }}>
              {moment(item?.attributes?.created_at).fromNow()}
            </Text>
          </View>
          <View>
            <CstmPressable
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              android_ripple={{ borderless: true }}
              onPress={() => {}}></CstmPressable>
          </View>
        </View>
        <GapView />
        <Text
          style={{
            color: colors.text,
            fontSize: 17,
            fontWeight: 'bold',
            // borderBottomWidth: .2
          }}>
          {item?.attributes?.title}
        </Text>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <HTMLView
            value={`<div>${item?.attributes?.body}</div>`}
            stylesheet={StyleSheet.create({
              div: {
                color: colors.text, // make links coloured pink
              },
            })}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <TicketComponent item2={ticketDetails} ind={1} onPress={() => {}} />
      <GapView />
      <FlatList
        data={ticketThreads ?? []}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 5, paddingBottom: 120 }}
        renderItem={renderList}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 8 }}
        ItemSeparatorComponent={() => (
          <Divider
            style={{
              backgroundColor: colors.text,
              height: 1.5,
              opacity: 0.2,
              // transform: [{ scale: 2 }],
            }}
          />
        )}
      />
    </View>
  );
};
export default Threads;
