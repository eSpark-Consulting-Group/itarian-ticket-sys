import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, KeyboardTypeOptions, StyleSheet, ViewStyle} from 'react-native';
import {CstmButton, EmptyListMsg, RoundedIcon, SingleLineField} from '../../components';
import { SCREEN_HEIGHT } from '../../constants';
import {TaxTypeList} from '../../constants/SelectionList';
import {SelectFields} from '../../types';

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
  onPress?: () => void;
  rightChild?: React.ReactNode;
  list?: SelectFields[];
  selectedItem?: SelectFields;
  headerTitle?: string;
  gap?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  onRoundedIconPress?: () => void;
  inputWidth?: number | undefined;
  roundedIconEnable?: boolean;
  roundIconStyle?: ViewStyle
}

export const AddTaxType = ({navigation, route}: any) => {
  const [dataSource, setDataSource] = useState<[Item[]]>([
    [
      {
        title: 'Please Select',
        subTitle: 'Tax Type',
        rightIcon: 'chevron-right',
        list: TaxTypeList,
        selectedItem: TaxTypeList[0],
        headerTitle: 'Tax Type',
        gap: true,
      },
      {
        title: '0',
        subTitle: 'Amount',
        inputable: true,
        gap: false,
        keyboardType: 'number-pad',
        rightIconRound: 'delete',
        roundedIconEnable: true,
        inputWidth: 300,
        enable: false,
        roundIconStyle: {top: 15}
      },
    ],
  ]);

  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: [Item[]] = [...dataSource];
      var dynamicObj = `obj${route?.params?.item}`;
      eval(dynamicObj)['title'] = route?.params?.selected?.name;
      eval(dynamicObj)['selectedItem'] = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params]);

  const handlePress = (item: Item, index: any) => {
    if (item?.list) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          ...route?.params,
          from: 'AddTaxType',
          item: index,
          data: item.list,
          selected: item.selectedItem,
          stack: 'Stack2',
          title: route?.params?.title,
          headerTitle: item.headerTitle,
        },
      });
    }
  };

  const updateInput = (e: string, index: any) => {
    var obj: [Item[]] = [...dataSource];
    var dynamicObj = `obj${index}`;
    eval(dynamicObj)['title'] = e;
    setDataSource(obj);
  };

  const onAdd = () => {
    var obj: [Item[]] = [...dataSource];
    obj?.push([
      {
        title: 'Please Select',
        subTitle: 'Tax Type',
        rightIcon: 'chevron-right',
        list: TaxTypeList,
        selectedItem: TaxTypeList[0],
        headerTitle: 'Tax Type',
        gap: true,
      },
      {
        title: '0',
        subTitle: 'Amount',
        inputable: true,
        gap: false,
        keyboardType: 'number-pad',
        rightIconRound: 'delete',
        roundedIconEnable: true,
        inputWidth: 300,
        enable: false,
        roundIconStyle: {top: 15}
      },
    ]);
    setDataSource([...obj]);
  };

  const onDelete = (index: number): void => {
    var obj: [Item[]] = [...dataSource];
    obj?.splice(index, 1);
    setDataSource([...obj]);
  };

  const totalTax = dataSource.reduce(
    (previousValue, currentValue) => {
        console.log("parseInt(currentValue[1].title", parseInt(currentValue[1].title))
        return previousValue + parseInt(currentValue[1].title)
    },
    0
  );
  
  return (
    <>
      <ScrollView style={{flex: 1}}>
        {dataSource.map((value, ind) => (
          <View key={ind}>
            {value.map((item, index) => (
              <SingleLineField
                key={index}
                subTitle={item.subTitle}
                title={item.title}
                inputable={item.inputable}
                onChangeText={e => updateInput(e, `${`[${ind}][${index}]`}`)}
                enable={item.enable}
                rightIconRound={item.rightIconRound}
                onRoundedIconPress={() => onDelete(ind)}
                roundedIconEnable={item.roundedIconEnable}
                titleWidth={item.titleWidth}
                rightIcon={item.rightIcon}
                showRightSwitch={item.showRightSwitch}
                rightSwitchVal={item.rightSwitchVal}
                onChangeSwitch={item.onChangeSwitch}
                mode={item?.mode}
                onPress={
                  item?.onPress
                    ? item.onPress
                    : () => handlePress(item, `${`[${ind}][${index}]`}`)
                }
                rightChild={item?.rightChild}
                gap={item?.gap}
                keyboardType={item?.keyboardType}
                inputWidth={item?.inputWidth}
                roundIconStyle={item?.roundIconStyle}
              />
            ))}
          </View>
        ))}
        {/* @ts-ignore */}
        {dataSource?.length == 0 && <NotFound />} 
      </ScrollView>
      <SingleLineField
          subTitle={`Subtotal Excluding Taxes`}
          title={"$"+(route?.params?.amount - totalTax).toString()}
          rightIconRound="plus-circle"
          onRoundedIconPress={() => onAdd()}
          roundedIconEnable
          enable={false}
        />
    </>
  );
};


const NotFound = (): JSX.Element => {
    return (
      <View style={styles.content}>
        <EmptyListMsg label="Tax Type" />
      </View>
    );
  };

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: SCREEN_HEIGHT/3,
        justifyContent: 'center',
        alignItems: 'center',
      },
})