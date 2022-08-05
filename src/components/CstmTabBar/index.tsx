import _ from 'lodash';
import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import {WINDOW_WIDTH} from '../../constants';

type Item = {key: string; title: string};

export default function CstmTabBar(props: any) {
  const {routes} = props.navigationState;
  console.log('kia ha props', routes);

  const renderList = (item: Item, index: number) => {
    return (
      <View key={item?.key}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'teal',
        width: WINDOW_WIDTH,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      {!_.isUndefined(routes) && routes?.map(renderList)}
    </View>
  );
}

const styles = StyleSheet.create({});
