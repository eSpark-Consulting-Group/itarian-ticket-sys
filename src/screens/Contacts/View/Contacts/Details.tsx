import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

import {GapView, SingleLineField} from '../../../../components';
import {WINDOW_HEIGHT} from '../../../../constants';

const dataSource: Item[] = [
  {
    title: 'Configurations',
  },
  {
    title: 'Open Tickets',
  },
];

interface Item {
  title: string;
}

export default function Details() {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return <SingleLineField title={item.title} gap={false} fieldPadding={24} />;
  };

  return (
    <View>
      <GapView />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        ItemSeparatorComponent={() => (
          <Divider style={{backgroundColor: colors.background, height: 1.5}} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
