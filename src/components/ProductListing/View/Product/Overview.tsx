import React, {ReactNode, useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useTheme, useRoute, useNavigation} from '@react-navigation/native';


import {SingleLineField} from '../../..';
import {QNATypes, SelectFields} from '../../../../types';

interface Item {
  title: string;
  subTitle?: string;
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
  list?: SelectFields[] | QNATypes[];
  selectedItem?: SelectFields;
  rightChild?: ReactNode;
  searchable?: boolean;
  headerTitle?: string;
  onPress?: () => void;
  isRequired?: boolean;
}


const Overview = () => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const [dataSource, setDataSource] = useState<Item[]>([
    {title: 'Mark as Dropship or Special order', showRightSwitch: true, rightSwitchVal: true},
    {
      title: '#P12341',
      subTitle: 'Product Id',
      enable: false,
      isRequired: true,
    },
    {
      subTitle: 'Mfg Part Number',
      title: 'MFG123',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'SKU',
      title: 'SK2341',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'Description',
      title: 'Product description text',
      mode: 'multiline',
      inputable: true,
      enable: false,
    },
   
  ]);

  const handleSwitchChange = (value: boolean, index: number) => {
    let tempArr = [...dataSource];
    tempArr[index].rightSwitchVal = value;
    if (index == 18)
      tempArr[index].title = value ? 'Current State: Yes' : 'Current State: No';
    setDataSource(tempArr);
  };

  const handleChangeText = (value: string, index: number) => {
    let tempArr = [...dataSource];
    tempArr[index].title = value;
    setDataSource(tempArr);
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
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        {dataSource.map((item: Item, index: number) => (
          <SingleLineField
            key={index}
            subTitle={item.isRequired ? item.subTitle + '*' : item.subTitle}
            title={item.title}
            inputable={item.inputable}
            onChangeText={value => handleChangeText(value, index)}
            enable={item.enable}
            rightIconRound={item.rightIconRound}
            titleWidth={item.titleWidth}
            rightIcon={item.rightIcon}
            showRightSwitch={item.showRightSwitch}
            rightSwitchVal={item.rightSwitchVal}
            onChangeSwitch={value => handleSwitchChange(value, index)}
            rightChild={item.rightChild}
            mode={item.mode}
            onPress={item?.onPress}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
