import {View, Text, TextInput, FlatList, ScrollView} from 'react-native';
import React from 'react';
import {
  CstmTitleInput,
  GapView,
  ModalView,
  SingleLineField,
} from '../../components';
import {Theme, useTheme} from '@react-navigation/native';

const NewConfiguration = () => {
  const {colors, dark}: Theme = useTheme();

  const dataSource: Item[] = [{id: 1, title: 'Configuration Name', value: ''}];

  type Item = {
    id: number;
    title: string;
    value?: string;
    width?: string;
    subItem?: Item;
  };

  return (
    <ModalView bgColor={colors.card}>
      <ScrollView>
        <View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 15,
            }}>
            <CstmTitleInput title={'Configuration Name'} value={''} />
            <GapView />
          </View>
          <View style={{backgroundColor: colors.background}}>
            <SingleLineField
              title="Please Select"
              subTitle="Company"
              rightIcon="chevron-right"
            />
            <SingleLineField
              title="Please Select"
              subTitle="Type"
              rightIcon="chevron-right"
            />
            <SingleLineField
              title="Please Select"
              subTitle="Status"
              rightIcon="chevron-right"
            />
            <SingleLineField
              title="Please Select"
              subTitle="Manufacturer"
              rightIcon="chevron-right"
            />
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 15,
            }}>
            <CstmTitleInput title={'Mfg Part Number'} value={''} />
            <GapView />
            <CstmTitleInput title={'Model Number'} value={''} />
          </View>
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewConfiguration;
