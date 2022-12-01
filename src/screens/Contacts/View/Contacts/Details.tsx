import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTheme, Theme, useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

import {GapView, SingleLineField} from '../../../../components';



interface Item {
  title: string;
  onPress?: () => void;
}

export default function Details() {
  const {colors, dark}: Theme = useTheme();
  const navigation: any = useNavigation();

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return <SingleLineField title={item.title} gap={false} fieldPadding={24} onPress={item?.onPress} />;
  };

  const dataSource: Item[] = [
    {
      title: 'Open Tickets',
      onPress: () => {
        navigation.navigate('Stack2', {
          screen: 'TicketListing',
        });
      },
    },
  ];

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
