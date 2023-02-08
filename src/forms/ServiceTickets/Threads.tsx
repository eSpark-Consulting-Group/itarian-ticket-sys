import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme, Theme } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import { useHookstate } from '@hookstate/core';
import moment from 'moment';
// @ts-ignore
import HTMLView from 'react-native-htmlview';

import { CstmPressable, GapView } from '../../components';
import { ticketStore } from '../../stores/ticketStore';

const Threads = () => {
  const { colors, dark }: Theme = useTheme();
  const ticketThreads: any = useHookstate(ticketStore?.ticketThreads).get();

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
      <FlatList
        data={ticketThreads ?? []}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
        renderItem={renderList}
        ItemSeparatorComponent={() => (
          <Divider
            style={{
              backgroundColor: colors.text,
              height: 1.5,
              opacity: 0.2,
            }}
          />
        )}
      />
    </View>
  );
};
export default Threads;
