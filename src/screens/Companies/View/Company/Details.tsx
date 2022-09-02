import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useTheme, Theme, useNavigation} from '@react-navigation/native';

import {GapView, SingleLineField} from '../../../../components';
import {Divider} from 'react-native-paper';



interface Item {
  title: string;
  onPress?: () => void
}

const Details = () => {
  const {colors}: Theme = useTheme();
  const navigation: any = useNavigation()
  const dataSource: Item[] = [
    {
      title: 'Attachments',
      onPress: () => {
        navigation.navigate('Stack2', {
          screen: 'Attachments',
        })
      }
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

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return <SingleLineField onPress={item.onPress} title={item.title} gap={false} fieldPadding={28} />;
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
