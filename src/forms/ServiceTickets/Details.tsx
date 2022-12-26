import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

import {GapView, SingleLineField} from '../../components';

type Item = {
  title: string;
  onPress?: () => void;
};

const Details = () => {
  const {colors, dark}: Theme = useTheme();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dataSource: Item[] = [
    {
      title: 'Resources',
      onPress: () => {
        navigation.navigate('Stack2', {
          screen: 'Resources',
          params: {
            ticket: route?.params?.title,
          },
        });
      },
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
