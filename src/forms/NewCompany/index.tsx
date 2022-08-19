import {View, Text, TextInput, FlatList, ScrollView} from 'react-native';
import React from 'react';
import {
  CstmTitleInput,
  GapView,
  ModalView,
  SingleLineField,
} from '../../components';
import {Theme, useTheme} from '@react-navigation/native';

const NewCompany = () => {
  const {colors, dark}: Theme = useTheme();

  const dataSource: Item[] = [
    {id: 1, title: 'New Company', value: ''},
    {id: 2, title: 'Company ID', value: ''},
    {id: 3, title: 'Company Phone No', value: ''},
    {id: 4, title: 'Address 1', value: ''},
    {id: 5, title: 'Address 2', value: ''},
    {
      id: 6,
      title: 'Zip Code',
      value: '',
      width: '30%',
      subItem: {id: 6.1, title: 'City', value: '', width: '50%'},
    },
  ];

  type Item = {
    id: number;
    title: string;
    value?: string;
    width?: string;
    subItem?: Item;
  };

  return (
    <ModalView bgColor={colors.card}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            elevation: 2,
            paddingHorizontal: 15,
          }}>
          {dataSource.map(item => (
            <View
              key={item.id}
              style={{
                flexDirection: item.subItem ? 'row' : 'column',
                justifyContent: 'space-between',
              }}>
              <CstmTitleInput
                key={item.id}
                title={item.title}
                value={item.value}
                width={item.width}
              />
              {item.subItem && (
                <CstmTitleInput
                  key={item.subItem.id}
                  title={item.subItem.title}
                  value={item.subItem.value}
                  width={item.subItem.width}
                />
              )}
            </View>
          ))}
          <GapView />
        </View>
        <View style={{backgroundColor: colors.background}}>
          <SingleLineField
            title="Please Select"
            subTitle="State"
            rightIcon="chevron-right"
          />
          <SingleLineField
            title="Please Select"
            subTitle="Country"
            rightIcon="chevron-right"
          />
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewCompany;
