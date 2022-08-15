import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

import {GapView, SingleLineField} from '../../components';
import {WINDOW_HEIGHT} from '../../constants';

const dataSource: Item[] = [
  {
    title: 'Attachments',
  },
];

type Item = {
  title: string;
};

const Details = () => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return <SingleLineField title={item.title} gap={false} />;
  };

  return (
    <View>
      <GapView />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        style={{maxHeight: WINDOW_HEIGHT * 0.655}}
        ItemSeparatorComponent={() => (
          <Divider style={{backgroundColor: colors.background, height: 1.5}} />
        )}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
