import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTheme, Theme, useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

import {GapView, SingleLineField} from '../../components';

type Item = {
  title: string;
  onPress?: () => void;
};

const Details = () => {
  const {colors, dark}: Theme = useTheme();
  const navigation: any = useNavigation();
  const dataSource: Item[] = [
    {
      title: 'Configurations',
      onPress: () => {
        navigation.navigate('Stack2', {
          screen: 'ConfigurationListing',
        });
      },
    },
    {
      title: 'Products',
    },
    {
      title: 'Attachments',
      onPress: () => {
        navigation.navigate('Stack2', {
          screen: 'Attachments',
        });
      },
    },
    {
      title: 'Tasks',
    },
    {
      title: 'Time Entries',
      onPress: () => {
        navigation.navigate('Stack2', {
          screen: 'TimeEntries',
        });
      },
    },
    {
      title: 'Expenses',
      onPress: () => {
        navigation.navigate('Stack2', {
          screen: 'Expenses',
        });
      },
    },
    {
      title: 'Open Tickets',
      onPress: () => {
        navigation.navigate('Stack2', {
          screen: 'TicketListing',
        });
      },
    },
    {
      title: 'My Schedule',
    },
  ];

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return (
      <SingleLineField
        onPress={item.onPress}
        title={item.title}
        gap={false}
        fieldPadding={24}
      />
    );
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
