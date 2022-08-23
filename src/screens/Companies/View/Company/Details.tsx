import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {GapView, SingleLineField} from '../../../../components';
import {Divider} from 'react-native-paper';
import {WINDOW_HEIGHT} from '../../../../constants';

const dataSource: Item[] = [
  {
    title: 'Attachments',
  },
  {
    title: 'Contacts',
  },
  {
    title: 'Configurations',
  },
  {
    title: 'Open Tickets',
  },
  {
    title: 'Sites',
  },
];

type Item = {
  title: string;
};

const Details = () => {
  const {colors}: Theme = useTheme();

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return <SingleLineField title={item.title} gap={false} />;
  };

  return (
    <View style={styles.container}>
      <GapView />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        ListFooterComponentStyle={{height: 60}}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <Divider style={{backgroundColor: colors.background, height: 1.5}} />
        )}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
