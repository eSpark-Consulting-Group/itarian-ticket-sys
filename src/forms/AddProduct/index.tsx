import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import {ModalView, SingleLineField} from '../../components';
import {SelectFields} from '../../types';

const AddProduct = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();

  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Description',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
        title: '',
        subTitle: 'Mfg Part #',
        inputable: true,
        enable: false,
        isRequired: true,
      },
      {
        title: '',
        subTitle: 'SKU',
        inputable: true,
        enable: false,
        isRequired: true,
      },
    ]);

  interface Item {
    title: string;
    subTitle: string;
    inputable?: boolean;
    enable?: boolean;
    rightIcon?: string;
    rightIconRound?: string;
    titleWidth?: number;
    showRightSwitch?: boolean;
    rightSwitchVal?: boolean;
    onChangeSwitch?: (value: boolean) => void;
    onChangeText?: (text: string) => void;
    mode?: 'none' | 'multiline';
    onPress?: () => void;
    list?: SelectFields[];
    selectedItem?: SelectFields;
    searchable?: boolean;
    headerTitle?: string;
    isRequired?: boolean;
  }

  const updateInput = (e: string, index: number) => {
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  useEffect(() => {
    const Data: Item[] = [];
    dataSource.map(item =>
      Data.push({
        title: item.title,
        subTitle: item.subTitle,
        isRequired: item.isRequired,
      }),
    );
    navigation?.setParams({
      ...route?.params,
      data: Data,
    });
  }, [dataSource]);

  

  return (
    <ModalView>
      <ScrollView>
        <View style={{backgroundColor: colors.background}}>
          {dataSource.map((item, index) => (
            <SingleLineField
              key={index}
              subTitle={item.isRequired ? item.subTitle + '*' : item.subTitle}
              title={item.title}
              inputable={item.inputable}
              onChangeText={e => updateInput(e, index)}
              enable={item.enable}
              rightIconRound={item.rightIconRound}
              titleWidth={item.titleWidth}
              rightIcon={item.rightIcon}
              showRightSwitch={item.showRightSwitch}
              rightSwitchVal={item.rightSwitchVal}
              onChangeSwitch={item.onChangeSwitch}
              mode={item?.mode}
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default AddProduct;
