import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {SingleLineField} from '../../../../components';
import {ContactList} from '../../../../types';
import _ from 'lodash';

interface Item {
  headerTitle?: string;
  title: string | null | undefined;
  subTitle?: string;
  enable?: boolean;
  rightIcon?: string;
  titleWidth?: number;
  leftIcon?: string;
  searchable?: boolean;
  rightChild?: React.ReactNode;
  rightIconRound?: string;
  roundedIconEnable?: boolean;
  contacts?: ContactList[] | null | undefined;
}
export default function Communications() {
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Fahim',
    },
    {
      title: 'Mudassir',
    },
    {
      title: 'Wirad',
    },
    {
      title: 'Faraz',
    },
  ]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {dataSource?.map((value, key) => {
          return (
            <View key={key}>
              <SingleLineField title={value?.title || ''} enable={false} gap={false} />
            </View>
          );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
