import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {SingleLineField} from '../../components';
import {companyNameList, contactNameList} from '../../constants/SelectionList';
import {SelectFields} from '../../types';

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

export const EditTicket = ({navigation, route}: any) => {
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      subTitle: 'Company',
      leftIcon: 'clipboard-text-outline',
      rightIcon: 'chevron-right',
      title: route?.params?.companyContact?.company?.name,
      headerTitle: 'Company',
      list: companyNameList,
      selectedItem: route?.params?.companyContact?.company,
      searchable: true,
    },
    {
      subTitle: 'Contact',
      title: route?.params?.companyContact?.contact?.name,
      rightIcon: 'chevron-right',
      headerTitle: 'Contact',
      list: contactNameList,
      selectedItem: route?.params?.companyContact?.contact,
      searchable: false,
    },
  ]);
  console.log('route?.params?.companyContact', route?.params?.from);
  useEffect(() => {
    if (
      route?.params?.item?.toString() &&
      route?.params?.from == 'EditTicket'
    ) {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params]);

  const isFocues = useIsFocused();
  useEffect(() => {
    navigation.setParams({
      ...route?.params,
      from: 'STickets',
      stack: 'Stack1',
      item: null,
      companyContact: {
        contact: dataSource[1].selectedItem,
        company: dataSource[0].selectedItem,
      },
    });
  }, [isFocues]);

  const handlePress = (item: Item, index: number) => {
    if (item?.list) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          from: 'EditTicket',
          item: index,
          data: item.list,
          selected: item.selectedItem,
          stack: 'Stack2',
          title: route?.params?.title,
          headerTitle: item.headerTitle,
          searchable: item.searchable,
        },
      });
    }
  };
  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{alignItems: 'center'}}>
      {dataSource.map((item: Item, index: number) => (
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
