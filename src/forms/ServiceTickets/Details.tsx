import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

import {GapView, SingleLineField} from '../../components';

const dataSource: Item[] = [
  {
    title: 'Configurations',
  },
  {
    title: 'Products',
  },
  {
    title: 'Attachments',
  },
  {
    title: 'Tasks',
  },
  {
    title: 'Time Entries',
  },
  {
    title: 'Expenses',
  },
  {
    title: 'Open Tickets',
  },
  {
    title: 'My Schedule',
  },
];

type Item = {
  title: string;
};

const Details = () => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return <SingleLineField title={item.title} gap={false} fieldPadding={28} />;
  };

  return (
    <View>
      <GapView />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{height: 8}}
        ItemSeparatorComponent={() => (
          <Divider style={{backgroundColor: colors.background, height: 1.5}} />
        )}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
