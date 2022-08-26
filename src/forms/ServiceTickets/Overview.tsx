import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';

import {
  boardList,
  customFieldList,
  itemList,
  siteList,
  statusList,
  subTypesList,
  typesList,
} from '../../constants/SampleArrays';
import {PriorityField, SingleLineField} from '../../components';
import {SelectFields} from '../../types/index';

interface Item {
  headerTitle?: string;
  title: string;
  subTitle?: string;
  enable?: boolean;
  rightIcon?: string;
  titleWidth?: number;
  list?: SelectFields[];
  selectedItem?: SelectFields;
  leftIcon?: string;
  searchable?: boolean;
}

const dataSource: Item[] = [
  {
    title: 'Custom Fields 1',
    leftIcon: 'clipboard-text-outline',
    rightIcon: 'chevron-right',
    headerTitle: 'Custom Field',
    list: customFieldList,
    selectedItem: customFieldList[0],
    searchable: true,
  },
  {
    title: 'Site 1',
    subTitle: 'Site',
    rightIcon: 'chevron-right',
    headerTitle: 'Site',
    list: siteList,
    selectedItem: {name: 'Site 1', id: 1},
    searchable: false,
  },
  {
    title: '123 Elm Street Tampa, Fl 32364 United States',
    titleWidth: moderateScale(130),
    subTitle: 'Address',
  },
  {
    title: 'Board 1',
    subTitle: 'Board',
    headerTitle: 'Board',
    rightIcon: 'chevron-right',
    list: boardList,
    selectedItem: {name: 'Board 1', id: 1},
    searchable: false,
  },
  {
    title: 'Status 1',
    subTitle: 'Status',
    headerTitle: 'Status',
    rightIcon: 'chevron-right',
    list: statusList,
    selectedItem: {name: 'Status 1', id: 1},
    searchable: false,
  },
  {
    title: 'Sales - Existing',
    subTitle: 'Board',
    rightIcon: 'chevron-right',
  },
  {
    title: 'The Sale of Agreements',
    subTitle: 'Agreement',
    enable: false,
  },
  {
    title: 'Type 1',
    subTitle: 'Type',
    headerTitle: 'Type',
    rightIcon: 'chevron-right',
    list: typesList,
    selectedItem: {name: 'Type 1', id: 1},
    searchable: false,
  },
  {
    title: 'Subtype 1',
    subTitle: 'Subtype',
    headerTitle: 'SubType',
    rightIcon: 'chevron-right',
    list: subTypesList,
    selectedItem: {name: 'Subtype 1', id: 1},
    searchable: false,
  },
  {
    title: 'Item 1',
    subTitle: 'Item',
    headerTitle: 'Item',
    rightIcon: 'chevron-right',
    list: itemList,
    selectedItem: {name: 'Item 1', id: 1},
    searchable: false,
  },
];

const Overview = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [Ds, setDs] = useState<Item[]>(dataSource);

  useEffect(() => {
    if (route?.params?.item?.toString()) {
      var obj: any = [...Ds];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDs([...obj]);
    }
  }, [route?.params]);

  const handlePress = (item: Item, index: number) => {
    navigation.navigate('Stack2', {
      screen: 'CstmItemSelector',
      params: {
        from: 'STickets',
        item: index,
        data: item.list,
        selected: item.selectedItem,
        stack: 'Stack1',
        title: route?.params?.title,
        headerTitle: item.headerTitle,
        searchable: item.searchable,
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      <PriorityField />
      {Ds.map((item: Item, index: number) => (
        <SingleLineField
          key={index}
          subTitle={item.subTitle}
          title={item.title}
          enable={item.enable}
          titleWidth={item.titleWidth}
          rightIcon={item.rightIcon}
          onPress={() => handlePress(item, index)}
        />
      ))}
    </ScrollView>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priorityBox: {
    backgroundColor: 'yellow',
    borderWidth: 1,
    height: 10,
    width: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
  },
  subTitle: {
    opacity: 0.6,
  },
});
