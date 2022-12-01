import React, {useRef, useState, useEffect} from 'react';
import {View, Keyboard, ScrollView, Text, FlatList} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import {CstmPressable, FloatButton, GapView, Loader} from '../../components';
import {SCREEN_WIDTH} from '../../constants';

const posts = [
  {
    user: 'Faraz',
    title: 'Post #1',
    subTitle:
      'Proident esse ut exercitation consectetur nulla reprehenderit quis culpa nostrud.',
    status: 'Open',
  },
  {
    user: 'Wirad',
    title: 'Post #1',
    subTitle:
      'Proident elit ad id labore eiusmod labore exercitation sit do irure esse occaecat.',
    status: 'In Progress',
  },
  {
    user: 'Mudassir',
    title: 'Post #1',
    subTitle: 'Est reprehenderit elit quis qui duis incididunt consequat.',
    status: 'Completed',
  },
];

const SendFeedbackScreen = () => {
  const {dark, colors} = useTheme();
  const navigation: any = useNavigation();

  const renderList = (item: any, index: number) => {
    return (
      <CstmPressable
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          padding: 20,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: colors.primary,
          elevation: 2,
          backgroundColor: colors.background,
        }}>
        <View style={{flex: 0.2}}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: colors.primary,
            }}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: colors.primary}}>
              {item.user.substring(0, 1)}
            </Text>
          </View>
        </View>
        <View style={{flex: 0.6}}>
          <Text style={{color: colors.text}} numberOfLines={2}>
            {item.subTitle}
          </Text>
          <Text style={{color: colors.text, fontWeight: 'bold'}}>
            Status: {item.status}
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 6,
              paddingHorizontal: 4,
              borderColor: colors.primary,
              elevation: 1,
              backgroundColor: colors.background,
            }}>
            <MCI
              name="arrow-up-thick"
              color={colors.text}
              style={{alignSelf: 'center', margin: 2}}
            />
            <Text style={{textAlignVertical: 'center', color: colors.text}}>
              99
            </Text>
          </View>
          <GapView mode="horizontal" />
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              paddingHorizontal: 4,
              borderRadius: 6,
              borderColor: colors.primary,
              elevation: 1,
              backgroundColor: colors.background,
            }}>
            <MCI
              name="chat"
              color={colors.text}
              style={{alignSelf: 'center', margin: 2}}
            />
            <Text style={{textAlignVertical: 'center', color: colors.text}}>
              99
            </Text>
          </View>
        </View>
      </CstmPressable>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 15, paddingTop: 15}}>
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderList(item, index)}
      />
      <FloatButton
        onPress={() => navigation.navigate('Stack1', {screen: 'CreatePost'})}
      />
    </View>
  );
};

export default SendFeedbackScreen;
