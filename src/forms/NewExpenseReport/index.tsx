import {View, Text, TextInput, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  FloatButton,
  GapView,
  ModalView,
  RoundedIcon,
  SingleLineField,
} from '../../components';
import {Theme, useTheme} from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker';
import {AddExpenseAdditionalButtons, chargeCodeList, expenseTypeList, paymentTypeList} from '../../constants/SampleArrays';
import {cameraPicker, imagePicker} from '../../utils/helperFunctions';
import { SelectFields } from '../../types';

const NewExpenseReport = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [showDate, setShowDate] = useState(false);

  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Please Select',
      subTitle: 'Charge Code',
      rightIcon: 'chevron-right',
      list: chargeCodeList,
      selectedItem: chargeCodeList[0],
      headerTitle: "Charge Code"
    },
    {
      title: 'Please Select',
      subTitle: 'Jan 17, 2020',
      rightIcon: 'calendar',
      onPress: () => {
        setShowDate(true);
      },
    },
    {
      title: 'Please Select',
      subTitle: 'Expense Type',
      rightIcon: 'chevron-right',
      list: expenseTypeList,
      selectedItem: expenseTypeList[0],
      headerTitle: "Expense Type"
    },
    {title: 'Amount', rightChild: <Text>0.00</Text>},
    {
      title: 'Paid by employee',
      subTitle: 'Payment Method',
      rightIcon: 'chevron-right',
      list: paymentTypeList,
      selectedItem: paymentTypeList[0],
      headerTitle: "Payment Method"
    },
    {
      title: 'Please Select',
      subTitle: 'Images',
      rightChild: (
        <View style={{flexDirection: 'row'}}>
          <View style={{marginHorizontal: 5}}>
            <RoundedIcon
              onPress={() => {
                cameraPicker({cropping: false}).then((res: any) => {
                  let newData = [...dataSource];
                  newData[5].title = res?.path.split('/').pop();
                  console.log('response', res?.path.split('/').pop());
                  setDataSource(newData);
                });
              }}
              icon="camera-outline"
            />
          </View>
          <RoundedIcon
            onPress={() => {
              imagePicker({cropping: false}).then((res: any) => {
                let newData = [...dataSource];
                newData[5].title = res?.path.split('/').pop();
                console.log('response', res?.path.split('/').pop());
                setDataSource(newData);
              });
            }}
            icon="image-outline"
          />
        </View>
      ),
      titleWidth: 240,
    },
    {
      title: '',
      subTitle: 'Notes',
      inputable: true,
      enable: false,
      mode: 'multiline',
    },
  ]);

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
    headerTitle?: string
  }

  type Mode = 'date' | 'time';
  type PickerType = 'dd' | 'st' | 'et';


  const updateInput = (e: string, index: number) => {
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);

    if (event?.type == 'set') {
      dataSource[1].title = date?.toDateString();
      setDataSource([...dataSource]);
    }
  };

  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != "GoneTo") {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params]);

  const handlePress = (item: Item, index: number) => {
    if(item?.list) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          from: 'NewExpenseReport',
          item: index,
          data: item.list,
          selected: item.selectedItem,
          stack: 'Stack1',
          title: route?.params?.title,
          headerTitle: item.headerTitle,
        },
      });
    }
  };


  return (
    <ModalView bgColor={colors.card}>
      {showDate && (
        <DatePicker mode={'date'} value={new Date()} onChange={onChangeDate} />
      )}
      <ScrollView style={{flex: 1}}>
        <View style={{backgroundColor: colors.background}}>
          {dataSource.map((item, index) => (
            <SingleLineField
              key={index}
              subTitle={item.subTitle}
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
              onPress={() => handlePress(item, index)}
              rightChild={item?.rightChild}
            />
          ))}
          {/* <GapView /> */}
        </View>
      </ScrollView>
      <FloatButton AdditionalButtons={AddExpenseAdditionalButtons} />
    </ModalView>
  );
};

export default NewExpenseReport;
