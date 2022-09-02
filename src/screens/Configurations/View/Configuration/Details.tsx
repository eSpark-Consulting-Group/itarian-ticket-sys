import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useTheme, Theme, useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

import {GapView, SingleLineField} from '../../../../components';


interface Item {
  title: string;
  onPress?: () => void
}

const Details = () => {
  const {colors, dark}: Theme = useTheme();
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
  ];
  

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return <SingleLineField onPress={item?.onPress} title={item.title} gap={false} fieldPadding={28} />;
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
};

export default Details;
